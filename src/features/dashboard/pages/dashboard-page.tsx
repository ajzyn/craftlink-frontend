import { Card, CardContent } from "@/components/ui/card"
import { SelectService } from "@/features/dashboard/components/select-service.tsx"
import { CategoriesList } from "@/features/dashboard/components/categories-list.tsx"

const DashboardPage = () => {
   return (
      <section className="py-16 sm:py-24">
         <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
               <div className="text-center">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                     Znajdź zaufanych <span className="text-primary">specjalistów</span>
                     <br />
                     do dowolnej usługi
                  </h1>
                  <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
                     Połącz się ze zweryfikowanymi fachowcami w swojej okolicy. Otrzymaj oferty,
                     porównaj usługi i zatrudnij z pewnością – do potrzeb domowych i biznesowych.
                  </p>
               </div>

               <section className="max-w-5xl mx-auto">
                  <Card className="shadow-xl">
                     <CardContent className="p-6 sm:p-8">
                        <SelectService />
                        <CategoriesList />
                     </CardContent>
                  </Card>
               </section>
            </div>
         </div>
      </section>
   )
}

export default DashboardPage
