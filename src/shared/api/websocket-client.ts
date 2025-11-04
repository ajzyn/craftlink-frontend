import { Client } from "@stomp/stompjs"
import { toast } from "sonner"

let client: Client | null = null
let clientToken: string | null = null

export const getChatClient = (token: string) => {
   if (client && clientToken === token) {
      return client
   }
   if (client) {
      disconnectChatClient()
   }

   clientToken = token
   const wsUrl = `${import.meta.env.VITE_WS_API_BASE_URL}/ws-chat?token=${token}`

   client = new Client({
      brokerURL: wsUrl,
      connectHeaders: { Authorization: `Bearer ${token}` },

      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,

      debug: msg => console.log("STOMP", msg),

      onConnect: () => console.log("WebSocket connected"),
      onStompError: frame => {
         console.error("❌ STOMP ERROR", frame)
         toast.error("Błąd połączenia z czatem. Odśwież stronę lub zaloguj się ponownie.")
      },
      onWebSocketClose: evt => {
         console.warn("⚠️ WS CLOSED", evt)
      },
   })

   client.activate()
   return client
}

const disconnectChatClient = () => {
   client?.deactivate({ force: true })
   client = null
   clientToken = null
}
