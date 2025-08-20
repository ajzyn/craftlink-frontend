import type { AutocompleteOption } from "@/shared/components/autocomplete/types/autocomplete-option"

export const defaultGetOptionKey = <T extends AutocompleteOption | string>(option: T): string =>
   typeof option === "string" ? option : (option.id ?? option.name)
