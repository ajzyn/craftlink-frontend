import { useRouter } from "@tanstack/react-router"
import LogoSvg from "../../../public/assets/logo.svg?react"

export const Logo = () => {
  const router = useRouter()

  return (
    <div
      className="px-6 cursor-pointer flex items-center space-x-2"
      onClick={() => router.navigate({ to: "/" })}
    >
      <LogoSvg className="h-12 w-auto text-primary" />
    </div>
  )
}
