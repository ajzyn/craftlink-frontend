import type { ServiceCategoryRequestDto } from "@/features/categories/types/category.ts"

export const categoryRequestQueryKeys = {
  all: ["category", "all"],
  detail: (id: string) => ["category", "detail", id],
  fliters: (filters: ServiceCategoryRequestDto) => ["category", "list", filters],
}
