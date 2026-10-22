import TaskCard from "../../components/TaskCard/TaskCard";
import { sampleTasks } from "../../data/sampleTasks";

function HomePage() {
  return (
    <>
      <h1>Tasks</h1>
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
