import type { JobRequestRequesterDto } from "@/features/job-request/api/types"
import { Section } from "@/shared/components/section"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { getUserInitials } from "@/shared/utils/string-utils"
import { Mail, Phone } from "lucide-react"

interface JobRequestRequesterProps {
   requester: JobRequestRequesterDto
}

export const RequesterSection = ({ requester }: JobRequestRequesterProps) => {
   //TODO: avatar
   return (
      <Section label="Zleceniodawca">
         <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
               <AvatarImage src={requester.name} alt={requester.name} />
               <AvatarFallback>{getUserInitials(requester.name)}</AvatarFallback>
            </Avatar>
            <div>
               <p className="font-medium text-sm text-foreground first-letter:uppercase">
                  {requester.name}
               </p>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-md">
               <Mail className="w-4 h-4" />
            </div>
            <a href={`mailto:${requester.email}`} className="hover:underline text-sm font-medium">
               {requester.email}
            </a>
         </div>
         {requester.phoneNumber && (
            <div className="flex items-center gap-2">
               <div className="flex items-center justify-center w-7 h-7 rounded-md">
                  <Phone className="w-4 h-4" />
               </div>
               <a
                  href={`tel:${requester.phoneNumber}`}
                  className="hover:underline text-sm font-medium"
               >
                  {requester.phoneNumber}
               </a>
            </div>
         )}
      </Section>
   )
}
