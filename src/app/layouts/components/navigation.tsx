import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMenuState } from "../hooks/use-menu-state"
import { useNavigationItems } from "../hooks/use-navigation-items"
import { MobileMenu } from "@/app/layouts/components/mobile-menu"
import { DesktopNavigation } from "@/app/layouts/components/desktop-navigation"
import { AuthModal } from "@/features/auth/components/auth-modal"
import { Logo } from "@/components/shared/logo"
import { useAuthNavigation } from "@/features/auth/hooks/use-auth-navigation"

export const Navigation = () => {
   const { user, handleLogout, isLoading } = useAuthNavigation()

   const {
      isScrolled,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      isLoginDialogOpen,
      handleCloseLoginDialog,
      handleOpenLoginDialog,
      handleCloseMobileMenu,
      handleOpenLoginMobileView,
   } = useMenuState()

   const navigationItems = useNavigationItems(
      handleOpenLoginDialog,
      handleOpenLoginMobileView,
      user?.userType,
   )

   return (
      <>
         <header
            className={cn(
               "fixed top-0 left-0 right-0 z-40",
               "max-w-8xl mx-auto pr-4 sm:pr-6 lg:pr-8 border-b border-gray-200",
               isScrolled
                  ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                  : "bg-background/90 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60",
            )}
         >
            <div className="h-16 lg:h-18 w-full flex items-center justify-between">
               <Logo />

               {!isLoading && (
                  <>
                     <DesktopNavigation
                        navigationItems={navigationItems}
                        user={user}
                        onLogout={handleLogout}
                     />

                     <div className="lg:hidden">
                        <Button
                           onClick={() => setIsMobileMenuOpen(prev => !prev)}
                           variant="ghost"
                           size="icon"
                           className="group hover:bg-transparent"
                        >
                           {isMobileMenuOpen ? (
                              <X className="size-8 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                           ) : (
                              <Menu className="size-8 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                           )}
                        </Button>
                     </div>
                  </>
               )}
            </div>
         </header>

         <MobileMenu
            isOpen={isMobileMenuOpen}
            navigationItems={navigationItems}
            user={user}
            onClose={handleCloseMobileMenu}
            onLogout={handleLogout}
         />

         {isLoginDialogOpen && (
            <AuthModal isOpen={isLoginDialogOpen} handleClose={handleCloseLoginDialog} />
         )}
      </>
   )
}
