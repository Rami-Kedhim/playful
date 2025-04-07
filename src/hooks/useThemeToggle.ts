
import { useState, useEffect } from 'react';

interface UseThemeToggleReturn {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

export const useThemeToggle = (): UseThemeToggleReturn => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has a preference saved in local storage
    const savedTheme = localStorage.getItem('theme');
    
    // Check if user has OS preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme based on saved preference or OS preference
    const initialIsDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(initialIsDark);
    
    // Apply theme to document
    document.documentElement.classList.toggle('dark', initialIsDark);
    
    // Mark as mounted
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    // Apply new theme to document
    document.documentElement.classList.toggle('dark', newIsDark);
    
    // Save preference to local storage
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return {
    isDark,
    setIsDark,
    toggleTheme,
    mounted
  };
};

export default useThemeToggle;
