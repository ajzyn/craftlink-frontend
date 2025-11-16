import { Button } from "@/shared/components/ui/button"
import { Mail } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { cn } from "@/lib/utils"

interface MessagesButtonProps {
   unreadCount?: number
   showLabel?: boolean
   className?: string
}

export const MessagesBadgeButton = ({
   unreadCount = 0,
   showLabel = false,
   className,
}: MessagesButtonProps) => {
   return (
      <Button variant="ghost" className={cn("relative h-10", className)} asChild>
         <Link to="/wiadomosci" className="flex items-center space-x-2">
            <div className="relative">
               <Mail className="text-muted-foreground" />
               {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                     {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
               )}
            </div>
            {showLabel && <span className="text-md">Wiadomości</span>}
         </Link>
      </Button>
   )
}
