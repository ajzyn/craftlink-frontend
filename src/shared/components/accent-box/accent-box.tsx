import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { accentBoxVariants } from "@/shared/components/accent-box/variants"

interface AccentBoxProps
   extends React.HTMLAttributes<HTMLDivElement>,
      VariantProps<typeof accentBoxVariants> {}

export const AccentBox = ({ tone, className, ...props }: AccentBoxProps) => {
   return <div className={cn(accentBoxVariants({ tone }), className)} {...props} />
}
