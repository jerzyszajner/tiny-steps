import type { Task, StatusFilter } from "../types/task";

const energyOrder = { low: 1, medium: 2, high: 3 };

function matchesStatus(task: Task, status: StatusFilter): boolean {
  return (
    status === "any" ||
    (status === "done" && task.done) ||
    (status === "todo" && !task.done)
  );
}

export function filterTask(
  tasks: Task[],
  maxMinutes: Task["minutes"],
  maxEnergy: Task["energy"],
  status: StatusFilter,
): Task[] {
  return tasks.filter(
    (task) =>
      matchesStatus(task, status) &&
      task.minutes <= maxMinutes &&
      energyOrder[task.energy] <= energyOrder[maxEnergy],
  );
}
