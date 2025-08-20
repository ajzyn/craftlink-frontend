import { useState } from "react"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { DeviceType } from "@/shared/types/device"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface AuthFormProps {
   defaultMode: "login" | "register"
   variant: DeviceType
}

export const AuthForm = ({ defaultMode = "login", variant = DeviceType.MOBILE }: AuthFormProps) => {
   const [isLogin, setIsLogin] = useState(defaultMode === "login")

   const toggleMode = () => {
      setIsLogin(!isLogin)
   }

   return (
      <div className={`space-y-6 ${variant === DeviceType.MOBILE ? "p-6" : ""}`}>
         {/* Header */}
         <div className="text-center space-y-2">
            <h2 className={`font-bold ${variant === DeviceType.MOBILE ? "text-2xl" : "text-xl"}`}>
               {isLogin ? "Zaloguj się" : "Zarejestruj się"}
            </h2>
            <p className="text-sm text-muted-foreground">
               {isLogin
                  ? "Wprowadź swoje dane logowania aby kontynuować"
                  : "Wypełnij poniższe pola aby założyć konto"}
            </p>
         </div>

         <div>{isLogin ? <LoginForm /> : <RegisterForm />}</div>

         <div className="space-y-4">
            <Separator />
            <div className="text-center">
               <Button
                  variant="ghost"
                  onClick={toggleMode}
                  className="text-sm text-muted-foreground hover:text-primary"
               >
                  {isLogin ? "Nie masz konta? Zarejestruj się" : "Masz już konto? Zaloguj się"}
               </Button>
            </div>
         </div>
      </div>
   )
}
