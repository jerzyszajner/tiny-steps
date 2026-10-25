import { Link, Outlet } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { signOut } from "../../services/authService";

export function Layout() {
  const { user } = useAuthContext();
  return (
    <>
      <nav>
        <Link to="/">Tasks</Link>
        {user ? (
          <button onClick={signOut}>Log out</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
