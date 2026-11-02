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
  {
    id: "4",
    userId: "user-1",
    title: "Finished task",
    minutes: 30,
    energy: "high",
    note: "",
    done: true,
  },
];

describe("filterTask", () => {
  it("keeps only tasks that fit the time limit", () => {
    const result = filterTask(tasks, 15, "high", "any");

    expect(result.map((task) => task.title)).toEqual([
      "Quick task",
      "Medium task",
    ]);
  });

  it("keeps only tasks that fit the energy limit", () => {
    const result = filterTask(tasks, 30, "low", "any");

    expect(result.map((task) => task.title)).toEqual(["Quick task"]);
  });

  it("keeps only tasks that fit the time and energy limits", () => {
    const result = filterTask(tasks, 15, "low", "any");

    expect(result.map((task) => task.title)).toEqual(["Quick task"]);
  });

  it("keeps both done and not done tasks when status is any", () => {
    const result = filterTask(tasks, 30, "high", "any");

    expect(result.map((task) => task.title)).toEqual([
      "Quick task",
      "Medium task",
      "Long task",
      "Finished task",
    ]);
  });

  it("keeps only tasks that are not done when status is todo", () => {
    const result = filterTask(tasks, 30, "high", "todo");

    expect(result.map((task) => task.title)).toEqual([
      "Quick task",
      "Medium task",
      "Long task",
    ]);
  });

  it("keeps only done tasks when status is done", () => {
    const result = filterTask(tasks, 30, "high", "done");

    expect(result.map((task) => task.title)).toEqual(["Finished task"]);
  });
});
