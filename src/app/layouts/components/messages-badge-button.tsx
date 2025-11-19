import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Mail } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { cn } from "@/lib/utils"
import { useUnreadConversationCountQuery } from "@/features/chat/api/queries"

interface MessagesButtonProps {
   showLabel?: boolean
   className?: string
}

export const MessagesBadgeButton = ({ showLabel = false, className }: MessagesButtonProps) => {
   const { data } = useUnreadConversationCountQuery()
   const unreadCount = data?.count ?? 0

   return (
      <Button variant="ghost" className={cn("relative h-10", className)} asChild>
         <Link to="/wiadomosci" className="flex items-center space-x-2">
            <div className="relative">
               <Mail className="text-muted-foreground" />
               {unreadCount > 0 && (
                  <Badge
                     variant="destructive"
                     className="absolute -top-1 -right-1 h-4 w-4 px-1 text-xs font-medium rounded-full flex items-center justify-center"
                  >
                     {unreadCount > 99 ? "99+" : unreadCount}
                  </Badge>
               )}
            </div>
            {showLabel && <span className="text-md">Wiadomości</span>}
         </Link>
      </Button>
   )
}
