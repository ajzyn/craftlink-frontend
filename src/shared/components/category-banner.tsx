import { Button } from "@/components/ui/button.tsx"
import { ArrowLeft } from "lucide-react"
import { DynamicIcon } from "@/shared/components/dynamic-icon.tsx"
import { useRouter } from "@tanstack/react-router"
import { Skeleton } from "@/components/ui/skeleton.tsx"

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

   const renderName = () => {
      if (isLoading) {
         return <Skeleton className="h-[2.5rem] w-2/3 rounded-md" />
      }

      return <p className="text-white text-display-xl">{name}</p>
   }

   const renderDescription = () => {
      if (!showDescription) return null

      if (isLoading) {
         return <Skeleton className="h-[1.75rem] w-full rounded-md mt-2" />
      }

      if (description) {
         return <p className="text-white text-body-xl">{description}</p>
      }

      return null
   }

   const renderIcon = () => {
      if (isLoading) {
         return (
            <span className="bg-white/30 rounded-lg p-3">
               <Skeleton className="h-8 w-8 rounded" />
            </span>
         )
      }

      return (
         <span className="bg-white/30 rounded-lg p-3">
            <DynamicIcon className="text-white h-8 w-8" iconName={iconName} />
         </span>
      )
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
               {renderIcon()}
               <div>
                  {renderName()}
                  {renderDescription()}
               </div>
            </div>
         </div>
      </div>
   )
}
