import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { useAllServiceCategoriesQuery } from "@/features/service-request/api/service-request-queries.ts"
import { MapPin, Search, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { data } = useAllServiceCategoriesQuery()

  return (
    <section className="bg-gradient-to-br from-blue-50 via-background to-teal-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Znajdź zaufanych <span className="text-primary">specjalistów</span>
            <br />
            do dowolnej usługi
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Połącz się ze zweryfikowanymi fachowcami w swojej okolicy. Otrzymaj oferty, porównaj
            usługi i zatrudnij z pewnością – do potrzeb domowych i biznesowych.
          </p>

          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl">
              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6 relative">
                    <label className="block text-sm font-medium text-foreground mb-2 text-left">
                      Jakiej usługi potrzebujesz?
                    </label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="np. Sprzątanie, Hydraulik..."
                        value={searchQuery}
                        onChange={e => {
                          setSearchQuery(e.target.value)
                          setShowSuggestions(true)
                        }}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        className="pl-12 h-12"
                      />

                      {/*{showSuggestions && searchQuery && filteredCategories.length > 0 && (*/}
                      {/*  <Card className="absolute top-full left-0 right-0 mt-2 z-10 max-h-60 overflow-y-auto">*/}
                      {/*    <CardContent className="p-0">*/}
                      {/*      {data?.map(category => (*/}
                      {/*        <button*/}
                      {/*          key={category}*/}
                      {/*          onClick={() => {*/}
                      {/*            setSearchQuery(category)*/}
                      {/*            setShowSuggestions(false)*/}
                      {/*          }}*/}
                      {/*          className="w-full text-left px-4 py-3 hover:bg-accent transition-colors first:rounded-t-lg last:rounded-b-lg"*/}
                      {/*        >*/}
                      {/*          {category}*/}
                      {/*        </button>*/}
                      {/*      ))}*/}
                      {/*    </CardContent>*/}
                      {/*  </Card>*/}
                      {/*)}*/}
                    </div>
                  </div>

                  <div className="md:col-span-4">
                    <label className="block text-sm font-medium text-foreground mb-2 text-left">
                      Gdzie?
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="Wpisz lokalizację"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        className="pl-12 h-12"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-transparent mb-2">
                      Szukaj
                    </label>
                    <Button className="w-full h-12 font-semibold">Szukaj</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm">Średnia ocena 4.9/5</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-foreground">50 000+</span> zrealizowanych zleceń
            </div>
            <div className="text-sm">
              <span className="font-semibold text-foreground">10 000+</span> zweryfikowanych
              specjalistów
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
