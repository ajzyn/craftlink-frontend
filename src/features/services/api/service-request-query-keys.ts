export const categoryRequestQueryKeys = {
   all: ["service", "all"],
   detail: (slug: string) => ["service", "detail", slug],
   // fliters: (filters: ServiceCategoryRequestDto) => ["service", "list", filters],
}
