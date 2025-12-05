import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { UserType } from "@/features/auth/api/types"
import { View as SpecialistView } from "../components/specialist/view"
import { View as ClientView } from "@/features/dashboard/components/client/view"

const DashboardPage = () => {
   const user = useAuthStore(state => state.user)

   return (
      <div className="py-14 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
         {user?.userType === UserType.SPECIALIST ? <SpecialistView /> : <ClientView />}
      </div>
   )
}

export default DashboardPage
