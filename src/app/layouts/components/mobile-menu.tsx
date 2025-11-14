import type { UserDto } from "@/features/auth/api/types"
import { Button } from "@/shared/components/ui/button"
import { LogIn, LogOut, Settings } from "lucide-react"
import type { MenuElement } from "@/app/layouts/hooks/use-navigation-items"
import { Separator } from "@/shared/components/ui/separator"
import { Footer } from "@/shared/components/footer"
import { getUserInitials } from "@/shared/utils/string-utils"
import { Link } from "@tanstack/react-router"

interface MobileMenuProps {
   isOpen: boolean
   navigationItems: MenuElement[]
   user: UserDto | null
   onClose: VoidFunction
   onLogout: VoidFunction
}

export const MobileMenu = ({
   isOpen,
   navigationItems,
   user,
   onClose,
   onLogout,
}: MobileMenuProps) => {
   if (!isOpen) return null

   return (
      <div className="fixed inset-0 top-16 z-50 lg:hidden">
         <div className="relative h-full w-full bg-background/95 backdrop-blur-md animate-in fade-in slide-in-from-right duration-300">
            <div className="space-y-2 flex flex-col h-full pt-8 px-6 pb-6">
               {navigationItems.map((item, index) => (
                  <Button
                     key={index}
                     variant="ghost"
                     className="w-full justify-start h-14 px-4 text-lg hover:bg-muted"
                     onClick={() => {
                        if (item.onClick?.mobile) {
                           item.onClick.mobile()
                        } else {
                           onClose()
                        }
                     }}
                  >
                     {item.href ? (
                        <Link to={item.href} className="flex items-center space-x-4 w-full">
                           <span className="text-muted-foreground text-xl">{item.icon}</span>
                           <span className="font-medium">{item.label}</span>
                        </Link>
                     ) : (
                        <div className="flex items-center space-x-4 w-full">
                           <span className="text-muted-foreground text-xl">{item.icon}</span>
                           <span className="font-medium">{item.label}</span>
                        </div>
                     )}
                  </Button>
               ))}

               {user ? (
                  <>
                     <Separator className="my-8" />
                     <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-xl">
                           <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-lg">
                              {getUserInitials(user.username)}
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="font-medium text-lg truncate">{user.email}</div>
                           </div>
                        </div>

                        <Button
                           variant="ghost"
                           className="w-full justify-start h-14 text-lg hover:bg-muted"
                           onClick={onClose}
                           asChild
                        >
                           <Link to="/settings" className="flex items-center space-x-4">
                              <Settings size={20} />
                              <span>Ustawienia</span>
                           </Link>
                        </Button>

                        <Button
                           variant="ghost"
                           className="w-full justify-start h-14 text-lg text-red-600 hover:text-red-600 hover:bg-red-50"
                           onClick={() => {
                              onLogout()
                              onClose()
                           }}
                        >
                           <LogOut size={20} className="mr-4" />
                           <span>Wyloguj się</span>
                        </Button>
                     </div>
                  </>
               ) : (
                  <Button
                     variant="ghost"
                     className="w-full justify-start h-14 px-4 text-lg hover:bg-muted"
                     asChild
                  >
                     <Link
                        to="/zarejestruj"
                        onClick={onClose}
                        className="flex items-center space-x-4 w-full"
                     >
                        <span className="text-muted-foreground text-xl">
                           <LogIn />
                        </span>
                        <span className="font-medium">Craftlink dla wykonawców</span>
                     </Link>
                  </Button>
               )}
            </div>
            <Footer />
         </div>
      </div>
   )
}
