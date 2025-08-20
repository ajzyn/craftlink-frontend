import { AuthForm } from "@/features/auth/components/auth-form"
import { Button } from "@/components/ui/button"
import { DeviceType } from "@/shared/types/device"

interface AuthFullScreenProps {
   isOpen: boolean
   handleClose: VoidFunction
   defaultMode?: "login" | "register"
}

export const AuthFullScreen = ({
   isOpen,
   handleClose,
   defaultMode = "login",
}: AuthFullScreenProps) => {
   if (!isOpen) return null

   return (
      <div className="fixed inset-0 z-50 bg-background">
         <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
               <h1 className="text-xl font-semibold">
                  {defaultMode === "login" ? "Logowanie" : "Rejestracja"}
               </h1>
               <Button variant="ghost" size="icon" onClick={handleClose}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                     />
                  </svg>
               </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
               <AuthForm defaultMode={defaultMode} variant={DeviceType.MOBILE} />
            </div>
         </div>
      </div>
   )
}
