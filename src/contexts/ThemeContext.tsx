
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
  defaultTheme = "dark",
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
      forcedTheme="dark"
      {...props}
    >
      <InnerThemeProvider>{children}</InnerThemeProvider>
    </NextThemesProvider>
  );
}

function InnerThemeProvider({ children }: { children: ReactNode }) {
  const { theme, isDark, toggleTheme, mounted } = useThemeToggle();

  // Create context value with added setTheme function to match expected interface
  const value = {
    theme,
    setTheme: () => {}, // No-op function since we're forcing dark mode
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
