import { useState } from "react";
import { Outlet } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { signOut } from "../../services/authService";
import { DeleteAccountDialog } from "../DeleteAccountDialog/DeleteAccountDialog";
import { Navbar } from "../Navbar/Navbar";

export function Layout() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { user } = useAuthContext();

  return (
    <>
      <header>
        <Navbar
          user={user}
          onClick={signOut}
          onDeleteAccountClick={() => setIsDeleteDialogOpen(true)}
        />
      </header>
      <main>
        <Outlet />
      </main>
      <DeleteAccountDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
    </>
  );
}
