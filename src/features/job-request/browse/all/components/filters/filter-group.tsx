import { Separator } from "@/shared/components/ui/separator"

interface FilterGroupProps {
   title: string
   children: React.ReactNode
}

export const FilterGroup = ({ title, children }: FilterGroupProps) => {
   return (
      <>
         <Separator />
         <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground/80">{title}</h4>
            <div className="pl-1">{children}</div>
         </div>
      </>
   )
}
