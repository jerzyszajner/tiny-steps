import { Navigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import type { ReactNode } from "react";

type PublicRouteProps = { children: ReactNode };

export function PublicRoute({ children }: PublicRouteProps) {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
