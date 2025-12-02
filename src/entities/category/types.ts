import type { ServiceBasicDto } from "@/entities/service"

export interface CategoryBasicDto {
   id: number
   slug: string
   iconName: string
   name: string
}

export interface CategoryServiceDto extends Omit<ServiceBasicDto, "category"> {}

export interface CategoryDetailsDto extends CategoryBasicDto {
   description: string
   imageKey: string
   services: CategoryServiceDto[]
}
