import { useCallback, useEffect, useState } from "react"
import { usePreventScrolling } from "@/shared/hooks"
import { useRouter } from "@tanstack/react-router"

export const useMenuState = () => {
   const [isScrolled, setIsScrolled] = useState(false)
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
   const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
   const router = useRouter()

   usePreventScrolling({ isActive: isMobileMenuOpen })

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 20)
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
   }, [])

   const handleCloseMobileMenu = useCallback(() => {
      setIsMobileMenuOpen(false)
   }, [])

   const handleOpenLoginDialog = useCallback(() => {
      setIsLoginDialogOpen(true)
   }, [])

   const handleCloseLoginDialog = useCallback(() => {
      setIsLoginDialogOpen(false)
   }, [])

   const handleOpenLoginMobileView = useCallback(() => {
      router.navigate({ to: "/login" })
   }, [router])

   return {
      isScrolled,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      isLoginDialogOpen,
      handleCloseMobileMenu,
      handleOpenLoginDialog,
      handleCloseLoginDialog,
      handleOpenLoginMobileView,
   }
}
