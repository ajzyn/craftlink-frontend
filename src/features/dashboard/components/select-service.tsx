import { Search } from "lucide-react"
import { FormAutocomplete } from "@/shared/components/autocomplete/autocomplete.tsx"

export const SelectService = () => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <FormAutocomplete placeholder="Wyszukaj usługę którą potrzebujesz..." />
    </div>
  )
}
