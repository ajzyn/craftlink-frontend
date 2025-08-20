import { AuthForm } from "@/features/auth/components/auth-form"
import { DeviceType } from "@/shared/types/device-types"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface AuthModalProps {
   isOpen: boolean
   handleClose: VoidFunction
   defaultMode?: "login" | "register"
}

export const AuthModal = ({ isOpen, handleClose, defaultMode = "login" }: AuthModalProps) => {
   if (!isOpen) return null

   return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogContent className="max-w-md">
            <AuthForm
               // onSuccess={onClose}
               // onClose={onClose}
               defaultMode={defaultMode}
               variant={DeviceType.DESKTOP}
            />
         </DialogContent>
      </Dialog>
   )
}
