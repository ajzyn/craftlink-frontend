import { Menu, X } from "lucide-react"
import { useAuthStore } from "@/features/auth/stores/auth-store.ts"
import { Button } from "@/components/ui/button.tsx"
import { toast } from "sonner"
import { cn } from "@/lib/utils.ts"
import { useMenuState } from "./hooks/use-menu-state"
import { useNavigationItems } from "./hooks/use-navigation-items"
import { useRouter } from "@tanstack/react-router"
import { useLogoutMutation } from "@/features/auth/api/auth-queries.ts"
import { Logo } from "@/shared/components/logo"
import { MobileMenu } from "@/app/layouts/components/mobile-menu.tsx"
import { DesktopNavigation } from "@/app/layouts/components/desktop-navigation.tsx"
import { useBreakpoint } from "@/shared/hooks/use-breakpoint.tsx"
import { AuthModal } from "@/features/auth/components/auth-modal.tsx"
import { AuthFullScreen } from "@/features/auth/components/auth-full-screen.tsx"

export const Navigation = () => {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const { mutateAsync: logoutMutation } = useLogoutMutation()
  const { isMobile } = useBreakpoint()

  const {
    isScrolled,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isLoginDialogOpen,
    isLoginMobileViewOpen,
    handleCloseLoginMobileView,
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

  const handleLogout = async () => {
    try {
      await logoutMutation()
      toast.success("Wylogowano pomyślnie!")
    } catch (error) {
      console.warn("Logout failed. User is logged out locally:", error)
    } finally {
      logout()
      router.navigate({ to: "/dashboard" })
    }
  }

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
        </div>
      </header>

      {/*mobile*/}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        navigationItems={navigationItems}
        user={user}
        onClose={handleCloseMobileMenu}
        onLogout={handleLogout}
      />

      {isMobile ? (
        <AuthFullScreen isOpen={isLoginMobileViewOpen} onClose={handleCloseLoginMobileView} />
      ) : (
        <AuthModal isOpen={isLoginDialogOpen} onClose={handleCloseLoginDialog} />
      )}
    </>
  )
}
