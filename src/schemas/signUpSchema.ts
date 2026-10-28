import { z } from "zod";

const emailSchema = z.email("Enter a valid email");

const passwordSchema = z
  .string()
  .min(1, "Enter password")
  .min(8, "Use at least 8 characters")
  .max(50, "Use 50 characters or fewer")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number");

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
