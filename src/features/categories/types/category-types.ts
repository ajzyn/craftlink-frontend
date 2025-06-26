import type { ServiceDto } from "@/features/services/types/service-types.ts"

export interface CategorySummaryDto {
  id: number
  slug: string
  iconName: string
  name: string
}

export interface CategoryDetailsDto {
  id: number
  slug: string
  iconName: string
  description: string
  name: string
  services: CategoryServiceDto[]
  imageKey: string
}

export interface CategoryServiceDto extends Omit<ServiceDto, "category"> {}
