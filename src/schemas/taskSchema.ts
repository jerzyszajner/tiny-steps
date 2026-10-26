import { z } from "zod";

export const titleSchema = z
  .string()
  .trim()
  .min(1, "Enter a title")
  .max(60, "Use 60 characters or fewer");

export const minutesSchema = z.enum(["5", "15", "30"]);

export const energySchema = z.enum(["low", "medium", "high"]);

export const noteSchema = z.string().max(200, "Use 200 characters or fewer");

export const taskSchema = z.object({
  title: titleSchema,
  minutes: minutesSchema,
  energy: energySchema,
  note: noteSchema,
});

export type TaskFormValues = z.infer<typeof taskSchema>;
