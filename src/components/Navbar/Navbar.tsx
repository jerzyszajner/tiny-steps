import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { useShowDialog } from "../../hooks/useShowDialog";
import type { User } from "firebase/auth";
import styles from "./Navbar.module.css";

type NavbarProps = {
  user: User | null;
  onLogout: () => void;
  onDeleteAccount: () => void;
};

function getLinkClass({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export function Navbar({ user, onLogout, onDeleteAccount }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dialogRef = useShowDialog(isMenuOpen);

  return (
    <nav className={styles.nav}>
      <Link className={styles.logo} to="/">
        tiny-steps
      </Link>
      <div className={styles.links}>
        {user ? (
          <>
            <NavLink className={getLinkClass} to="/" end>
              List
            </NavLink>
            <NavLink className={getLinkClass} to="/tasks/new">
              Add task
            </NavLink>
            <span className={styles.email}>{user.email}</span>
            <button className={styles.button} onClick={onLogout}>
              Log out
            </button>
            <button className={styles.button} onClick={onDeleteAccount}>
              Delete account
            </button>
            <button
              className={styles.button}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-controls="side-menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <Menu size={22} />
            </button>
            <dialog
              id="side-menu"
              ref={dialogRef}
              onCancel={() => setIsMenuOpen(false)}
            >
              <button
                className={styles.button}
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={22} />
              </button>
              <NavLink
                className={getLinkClass}
                to="/"
                end
                onClick={() => setIsMenuOpen(false)}
              >
                List
              </NavLink>
              <NavLink
                className={getLinkClass}
                to="/tasks/new"
                onClick={() => setIsMenuOpen(false)}
              >
                Add task
              </NavLink>
              <span className={styles.email}>{user.email}</span>
              <button
                className={styles.button}
                onClick={() => {
                  setIsMenuOpen(false);
                  onLogout();
                }}
              >
                Log out
              </button>
              <button
                className={styles.button}
                onClick={() => {
                  setIsMenuOpen(false);
                  onDeleteAccount();
                }}
              >
                Delete account
              </button>
            </dialog>
          </>
        ) : (
          <Link className={styles.primary} to="/login">
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
}
