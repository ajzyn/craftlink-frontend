import { getDateTime } from "@/features/job-request/shared/utils/date"

interface CreationDateProps {
   createdAt: string
}

export const CreationDate = ({ createdAt }: CreationDateProps) => {
   return (
      <p className="text-foreground-muted text-sm">
         Data stworzenia <span>{getDateTime(createdAt)}</span>
      </p>
   )
}
