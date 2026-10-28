import { z } from "zod";

const emailSchema = z.email("Enter a valid email");

const passwordSchema = z
  .string()
  .min(1, "Enter password")
  .max(50, "Use 50 characters or fewer");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
