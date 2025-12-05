export enum DeadlineUrgencyFilter {
   URGENT = "URGENT",
   THIS_WEEK = "THIS_WEEK",
   THIS_MONTH = "THIS_MONTH",
   FLEXIBLE = "FLEXIBLE",
   CUSTOM = "CUSTOM",
}

export const DEADLINE_URGENCY_LABELS: Record<DeadlineUrgencyFilter, string> = {
   [DeadlineUrgencyFilter.URGENT]: "Pilne (do 7 dni)",
   [DeadlineUrgencyFilter.THIS_WEEK]: "W tym tygodniu",
   [DeadlineUrgencyFilter.THIS_MONTH]: "W tym miesiącu",
   [DeadlineUrgencyFilter.FLEXIBLE]: "Do ustalenia",
   [DeadlineUrgencyFilter.CUSTOM]: "Własny zakres dat",
}

export interface AllJobRequestSearchParams {
   matching?: boolean
   city?: string
   district?: string
   deadlineUrgency?: DeadlineUrgencyFilter
   deadlineFrom?: string
   deadlineTo?: string
}
