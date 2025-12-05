import { FileText, type LucideIcon } from "lucide-react"

interface EmptyStateProps {
   icon?: LucideIcon
   children?: React.ReactNode
   title: string
   description: string
}

export const EmptyState = ({
   icon: Icon = FileText,
   children,
   title,
   description,
}: EmptyStateProps) => {
   return (
      <div className="text-center mt-24 space-y-3 text-muted-foreground max-w-96 mx-auto">
         <Icon className="mx-auto bg-primary/20 p-5 rounded-full text-primary" size={80} />
         <p className="text-heading-lg text-foreground">{title}</p>
         <p className="text-body-sm">{description}</p>
         {children}
      </div>
   )
}
