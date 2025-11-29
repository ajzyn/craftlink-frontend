import { Loader2, Lock, Mail, User } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/shared/components/ui/form"
import { useAuthForm } from "@/features/auth/hooks/use-auth-form"
import { useRegisterMutation } from "@/features/auth/api/mutations"
import { type RegisterFormData, registerFormSchema } from "../utils/register-form-schema"
import type { UserType } from "@/features/auth/api/types"
import { InputWithIcon } from "@/shared/components/input-with-icon"

interface RegisterFormProps {
   onSuccess?: VoidFunction
   userType: UserType
}

export const RegisterForm = ({ onSuccess, userType }: RegisterFormProps) => {
   const registerMutation = useRegisterMutation()

   const registerWithUserType = async (data: RegisterFormData) => {
      const { confirmPassword, ...rest } = data
      return registerMutation.mutateAsync({
         ...rest,
         userType,
      })
   }

   const { form, onSubmit } = useAuthForm({
      schema: registerFormSchema,
      defaultValues: {
         username: "",
         email: "",
         password: "",
         confirmPassword: "",
      },
      mutation: registerWithUserType,
      successMessage: "Konto zostało utworzone pomyślnie.",
      errorMessage: "Nie udało się utworzyć konta.",
      onSuccess,
   })

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
                        <InputWithIcon
                           icon={User}
                           placeholder="Wprowadź nazwę użytkownika"
                           className="pl-10 min-h-12"
                           disabled={registerMutation.isPending}
                           {...field}
                        />
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
                        <InputWithIcon
                           icon={Mail}
                           type="email"
                           placeholder="Wprowadź email"
                           className="pl-10 min-h-12"
                           disabled={registerMutation.isPending}
                           {...field}
                        />
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
                        <InputWithIcon
                           icon={Lock}
                           type="password"
                           placeholder="Wprowadź hasło"
                           disabled={registerMutation.isPending}
                           {...field}
                        />
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
                        <InputWithIcon
                           icon={Lock}
                           type="password"
                           placeholder="Potwierdź hasło"
                           disabled={registerMutation.isPending}
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <Button type="submit" className="w-full py-6" disabled={registerMutation.isPending}>
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
