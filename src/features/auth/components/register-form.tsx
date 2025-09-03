import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Lock, Mail, User } from "lucide-react"

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

import { useRegisterMutation } from "../api/auth-queries"
import { type RegisterFormData, registerSchema } from "../utils/register-schema"
import { toast } from "sonner"
import { jwtDecode } from "jwt-decode"
import type { JwtPayload, UserDto } from "@/features/auth/types/auth-types"
import { useRouter } from "@tanstack/react-router"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"

export const RegisterForm = ({ handleClose }: { handleClose?: VoidFunction }) => {
   const registerMutation = useRegisterMutation()
   const router = useRouter()
   const { setUser, setAccessToken } = useAuthStore()

   const form = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         username: "",
         email: "",
         password: "",
         confirmPassword: "",
      },
   })

   const onSubmit = async (data: RegisterFormData) => {
      try {
         const { token } = await registerMutation.mutateAsync({
            username: data.username,
            email: data.email,
            password: data.password,
         })

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
            description: "Konto zostało utworzone pomyślnie.",
         })
         router.navigate({ to: "/" })
         handleClose?.()
      } catch (error) {
         toast("Błąd rejestracji", {
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
               name="username"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nazwa użytkownika</FormLabel>
                     <FormControl>
                        <div className="relative">
                           <User className="absolute left-3 top-5 h-4 w-4 text-muted-foreground" />
                           <Input
                              placeholder="Wprowadź nazwę użytkownika"
                              className="pl-10 min-h-12"
                              disabled={registerMutation.isPending}
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
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <div className="relative">
                           <Mail className="absolute left-3 top-5 h-4 w-4 text-muted-foreground" />
                           <Input
                              type="email"
                              placeholder="Wprowadź email"
                              className="pl-10 min-h-12"
                              disabled={registerMutation.isPending}
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
                              disabled={registerMutation.isPending}
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
               name="confirmPassword"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Potwierdź hasło</FormLabel>
                     <FormControl>
                        <div className="relative">
                           <Lock className="absolute left-3 top-5 h-4 w-4 text-muted-foreground" />
                           <Input
                              type="password"
                              placeholder="Potwierdź hasło"
                              disabled={registerMutation.isPending}
                              {...field}
                           />
                        </div>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <Button
               type="submit"
               className="w-full py-6"
               disabled={registerMutation.isPending}
               variant="secondary"
            >
               {registerMutation.isPending ? (
                  <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     Rejestrowanie...
                  </>
               ) : (
                  "Zarejestruj się"
               )}
            </Button>
         </form>
      </Form>
   )
}
