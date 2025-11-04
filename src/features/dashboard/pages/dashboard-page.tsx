import { Card, CardContent } from "@/shared/ui/card"
import { ServiceSelect } from "@/features/dashboard/components/service-select"
import { CategoryList } from "@/features/dashboard/components/category-list"

const DashboardPage = () => {
   return (
      <section className="py-14">
         <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
               <div className="text-center">
                  <h1 className="text-display-lg sm:text-display-xl lg:text-display-2xl text-foreground mb-6">
                     Znajdź zaufanych <span className="text-primary">specjalistów</span>
                     <br />
                     do dowolnej usługi
                  </h1>
                  <p className="text-body-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
                     Połącz się ze zweryfikowanymi fachowcami w swojej okolicy. Otrzymaj oferty,
                     porównaj usługi i zatrudnij z pewnością – do potrzeb domowych i biznesowych.
                  </p>
               </div>

               <section className="max-w-5xl mx-auto">
                  <Card className="shadow-xl">
                     <CardContent className="p-6 sm:p-8">
                        <ServiceSelect />
                        <CategoryList />
                     </CardContent>
                  </Card>
               </section>
            </div>
         </div>
      </section>
   )
}

export default DashboardPage
