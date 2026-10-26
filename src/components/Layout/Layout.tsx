import { Outlet } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { signOut } from "../../services/authService";
import { Navbar } from "../Navbar/Navbar";

export function Layout() {
  const { user } = useAuthContext();
  return (
    <>
      <header>
        <Navbar user={user} onClick={signOut} />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
