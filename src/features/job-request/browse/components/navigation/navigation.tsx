import { JobRequestMobileNavigation } from "@/features/job-request/browse/components/navigation/mobile"
import { JobRequestDesktopNavigation } from "@/features/job-request/browse/components/navigation/desktop"

export const JobRequestNavigation = () => {
   const goBack = () => {
      window.history.back()
   }

   const onDelete = () => {
      console.log("on delete")
   }

   const onEdit = () => {
      console.log("on edit")
   }

   return (
      <>
         <div className="md:hidden">
            <JobRequestMobileNavigation onDelete={onDelete} onEdit={onEdit} goBack={goBack} />
         </div>
         <div className="hidden md:block">
            <JobRequestDesktopNavigation onDelete={onDelete} onEdit={onEdit} goBack={goBack} />
         </div>
      </>
   )
}
