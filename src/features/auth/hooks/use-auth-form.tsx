import { type DefaultValues, useForm } from "react-hook-form"
import { type TypeOf, type ZodTypeAny } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { jwtDecode } from "jwt-decode"
import { toast } from "sonner"
import { useRouter } from "@tanstack/react-router"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import type { JwtPayload, UserDto } from "@/features/auth/types/auth-types"

interface UseAuthFormProps<T extends ZodTypeAny> {
   schema: T
   defaultValues: DefaultValues<TypeOf<T>>
   mutation: (data: TypeOf<T>) => Promise<{ token: string }>
   successMessage: string
   errorMessage: string
   onSuccess?: VoidFunction
}

export const useAuthForm = <T extends ZodTypeAny>({
   schema,
   defaultValues,
   mutation,
   successMessage,
   errorMessage,
   onSuccess,
}: UseAuthFormProps<T>) => {
   const { setUser, setAccessToken } = useAuthStore()
   const router = useRouter()

   const form = useForm<TypeOf<T>>({
      resolver: zodResolver(schema),
      defaultValues,
   })

   const onSubmit = async (data: TypeOf<T>) => {
      try {
         const { token } = await mutation(data)
         const decoded = jwtDecode<JwtPayload>(token)

         const user: UserDto = {
            email: decoded.email,
            id: decoded.sub,
            authorities: decoded.authorities,
            userType: decoded.userType,
         }

         setUser(user)
         setAccessToken(token)
         toast("Sukces!", { description: successMessage })
         router.navigate({ to: "/" })
         onSuccess?.()
      } catch {
         toast("Błąd", { description: errorMessage })
         form.reset()
      }
   }

   return {
      form,
      onSubmit,
   }
}
