import type { VariantProps } from "class-variance-authority"
import { type LucideIcon } from "lucide-react"
import { accentBoxVariants } from "@/shared/components/accent-box/variants"
import { cn } from "@/lib/utils"
import { getToneColors } from "@/shared/utils"

interface SectionContentWithIconProps extends VariantProps<typeof accentBoxVariants> {
   icon: LucideIcon
   className?: string
   children: React.ReactNode
}

export const SectionIconContent = ({
   icon: Icon,
   children,
   tone,
   className,
}: SectionContentWithIconProps) => {
   const color = getToneColors(tone)

   return (
      <div className={cn(className)}>
         <div
            className={cn(
               "flex items-center justify-center w-10 h-10 rounded-md",
               color.bg,
               color.text,
            )}
         >
            <Icon className="w-6 h-6" />
         </div>
         <div>{children}</div>
      </div>
   )
}
