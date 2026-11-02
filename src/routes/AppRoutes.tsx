import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "../components/Layout/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import { PublicRoute } from "../components/PublicRoute/PublicRoute";
import { WelcomePage } from "../pages/WelcomePage/WelcomePage";
import { HomePage } from "../pages/HomePage/HomePage";
import { TaskDetailsPage } from "../pages/TaskDetailsPage/TaskDetailsPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { AddTaskPage } from "../pages/AddTaskPage/AddTaskPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <ProtectedRoute>
                <TaskDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/new"
            element={
              <ProtectedRoute>
                <AddTaskPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/welcome"
            element={
              <PublicRoute>
                <WelcomePage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
