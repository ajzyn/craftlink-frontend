import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { cn } from "@/lib/utils"

interface ErrorStateProps {
   title?: string
   description?: string
   onRetry?: VoidFunction
   retryText?: string
   isRetrying?: boolean
   size?: "sm" | "md" | "lg"
   className?: string
}

const sizeVariants = {
   sm: {
      container: "py-8",
      title: "text-heading-lg",
      description: "text-body-sm",
      button: "px-3 py-1.5 text-body-sm",
   },
   md: {
      container: "py-12",
      title: "text-heading-xl",
      description: "text-body-sm",
      button: "px-4 py-2 text-body-sm",
   },
   lg: {
      container: "py-16",
      title: "text-heading-2xl",
      description: "text-body",
      button: "px-6 py-3 text-body",
   },
} as const

export const BackendErrorFallback = ({
   title = "Nie można załadować danych",
   description = "Sprawdź połączenie internetowe i spróbuj ponownie",
   onRetry,
   retryText = "Spróbuj ponownie",
   size = "md",
   className = "",
   isRetrying,
}: ErrorStateProps) => {
   const sizes = sizeVariants[size]
   const iconSizeClass = size === "lg" ? "h-8 w-8" : size === "sm" ? "h-5 w-5" : "h-6 w-6"

   return (
      <div
         className={cn(
            sizes.container,
            className,
            "flex flex-col items-center justify-center text-center",
         )}
      >
         <div className="text-primary mb-4">
            <AlertTriangle className={iconSizeClass} />
         </div>
         <h3 className={cn(sizes.title, "text-gray-900 font-semibold mb-2")}>{title}</h3>
         <p className={cn(sizes.description, "text-gray-600 mb-6 max-w-md")}>{description}</p>
         {onRetry && (
            <Button
               onClick={onRetry}
               disabled={isRetrying}
               className={cn(sizes.button, "text-white inline-flex items-center")}
            >
               {isRetrying ? (
                  <>
                     <RefreshCw className="h-4 w-4 animate-spin" />
                     Ładowanie...
                  </>
               ) : (
                  <>
                     <RefreshCw className="h-4 w-4" />
                     {retryText}
                  </>
               )}
            </Button>
         )}
      </div>
   )
}
