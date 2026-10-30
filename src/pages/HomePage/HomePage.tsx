import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { filterTask } from "../../utils/filterTasks";
import { TaskCard } from "../../components/TaskCard/TaskCard";

export function HomePage() {
  const [maxMinutes, setMaxMinutes] = useState<5 | 15 | 30>(30);
  const [maxEnergy, setMaxEnergy] = useState<"low" | "medium" | "high">("high");

  const { tasks, isLoading, error } = useTasks();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const visibleTasks = filterTask(tasks, maxMinutes, maxEnergy);

  return (
    <>
      <h1>Tasks</h1>
      <button onClick={() => setMaxMinutes(5)}>5 min</button>
      <button onClick={() => setMaxMinutes(15)}>15 min</button>
      <button onClick={() => setMaxMinutes(30)}>30 min</button>
      <p>Showing up to {maxMinutes} min</p>
      <button onClick={() => setMaxEnergy("low")}>Low</button>
      <button onClick={() => setMaxEnergy("medium")}>Medium</button>
      <button onClick={() => setMaxEnergy("high")}>High</button>
      <p>Showing up to {maxEnergy} energy</p>
      <ul>
        {visibleTasks.map((task) => (
          <li key={task.id}>
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
    </>
  );
}
