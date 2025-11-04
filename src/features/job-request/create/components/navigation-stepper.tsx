import { Button } from "@/shared/ui/button"

interface ServiceRequestNavigationProps {
   isFirst: boolean
   isLast: boolean
   onBack: VoidFunction
   onNext: (e: React.MouseEvent) => void
   onRequestSubmitStart: VoidFunction
   isCreatingJobRequest: boolean
}

export const NavigationStepper = ({
   isFirst,
   isLast,
   onBack,
   onNext,
   onRequestSubmitStart,
   isCreatingJobRequest,
}: ServiceRequestNavigationProps) => (
   <>
      {!isFirst && (
         <Button
            disabled={isCreatingJobRequest}
            type="button"
            onClick={onBack}
            variant="secondary"
            className="cursor-pointer"
         >
            Wstecz
         </Button>
      )}
      {isLast ? (
         <Button
            disabled={isCreatingJobRequest}
            onClick={onRequestSubmitStart}
            type="button"
            className="cursor-pointer"
         >
            Dodaj ogłoszenie
         </Button>
      ) : (
         <Button type="button" onClick={onNext} className="cursor-pointer">
            Dalej
         </Button>
      )}
   </>
)
