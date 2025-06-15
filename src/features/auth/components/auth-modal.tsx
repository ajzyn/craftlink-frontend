import { AuthForm } from "@/features/auth/components/auth-form.tsx"
import { DeviceType } from "@/shared/types/device.ts"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx"

interface AuthModalProps {
  isOpen: boolean
  onClose: VoidFunction
  defaultMode?: "login" | "register"
}

export const AuthModal = ({ isOpen, onClose, defaultMode = "login" }: AuthModalProps) => {
  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Logowanie do CraftLink</DialogTitle>
        </DialogHeader>
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
