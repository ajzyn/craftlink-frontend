import { Card, CardContent } from "@/shared/components/ui/card"
import { ServiceSelect } from "@/features/dashboard/components/client/service-select"
import { CategoryList } from "@/features/dashboard/components/client/category-list"
import { Button } from "@/shared/components/ui/button"
import { useNavigate } from "@tanstack/react-router"

export const View = () => {
   const navigate = useNavigate()

   //TODO: cTA

   return (
      <>
         <div className="text-center">
            <h1 className="text-display-lg sm:text-display-xl lg:text-display-2xl text-foreground mb-6">
               Znajdź zaufanych <span className="text-primary">specjalistów</span>
               <br />
               do dowolnej usługi
            </h1>
            <p className="text-body-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
               Połącz się ze zweryfikowanymi fachowcami w swojej okolicy. Otrzymaj oferty, porównaj
               usługi i zatrudnij z pewnością – do potrzeb domowych i biznesowych.
            </p>
         </div>

         <section className="max-w-5xl mx-auto">
            <Card className="shadow-xl">
               <CardContent className="p-6 sm:p-8">
                  <ServiceSelect />
                  <CategoryList />

                  <div className="mt-8 text-center">
                     <Button
                        variant="outline"
                        onClick={() => navigate({ to: "/zlecenia/nowe" })}
                        className="w-full sm:w-auto"
                     >
                        Zobacz wszystkie kategorie
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </section>
      </>
   )
}
