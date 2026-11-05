import { useState } from "react";
import { Outlet } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { signOut } from "../../services/authService";
import { DeleteAccountDialog } from "../DeleteAccountDialog/DeleteAccountDialog";
import { Navbar } from "../Navbar/Navbar";
import styles from "./Layout.module.css";

export function Layout() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { user } = useAuthContext();

  return (
    <>
      <header className={styles.header}>
        <Navbar
          user={user}
          onLogout={signOut}
          onDeleteAccount={() => setIsDeleteDialogOpen(true)}
        />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <DeleteAccountDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
    </>
  );
}
