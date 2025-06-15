import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAllCategoriesQuery } from "@/features/categories/api/category-queries.ts"

const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { data } = useAllCategoriesQuery()

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
                  <div className="md:col-span-9 relative">
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
                        className="pl-12 h-16"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-transparent mb-2">
                      Szukaj
                    </label>
                    <Button className="w-full text-lg h-16 !text-secondary">Szukaj</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
