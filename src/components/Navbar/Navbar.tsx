import { Link } from "react-router";
import type { User } from "firebase/auth";

type NavbarProps = { user: User | null; onClick: () => void };

export function Navbar({ user, onClick }: NavbarProps) {
  return (
    <nav>
      <Link to="/">tiny-steps</Link>
      <div>
        {user ? (
          <button onClick={onClick}>Log out</button>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </div>
    </nav>
  );
}
