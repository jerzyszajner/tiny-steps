import type { Task } from "../types/task";

const energyOrder = { low: 1, medium: 2, high: 3 };

export function filterTask(
  tasks: Task[],
  maxMinutes: Task["minutes"],
  maxEnergy: Task["energy"],
): Task[] {
  return tasks.filter(
    (task) =>
      task.minutes <= maxMinutes &&
      energyOrder[task.energy] <= energyOrder[maxEnergy],
  );
}
