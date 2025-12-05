import type { CategoryBasicDto } from "@/entities/category"
import type { ComboboxOption } from "@/shared/components/autocomplete/combobox"

export interface ServiceBasicDto {
   id: number
   name: string
   slug: string
}

export interface ServiceSearchResultDto {
   id: number
   name: string
   slug: string
   categorySlug: string
}

export interface ServiceDetailsDto extends ServiceBasicDto {
   description: string
   category: ServiceCategoryDto
}

export interface ServiceCategoryDto extends CategoryBasicDto {
   imageKey: string
   description: string
}

export interface ServiceSearchComboboxOption extends ComboboxOption {
   categorySlug: string
}
