import type { ReactNode } from "react"

interface AuthLayoutProps {
   title: string
   variant: "modal" | "page"
   description: string
   children: ReactNode
}

export const AuthLayout = ({ title, variant, description, children }: AuthLayoutProps) => {
   const content = (
      <div className="space-y-6 p-6">
         <div className="text-center space-y-2">
            <h2 className="font-bold text-2xl">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
         </div>
         <div>{children}</div>
      </div>
   )

   return variant === "modal" ? content : <div className="max-w-xl m-auto mt-16">{content}</div>
}
