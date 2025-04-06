
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useThemeToggle } from "@/hooks/useThemeToggle";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: string;
  storageKey?: string;
};

type ThemeContextType = {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // Ensure mounting state is tracked for client-side rendering
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <NextThemesProvider
      defaultTheme={defaultTheme}
      storageKey={storageKey}
      {...props}
    >
      <InnerThemeProvider>{children}</InnerThemeProvider>
    </NextThemesProvider>
  );
}

function InnerThemeProvider({ children }: { children: ReactNode }) {
  const { theme, setTheme, isDark, toggleTheme } = useThemeToggle();

  // Create context value
  const value = {
    theme,
    setTheme,
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
