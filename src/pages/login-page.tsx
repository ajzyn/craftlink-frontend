import { useEffect, useState } from "react"
import { useRouter } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/features/auth/stores/auth-store.ts"
import { AuthLayout } from "@/features/auth/components/auth-layout.tsx"
import { LoginForm } from "@/features/auth/components/login-form.tsx"
import { RegisterForm } from "@/features/auth/components/register-form.tsx"

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.navigate({ to: "/home" })
    }
  }, [isAuthenticated, router])

  return (
    <AuthLayout
      title={isLogin ? "Zaloguj się" : "Zarejestruj się"}
      subtitle={
        isLogin
          ? "Wprowadź swoje dane logowania aby kontynuować"
          : "Wypełnij poniższe pola aby założyć konto"
      }
    >
      {isLogin ? <LoginForm /> : <RegisterForm />}

      <div className="space-y-4">
        <Separator />

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            {isLogin ? "Nie masz konta? Zarejestruj się" : "Masz już konto? Zaloguj się"}
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}

export default LoginPage
