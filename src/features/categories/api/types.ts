import type { ServiceBasicDto } from "@/entities/service/types"
import type { CategoryBasicDto } from "@/entities/category/types"

export interface CategoryServiceDto extends Omit<ServiceBasicDto, "category"> {}

export interface CategoryDetailsDto extends CategoryBasicDto {
   description: string
   imageKey: string
   services: CategoryServiceDto[]
}
