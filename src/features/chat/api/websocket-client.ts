import { Client } from "@stomp/stompjs"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"

let client: Client | null = null

export const getChatClient = () => {
   if (client) return client

   const token = useAuthStore.getState().accessToken

   if (!token) throw new Error("Cannot create chat client without valid access token")

   client = new Client({
      brokerURL: `ws://localhost:8080/ws-chat`,
      connectHeaders: {
         Authorization: `Bearer ${token}`,
      },
      debug: msg => console.log("[WS]", msg),
      reconnectDelay: 5000,
   })

   client.activate()
   return client
}

export const disconnectChatClient = () => {
   client?.deactivate()
   client = null
}
