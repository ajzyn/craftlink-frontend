import { AuthForm } from "@/features/auth/components/auth-form.tsx"
import { DeviceType } from "@/shared/types/device.ts"
import { Dialog, DialogContent } from "@/components/ui/dialog.tsx"

interface AuthModalProps {
  isOpen: boolean
  onClose: VoidFunction
  defaultMode?: "login" | "register"
}

export const AuthModal = ({ isOpen, onClose, defaultMode = "login" }: AuthModalProps) => {
  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
