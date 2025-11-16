import { cn } from "@/lib/utils"
import { DesktopNavigation } from "@/app/layouts/components/desktop-navigation"
import { AuthModal } from "@/features/auth/components/auth-modal"
import { Logo } from "@/shared/components/logo"
import { useAuthSession } from "@/features/auth/hooks/use-auth-session"
import { MobileNavigation } from "@/app/layouts/components/mobile-navigation"
import { useBreakpoint } from "@/shared/hooks"
import { useAuthView } from "@/app/layouts/hooks/use-auth-view"
import { useNavigationConfig } from "@/app/layouts/hooks/use-navigation-config"
import { useCheckScroll } from "@/app/layouts/hooks/use-check-scroll"

export const Navigation = () => {
   const { user, handleLogout, isLoading } = useAuthSession()
   const isScrolled = useCheckScroll()
   const { isMobile } = useBreakpoint()

   const {
      isLoginDialogOpen,
      handleCloseLoginDialog,
      handleOpenLoginDialog,
      handleOpenLoginMobileView,
   } = useAuthView()

   const navConfig = useNavigationConfig({
      userType: user?.userType,
      onLoginDesktop: handleOpenLoginDialog,
      onLoginMobile: handleOpenLoginMobileView,
      onLogout: handleLogout,
   })

   return (
      <>
         <header
            className={cn(
               "fixed top-0 left-0 right-0 z-40",
               "max-w-8xl mx-auto pr-4 sm:pr-6 lg:pr-8 border-b border-gray-200 shadow-[0_2px_6px_rgba(0,0,0,0.05)]",
               isScrolled ? "bg-background/95 backdrop-blur" : "bg-background/90 backdrop-blur-sm",
            )}
         >
            <div className="mx-auto max-w-7xl h-16 lg:h-18 w-full flex items-center justify-between">
               <Logo />

               {!isLoading &&
                  (isMobile ? (
                     <MobileNavigation
                        headerItems={navConfig.mobile.header}
                        hamburgerSections={navConfig.mobile.hamburger}
                     />
                  ) : (
                     <DesktopNavigation
                        headerItems={navConfig.desktop.header}
                        userDropdownSections={navConfig.desktop.userDropdown}
                        user={user}
                     />
                  ))}
            </div>
         </header>

         {isLoginDialogOpen && (
            <AuthModal isOpen={isLoginDialogOpen} onClose={handleCloseLoginDialog} />
         )}
      </>
   )
}
