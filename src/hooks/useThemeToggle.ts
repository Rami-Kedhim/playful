
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only enable theme switching on client-side
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  return {
    theme,
    setTheme,
    isDark: mounted && theme === "dark",
    isLight: mounted && theme === "light",
    toggleTheme,
    mounted
  };
};
