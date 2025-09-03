import type { MenuElement } from "@/app/layouts/hooks/use-navigation-items"
import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { type UserDto } from "@/features/auth/types/auth-types"
import { ChevronDown, LogOut, Settings } from "lucide-react"

interface DesktopNavigationProps {
   navigationItems: MenuElement[]
   user: UserDto | null
   onLogout: VoidFunction
}

export const DesktopNavigation = ({ navigationItems, user, onLogout }: DesktopNavigationProps) => {
   const getUserInitials = (user: UserDto) => {
      return user.email[0].toUpperCase()
   }

   return (
      <nav className="hidden lg:flex items-center space-x-1">
         {navigationItems.map((item, index) => (
            <Button key={index} variant="ghost" className="h-10" asChild>
               {item.href ? (
                  <a href={item.href} className="flex items-center space-x-2">
                     <span className="text-muted-foreground">{item.icon}</span>
                     <span className="text-md">{item.label}</span>
                  </a>
               ) : (
                  <div onClick={item.onClick?.desktop} className="flex items-center space-x-2">
                     <span className="text-muted-foreground">{item.icon}</span>
                     <span className="text-md">{item.label}</span>
                  </div>
               )}
            </Button>
         ))}

         <Separator orientation="vertical" className="!h-6" />

         {user ? (
            <DropdownMenu>
               <DropdownMenuTrigger>
                  <Button asChild variant="ghost">
                     <div className="flex items-center space-x-3 h-12 px-4 bg-muted/50 hover:bg-muted">
                        <div className="h-8 w-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-medium">
                           {getUserInitials(user)}
                        </div>
                        <ChevronDown size={16} className="text-muted-foreground" />
                     </div>
                  </Button>
               </DropdownMenuTrigger>

               <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                     <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.email}</p>
                     </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                     <a href="/settings" className="flex items-center space-x-2 cursor-pointer">
                        <Settings size={16} />
                        <span>Ustawienia</span>
                     </a>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                     className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                     onClick={onLogout}
                  >
                     <LogOut size={16} className="mr-2" />
                     <span>Wyloguj się</span>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         ) : (
            <Button
               variant="ghost"
               className="cursor-pointer hover:bg-transparent text-muted-foreground text-md"
            >
               Craftlink dla wykonawców
            </Button>
         )}
      </nav>
   )
}
