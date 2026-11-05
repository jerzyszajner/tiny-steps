import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { ComponentProps } from "react";
import styles from "./PasswordInput.module.css";

type PasswordInputProps = Omit<ComponentProps<"input">, "type" | "className">;

export function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className={styles.wrapper}>
      <input
        {...props}
        className={styles.input}
        type={showPassword ? "text" : "password"}
      />
      <button
        type="button"
        className={styles.toggle}
        aria-label={showPassword ? "Hide password" : "Show password"}
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
      </button>
    </div>
  );
}
