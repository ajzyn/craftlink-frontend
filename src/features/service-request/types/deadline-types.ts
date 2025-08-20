export enum DeadlineType {
   ASAP = "ASAP",
   WITHIN_5_DAYS = "WITHIN_5_DAYS",
   WITHIN_2_WEEKS = "WITHIN_2_WEEKS",
   EXACT_DATE = "EXACT_DATE",
   ADJUST = "ADJUST",
}

export const deadlineLabels: Record<DeadlineType, string> = {
   [DeadlineType.ASAP]: "Jak najszybciej",
   [DeadlineType.WITHIN_5_DAYS]: "W ciągu kilku dni",
   [DeadlineType.WITHIN_2_WEEKS]: "W ciągu 2 tygodni",
   [DeadlineType.ADJUST]: "Dostosuję się do serwisanta",
   [DeadlineType.EXACT_DATE]: "Dokładna data",
}
