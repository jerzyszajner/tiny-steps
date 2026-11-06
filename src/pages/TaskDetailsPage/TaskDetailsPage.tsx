import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { updateTask, deleteTask } from "../../services/tasksService";
import { useTask } from "../../hooks/useTask";
import { ConfirmDialog } from "../../components/ConfirmDialog/ConfirmDialog";
import styles from "./TaskDetailsPage.module.css";

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
    return (
      <p className={styles.status} role="status">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <p className={styles.error} role="alert">
          {error}
        </p>
        <Link to="/" className={styles.back}>
          Back to list
        </Link>
      </div>
    );
  }

  if (!task) {
    return (
      <div className={styles.page}>
        <p className={styles.status}>Task not found</p>
        <Link to="/" className={styles.back}>
          Back to list
        </Link>
      </div>
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
    setIsConfirmOpen(false);
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      navigate("/");
    } catch (err) {
      console.error(err);
      setDeleteError("Failed to delete task");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>
        Back to list
      </Link>
      <div className={styles.card}>
        <h1 className={styles.title}>{task.title}</h1>
        <div className={styles.meta}>
          <p className={styles.minutes}>{task.minutes} min</p>
          <p>energy: {task.energy}</p>
        </div>
        {task.note && <p className={styles.note}>{task.note}</p>}
      </div>
      <div className={styles.actions}>
        <button
          className={styles.toggle}
          onClick={handleToggleDone}
          disabled={isUpdating}
        >
          {task.done ? "Mark as not done" : "Mark as done"}
        </button>
        <button
          className={styles.delete}
          onClick={() => setIsConfirmOpen(true)}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
      {updateError && (
        <p className={styles.error} role="alert">
          {updateError}
        </p>
      )}
      {deleteError && (
        <p className={styles.error} role="alert">
          {deleteError}
        </p>
      )}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        message="Delete this task?"
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
