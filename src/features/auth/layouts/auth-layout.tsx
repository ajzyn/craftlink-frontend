import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"
import { DeviceType } from "@/shared/types/device-types"

interface AuthLayoutProps {
   title: string
   variant: DeviceType
   description: string
   toggleLabel: string
   onToggleMode: VoidFunction
   children: ReactNode
}

export const AuthLayout = ({
   title,
   variant,
   description,
   toggleLabel,
   onToggleMode,
   children,
}: AuthLayoutProps) => {
   const content = (
      <div className="space-y-6 p-6">
         <div className="text-center space-y-2">
            <h2 className="font-bold text-2xl">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
         </div>
         <div>{children}</div>
         <div className="space-y-4">
            <Separator />
            <div className="text-center">
               <Button
                  variant="ghost"
                  onClick={onToggleMode}
                  className="text-sm text-muted-foreground hover:text-primary"
               >
                  {toggleLabel}
               </Button>
            </div>
         </div>
      </div>
   )

   return variant === DeviceType.DESKTOP ? (
      content
   ) : (
      <div className="max-w-xl m-auto mt-10 rounded-lg bg-background shadow-md">{content}</div>
   )
}
