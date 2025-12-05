import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input, type InputProps } from "@/shared/components/ui/input"

interface InputWithIconProps extends InputProps {
   icon?: LucideIcon
}

export const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
   ({ icon: Icon, className, ...props }, ref) => {
      if (!Icon) {
         return <Input ref={ref} className={className} {...props} />
      }

      return (
         <div className="relative">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input ref={ref} className={cn("pl-12 h-14 text-lg", className)} {...props} />
         </div>
      )
   },
)
