import type { MenuElement } from "@/app/layouts/hooks/use-navigation-items"
import { Button } from "@/shared/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { Separator } from "@/shared/ui/separator"
import { type UserDto } from "@/features/auth/api/types"
import { ChevronDown, LogOut, User } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import { getUserInitials } from "@/shared/utils/string-utils"

interface DesktopNavigationProps {
   navigationItems: MenuElement[]
   user: UserDto | null
   onLogout: VoidFunction
}

export const DesktopNavigation = ({ navigationItems, user, onLogout }: DesktopNavigationProps) => {
   const navigate = useNavigate()

   const navigateToProfilePage = async () => {
      await navigate({ to: "/profile" })
   }

   const navigateToRegisterSpecialist = async () => {
      await navigate({ to: " /register" })
   }

   const handleNavigate = async (href: string) => {
      await navigate({ to: href })
   }

   return (
      <nav className="hidden lg:flex items-center space-x-1">
         {navigationItems.map(item => (
            <div key={item.label}>
               {item.href ? (
                  <Button
                     onClick={() => handleNavigate(item.href!)}
                     variant="ghost"
                     className="h-10"
                     asChild
                  >
                     <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">{item.icon}</span>
                        <span className="text-md">{item.label}</span>
                     </div>
                  </Button>
               ) : (
                  <Button onClick={item.onClick?.desktop} variant="ghost" className="h-10" asChild>
                     <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">{item.icon}</span>
                        <span className="text-md">{item.label}</span>
                     </div>
                  </Button>
               )}
            </div>
         ))}

         <Separator orientation="vertical" className="!h-6" />

         {user ? (
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

                  <DropdownMenuItem
                     onClick={navigateToProfilePage}
                     className="space-x-2 cursor-pointer"
                  >
                     <User size={16} />
                     <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="space-x-2 cursor-pointer" onClick={onLogout}>
                     <LogOut size={16} />
                     <span>Wyloguj się</span>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         ) : (
            <Button
               variant="ghost"
               onClick={navigateToRegisterSpecialist}
               className="cursor-pointer hover:bg-transparent text-muted-foreground text-md"
            >
               Craftlink dla wykonawców
            </Button>
         )}
      </nav>
   )
}
