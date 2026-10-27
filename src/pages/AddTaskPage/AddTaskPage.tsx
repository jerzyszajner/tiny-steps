import { useState } from "react";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskSchema } from "../../schemas/taskSchema";
import { addTask } from "../../services/tasksService";
import type { TaskFormValues } from "../../schemas/taskSchema";
import type { Task } from "../../types/task";

export function AddTaskPage() {
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
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
    const task: Omit<Task, "id"> = {
      title: data.title,
      minutes: Number(data.minutes) as Task["minutes"],
      energy: data.energy,
      note: data.note,
      done: false,
    };

    try {
      await addTask(task);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add task");
    }
  }

  return (
    <>
      <h1>New task</h1>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Please enter title"
          {...register("title")}
        />
        {errors.title && <p>{errors.title.message}</p>}
        <fieldset>
          <legend>How many minutes will this task take?</legend>
          <p>A rough guess is fine. Not sure? Pick the bigger value.</p>
          <label>
            5 min
            <input type="radio" value="5" {...register("minutes")} />
          </label>
          <label>
            15 min
            <input type="radio" value="15" {...register("minutes")} />
          </label>
          <label>
            30 min
            <input type="radio" value="30" {...register("minutes")} />
          </label>
          {errors.minutes && <p>{errors.minutes.message}</p>}
        </fieldset>
        <fieldset>
          <legend>How much energy does this task need?</legend>
          <p>Low: almost no thinking. High: you need to focus.</p>
          <label>
            Low
            <input type="radio" value="low" {...register("energy")} />
          </label>
          <label>
            Medium
            <input type="radio" value="medium" {...register("energy")} />
          </label>
          <label>
            High
            <input type="radio" value="high" {...register("energy")} />
          </label>
          {errors.energy && <p>{errors.energy.message}</p>}
        </fieldset>
        <label htmlFor="note">Note (optional)</label>
        <textarea id="note" rows={4} {...register("note")}></textarea>
        {errors.note && <p>{errors.note.message}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add task"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
}
