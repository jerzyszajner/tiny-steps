import { Link, Outlet } from "react-router";

function Layout() {
  return (
    <>
      <nav>
        <Link to="/">Tasks</Link>
        <Link to="/login">Login</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
