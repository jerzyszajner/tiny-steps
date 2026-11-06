import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { filterTask } from "../../utils/filterTasks";
import { FilterRow } from "../../components/FilterRow/FilterRow";
import { TaskCard } from "../../components/TaskCard/TaskCard";
import type { StatusFilter, Task } from "../../types/task";
import styles from "./HomePage.module.css";

const minutesOptions: { value: Task["minutes"]; label: string }[] = [
  { value: 5, label: "5 min" },
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
];

const energyOptions: { value: Task["energy"]; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "todo", label: "To do" },
  { value: "done", label: "Done" },
];

export function HomePage() {
  const [maxMinutes, setMaxMinutes] = useState<Task["minutes"]>(30);
  const [maxEnergy, setMaxEnergy] = useState<Task["energy"]>("high");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("any");

  const { tasks, isLoading, error } = useTasks();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const visibleTasks = filterTask(tasks, maxMinutes, maxEnergy, statusFilter);

  return (
    <section className={styles.page}>
      <div className={styles.intro}>
        <h1 className={styles.title}>What can I do right now?</h1>
        <p className={styles.subtitle}>
          Set how much time and energy you have. The rest disappears.
        </p>
      </div>

      <div className={styles.filters}>
        <FilterRow
          label="I have time"
          options={minutesOptions}
          value={maxMinutes}
          onChange={setMaxMinutes}
        />
        <FilterRow
          label="I have energy"
          options={energyOptions}
          value={maxEnergy}
          onChange={setMaxEnergy}
        />
        <FilterRow
          label="Show"
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </div>

      <p className={styles.count} role="status">
        Matches: {visibleTasks.length}
      </p>

      {visibleTasks.length === 0 ? (
        <p>No tasks match these filters</p>
      ) : (
        <ul className={styles.taskList}>
          {visibleTasks.map((task) => (
            <li key={task.id} className={styles.taskItem}>
              <TaskCard task={task} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
