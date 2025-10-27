import { AuthLayout } from "@/features/auth/layouts/auth-layout"
import { LoginForm } from "@/features/auth/components/login-form"

const LoginPage = () => {
   return (
      <AuthLayout title="Zaloguj sie" description="Wprowadź swoje dane logowania aby kontynuować">
         <LoginForm />
      </AuthLayout>
   )
}

export default LoginPage
