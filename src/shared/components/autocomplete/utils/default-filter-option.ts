import type { AutocompleteOption } from "@/shared/components/autocomplete/types/autocomplete-option.ts"

export const defaultFilterOption = <T extends AutocompleteOption | string>(
   option: T,
   inputValue: string,
): boolean =>
   typeof option === "string"
      ? option.toLowerCase().includes(inputValue.toLowerCase())
      : option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        (!!option.slug && option.slug.toLowerCase().includes(inputValue.toLowerCase()))
