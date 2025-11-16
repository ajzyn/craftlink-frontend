import { Button } from "@/shared/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Separator } from "@/shared/components/ui/separator"
import { type UserDto } from "@/features/auth/api/types"
import { ChevronDown } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { getUserInitials } from "@/shared/utils/string-utils"
import type { MenuItem, NavSection } from "@/app/layouts/types/navigation-types"

interface DesktopNavigationProps {
   headerItems: MenuItem[]
   userDropdownSections?: NavSection[]
   user: UserDto | null
}

export const DesktopNavigation = ({
   headerItems,
   userDropdownSections,
   user,
}: DesktopNavigationProps) => {
   const renderMenuItem = (item: MenuItem) => {
      if (item.type === "link") {
         return (
            <Button key={item.label} variant="ghost" className="h-10" asChild>
               <Link to={item.href} className="flex items-center space-x-2">
                  <span className="text-muted-foreground">{item.icon}</span>
                  <span className="text-md">{item.label}</span>
               </Link>
            </Button>
         )
      }

      const isCraftlinkRegistration = item.label === "Craftlink dla wykonawców"

      return (
         <Button
            key={item.label}
            variant="ghost"
            onClick={item.onClick}
            className={
               isCraftlinkRegistration
                  ? "h-10 cursor-pointer hover:bg-transparent text-muted-foreground text-md border-l border-gray-200 rounded-none pl-4 ml-2"
                  : "h-10"
            }
         >
            <div className="flex items-center space-x-2">
               <span className="text-muted-foreground">{item.icon}</span>
               <span className="text-md">{item.label}</span>
            </div>
         </Button>
      )
   }

   const renderDropdownItem = (item: MenuItem) => {
      if (item.type === "link") {
         return (
            <DropdownMenuItem key={item.label} asChild className="cursor-pointer">
               <Link to={item.href} className="flex items-center space-x-2">
                  <span className="w-4 h-4">{item.icon}</span>
                  <span>{item.label}</span>
               </Link>
            </DropdownMenuItem>
         )
      }

      return (
         <DropdownMenuItem
            key={item.label}
            onClick={item.onClick}
            className="space-x-2 cursor-pointer"
         >
            <span className="w-4 h-4">{item.icon}</span>
            <span>{item.label}</span>
         </DropdownMenuItem>
      )
   }

   return (
      <nav className="flex items-center gap-1">
         {headerItems.map(renderMenuItem)}

         {user && <Separator orientation="vertical" className="!h-6" />}

         {user && (
            <DropdownMenu modal={false}>
               <DropdownMenuTrigger>
                  <Button asChild variant="ghost">
                     <div className="flex items-center space-x-3 h-12 px-4 bg-muted/50 hover:bg-muted">
                        <div className="h-8 w-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-medium">
                           {getUserInitials(user.username)}
                        </div>
                        <ChevronDown size={16} className="text-muted-foreground" />
                     </div>
                  </Button>
               </DropdownMenuTrigger>

               <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                     <p className="text-sm font-medium">{user.email}</p>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  {userDropdownSections?.map((section, sectionIndex) => (
                     <div key={section.id}>
                        {section.items.map(renderDropdownItem)}
                        {sectionIndex < userDropdownSections.length - 1 && (
                           <DropdownMenuSeparator />
                        )}
                     </div>
                  ))}
               </DropdownMenuContent>
            </DropdownMenu>
         )}
      </nav>
   )
}
