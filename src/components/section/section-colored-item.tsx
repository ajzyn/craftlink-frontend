import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { AccentBox } from "@/components/accent-box/accent-box"
import type { VariantProps } from "class-variance-authority"
import { accentBoxVariants, getToneColors } from "@/components/accent-box/colors"

interface InfoBoxProps extends VariantProps<typeof accentBoxVariants> {
   icon: LucideIcon
   label: string
   value: string | React.ReactNode
   className?: string
}

export const SectionColoredItem = ({ icon: Icon, label, value, tone, className }: InfoBoxProps) => {
   const color = getToneColors(tone)

   return (
      <AccentBox tone={tone} className={cn("flex flex-col items-start gap-2 p-4", className)}>
         <div className="flex items-center gap-2">
            <div
               className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-md",
                  color.bg,
                  color.icon,
               )}
            >
               <Icon className="w-4 h-4" />
            </div>
            <span className={cn("text-sm font-medium", color.text)}>{label}</span>
         </div>
         <h3 className="text-sm text-foreground">{value}</h3>
      </AccentBox>
   )
}
