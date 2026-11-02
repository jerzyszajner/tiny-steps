import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { updateTask, deleteTask } from "../../services/tasksService";
import { useTask } from "../../hooks/useTask";
import { ConfirmDialog } from "../../components/ConfirmDialog/ConfirmDialog";

export function TaskDetailsPage() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { id } = useParams();
  const { task, isLoading, refetch, error } = useTask(id);
  const navigate = useNavigate();

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
      console.error(err);
      setUpdateError("Failed to update task");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleteError(null);
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      navigate("/");
    } catch (err) {
      console.error(err);
      setDeleteError("Failed to delete task");
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
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
      <button onClick={() => setIsConfirmOpen(true)} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      {updateError && <p>{updateError}</p>}
      {deleteError && <p>{deleteError}</p>}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        message="Delete this task?"
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
