import { Navigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import type { ReactNode } from "react";

type ProtectedRouteProps = { children: ReactNode };

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
}
