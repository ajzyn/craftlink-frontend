import dayjs from "dayjs"
import "dayjs/locale/pl"

dayjs.locale("pl")

export const getFormattedDateTime = (date?: string | null) => {
   if (!date) return "-"
   const parsed = dayjs(date)
   return parsed.isValid() ? parsed.format("D.MM.YYYY, HH:mm") : "-"
}

export const getFormattedDate = (date?: string | null) => {
   if (!date) return "-"
   const parsed = dayjs(date)
   return parsed.isValid() ? parsed.format("DD MMM YYYY") : "-"
}

export const getBackendCompatibleDate = (date: Date): string => {
   return dayjs(date).format("YYYY-MM-DD")
}
