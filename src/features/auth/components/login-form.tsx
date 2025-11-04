import { Loader2, Lock, Mail } from "lucide-react"

import { Button } from "@/shared/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"

import { useLoginMutation } from "../api/mutations"
import { loginFormSchema } from "@/features/auth/utils/login-form-schema"
import { useAuthForm } from "@/features/auth/hooks/use-auth-form"

export const LoginForm = ({ onSuccess }: { onSuccess?: VoidFunction }) => {
   const loginMutation = useLoginMutation()

   const { form, onSubmit } = useAuthForm({
      schema: loginFormSchema,
      defaultValues: { email: "", password: "" },
      mutation: loginMutation.mutateAsync,
      successMessage: "Zostałeś pomyślnie zalogowany.",
      errorMessage: "Nieprawidłowy email lub hasło.",
      onSuccess,
   })

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
