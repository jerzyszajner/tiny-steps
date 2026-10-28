import { z } from "zod";

export const emailSchema = z.email("Enter a valid email");

export const passwordSchema = z
  .string()
  .min(1, "Enter password")
  .max(50, "Use 50 characters or fewer");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
