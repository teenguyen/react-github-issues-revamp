import { type ReactNode, type SelectHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./dropdown.module.css";

export type DropdownProps = {
  label: string;
  children: ReactNode;
  className?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function Dropdown({
  label,
  children,
  id,
  className,
  "aria-label": ariaLabel,
  ...props
}: DropdownProps) {
  return (
    <>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <div className={styles.selectWrapper}>
        <select
          id={id}
          className={styles.select}
          aria-label={ariaLabel ?? label}
          {...props}
        >
          {children}
        </select>
      </div>
    </>
  );
}

export default Dropdown;
