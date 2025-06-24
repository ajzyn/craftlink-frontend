export interface CategorySummaryDto {
  id: number
  slug: string
  iconName: string
  name: string
}

export interface ServiceCategoryRequestDto {
  searchPhrase: string
}
