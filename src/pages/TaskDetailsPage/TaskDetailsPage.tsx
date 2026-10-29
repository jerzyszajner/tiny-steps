import { useState } from "react";
import { Link, useParams } from "react-router";
import { updateTask } from "../../services/tasksService";
import { useTask } from "../../hooks/useTask";

export function TaskDetailsPage() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const { id } = useParams();
  const { task, isLoading, refetch, error } = useTask(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!task) {
    return (
      <>
        <p>Task not found</p>
        <Link to="/">Back to list</Link>
      </>
    );
  }

  const handleToggleDone = async () => {
    setUpdateError(null);
    setIsUpdating(true);
    try {
      await updateTask(task.id, !task.done);
      refetch();
    } catch (err) {
      setUpdateError(
        err instanceof Error ? err.message : "Failed to update task",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Link to="/">Back to list</Link>
      <h1>{task.title}</h1>
      <p>{task.minutes} min</p>
      <p>{task.energy}</p>
      {task.note && <p>{task.note}</p>}
      <button onClick={handleToggleDone} disabled={isUpdating}>
        {task.done ? "Mark as not done" : "Mark as done"}
      </button>
      {updateError && <p>{updateError}</p>}
    </>
  );
}
