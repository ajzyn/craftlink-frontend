import type { CategoryBasicDto } from "@/features/categories/types/category-types"

export interface ServiceBasicDto {
   id: number
   name: string
   slug: string
}

export interface ServiceDetailsDto extends ServiceBasicDto {
   description: string
   category: ServiceCategoryDto
}

export interface ServiceCategoryDto extends CategoryBasicDto {
   imageKey: string
   description: string
}
