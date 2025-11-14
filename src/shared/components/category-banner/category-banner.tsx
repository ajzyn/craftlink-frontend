import { Button } from "@/shared/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { DynamicIcon } from "@/shared/components/dynamic-icon"
import { useRouter } from "@tanstack/react-router"
import { CategoryBannerSkeleton } from "@/shared/components/category-banner/category-banner-skeleton"

interface CategoryBannerProps {
   name?: string
   iconName?: string
   description?: string | null
   imageUrl?: string
   isLoading: boolean
   showDescription?: boolean
}

export const CategoryBanner = ({
   name,
   iconName,
   description,
   imageUrl,
   isLoading,
   showDescription = true,
}: CategoryBannerProps) => {
   const router = useRouter()

   const handleGoBack = () => {
      router.navigate({ to: "/" })
   }

   return (
      <div
         className="relative h-80 bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: `url(${imageUrl})` }}
      >
         <div className="overlay"></div>
         <div className="relative z-10 h-full flex flex-col section-content">
            <div className="mt-6">
               <Button
                  onClick={handleGoBack}
                  variant="ghost"
                  className="group text-white hover:bg-transparent hover:text-white hover:opacity-80"
               >
                  <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                  Go back to dashboard
               </Button>
            </div>
            <div className="mt-10 flex gap-3 items-center">
               {isLoading ? (
                  <CategoryBannerSkeleton showDescription={showDescription} />
               ) : (
                  <>
                     <span className="bg-white/30 rounded-lg p-3">
                        <DynamicIcon className="text-white h-8 w-8" iconName={iconName} />
                     </span>
                     <div>
                        <h1 className="text-white text-display-xl">{name}</h1>
                        {showDescription && (
                           <h4 className="text-white text-body-xl">{description}</h4>
                        )}
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>
   )
}
