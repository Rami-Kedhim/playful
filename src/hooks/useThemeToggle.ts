
import { useEffect, useState } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

export function useThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  
  // Forcibly apply dark mode
  const isDark = true;
  
  useEffect(() => {
    setMounted(true);
    
    // Ensure dark theme is always set
    if (resolvedTheme !== 'dark') {
      setTheme('dark');
    }
  }, [resolvedTheme, setTheme]);
  
  // Toggle function (no-op since we're forcing dark mode)
  const toggleTheme = () => {
    console.log('Theme toggle attempted, but dark mode is forced');
  };
  
  return {
    theme: 'dark',
    isDark,
    toggleTheme,
    mounted,
    setTheme: () => {
      console.log('Theme change attempted, but dark mode is forced');
    }
  };
}

export default useThemeToggle;
