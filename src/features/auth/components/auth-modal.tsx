import { DeviceType } from "@/shared/types/device-types"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { useEffect, useState } from "react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { AuthLayout } from "@/features/auth/layouts/auth-layout"
import { LoginForm } from "@/features/auth/components/login-form"
import { RegisterForm } from "@/features/auth/components/register-form"
import { UserType } from "@/features/auth/types/auth-types"

interface AuthModalProps {
   isOpen: boolean
   onClose: VoidFunction
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
   const { user } = useAuthStore()
   const [isLogin, setIsLogin] = useState(true)

   useEffect(() => {
      if (user) onClose()
   }, [onClose, user])

   const toggleMode = () => {
      setIsLogin(!isLogin)
   }

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-md">
            <VisuallyHidden>
               <DialogTitle></DialogTitle>
               <DialogDescription></DialogDescription>
            </VisuallyHidden>
            <AuthLayout
               title={isLogin ? "Zaloguj się" : "Zarejestruj się"}
               description={
                  isLogin
                     ? "Wprowadź swoje dane logowania aby kontynuować"
                     : "Wypełnij poniższe pola aby założyć konto"
               }
               toggleLabel={
                  isLogin ? "Nie masz konta? Zarejestruj się" : "Masz już konto? Zaloguj się"
               }
               variant={DeviceType.DESKTOP}
               onToggleMode={toggleMode}
            >
               {isLogin ? (
                  <LoginForm onClose={onClose} />
               ) : (
                  <RegisterForm userType={UserType.CLIENT} onClose={onClose} />
               )}
            </AuthLayout>
         </DialogContent>
      </Dialog>
   )
}
