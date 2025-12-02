import { DynamicIcon } from "@/shared/components/dynamic-icon"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { JobRequestBreadcrumb } from "@/features/job-request/create/components/shared/job-request-breadcrumbs"

const DEFAULT_BANNER_IMAGE = "/assets/images/worker.jpg"

interface JobRequestBannerProps {
   title?: string
   description?: string
   iconName?: string
   imageUrl?: string
   categoryName?: string
   serviceName?: string
   isLoading?: boolean
}

export const JobRequestBanner = ({
   title,
   description,
   iconName,
   imageUrl,
   categoryName,
   serviceName,
   isLoading = false,
}: JobRequestBannerProps) => {
   const bannerImage = imageUrl || DEFAULT_BANNER_IMAGE
   const hasIcon = !!iconName

   return (
      <div
         className="relative min-h-64 md:min-h-80 bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: `url(${bannerImage})` }}
      >
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/50" />

         <div className="relative z-10 flex flex-col section-content py-6 md:py-8">
            <div className="max-md:hidden">
               <JobRequestBreadcrumb categoryName={categoryName} serviceName={serviceName} />
            </div>

            {isLoading ? (
               <div className="space-y-3 w-full mt-6 md:mt-10">
                  <Skeleton className="h-10 md:h-12 w-48 md:w-64 bg-white/20" />
                  {description && <Skeleton className="h-5 md:h-6 w-72 md:w-96 bg-white/20" />}
               </div>
            ) : (
               <div className="grid grid-cols-[auto_1fr] gap-x-4 md:gap-x-6 gap-y-3 md:gap-y-2 mt-6 md:mt-10">
                  {hasIcon && (
                     <div className="rounded-lg p-2.5 md:p-3 row-span-1 md:row-span-2 self-center bg-white/20 backdrop-blur-sm border border-white/30">
                        <DynamicIcon
                           className="h-7 w-7 md:h-8 md:w-8 text-white"
                           iconName={iconName}
                        />
                     </div>
                  )}

                  <h1 className="font-bold text-white! text-display-lg md:text-display-xl self-center">
                     {title}
                  </h1>

                  {description && (
                     <p className="col-start-1 md:col-start-2 col-span-2 md:col-span-1 text-white/90! text-body-lg md:text-body-xl">
                        {description}
                     </p>
                  )}
               </div>
            )}
         </div>
      </div>
   )
}
