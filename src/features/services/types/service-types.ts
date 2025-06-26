import type { CategorySummaryDto } from "@/features/categories/types/category-types.ts"

export interface ServiceDto {
  id: number
  name: string
  description: string
  slug: string
  serviceRequests: Record<string, any>
  category: CategorySummaryDto
}
