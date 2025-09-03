import { useState } from "react"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { DeviceType } from "@/shared/types/device-types"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface AuthFormProps {
   variant: DeviceType
   handleClose?: VoidFunction
}

export const AuthView = ({ variant = DeviceType.MOBILE, handleClose }: AuthFormProps) => {
   const [isLogin, setIsLogin] = useState(true)

   const toggleMode = () => {
      setIsLogin(!isLogin)
   }

   return (
      <div className={`space-y-6 ${variant === DeviceType.MOBILE ? "p-6" : ""}`}>
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

         <div>
            {isLogin ? (
               <LoginForm handleClose={handleClose} />
            ) : (
               <RegisterForm handleClose={handleClose} />
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
                  {isLogin ? "Nie masz konta? Zarejestruj się" : "Masz już konto? Zaloguj się"}
               </Button>
            </div>
         </div>
      </div>
   )
}
