import { useState } from "react";
import { sampleTasks } from "../../data/sampleTasks";
import TaskCard from "../../components/TaskCard/TaskCard";

function HomePage() {
  const [maxMinutes, setMaxMinutes] = useState<5 | 15 | 30>(30);
  return (
    <>
      <h1>Tasks</h1>
      <button onClick={() => setMaxMinutes(5)}>5 min</button>
      <button onClick={() => setMaxMinutes(15)}>15 min</button>
      <button onClick={() => setMaxMinutes(30)}>30 min</button>
      <p>Showing up to {maxMinutes} min</p>
      <ul>
        {sampleTasks.map((task) => (
          <li key={task.id}>
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomePage;
