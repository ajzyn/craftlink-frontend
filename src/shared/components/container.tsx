export const Container = ({
   children,
   className = "",
   ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
   return (
      <div className={`my-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ${className}`} {...props}>
         {children}
      </div>
   )
}
