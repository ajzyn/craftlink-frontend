import { AuthLayout } from "@/features/auth/layouts/auth-layout"
import { UserType } from "@/features/auth/types/auth-types"
import { RegisterForm } from "@/features/auth/components/register-form"

const RegisterSpecialistPage = () => {
   return (
      <AuthLayout
         title="Zarejestruj się"
         description="Wypełnij poniższe pola aby założyć konto"
         variant="page"
      >
         <RegisterForm userType={UserType.SPECIALIST} />
      </AuthLayout>
   )
}

export default RegisterSpecialistPage
