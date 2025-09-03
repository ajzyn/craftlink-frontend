import { AuthView } from "@/features/auth/components/auth-view"
import { DeviceType } from "@/shared/types/device-types"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { useEffect } from "react"

interface AuthModalProps {
   isOpen: boolean
   handleClose: VoidFunction
}

export const AuthModal = ({ isOpen, handleClose }: AuthModalProps) => {
   const { user } = useAuthStore()

   useEffect(handleClose, [handleClose, user])

   if (!isOpen) return null

   return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogContent className="max-w-md">
            <AuthView handleClose={handleClose} variant={DeviceType.DESKTOP} />
         </DialogContent>
      </Dialog>
   )
}
