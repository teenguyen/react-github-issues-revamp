import type { CSSProperties, HTMLAttributes } from "react";
import styles from "./skeleton.module.css";

export type SkeletonProps = {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  className?: string;
  style?: CSSProperties;
} & Omit<HTMLAttributes<HTMLDivElement>, "style">;

export function Skeleton({
  width,
  height,
  className,
  style,
  "aria-label": ariaLabel = "Loading",
  ...rest
}: SkeletonProps) {
  return (
    <div
      className={[styles.skeleton, className].filter(Boolean).join(" ")}
      style={{
        ...(width != null ? { width } : {}),
        ...(height != null ? { height } : {}),
        ...style,
      }}
      aria-busy="true"
      aria-label={ariaLabel}
      role="status"
      {...rest}
    />
  );
}

export default Skeleton;
