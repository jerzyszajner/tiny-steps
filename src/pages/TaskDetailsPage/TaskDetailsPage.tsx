import { Link, useParams } from "react-router";
import { useTasks } from "../../hooks/useTasks";

export function TaskDetailsPage() {
  const { tasks, isLoading, error } = useTasks();
  const { id } = useParams();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <>
        <p>Task not found</p>
        <Link to="/">Back to list</Link>
      </>
    );
  }

  return (
    <>
      <Link to="/">Back to list</Link>
      <h1>{task.title}</h1>
      <p>{task.minutes} min</p>
      <p>{task.energy}</p>
      {task.note && <p>{task.note}</p>}
      {task.done && <p>Done</p>}
    </>
  );
}
