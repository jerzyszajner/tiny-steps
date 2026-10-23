import { useParams } from "react-router";

function TaskDetailsPage() {
  const { id } = useParams();

  return (
    <>
      <h1>Task details</h1>
      <p>{id}</p>
    </>
  );
}

export default TaskDetailsPage;
