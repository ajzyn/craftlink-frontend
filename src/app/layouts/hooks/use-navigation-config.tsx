import { UserType } from "@/features/auth/api/types"
import { Briefcase, LogOut, Mail, Settings, ShoppingBag, User } from "lucide-react"
import { useMemo } from "react"
import type { NavigationConfig } from "@/app/layouts/types/navigation-types"

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
               type: "link" as const,
               label: "Profil",
               icon: <User />,
               href: "/profil",
            },
            {
               type: "link" as const,
               label: "Ustawienia",
               icon: <Settings />,
               href: "/settings",
            },
            {
               type: "action" as const,
               label: "Wyloguj się",
               icon: <LogOut />,
               onClick: onLogout,
            },
         ],
      }

      const messagesItem = {
         type: "link" as const,
         label: "Wiadomości",
         icon: <Mail />,
         href: "/wiadomosci",
      }

      if (userType === UserType.CLIENT) {
         return {
            desktop: {
               header: [
                  {
                     type: "link" as const,
                     label: "Moje zlecenia",
                     icon: <ShoppingBag />,
                     href: "/zlecenia/moje",
                  },
                  messagesItem,
               ],
               userDropdown: [profileSection],
            },
            mobile: {
               header: [messagesItem],
               hamburger: [
                  {
                     id: "client-actions",
                     items: [
                        {
                           type: "link" as const,
                           label: "Moje zlecenia",
                           icon: <ShoppingBag />,
                           href: "/zlecenia/moje",
                        },
                     ],
                  },
                  profileSection,
               ],
            },
         }
      }

      if (userType === UserType.SPECIALIST) {
         return {
            desktop: {
               header: [
                  {
                     type: "link" as const,
                     label: "Dostępne zlecenia",
                     icon: <Briefcase />,
                     href: "/jobs",
                  },
                  messagesItem,
               ],
               userDropdown: [profileSection],
            },
            mobile: {
               header: [messagesItem],
               hamburger: [
                  {
                     id: "specialist-actions",
                     items: [
                        {
                           type: "link" as const,
                           label: "Dostępne zlecenia",
                           icon: <Briefcase />,
                           href: "/jobs",
                        },
                     ],
                  },
                  profileSection,
               ],
            },
         }
      }

      if (userType === UserType.ADMIN) {
         return {
            desktop: {
               header: [messagesItem],
               userDropdown: [profileSection],
            },
            mobile: {
               header: [messagesItem],
               hamburger: [profileSection],
            },
         }
      }

      return {
         desktop: {
            header: [
               {
                  type: "action" as const,
                  label: "Zaloguj",
                  icon: <User />,
                  onClick: onLoginDesktop,
                  onClickMobile: onLoginMobile,
               },
               {
                  type: "link",
                  label: "Craftlink dla wykonawców",
                  href: "/zarejestruj",
                  icon: <User />,
               },
            ],
            userDropdown: [],
         },
         mobile: {
            header: [
               {
                  type: "action" as const,
                  label: "Zaloguj",
                  icon: <User />,
                  onClick: onLoginMobile,
               },
            ],
            hamburger: [
               {
                  id: "guest-actions",
                  items: [
                     {
                        type: "link" as const,
                        label: "Craftlink dla wykonawców",
                        icon: <User />,
                        href: "/zarejestruj",
                     },
                  ],
               },
            ],
         },
      }
   }, [userType, onLoginDesktop, onLoginMobile, onLogout])
}
