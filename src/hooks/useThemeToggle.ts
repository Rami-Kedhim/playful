
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only enable theme switching on client-side
  useEffect(() => {
    setMounted(true);
    
    // Ensure dark mode is applied by default if no theme is set
    if (!theme) {
      setTheme("dark");
    }
    
    // Add transition classes to body for smooth theme transitions
    document.body.classList.add('transition-colors', 'duration-300');
    
  }, [theme, setTheme]);
  
  const toggleTheme = () => {
    if (!mounted) return;
    const newTheme = (resolvedTheme === "dark" || theme === "dark") ? "light" : "dark";
    setTheme(newTheme);
    console.log("Theme toggled to:", newTheme);
  };
  
  return {
    theme,
    setTheme,
    isDark: mounted && (resolvedTheme === "dark" || theme === "dark"),
    isLight: mounted && (resolvedTheme === "light" || theme === "light"),
    toggleTheme,
    mounted
  };
};
