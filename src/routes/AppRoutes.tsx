import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "../components/Layout/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import HomePage from "../pages/HomePage/HomePage";
import TaskDetailsPage from "../pages/TaskDetailsPage/TaskDetailsPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
