import { Button } from "@/shared/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { MobileMenu } from "@/app/layouts/components/mobile-menu"
import { MessagesBadgeButton } from "@/app/layouts/components/messages-badge-button"
import type { MenuItem, NavSection } from "@/app/layouts/types/navigation-types"

interface MobileNavigationProps {
   headerItems: MenuItem[]
   hamburgerSections: NavSection[]
}

export const MobileNavigation = ({ headerItems, hamburgerSections }: MobileNavigationProps) => {
   const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false)

   return (
      <>
         <div className="flex items-center gap-2">
            {headerItems.map(item => {
               if (item.type === "link" && item.label === "Wiadomości") {
                  return <MessagesBadgeButton key={item.label} showLabel={false} />
               }

               if (item.type === "action") {
                  return (
                     <Button
                        key={item.label}
                        onClick={item.onClickMobile ?? item.onClick}
                        variant="ghost"
                        size="icon"
                     >
                        {item.icon}
                     </Button>
                  )
               }

               return (
                  <Button key={item.label} variant="ghost" size="icon">
                     <Link to={item.href}>{item.icon}</Link>
                  </Button>
               )
            })}

            <Button
               onClick={() => setIsMobileMenuOpened(prev => !prev)}
               variant="ghost"
               size="icon"
               className="group hover:bg-transparent"
            >
               <Menu className="size-8 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            </Button>
         </div>
         <MobileMenu
            isOpen={isMobileMenuOpened}
            hamburgerSections={hamburgerSections}
            onClose={() => setIsMobileMenuOpened(false)}
         />
      </>
   )
}
