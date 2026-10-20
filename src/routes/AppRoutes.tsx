import { BrowserRouter, Routes, Route } from "react-router";

import Layout from "../components/Layout/Layout";
import HomePage from "../pages/HomePage/HomePage";
import TaskDetailsPage from "../pages/TaskDetailsPage/TaskDetailsPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks/:id" element={<TaskDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
