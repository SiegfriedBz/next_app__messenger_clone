import * as z from "zod"

export const authFormSchema = z
  .object({
    email: z.string().email(),
    name: z.string().optional(),
    password: z
      .string()
      .min(3, { message: "Password must contain at least 3 characters" })
      .max(24, { message: "Password must contain at most 24 characters" }),
    confirmedPassword: z.string().min(2).max(24),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Passwords do not match",
    path: ["confirmedPassword"],
  })

// infer type from zod schema
export type TAuthForm = z.infer<typeof authFormSchema>
