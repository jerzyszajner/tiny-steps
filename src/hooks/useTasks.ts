import { useState, useEffect } from "react";
import { getTasks } from "../services/tasksService";
import type { Task } from "../types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadTasks = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const data = await getTasks();
        if (!cancelled) setTasks(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load tasks");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    loadTasks();
    return () => {
      cancelled = true;
    };
  }, []);

  return { tasks, isLoading, error };
}
