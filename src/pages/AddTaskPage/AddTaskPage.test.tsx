import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AddTaskPage } from "./AddTaskPage";
import { useAuthContext } from "../../context/AuthContext";
import { addTask } from "../../services/tasksService";
import type { User } from "firebase/auth";

vi.mock("../../context/AuthContext");
vi.mock("../../services/tasksService");

function renderPage() {
  render(
    <MemoryRouter initialEntries={["/tasks/new"]}>
      <Routes>
        <Route path="/" element={<p>Home page</p>} />
        <Route path="/tasks/new" element={<AddTaskPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("AddTaskPage", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useAuthContext).mockReturnValue({
      user: { uid: "123" } as User,
      isLoading: false,
    });
  });

  it("saves the task and goes to the home page", async () => {
    const user = userEvent.setup();
    vi.mocked(addTask).mockResolvedValue(undefined);
    renderPage();

    await user.type(screen.getByLabelText("Title"), "Wash dishes");
    await user.click(screen.getByRole("button", { name: "Add task" }));

    expect(addTask).toHaveBeenCalledWith({
      userId: "123",
      title: "Wash dishes",
      minutes: 15,
      energy: "low",
      note: "",
      done: false,
    });
    expect(await screen.findByText("Home page")).toBeInTheDocument();
  });

  it("shows an error and does not save when the title is empty", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Add task" }));

    expect(await screen.findByText("Enter a title")).toBeInTheDocument();
    expect(addTask).not.toHaveBeenCalled();
    expect(screen.queryByText("Home page")).not.toBeInTheDocument();
  });

  it("shows the error message when saving fails", async () => {
    const user = userEvent.setup();
    vi.mocked(addTask).mockRejectedValue(new Error("Network down"));
    renderPage();

    await user.type(screen.getByLabelText("Title"), "Wash dishes");
    await user.click(screen.getByRole("button", { name: "Add task" }));

    expect(await screen.findByText("Network down")).toBeInTheDocument();
    expect(screen.queryByText("Home page")).not.toBeInTheDocument();
  });
});
