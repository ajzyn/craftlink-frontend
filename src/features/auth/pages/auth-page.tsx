import { AuthView } from "@/features/auth/components/auth-view"
import { DeviceType } from "@/shared/types/device-types"

const AuthPage = () => {
   return (
      <div className="max-w-xl m-auto mt-10 rounded-lg bg-background">
         <AuthView variant={DeviceType.MOBILE} />
      </div>
   )
}

export default AuthPage
