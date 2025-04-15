
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useThemeToggle = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Always apply dark theme classes
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  return {
    theme: 'dark',
    isDark: true,
    mounted: true,
    toggleTheme: () => {}, // No-op function
  };
};

export default useThemeToggle;
