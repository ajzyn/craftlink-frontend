import { ServiceSelect } from "@/features/dashboard/components/client/service-select"
import { CategoryList } from "@/features/dashboard/components/client/category-list"
import { Section } from "@/shared/components/section"
import { Button } from "@/shared/components/ui/button"
import { Link } from "@tanstack/react-router"
import { ChevronRight } from "lucide-react"

export const View = () => {
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
            <Section className="px-0 bg-transparent backdrop-blur-none">
               <div className="p-6 sm:p-8">
                  <ServiceSelect />

                  <CategoryList />

                  <div className="mt-8 w-full flex justify-end">
                     <Button
                        variant="ghost"
                        className="sm:w-auto flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/10"
                     >
                        <Link
                           to="/zlecenia/nowe"
                           className="flex items-center gap-2 no-underline text-primary"
                        >
                           Zobacz wszystkie kategorie
                           <ChevronRight className="h-4 w-4" />
                        </Link>
                     </Button>
                  </div>
               </div>
            </Section>
         </section>
      </>
   )
}
