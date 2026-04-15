"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { ThemeToggle } from "./components/theme-toggle";

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

function getSystemThemeSnapshot(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

function subscribeToSystemTheme(onStoreChange: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function useSystemTheme(): Theme {
  return useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemThemeSnapshot,
    getServerThemeSnapshot,
  );
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const systemTheme = useSystemTheme();
  const [themeOverride, setThemeOverride] = useState<Theme | null>(null);
  const theme = themeOverride ?? systemTheme;

  const setTheme = useCallback<Dispatch<SetStateAction<Theme>>>(
    (nextTheme) => {
      setThemeOverride((prevTheme) => {
        const currentTheme = prevTheme ?? systemTheme;
        return typeof nextTheme === "function"
          ? nextTheme(currentTheme)
          : nextTheme;
      });
    },
    [systemTheme],
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, isDark: theme === "dark" }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </ThemeContext.Provider>
  );
}
