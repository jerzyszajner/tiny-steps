import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { describe, it, expect, vi } from "vitest";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuthContext } from "../../context/AuthContext";
import type { User } from "firebase/auth";

vi.mock("../../context/AuthContext");

describe("ProtectedRoute", () => {
  it("redirects to /welcome when there is no user", () => {
    vi.mocked(useAuthContext).mockReturnValue({ user: null, isLoading: false });

    render(
      <MemoryRouter initialEntries={["/tasks/new"]}>
        <Routes>
          <Route path="/welcome" element={<p>Welcome page</p>} />
          <Route
            path="/tasks/new"
            element={
              <ProtectedRoute>
                <p>Add task page</p>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Welcome page")).toBeInTheDocument();
    expect(screen.queryByText("Add task page")).not.toBeInTheDocument();
  });

  it("shows the page when the user is logged in", () => {
    vi.mocked(useAuthContext).mockReturnValue({
      user: { uid: "123" } as User,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={["/tasks/new"]}>
        <Routes>
          <Route path="/welcome" element={<p>Welcome page</p>} />
          <Route
            path="/tasks/new"
            element={
              <ProtectedRoute>
                <p>Add task page</p>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Add task page")).toBeInTheDocument();
    expect(screen.queryByText("Welcome page")).not.toBeInTheDocument();
  });

  it("renders nothing while auth is loading", () => {
    vi.mocked(useAuthContext).mockReturnValue({
      user: null,
      isLoading: true,
    });

    render(
      <MemoryRouter initialEntries={["/tasks/new"]}>
        <Routes>
          <Route path="/welcome" element={<p>Welcome page</p>} />
          <Route
            path="/tasks/new"
            element={
              <ProtectedRoute>
                <p>Add task page</p>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByText("Add task page")).not.toBeInTheDocument();
    expect(screen.queryByText("Welcome page")).not.toBeInTheDocument();
  });
});
