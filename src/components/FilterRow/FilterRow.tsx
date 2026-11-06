import { useId } from "react";

import styles from "./FilterRow.module.css";

type FilterRowProps<T extends string | number> = {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

export function FilterRow<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: FilterRowProps<T>) {
  const labelId = useId();

  return (
    <div className={styles.row}>
      <span id={labelId} className={styles.label}>
        {label}
      </span>
      <div className={styles.segment} role="group" aria-labelledby={labelId}>
        {options.map((option) => (
          <button
            type="button"
            key={option.value}
            className={`${styles.option} ${value === option.value ? styles.active : ""}`}
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
