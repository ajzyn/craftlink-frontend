import { cn } from "@/lib/utils"

interface JobRequestListHeroProps {
   title: string
   description: string
   className?: string
}

export const JobRequestListHero = ({ title, description, className }: JobRequestListHeroProps) => {
   return (
      <div className={cn("my-14 space-y-2", className)}>
         <h2 className="text-heading-2xl font-bold">{title}</h2>
         <h3 className="text-heading-md text-muted-foreground">{description}</h3>
      </div>
   )
}
