import { useId } from "react";
import type { ComponentProps } from "react";
import styles from "./RadioGroup.module.css";

type RadioGroupProps = {
  legend: string;
  hint: string;
  options: { value: string; label: string }[];
  error?: string;
} & Pick<ComponentProps<"input">, "name" | "onChange" | "onBlur" | "ref">;

export function RadioGroup({
  legend,
  hint,
  options,
  error,
  ...inputProps
}: RadioGroupProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <fieldset
      className={styles.field}
      aria-describedby={error ? `${hintId} ${errorId}` : hintId}
    >
      <legend className={styles.legend}>{legend}</legend>
      <p className={styles.hint} id={hintId}>
        {hint}
      </p>
      <div className={styles.options}>
        {options.map((option) => (
          <label className={styles.option} key={option.value}>
            <input
              className={styles.radio}
              type="radio"
              value={option.value}
              aria-invalid={!!error}
              {...inputProps}
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && (
        <p className={styles.error} id={errorId} role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
