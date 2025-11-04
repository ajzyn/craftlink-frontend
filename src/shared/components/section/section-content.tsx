import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { AccentBox } from "@/shared/components/accent-box/accent-box"
import type { VariantProps } from "class-variance-authority"
import { accentBoxVariants } from "@/shared/components/accent-box/variants"
import { getToneColors } from "@/shared/utils"

interface InfoBoxProps extends VariantProps<typeof accentBoxVariants> {
   icon: LucideIcon
   label: string
   className?: string
   children: React.ReactNode
}

export const SectionContent = ({ icon: Icon, label, children, tone, className }: InfoBoxProps) => {
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
         <h3 className="text-sm text-foreground">{children}</h3>
      </AccentBox>
   )
}
