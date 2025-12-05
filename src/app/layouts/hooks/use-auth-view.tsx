import { useCallback, useState } from "react"
import { useNavigate } from "@tanstack/react-router"

export const useAuthView = () => {
   const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
   const navigate = useNavigate()

   const handleOpenLoginDialog = useCallback(() => {
      setIsLoginDialogOpen(true)
   }, [])

   const handleCloseLoginDialog = useCallback(() => {
      setIsLoginDialogOpen(false)
   }, [])

   const handleOpenLoginMobileView = useCallback(() => {
      navigate({ to: "/zaloguj" })
   }, [navigate])

   return {
      isLoginDialogOpen,
      handleOpenLoginDialog,
      handleCloseLoginDialog,
      handleOpenLoginMobileView,
   }
}
