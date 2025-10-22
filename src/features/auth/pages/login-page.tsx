import { DeviceType } from "@/shared/types/device-types"
import { AuthLayout } from "@/features/auth/layouts/auth-layout"
import { useNavigate } from "@tanstack/react-router"
import { LoginForm } from "@/features/auth/components/login-form"
import { UserType } from "@/features/auth/types/auth-types"

const LoginPage = () => {
   const navigate = useNavigate()

   const navigateToRegisterPage = () => {
      navigate({ to: `/register/${UserType.CLIENT}` })
   }

   return (
      <AuthLayout
         title="Zaloguj sie"
         variant={DeviceType.MOBILE}
         description="Wprowadź swoje dane logowania aby kontynuować"
         toggleLabel="Nie masz konta? Zarejestruj się"
         onToggleMode={navigateToRegisterPage}
      >
         <LoginForm />
      </AuthLayout>
   )
}

export default LoginPage
