import { getFormattedDateTime } from "@/shared/utils/date"

interface CreationDateProps {
   createdAt: string
}

export const CreationDateValue = ({ createdAt }: CreationDateProps) => {
   return (
      <p className="text-foreground-muted text-sm">
         Data stworzenia <span>{getFormattedDateTime(createdAt)}</span>
      </p>
   )
}
