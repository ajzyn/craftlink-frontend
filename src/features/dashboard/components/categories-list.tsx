import { useAllCategoriesQuery } from "@/features/categories/api/category-queries.ts"
import { DynamicIcon } from "@/shared/components/dynamic-icon.tsx"

export const CategoriesList = () => {
  const { data: categories } = useAllCategoriesQuery()

  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {categories?.map(category => (
          <button
            key={category.id}
            className="flex items-center space-x-4 p-3 cursor-pointer text-left group transition-colors duration-200 hover:bg-[--color-muted]"
          >
            <div className="flex-shrink-0">
              <DynamicIcon
                iconName={category.iconName}
                className="w-6 h-6 text-label group-hover:text-secondary transition-colors duration-200"
              />
            </div>
            <span className="text-primary hover:text-primary-hover transition-colors duration-200">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
