import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "@tanstack/react-router"
import { Loader2, Lock, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useLoginMutation } from "../api/auth-queries"
import { toast } from "sonner"
import { type LoginFormData, loginSchema } from "@/features/auth/utils/login-schema"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { jwtDecode } from "jwt-decode"
import type { JwtPayload, UserDto } from "@/features/auth/types/auth-types"

export const LoginForm = ({ handleClose }: { handleClose?: VoidFunction }) => {
   //TOOD: move to a custom hook. same with register form
   const router = useRouter()
   const loginMutation = useLoginMutation()
   const { setUser, setAccessToken } = useAuthStore()

   const form = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   })

   const onSubmit = async (data: LoginFormData) => {
      try {
         const { token } = await loginMutation.mutateAsync(data)

         const decoded = jwtDecode<JwtPayload>(token)
         const user: UserDto = {
            email: decoded.email,
            id: decoded.sub,
            authorities: decoded.authorities,
            userType: decoded.userType,
         }

         setUser(user)
         setAccessToken(token)

         toast("Sukces!", {
            description: "Zostałeś pomyślnie zalogowany.",
         })
         router.navigate({ to: "/" })
         handleClose?.()
      } catch (error) {
         toast("Błąd logowania", {
            description: "Dane nieprawidłowe. Spróbuj ponownie.",
         })
         form.reset()
      }
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 mt-10">
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel className="text-sm text-foreground">Email</FormLabel>
                     <FormControl>
                        <div className="relative items items-center justify-center">
                           <Mail className="absolute left-3 top-5 h-4 w-4 text-muted-foreground" />
                           <Input
                              type="email"
                              placeholder="Wprowadź email"
                              disabled={loginMutation.isPending}
                              {...field}
                           />
                        </div>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Hasło</FormLabel>
                     <FormControl>
                        <div className="relative">
                           <Lock className="absolute left-3 top-5 h-4 w-4 text-muted-foreground" />
                           <Input
                              type="password"
                              placeholder="Wprowadź hasło"
                              disabled={loginMutation.isPending}
                              {...field}
                           />
                        </div>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <Button type="submit" className="w-full py-6 mt-6" disabled={loginMutation.isPending}>
               {loginMutation.isPending ? (
                  <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     Logowanie...
                  </>
               ) : (
                  "Zaloguj się"
               )}
            </Button>
         </form>
      </Form>
   )
}
