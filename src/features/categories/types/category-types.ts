import type { ServiceBasicDto } from "@/features/services/types/service-types.ts"

export interface CategoryBasicDto {
   id: number
   slug: string
   iconName: string
   name: string
}

export interface CategoryDetailsDto extends CategoryBasicDto {
   description: string
   imageKey: string
   services: CategoryServiceDto[]
}

export interface CategoryServiceDto extends Omit<ServiceBasicDto, "category"> {}
