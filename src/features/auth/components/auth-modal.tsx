import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { useEffect } from "react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { AuthLayout } from "@/features/auth/components/auth-layout"
import { LoginForm } from "@/features/auth/components/login-form"

interface AuthModalProps {
   isOpen: boolean
   onClose: VoidFunction
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
   const user = useAuthStore(state => state.user)

   useEffect(() => {
      if (user) onClose()
   }, [onClose, user])

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-md">
            <VisuallyHidden>
               <DialogTitle></DialogTitle>
               <DialogDescription></DialogDescription>
            </VisuallyHidden>
            <AuthLayout
               title="Zaloguj się"
               description="Wprowadź swoje dane logowania aby kontynuować"
               variant="modal"
            >
               <LoginForm onSuccess={onClose} />
            </AuthLayout>
         </DialogContent>
      </Dialog>
   )
}
