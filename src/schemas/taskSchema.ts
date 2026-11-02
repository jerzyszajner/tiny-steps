import { z } from "zod";

const titleSchema = z
  .string()
  .trim()
  .min(1, "Enter a title")
  .max(60, "Use 60 characters or fewer");

const minutesByLabel = { "5": 5, "15": 15, "30": 30 } as const;

const minutesSchema = z
  .enum(["5", "15", "30"])
  .transform((val) => minutesByLabel[val]);

const energySchema = z.enum(["low", "medium", "high"]);

const noteSchema = z.string().trim().max(200, "Use 200 characters or fewer");

export const taskSchema = z.object({
  title: titleSchema,
  minutes: minutesSchema,
  energy: energySchema,
  note: noteSchema,
});

export type TaskFormInput = z.input<typeof taskSchema>;
export type TaskFormValues = z.output<typeof taskSchema>;
