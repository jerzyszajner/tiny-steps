import { Link } from "react-router";

import type { Task } from "../../types/task";

import styles from "./TaskCard.module.css";

type TaskCardProps = { task: Task };

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Link
      to={`/tasks/${task.id}`}
      className={task.done ? `${styles.card} ${styles.done}` : styles.card}
    >
      <h3 className={styles.title}>{task.title}</h3>
      <div className={styles.meta}>
        <p className={styles.minutes}>{task.minutes} min</p>
        <p>energy: {task.energy}</p>
      </div>
      {task.done && <p className={styles.badge}>Done</p>}
    </Link>
  );
}
