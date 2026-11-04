import { useShowDialog } from "../../hooks/useShowDialog";
import type { SyntheticEvent } from "react";

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
    <dialog ref={dialogRef} onCancel={handleDialogCancel}>
      <p>{message}</p>
      <div>
        <button onClick={onConfirm}>{confirmLabel}</button>
        <button onClick={onCancel}>{cancelLabel}</button>
      </div>
    </dialog>
  );
}
