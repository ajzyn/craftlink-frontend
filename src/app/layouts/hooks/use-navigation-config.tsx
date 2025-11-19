import { UserType } from "@/features/auth/api/types"
import { Briefcase, Home, LogOut, Mail, Settings, ShoppingBag, User } from "lucide-react"
import { useMemo } from "react"
import type { MenuItem, NavigationConfig, NavSection } from "@/app/layouts/types/navigation-types"

interface UseNavigationConfigParams {
   userType?: UserType
   onLoginDesktop: VoidFunction
   onLoginMobile: VoidFunction
   onLogout: VoidFunction
}

export const useNavigationConfig = ({
   userType,
   onLoginDesktop,
   onLoginMobile,
   onLogout,
}: UseNavigationConfigParams): NavigationConfig => {
   return useMemo(() => {
      const profileSection = {
         id: "profile",
         items: [
            {
               type: "link",
               label: "Profil",
               icon: <User />,
               href: "/profil",
            },
            {
               type: "link",
               label: "Ustawienia",
               icon: <Settings />,
               href: "/settings",
            },
            {
               type: "action",
               label: "Wyloguj się",
               icon: <LogOut />,
               onClick: onLogout,
            },
         ],
      } satisfies NavSection

      const commonItems = {
         allJobs: {
            type: "link",
            label: "Dostępne zlecenia",
            icon: <Briefcase />,
            href: "/jobs",
         },
         myJobs: {
            type: "link",
            label: "Moje zlecenia",
            icon: <ShoppingBag />,
            href: "/zlecenia/moje",
         },
         home: {
            type: "link",
            label: "Home",
            icon: <Home />,
            href: "/",
         },
         messages: {
            type: "link",
            label: "Wiadomości",
            icon: <Mail />,
            href: "/wiadomosci",
         },
      } as const satisfies Record<string, MenuItem>

      if (userType === UserType.CLIENT) {
         return {
            desktop: {
               header: [commonItems.home, commonItems.myJobs, commonItems.messages],
               userDropdown: [profileSection],
            },
            mobile: {
               header: [commonItems.home, commonItems.messages],
               hamburger: [
                  {
                     id: "client-actions",
                     items: [commonItems.myJobs],
                  },
                  profileSection,
               ],
            },
         }
      }

      if (userType === UserType.SPECIALIST) {
         return {
            desktop: {
               header: [commonItems.home, commonItems.allJobs, commonItems.messages],
               userDropdown: [profileSection],
            },
            mobile: {
               header: [commonItems.home, commonItems.messages],
               hamburger: [
                  {
                     id: "specialist-actions",
                     items: [commonItems.allJobs],
                  },
                  profileSection,
               ],
            },
         }
      }

      if (userType === UserType.ADMIN) {
         return {
            desktop: {
               header: [commonItems.home, commonItems.messages],
               userDropdown: [profileSection],
            },
            mobile: {
               header: [commonItems.home, commonItems.messages],
               hamburger: [profileSection],
            },
         }
      }

      const registerSpecialistItem: MenuItem = {
         type: "link",
         label: "Craftlink dla wykonawców",
         href: "/zarejestruj",
         icon: <User />,
      }

      return {
         desktop: {
            header: [
               commonItems.home,
               {
                  type: "action",
                  label: "Zaloguj",
                  icon: <User />,
                  onClick: onLoginDesktop,
                  onClickMobile: onLoginMobile,
               },
               registerSpecialistItem,
            ],
         },
         mobile: {
            header: [
               commonItems.home,
               {
                  type: "action",
                  label: "Zaloguj",
                  icon: <User />,
                  onClick: onLoginMobile,
               },
            ],
            hamburger: [
               {
                  id: "guest-actions",
                  items: [registerSpecialistItem],
               },
            ],
         },
      }
   }, [userType, onLoginDesktop, onLoginMobile, onLogout])
}
