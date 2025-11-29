import { getFormattedDateTime } from "@/shared/utils/date-utils"

interface CreationDateProps {
   createdAt: string
}

export const CreationDateValue = ({ createdAt }: CreationDateProps) => {
   return (
      <p className="flex flex-col text-foreground-muted text-sm">
         <span className="text-xs text-end">Data stworzenia</span>{" "}
         <span>{getFormattedDateTime(createdAt)}</span>
      </p>
   )
}
