import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "../components/Layout/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import { WelcomePage } from "../pages/WelcomePage/WelcomePage";
import { HomePage } from "../pages/HomePage/HomePage";
import { TaskDetailsPage } from "../pages/TaskDetailsPage/TaskDetailsPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { NotFound } from "../pages/NotFound/NotFound";

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
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
