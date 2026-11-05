import { useState } from "react";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useShowDialog } from "../../hooks/useShowDialog";
import { deleteAccountSchema } from "../../schemas/deleteAccountSchema";
import { deleteAccount } from "../../services/authService";
import { getAuthErrorMessage } from "../../services/getAuthErrorMessage";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import type { SyntheticEvent } from "react";
import type { DeleteAccountFormValues } from "../../schemas/deleteAccountSchema";

type DeleteAccountDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function DeleteAccountDialog({
  isOpen,
  onClose,
}: DeleteAccountDialogProps) {
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useShowDialog(isOpen);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DeleteAccountFormValues>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: { password: "" },
    mode: "onBlur",
  });

  function handleClose() {
    reset();
    setError(null);
    onClose();
  }

  async function onSubmit(data: DeleteAccountFormValues) {
    setError(null);
    try {
      await deleteAccount(data.password);
      handleClose();
      navigate("/welcome");
    } catch (err) {
      console.error(err);
      setError(getAuthErrorMessage(err, "Failed to delete account"));
    }
  }

  function handleCancel() {
    if (isSubmitting) return;
    handleClose();
  }

  function handleDialogCancel(e: SyntheticEvent<HTMLDialogElement>) {
    // Esc must not close the dialog on its own, handleCancel decides
    e.preventDefault();
    handleCancel();
  }

  return (
    <dialog ref={dialogRef} onCancel={handleDialogCancel}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <p>Delete your account and all your tasks? This cannot be undone.</p>
        <label htmlFor="delete-password">Password</label>
        {/* mounted only while open, so the password is hidden again on reopen */}
        {isOpen && (
          <PasswordInput
            id="delete-password"
            placeholder="Enter your password"
            {...register("password")}
            autoComplete="current-password"
          />
        )}
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Deleting..." : "Delete account"}
        </button>
        <button type="button" onClick={handleCancel} disabled={isSubmitting}>
          Keep account
        </button>
        {error && <p>{error}</p>}
      </form>
    </dialog>
  );
}
