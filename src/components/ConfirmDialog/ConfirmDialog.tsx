import { useShowDialog } from "../../hooks/useShowDialog";
import type { SyntheticEvent } from "react";
import styles from "./ConfirmDialog.module.css";

type ConfirmDialogProps = {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
};

export function ConfirmDialog({
  isOpen,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}: ConfirmDialogProps) {
  const dialogRef = useShowDialog(isOpen);

  function handleDialogCancel(e: SyntheticEvent<HTMLDialogElement>) {
    // Esc must not close the dialog on its own, the parent decides
    e.preventDefault();
    onCancel();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onCancel={handleDialogCancel}
    >
      <p className={styles.message}>{message}</p>
      <div className={styles.actions}>
        <button className={styles.confirm} onClick={onConfirm}>
          {confirmLabel}
        </button>
        <button className={styles.cancel} onClick={onCancel}>
          {cancelLabel}
        </button>
      </div>
    </dialog>
  );
}
