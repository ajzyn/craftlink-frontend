import { Button } from "@/shared/components/ui/button"
import { Separator } from "@/shared/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/shared/components/ui/sheet"
import { Link } from "@tanstack/react-router"
import type { ActionMenuItem, NavSection } from "@/app/layouts/types/navigation-types"

interface MobileMenuProps {
   isOpen: boolean
   hamburgerSections: NavSection[]
   onClose: VoidFunction
}

export const MobileMenu = ({ isOpen, hamburgerSections, onClose }: MobileMenuProps) => {
   const handleClickItem = (item: ActionMenuItem, isLogout: boolean) => {
      if (item.onClickMobile) {
         item.onClickMobile()
      } else {
         item.onClick()
      }
      if (isLogout) {
         onClose()
      }
   }

   const renderSection = (section: NavSection, sectionIndex: number) => (
      <div key={section.id}>
         {section.items.map(item => {
            const isLogout = item.label === "Wyloguj się"

            if (item.type === "link") {
               return (
                  <Button
                     key={item.label}
                     variant="ghost"
                     className={
                        isLogout
                           ? "w-full justify-start h-14 text-lg text-red-600 hover:text-red-600 hover:bg-red-50"
                           : "w-full justify-start h-14 px-4 text-lg hover:bg-muted"
                     }
                     onClick={onClose}
                     asChild
                  >
                     <Link to={item.href} className="flex items-center space-x-4 w-full">
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                     </Link>
                  </Button>
               )
            }

            return (
               <Button
                  key={item.label}
                  variant="ghost"
                  className={
                     isLogout
                        ? "w-full justify-start h-14 text-lg text-red-600 hover:text-red-600 hover:bg-red-50"
                        : "w-full justify-start h-14 px-4 text-lg hover:bg-muted"
                  }
                  onClick={() => handleClickItem(item, isLogout)}
               >
                  <div className="flex items-center space-x-4 w-full">
                     <span className="text-xl">{item.icon}</span>
                     <span className="font-medium">{item.label}</span>
                  </div>
               </Button>
            )
         })}

         {sectionIndex < hamburgerSections.length - 1 && <Separator className="my-4" />}
      </div>
   )

   return (
      <Sheet open={isOpen} onOpenChange={onClose}>
         <SheetHeader className="sr-only">
            <SheetTitle>Menu nawigacyjne</SheetTitle>
         </SheetHeader>
         <SheetContent side="right" className="w-[85%] max-w-sm p-0">
            <div className="h-full pt-10 overflow-y-auto">
               <div className="flex flex-col p-6 space-y-2">
                  {hamburgerSections.map(renderSection)}
               </div>
            </div>
         </SheetContent>
      </Sheet>
   )
}
