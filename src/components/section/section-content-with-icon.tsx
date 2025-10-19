import type { VariantProps } from "class-variance-authority"
import { type LucideIcon } from "lucide-react"
import { accentBoxVariants, getToneColors } from "@/components/accent-box/colors"
import { cn } from "@/lib/utils"

interface SectionContentWithIconProps extends VariantProps<typeof accentBoxVariants> {
   icon: LucideIcon
   className?: string
   children: React.ReactNode
}

export const SectionContentWithIcon = ({
   icon: Icon,
   children,
   tone,
}: SectionContentWithIconProps) => {
   const color = getToneColors(tone)

   return (
      <>
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
      </>
   )
}
