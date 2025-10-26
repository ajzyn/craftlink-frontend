import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface SectionProps {
   label: string
   children: React.ReactNode
}

export const Section = ({ label, children }: SectionProps) => {
   return (
      <Card>
         <CardHeader>
            <h2 className="text-heading-lg">{label}</h2>
         </CardHeader>
         <CardContent>{children}</CardContent>
      </Card>
   )
}
