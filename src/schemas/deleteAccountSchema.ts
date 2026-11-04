import { z } from "zod";

const passwordSchema = z.string().min(1, "Enter password");

export const deleteAccountSchema = z.object({
  password: passwordSchema,
});

export type DeleteAccountFormValues = z.infer<typeof deleteAccountSchema>;
