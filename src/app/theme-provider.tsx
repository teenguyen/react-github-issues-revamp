"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Moon, Sun } from "react-feather";
import styles from "./theme-toggle.module.css";

export type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  isDark: boolean;
} | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const appliedSystemPreference = useRef(false);

  useLayoutEffect(() => {
    if (!appliedSystemPreference.current) {
      appliedSystemPreference.current = true;
      const initial = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      setTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
      return;
    }
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ theme, isDark: theme === "dark" }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
      <button
        type="button"
        className={styles.toggle}
        onClick={toggle}
        aria-label={
          theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }
      >
        {theme === "dark" ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
      </button>
    </ThemeContext.Provider>
  );
}
