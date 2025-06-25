import type { AutocompleteOption } from "@/shared/components/autocomplete/types/autocomplete-option.ts"

export const defaultFilterOption = <T extends AutocompleteOption>(
  option: T,
  inputValue: string,
): boolean =>
  option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
  (!!option.slug && option.slug.toLowerCase().includes(inputValue.toLowerCase()))
