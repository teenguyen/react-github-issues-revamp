import clsx from "clsx";
import {
  useCallback,
  useState,
  type AnimationEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Moon, Sun } from "react-feather";
import type { Theme } from "../theme-provider";
import styles from "./theme-toggle.module.css";

type ToggleAnimPhase = "idle" | "exiting" | "entering";

export type ThemeToggleProps = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  const [toggleAnimPhase, setToggleAnimPhase] =
    useState<ToggleAnimPhase>("idle");

  const handleToggle = useCallback(() => {
    if (toggleAnimPhase !== "idle") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme((t) => (t === "dark" ? "light" : "dark"));
      return;
    }
    setToggleAnimPhase("exiting");
  }, [setTheme, toggleAnimPhase]);

  const handleToggleIconAnimationEnd = useCallback(
    (event: AnimationEvent<HTMLSpanElement>) => {
      if (event.target !== event.currentTarget) return;
      if (toggleAnimPhase === "exiting") {
        setTheme((t) => (t === "dark" ? "light" : "dark"));
        setToggleAnimPhase("entering");
      } else if (toggleAnimPhase === "entering") {
        setToggleAnimPhase("idle");
      }
    },
    [setTheme, toggleAnimPhase],
  );

  const moonExit = toggleAnimPhase === "exiting" && theme === "light";
  const moonEnter = toggleAnimPhase === "entering" && theme === "light";
  const sunExit = toggleAnimPhase === "exiting" && theme === "dark";
  const sunEnter = toggleAnimPhase === "entering" && theme === "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      data-phase={toggleAnimPhase}
      data-theme={theme}
      onClick={handleToggle}
      aria-busy={toggleAnimPhase !== "idle"}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      <span className={styles.iconViewport}>
        <span
          className={clsx(
            styles.iconLayer,
            styles.sunLayer,
            sunExit && styles.animExit,
            sunEnter && styles.animEnter,
          )}
          onAnimationEnd={handleToggleIconAnimationEnd}
          aria-hidden
        >
          <Sun size={18} strokeWidth={2} />
        </span>
        <span
          className={clsx(
            styles.iconLayer,
            styles.moonLayer,
            moonExit && styles.animExit,
            moonEnter && styles.animEnter,
          )}
          onAnimationEnd={handleToggleIconAnimationEnd}
          aria-hidden
        >
          <Moon size={18} strokeWidth={2} />
        </span>
      </span>
    </button>
  );
}
