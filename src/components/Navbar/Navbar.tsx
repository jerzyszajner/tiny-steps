import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu } from "lucide-react";
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
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <Menu size={22} />
            </button>
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
