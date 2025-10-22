import { DeviceType } from "@/shared/types/device-types"
import { AuthLayout } from "@/features/auth/layouts/auth-layout"
import { useNavigate, useParams } from "@tanstack/react-router"
import { UserType } from "@/features/auth/types/auth-types"
import { RegisterForm } from "@/features/auth/components/register-form"

const RegisterPage = () => {
   const navigate = useNavigate()
   const { userType } = useParams({ from: "/register/$userType" }) as {
      userType: UserType
   }

   const navigateToLoginPage = () => {
      navigate({ to: "/login" })
   }

   return (
      <AuthLayout
         title="Zarejestruj się"
         description="Wypełnij poniższe pola aby założyć konto"
         toggleLabel="Masz już konto? Zaloguj się"
         variant={DeviceType.MOBILE}
         onToggleMode={navigateToLoginPage}
      >
         <RegisterForm userType={userType} />
      </AuthLayout>
   )
}

export default RegisterPage
