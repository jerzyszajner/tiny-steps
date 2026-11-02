import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { filterTask } from "../../utils/filterTasks";
import { TaskCard } from "../../components/TaskCard/TaskCard";
import type { StatusFilter, Task } from "../../types/task";

const statusText: Record<StatusFilter, string> = {
  any: "Showing all tasks",
  todo: "Showing tasks to do",
  done: "Showing done tasks",
};

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
      <button onClick={() => setStatusFilter("any")}>Any</button>
      <button onClick={() => setStatusFilter("todo")}>To do</button>
      <button onClick={() => setStatusFilter("done")}>Done</button>
      <p>{statusText[statusFilter]}</p>
      {visibleTasks.length === 0 ? (
        <p>No tasks match these filters</p>
      ) : (
        <ul>
          {visibleTasks.map((task) => (
            <li key={task.id}>
              <TaskCard task={task} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
