import { useState } from "react";
import { Outlet } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { signOut } from "../../services/authService";
import { ConfirmDialog } from "../ConfirmDialog/ConfirmDialog";
import { Navbar } from "../Navbar/Navbar";

export function Layout() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { user } = useAuthContext();

  return (
    <>
      <header>
        <Navbar
          user={user}
          onClick={signOut}
          onDeleteAccountClick={() => setIsConfirmOpen(true)}
        />
      </header>
      <main>
        <Outlet />
      </main>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        message="Delete your account and all your tasks? This cannot be undone."
        confirmLabel="Delete account"
        cancelLabel="Keep account"
        onConfirm={() => setIsConfirmOpen(false)}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}
