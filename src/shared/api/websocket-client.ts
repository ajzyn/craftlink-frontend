import type { AuthenticationDto } from "@/features/auth/api/types"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs"
import { toast } from "sonner"
import axios from "axios"

const WS_BASE_URL = import.meta.env.VITE_WS_API_BASE_URL
const API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL

interface QueuedMessage {
   destination: string
   body?: string
}

class WsClient {
   private static instance: WsClient
   private client: Client | null = null
   private token: string | null = null
   private isAuthenticated = false
   private activeChats = 0

   private stompSubscriptions = new Map<string, StompSubscription>()
   private currentSubscriptions = new Map<string, (msg: IMessage) => void>()
   private pendingSubscriptions = new Map<string, (msg: IMessage) => void>()
   private messageQueue: QueuedMessage[] = []

   private isRefreshingToken = false
   private refreshPromise: Promise<void> | null = null

   private readonly MAX_QUEUE_SIZE = 100

   private constructor() {}

   public static getInstance(): WsClient {
      if (!WsClient.instance) {
         WsClient.instance = new WsClient()
      }
      return WsClient.instance
   }

   public async acquire(token?: string): Promise<void> {
      this.activeChats++

      if (this.activeChats === 1) {
         await this.connect(token)
      }
   }

   public async release(): Promise<void> {
      if (!this.client?.connected) {
         return
      }
      this.activeChats = Math.max(0, this.activeChats - 1)

      if (this.activeChats === 0) {
         await this.disconnect()
      }
   }

   public isActive(): boolean {
      return this.activeChats > 0
   }

   public async reconnect(token?: string): Promise<void> {
      if (this.activeChats === 0) {
         return
      }

      for (const [id, cb] of this.currentSubscriptions.entries()) {
         this.pendingSubscriptions.set(id, cb)
      }
      await this.connect(token)
   }

   public subscribe(destination: string, callback: (msg: IMessage) => void): void {
      if (this.client?.connected) {
         this.stompSubscriptions.get(destination)?.unsubscribe()
         this.currentSubscriptions.set(destination, callback)
         this.stompSubscriptions.set(destination, this.client.subscribe(destination, callback))
      } else {
         this.pendingSubscriptions.set(destination, callback)
      }
   }

   public send(destination: string, body?: string): void {
      if (this.messageQueue.length >= this.MAX_QUEUE_SIZE) {
         toast.error("Wystąpił błąd. Spróbuj później")
         return
      }

      if (!this.client?.connected) {
         this.messageQueue.push({ destination, body })
         return
      }

      this.client.publish({ destination, body })
   }

   public unsubscribe(destination: string): void {
      this.stompSubscriptions.get(destination)?.unsubscribe()
      this.stompSubscriptions.delete(destination)
      this.pendingSubscriptions.delete(destination)
   }

   public async disconnect(): Promise<void> {
      this.stompSubscriptions.forEach(sub => sub.unsubscribe())
      this.stompSubscriptions.clear()
      this.pendingSubscriptions.clear()

      if (this.client) {
         await this.client.deactivate()
         this.client = null
      }

      this.token = null
      this.isAuthenticated = false
      this.messageQueue = []
   }

   private async connect(token?: string): Promise<void> {
      if (this.client?.connected && this.token === token) {
         return
      }

      this.token = token ?? null
      this.isAuthenticated = !!token

      const brokerURL = token ? `${WS_BASE_URL}/ws-chat?token=${token}` : `${WS_BASE_URL}/ws-chat`

      this.client = new Client({
         brokerURL,
         connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
         reconnectDelay: 5000,
         heartbeatIncoming: 10000,
         heartbeatOutgoing: 10000,
         onConnect: () => {
            this.processPendingSubscriptions()
            this.flushQueue()
         },

         onStompError: async frame => {
            console.warn("WS stomp error", frame)

            if (this.isAuthenticated && frame.headers.message?.includes("401")) {
               await this.handleUnauthorized()
            } else {
               toast.error("Błąd połączenia z czatem")
            }
         },

         onWebSocketClose: () => console.warn("WS closed"),
         onWebSocketError: error => console.error("WS error", error),
      })

      this.client.activate()
   }

   private flushQueue(): void {
      const queue = [...this.messageQueue]
      this.messageQueue = []

      queue.forEach(msg => this.send(msg.destination, msg.body))
   }

   private processPendingSubscriptions(): void {
      this.pendingSubscriptions.forEach((callback, conversationId) => {
         this.subscribe(conversationId, callback)
      })
      this.pendingSubscriptions.clear()
   }

   private async handleUnauthorized(): Promise<void> {
      if (this.isRefreshingToken && this.refreshPromise) {
         return this.refreshPromise
      }

      this.isRefreshingToken = true
      this.refreshPromise = this.performRefresh()

      try {
         await this.refreshPromise
      } finally {
         this.isRefreshingToken = false
         this.refreshPromise = null
      }
   }

   private async performRefresh(): Promise<void> {
      try {
         const { data } = await this.refreshToken()
         useAuthStore.getState().setAccessToken(data.token)
      } catch (_) {
         toast.error("Sesja wygasła")
         await this.disconnect()
         useAuthStore.getState().logout()
      }
   }

   private async refreshToken() {
      const client = axios.create({
         baseURL: API_BASE_URL,
         timeout: 10000,
         withCredentials: true,
      })
      return client.get<AuthenticationDto>("/auth/refresh-token")
   }
}

export const wsClient = WsClient.getInstance()
