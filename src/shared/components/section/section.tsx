import { cn } from "@/lib/utils"

interface SectionProps {
   label: React.ReactNode
   children: React.ReactNode
   className?: string
}

export const Section = ({ label, children, className }: SectionProps) => {
   return (
      <div
         className={cn(
            "bg-white/80 backdrop-blur-sm",
            "md:mx-auto md:max-w-[1024px]",
            "md:rounded-xl md:bg-card px-6 py-10 md:shadow-md md:pt-0 md:mt-16",
            className,
         )}
      >
         <div className="mb-10 border-b-1 border-gray-100 pb-6 md:px-6 md:pt-10">
            <h2 className="text-xl font-semibold md:text-heading-lg">{label}</h2>
         </div>

         <div className="md:px-6 md:pb-6">{children}</div>
      </div>
   )
}
