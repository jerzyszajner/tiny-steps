import { Link } from "react-router";
import type { Task } from "../../types/task";

type TaskCardProps = { task: Task };

function TaskCard({ task }: TaskCardProps) {
  return (
    <Link to={`/tasks/${task.id}`}>
      <>
        <h3>{task.title}</h3>
        <p>{task.minutes} min</p>
        <p>{task.energy}</p>
        {task.note && <p>{task.note}</p>}
        {task.done && <p>Done</p>}
      </>
    </Link>
  );
}

export default TaskCard;
