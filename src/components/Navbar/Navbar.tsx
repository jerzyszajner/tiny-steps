import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu } from "lucide-react";
import { SideMenu } from "../SideMenu/SideMenu";
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
            <div className={styles.fullLinks}>
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
            </div>
            <button
              className={`${styles.button} ${styles.iconButton} ${styles.hamburger}`}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-controls="side-menu"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
            <SideMenu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              user={user}
              onLogout={onLogout}
              onDeleteAccount={onDeleteAccount}
            />
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
