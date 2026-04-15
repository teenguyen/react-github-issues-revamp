"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ThemeToggle } from "./components/theme-toggle";
import styles from "./theme-provider.module.css";

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
  const [loading, setLoading] = useState(true);
  const appliedSystemPreference = useRef(false);

  useLayoutEffect(() => {
    if (!appliedSystemPreference.current) {
      appliedSystemPreference.current = true;
      const initial = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      setTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
      setLoading(false);
      return;
    }
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, isDark: theme === "dark" }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {loading ? (
        <div
          className={styles.loadingOverlay}
          aria-busy="true"
          aria-live="polite"
        >
          <span className="sr-only">Loading…</span>
          <div className={styles.spinner} aria-hidden />
        </div>
      ) : null}
      {children}
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </ThemeContext.Provider>
  );
}
