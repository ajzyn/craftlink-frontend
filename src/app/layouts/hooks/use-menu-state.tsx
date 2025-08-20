import { useCallback, useEffect, useState } from "react"
import { usePreventScrolling } from "@/shared/hooks/use-prevent-scrolling"

export const useMenuState = () => {
   const [isScrolled, setIsScrolled] = useState(false)
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
   const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
   const [isLoginMobileViewOpen, setIsLoginMobileViewOpen] = useState(false)

   usePreventScrolling({ isActive: isMobileMenuOpen || isLoginMobileViewOpen })

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
      setIsLoginMobileViewOpen(true)
      setIsMobileMenuOpen(false)
   }, [])

   const handleCloseLoginMobileView = useCallback(() => {
      setIsLoginMobileViewOpen(false)
   }, [])

   return {
      isScrolled,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      isLoginDialogOpen,
      isLoginMobileViewOpen,
      handleCloseMobileMenu,
      handleOpenLoginDialog,
      handleCloseLoginDialog,
      handleOpenLoginMobileView,
      handleCloseLoginMobileView,
   }
}
