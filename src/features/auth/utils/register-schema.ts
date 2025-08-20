import z from "zod"

export const registerSchema = z
   .object({
      username: z
         .string()
         .min(1, "Nazwa użytkownika jest wymagana")
         .min(3, "Nazwa użytkownika musi mieć co najmniej 3 znaki")
         .max(50, "Nazwa użytkownika może mieć maksymalnie 50 znaków"),
      email: z.string().min(1, "Email jest wymagany").email("Email ma nieprawidłowy format"),
      password: z
         .string()
         .min(1, "Hasło jest wymagane")
         .min(6, "Hasło musi mieć co najmniej 6 znaków")
         .max(100, "Hasło może mieć maksymalnie 100 znaków"),
      confirmPassword: z.string().min(1, "Potwierdzenie hasła jest wymagane"),
   })
   .refine(data => data.password === data.confirmPassword, {
      message: "Hasła nie są identyczne",
      path: ["confirmPassword"],
   })

export type RegisterFormData = z.infer<typeof registerSchema>
