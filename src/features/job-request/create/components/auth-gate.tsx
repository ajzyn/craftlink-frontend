import { useState } from "react"
import { LoginForm } from "@/features/auth/components/login-form"
import { RegisterForm } from "@/features/auth/components/register-form"
import { UserType } from "@/features/auth/api/types"
import { Separator } from "@/shared/components/ui/separator"
import { Button } from "@/shared/components/ui/button"

export const AuthGate = ({ onSuccessAuth }: { onSuccessAuth: VoidFunction }) => {
   const [isLoginMode, setIsLoginMode] = useState(false)

   const toggleMode = () => {
      setIsLoginMode(prev => !prev)
   }

   //TODO: zostawic tu czy zrobic w stepie
   return (
      <>
         <div className="mx-6">
            {isLoginMode ? (
               <LoginForm onSuccess={onSuccessAuth} />
            ) : (
               <RegisterForm onSuccess={onSuccessAuth} userType={UserType.CLIENT} />
            )}
         </div>
         <div className="space-y-4">
            <Separator />
            <div className="text-center">
               <Button
                  variant="ghost"
                  onClick={toggleMode}
                  className="text-sm text-muted-foreground hover:text-primary"
               >
                  {isLoginMode ? "Nie masz konta? Zarejestruj się" : "Masz już konto? Zaloguj się"}
               </Button>
            </div>
         </div>
      </>
   )
}
