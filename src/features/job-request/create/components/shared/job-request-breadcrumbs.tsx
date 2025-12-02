import {
   type BreadcrumbItem,
   NavigationBreadcrumb,
} from "@/shared/components/navigation-breadcrumb"
import { useParams } from "@tanstack/react-router"

interface JobRequestBreadcrumbProps {
   categoryName?: string
   serviceName?: string
}

export const JobRequestBreadcrumb = ({ categoryName, serviceName }: JobRequestBreadcrumbProps) => {
   const params = useParams({ strict: false })

   const breadcrumbs: BreadcrumbItem[] = [{ label: "Nowe zlecenie", href: "/zlecenia/nowe" }]

   if (categoryName) {
      breadcrumbs.push({
         label: categoryName,
         href: serviceName ? `/zlecenia/nowe/${params.categorySlug}` : undefined,
         current: !serviceName,
      })
   }

   if (serviceName) {
      breadcrumbs.push({
         label: serviceName,
         current: true,
      })
   }

   return <NavigationBreadcrumb items={breadcrumbs} />
}
