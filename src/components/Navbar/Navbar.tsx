import { Link } from "react-router";
import type { User } from "firebase/auth";

type NavbarProps = {
  user: User | null;
  onClick: () => void;
  onDeleteAccountClick: () => void;
};

export function Navbar({ user, onClick, onDeleteAccountClick }: NavbarProps) {
  return (
    <nav>
      <Link to="/">tiny-steps</Link>
      <div>
        {user ? (
          <>
            <Link to="/">List</Link>
            <Link to="/tasks/new">Add task</Link>
            <span>{user.email}</span>
            <button onClick={onClick}>Log out</button>
            <button onClick={onDeleteAccountClick}>Delete account</button>
          </>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </div>
    </nav>
  );
}
