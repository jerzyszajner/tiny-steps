import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { getTasks } from "../services/tasksService";
import type { Task } from "../types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadCount, setReloadCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuthContext();
  const uid = user?.uid;

  useEffect(() => {
    let cancelled = false;

    const loadTasks = async () => {
      if (!uid) {
        setIsLoading(false);
        return;
      }
      try {
        setError(null);
        const data = await getTasks(uid);
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
  }, [uid, reloadCount]);

  function refetch() {
    setReloadCount((prev) => prev + 1);
  }

  return { tasks, isLoading, refetch, error };
}
