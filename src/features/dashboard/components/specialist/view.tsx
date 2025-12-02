import { Link } from "@tanstack/react-router"
import { AlertCircle, ArrowRight, Briefcase, FileText, MessageSquare, Send } from "lucide-react"
import { BackendErrorFallback } from "@/shared/components/backend-error-fallback"
import { DashboardSkeleton } from "@/features/dashboard/components/specialist/dashboard-skeleton"
import { isEmpty } from "lodash"
import { Section } from "@/shared/components/section"
import { JobRequestCard } from "@/features/job-request/browse/shared/components/job-request-card"
import { EmptyState } from "@/shared/components/empty-state"
import { Button } from "@/shared/components/ui/button"
import { StatCard } from "./stat-card"
import { useAllConversationsQuery } from "@/features/dashboard/api/queries"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"

export const View = () => {
   const { data, isFetching, error, refetch } = useAllConversationsQuery()
   const user = useAuthStore(state => state.user)

   if (isFetching) {
      return <DashboardSkeleton />
   }

   if (error || !data) {
      return <BackendErrorFallback onRetry={refetch} isRetrying={isFetching} />
   }

   const hasSpecializations = !isEmpty(user?.authorities) //TODO: specializations
   const hasJobRequests = !isEmpty(data.recentJobRequests)

   return (
      <div className="space-y-6">
         <div className="px-6 pt-8">
            <h1 className="text-3xl font-bold mb-2">Panel specjalisty</h1>
            <p className="text-muted-foreground">Zarządzaj swoimi zleceniami i śledź statystyki</p>
         </div>

         {!hasSpecializations && (
            <div className="px-6">
               <EmptyState
                  icon={AlertCircle}
                  title="Uzupełnij swój profil"
                  description="Dodaj swoje specjalizacje, aby otrzymywać dopasowane zlecenia i budować swoją reputację na platformie."
               >
                  <Button asChild className="mt-4">
                     <Link to="/profil/edycja">Dodaj specjalizacje</Link>
                  </Button>
               </EmptyState>
            </div>
         )}

         {hasSpecializations && (
            <Section label="Twoje statystyki">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:px-6">
                  <StatCard
                     title="Złożone aplikacje"
                     value={data.statistics.totalApplications}
                     icon={Send}
                     iconColor="text-blue-600"
                     description="Liczba wysłanych ofert"
                  />
                  <StatCard
                     title="Aktywne konwersacje"
                     value={data.statistics.activeConversations}
                     icon={MessageSquare}
                     iconColor="text-green-600"
                     description="Trwające rozmowy z klientami"
                  />
                  <StatCard
                     title="Nieprzeczytane"
                     value={data?.statistics.unreadMessages}
                     icon={FileText}
                     iconColor="text-orange-600"
                     description="Nowe wiadomości od klientów"
                  />
               </div>
            </Section>
         )}

         {hasSpecializations && (
            <Section
               label={
                  <div className="flex items-center justify-between w-full">
                     <span>Najnowsze zlecenia</span>
                     {hasJobRequests && (
                        <Button variant="ghost" size="sm" asChild>
                           <Link to="/zlecenia" className="flex items-center gap-1">
                              Zobacz wszystkie
                              <ArrowRight className="h-4 w-4" />
                           </Link>
                        </Button>
                     )}
                  </div>
               }
            >
               {hasJobRequests ? (
                  <div className="space-y-3 md:px-6">
                     {data.recentJobRequests.map(jobRequest => (
                        <JobRequestCard key={jobRequest.id} job={jobRequest} />
                     ))}
                  </div>
               ) : (
                  <div className="md:px-6">
                     <EmptyState
                        icon={Briefcase}
                        title="Brak nowych zleceń"
                        description="Obecnie nie ma nowych zleceń w Twoich kategoriach. Sprawdź ponownie później lub przeglądaj wszystkie dostępne zlecenia."
                     >
                        <Button variant="outline" asChild className="mt-4">
                           <Link to="/zlecenia">Przeglądaj wszystkie zlecenia</Link>
                        </Button>
                     </EmptyState>
                  </div>
               )}
            </Section>
         )}
      </div>
   )
}
