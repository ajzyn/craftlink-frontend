import { Button } from "@/components/ui/button"

interface ServiceRequestNavigationProps {
   isFirst: boolean
   isLast: boolean
   onBack: VoidFunction
   onNext: (e: React.MouseEvent) => void
   formId: string
}

export const ServiceRequestNavigation = ({
   isFirst,
   isLast,
   onBack,
   onNext,
   formId,
}: ServiceRequestNavigationProps) => (
   <>
      {!isFirst && (
         <Button
            key="back"
            type="button"
            onClick={onBack}
            variant="secondary"
            className="cursor-pointer"
         >
            Wstecz
         </Button>
      )}
      {isLast ? (
         <Button key="submit" type="submit" form={formId} className="cursor-pointer">
            Dodaj ogłoszenie
         </Button>
      ) : (
         <Button key="next" type="button" onClick={onNext} className="cursor-pointer">
            Dalej
         </Button>
      )}
   </>
)
