import dayjs from "dayjs"
import "dayjs/locale/pl"

dayjs.locale("pl")

export const getDateTime = (date?: string | null) => {
   if (!date) return "-"
   const parsed = dayjs(date)
   return parsed.isValid() ? parsed.format("D.MM.YYYY, HH:mm") : "-"
}

export const getDate = (date?: string | null) => {
   if (!date) return "-"
   const parsed = dayjs(date)
   return parsed.isValid() ? parsed.format("DD MMM YYYY") : "-"
}
