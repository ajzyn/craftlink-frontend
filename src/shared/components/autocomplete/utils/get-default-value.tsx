import type { AutocompleteOption } from "@/shared/components/autocomplete/types/autocomplete-option"

export const defaultGetOptionValue = <T extends AutocompleteOption>(option: T): string | number =>
   option.id
