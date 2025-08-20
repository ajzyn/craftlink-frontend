import type { AutocompleteOption } from "@/components/autocomplete/types/autocomplete-option"

export const defaultGetOptionLabel = <T extends AutocompleteOption | string>(option: T): string =>
   typeof option === "string" ? option : option.name
