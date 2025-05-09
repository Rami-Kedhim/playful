
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: string;
  storageKey?: string;
  forcedTheme?: string;
  enableSystem?: boolean;
};

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  isDark: true,
  toggleTheme: () => {},
});

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "vite-ui-theme",
  forcedTheme = "dark", // Force dark mode for consistency
  enableSystem = false,
  ...props
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<string>(defaultTheme);
  const isDark = theme === "dark";

  // Ensure mounting state is tracked for client-side rendering
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Function to toggle theme (not used in this implementation since we're forcing dark mode)
  const toggleTheme = () => {
    // No-op since we're forcing dark mode
    console.log("Theme toggle attempted, but dark mode is forced");
  };

  // Function to set theme (not used in this implementation since we're forcing dark mode)
  const setTheme = (newTheme: string) => {
    // No-op since we're forcing dark mode
    console.log(`Theme change attempted to ${newTheme}, but dark mode is forced`);
  };

  const value = {
    theme: "dark",
    setTheme,
    isDark: true,
    toggleTheme,
  };

  return (
    <NextThemesProvider 
      defaultTheme={defaultTheme}
      storageKey={storageKey}
      forcedTheme={forcedTheme} 
      enableSystem={enableSystem}
      {...props}
    >
      <ThemeContext.Provider value={value}>
        {children}
      </ThemeContext.Provider>
    </NextThemesProvider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
