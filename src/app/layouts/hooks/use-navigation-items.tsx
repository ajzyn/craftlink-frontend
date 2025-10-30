import { UserType } from "@/features/auth/types/auth-types"
import { useRouterState } from "@tanstack/react-router"
import { BarChart, Briefcase, Hammer, ShoppingBag, User, Users } from "lucide-react"
import { type ReactNode, useMemo } from "react"

export interface MenuElement {
   label: string
   href?: string
   icon: ReactNode
   onClick?: {
      desktop: VoidFunction
      mobile: VoidFunction
   }
}

const NAVIGATION_CONFIGS: Record<UserType, MenuElement[]> = {
   [UserType.CLIENT]: [{ label: "Moje zlecenia", href: "/zlecenia/moje", icon: <ShoppingBag /> }],
   [UserType.SPECIALIST]: [{ label: "Dostępne zlecenia", href: "/jobs", icon: <Briefcase /> }],
   [UserType.ADMIN]: [
      { label: "Użytkownicy", href: "/users", icon: <Users /> },
      { label: "Raporty", href: "/reports", icon: <BarChart /> },
   ],
}

export const useNavigationItems = (
   openLoginDialog: VoidFunction,
   openLoginMobileView: VoidFunction,
   userType?: UserType,
) => {
   const { location } = useRouterState()
   return useMemo(() => {
      if (userType && NAVIGATION_CONFIGS[userType]) {
         return NAVIGATION_CONFIGS[userType]
      }

      const navItems: MenuElement[] = [{ label: "Usługi", href: "/services", icon: <Hammer /> }]

      if (location.pathname !== "/login" && openLoginDialog) {
         navItems.push({
            label: "Zaloguj",
            icon: <User />,
            onClick: {
               desktop: openLoginDialog,
               mobile: openLoginMobileView,
            },
         })
      }
      return navItems
   }, [userType, openLoginDialog, openLoginMobileView, location.pathname])
}
