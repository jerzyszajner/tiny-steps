import { Link, useParams } from "react-router";
import { sampleTasks } from "../../data/sampleTasks";

function TaskDetailsPage() {
  const { id } = useParams();
  const task = sampleTasks.find((t) => t.id === id);

  if (!task) {
    return (
      <>
        <p>Task not found</p>
        <Link to="/">Back to tasks</Link>
      </>
    );
  }

  return (
    <>
      <h1>{task.title}</h1>
      <p>{task.minutes} min</p>
      <p>{task.energy}</p>
      {task.note && <p>{task.note}</p>}
      {task.done && <p>Done</p>}
    </>
  );
}

export default TaskDetailsPage;
