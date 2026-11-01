import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useTasks } from "./useTasks";
import { useAuthContext } from "../context/AuthContext";
import { getTasks } from "../services/tasksService";
import type { User } from "firebase/auth";
import type { Task } from "../types/task";

vi.mock("../context/AuthContext");
vi.mock("../services/tasksService");

const loggedIn = { user: { uid: "123" } as User, isLoading: false };

describe("useTasks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns tasks from the service", async () => {
    const task: Task = {
      id: "1",
      userId: "123",
      title: "Water the plants",
      minutes: 5,
      energy: "low",
      note: "",
      done: false,
    };
    vi.mocked(useAuthContext).mockReturnValue(loggedIn);
    vi.mocked(getTasks).mockResolvedValue([task]);

    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.tasks).toEqual([task]);
  });

  it("returns the error message when the service fails", async () => {
    vi.mocked(useAuthContext).mockReturnValue(loggedIn);
    vi.mocked(getTasks).mockRejectedValue(new Error("fail"));

    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe("fail");
  });

  it("does not call the service when there is no user", async () => {
    vi.mocked(useAuthContext).mockReturnValue({ user: null, isLoading: false });

    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(getTasks).not.toHaveBeenCalled();
  });
});
