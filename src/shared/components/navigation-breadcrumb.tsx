import { ChevronRight, Home } from "lucide-react"
import { Link } from "@tanstack/react-router"

export interface BreadcrumbItem {
   label: string
   href?: string
   current?: boolean
}

interface NavigationBreadcrumbProps {
   items: BreadcrumbItem[]
}

export const NavigationBreadcrumb = ({ items }: NavigationBreadcrumbProps) => {
   return (
      <nav className="flex items-center gap-2 text-sm text-white">
         <Link to="/">
            <Home className="h-5 w-5 hover:text-white/65" />
         </Link>

         {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
               <ChevronRight className="h-4 w-4" />
               {item.current ? (
                  <span className="font-medium">{item.label}</span>
               ) : (
                  <Link className="hover:text-white/65" to={item.href!}>
                     {item.label}
                  </Link>
               )}
            </div>
         ))}
      </nav>
   )
}
