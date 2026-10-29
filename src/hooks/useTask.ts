import { useState, useEffect } from "react";
import { getTask } from "../services/tasksService";
import type { Task } from "../types/task";

export function useTask(id: string | undefined) {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadCount, setReloadCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loadTask = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }
      try {
        setError(null);
        const data = await getTask(id);
        if (!cancelled) setTask(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load task");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    loadTask();
    return () => {
      cancelled = true;
    };
  }, [id, reloadCount]);

  function refetch() {
    setReloadCount((prev) => prev + 1);
  }
  return { task, isLoading, refetch, error };
}
