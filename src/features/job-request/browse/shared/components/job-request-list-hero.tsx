interface JobRequestListHeroProps {
   title: string
   description: string
}

export const JobRequestListHero = ({ title, description }: JobRequestListHeroProps) => {
   return (
      <div className="my-14 space-y-2">
         <h2 className="text-heading-2xl font-bold">{title}</h2>
         <h3 className="text-heading-md text-muted-foreground">{description}</h3>
      </div>
   )
}
