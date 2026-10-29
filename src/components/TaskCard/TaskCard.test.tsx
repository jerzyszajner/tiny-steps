import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import { TaskCard } from "./TaskCard";

import type { Task } from "../../types/task";

describe("TaskCard", () => {
  it("shows the title and minutes", () => {
    const task: Task = {
      id: "1",
      userId: "user-1",
      title: "Wash dishes",
      minutes: 15,
      energy: "low",
      note: "",
      done: false,
    };

    render(
      <MemoryRouter>
        <TaskCard task={task} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Wash dishes")).toBeInTheDocument();
    expect(screen.getByText("15 min")).toBeInTheDocument();
  });

  it("shows Done when the task is done", () => {
    const task: Task = {
      id: "1",
      userId: "user-1",
      title: "Wash dishes",
      minutes: 15,
      energy: "low",
      note: "",
      done: true,
    };

    render(
      <MemoryRouter>
        <TaskCard task={task} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("hides Done when the task is not done", () => {
    const task: Task = {
      id: "1",
      userId: "user-1",
      title: "Wash dishes",
      minutes: 15,
      energy: "low",
      note: "",
      done: false,
    };

    render(
      <MemoryRouter>
        <TaskCard task={task} />
      </MemoryRouter>,
    );

    expect(screen.queryByText("Done")).not.toBeInTheDocument();
  });
});
