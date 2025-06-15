import { UserType } from "@/features/auth/types/auth.ts"
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
  [UserType.CLIENT]: [{ label: "Moje zamówienia", href: "/orders", icon: <ShoppingBag /> }],
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
  return useMemo(() => {
    if (userType && NAVIGATION_CONFIGS[userType]) {
      return NAVIGATION_CONFIGS[userType]
    }

    return [
      { label: "Usługi", href: "/services", icon: <Hammer /> },
      {
        label: "Zaloguj",
        icon: <User />,
        onClick: {
          desktop: openLoginDialog,
          mobile: openLoginMobileView,
        },
      },
    ]
  }, [userType, openLoginDialog, openLoginMobileView])
}
