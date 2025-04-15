
import { useEffect, useState } from "react";

export const useThemeToggle = () => {
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
    mounted,
    toggleTheme: () => {}, // No-op function since we only use dark mode
  };
};

export default useThemeToggle;
