import { describe, expect, it } from "vitest";
import { filterTask } from "./filterTasks";
import type { Task } from "../types/task";

const tasks: Task[] = [
  {
    id: "1",
    userId: "user-1",
    title: "Quick task",
    minutes: 5,
    energy: "low",
    note: "",
    done: false,
  },
  {
    id: "2",
    userId: "user-1",
    title: "Medium task",
    minutes: 15,
    energy: "medium",
    note: "",
    done: false,
  },
  {
    id: "3",
    userId: "user-1",
    title: "Long task",
    minutes: 30,
    energy: "high",
    note: "",
    done: false,
  },
];

describe("filterTask", () => {
  it("keeps only tasks that fit the time limit", () => {
    const result = filterTask(tasks, 15, "high");

    expect(result.map((task) => task.title)).toEqual([
      "Quick task",
      "Medium task",
    ]);
  });

  it("keeps only tasks that fit the energy limit", () => {
    const result = filterTask(tasks, 30, "low");

    expect(result.map((task) => task.title)).toEqual(["Quick task"]);
  });

  it("keeps only tasks that fit the time and energy limits", () => {
    const result = filterTask(tasks, 15, "low");

    expect(result.map((task) => task.title)).toEqual(["Quick task"]);
  });
});
