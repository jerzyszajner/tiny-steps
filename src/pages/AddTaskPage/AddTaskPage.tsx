import { useState } from "react";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import { RadioGroup } from "../../components/RadioGroup/RadioGroup";
import { taskSchema } from "../../schemas/taskSchema";
import { addTask } from "../../services/tasksService";
import { useAuthContext } from "../../context/AuthContext";
import type { TaskFormInput, TaskFormValues } from "../../schemas/taskSchema";
import type { Task } from "../../types/task";
import styles from "./AddTaskPage.module.css";

const MINUTES_OPTIONS = [
  { value: "5", label: "5 min" },
  { value: "15", label: "15 min" },
  { value: "30", label: "30 min" },
];

const ENERGY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export function AddTaskPage() {
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { user } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormInput, unknown, TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      minutes: "15",
      energy: "low",
      note: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(data: TaskFormValues) {
    setError(null);
    if (!user) {
      setError("You must be logged in to add a task");
      return;
    }

    const task: Omit<Task, "id"> = {
      userId: user.uid,
      title: data.title,
      minutes: data.minutes,
      energy: data.energy,
      note: data.note,
      done: false,
    };

    try {
      await addTask(task);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to add task");
    }
  }

  return (
    <section className={styles.page} aria-labelledby="add-task-title">
      <h1 className={styles.title} id="add-task-title">
        New task
      </h1>
      <form
        className={styles.card}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.field}>
          <label className={styles.label} htmlFor="title">
            Title
          </label>
          <Input
            type="text"
            id="title"
            placeholder="Please enter title"
            {...register("title")}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p className={styles.error} id="title-error" role="alert">
              {errors.title.message}
            </p>
          )}
        </div>
        <RadioGroup
          legend="How many minutes will this task take?"
          hint="A rough guess is fine. Not sure? Pick the bigger value."
          options={MINUTES_OPTIONS}
          error={errors.minutes?.message}
          {...register("minutes")}
        />
        <RadioGroup
          legend="How much energy does this task need?"
          hint="Low: almost no thinking. High: you need to focus."
          options={ENERGY_OPTIONS}
          error={errors.energy?.message}
          {...register("energy")}
        />
        <div className={styles.field}>
          <label className={styles.label} htmlFor="note">
            Note (optional)
          </label>
          <textarea
            className={styles.textarea}
            id="note"
            rows={4}
            {...register("note")}
            aria-invalid={!!errors.note}
            aria-describedby={errors.note ? "note-error" : undefined}
          ></textarea>
          {errors.note && (
            <p className={styles.error} id="note-error" role="alert">
              {errors.note.message}
            </p>
          )}
        </div>
        <button className={styles.submit} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add task"}
        </button>
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
      </form>
    </section>
  );
}
