import { useEffect } from "react";
import { NavLink } from "react-router";
import { X } from "lucide-react";
import { useShowDialog } from "../../hooks/useShowDialog";
import type { MouseEvent } from "react";
import type { User } from "firebase/auth";
import styles from "./SideMenu.module.css";

type SideMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onLogout: () => void;
  onDeleteAccount: () => void;
};

function getLinkClass({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export function SideMenu({
  isOpen,
  onClose,
  user,
  onLogout,
  onDeleteAccount,
}: SideMenuProps) {
  const dialogRef = useShowDialog(isOpen);

  useEffect(() => {
    // keep in sync with the breakpoint in Navbar.module.css
    const mediaQuery = window.matchMedia("(min-width: 641px)");

    function handleChange(e: MediaQueryListEvent) {
      if (e.matches) onClose();
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [onClose]);

  function handleBackdropClick(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleLogout() {
    onClose();
    onLogout();
  }

  function handleDeleteAccount() {
    onClose();
    onDeleteAccount();
  }

  return (
    <dialog
      className={styles.menu}
      id="side-menu"
      ref={dialogRef}
      onCancel={onClose}
      onClick={handleBackdropClick}
    >
      <div className={styles.menuContent}>
        <div className={styles.menuHeader}>
          <span className={`${styles.email} ${styles.menuEmail}`}>
            {user.email}
          </span>
          <button
            className={`${styles.button} ${styles.iconButton}`}
            aria-label="Close menu"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>
        <div className={styles.menuActions}>
          <NavLink className={getLinkClass} to="/" end onClick={onClose}>
            List
          </NavLink>
          <NavLink className={getLinkClass} to="/tasks/new" onClick={onClose}>
            Add task
          </NavLink>
          <hr className={styles.menuDivider} />
          <button className={styles.button} onClick={handleLogout}>
            Log out
          </button>
          <button className={styles.button} onClick={handleDeleteAccount}>
            Delete account
          </button>
        </div>
      </div>
    </dialog>
  );
}
