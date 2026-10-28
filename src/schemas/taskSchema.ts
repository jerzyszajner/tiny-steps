import { z } from "zod";

const titleSchema = z
  .string()
  .trim()
  .min(1, "Enter a title")
  .max(60, "Use 60 characters or fewer");

const minutesSchema = z.enum(["5", "15", "30"]);

const energySchema = z.enum(["low", "medium", "high"]);

const noteSchema = z
  .string()
  .trim()
  .max(200, "Use 200 characters or fewer");

export const taskSchema = z.object({
  title: titleSchema,
  minutes: minutesSchema,
  energy: energySchema,
  note: noteSchema,
});

export type TaskFormValues = z.infer<typeof taskSchema>;
