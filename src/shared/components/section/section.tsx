import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { cn } from "@/lib/utils"

interface SectionProps {
   label: React.ReactNode
   children: React.ReactNode
   className?: string
}

export const Section = ({ label, children, className }: SectionProps) => {
   return (
      <Card className={cn(className)}>
         <CardHeader>
            <h2 className="text-heading-lg">{label}</h2>
         </CardHeader>
         <CardContent>{children}</CardContent>
      </Card>
   )
}
