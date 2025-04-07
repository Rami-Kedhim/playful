
import { useState, useEffect } from 'react';

interface UseThemeToggleReturn {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  toggleTheme: () => void;
  mounted: boolean;
  theme: string;
  setTheme: (theme: string) => void;
}

export const useThemeToggle = (): UseThemeToggleReturn => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [theme, setInternalTheme] = useState<string>("light");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has a preference saved in local storage
    const savedTheme = localStorage.getItem('theme');
    
    // Check if user has OS preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme based on saved preference or OS preference
    const initialIsDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(initialIsDark);
    setInternalTheme(initialIsDark ? 'dark' : 'light');
    
    // Apply theme to document
    document.documentElement.classList.toggle('dark', initialIsDark);
    
    // Mark as mounted
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    setInternalTheme(newIsDark ? 'dark' : 'light');
    
    // Apply new theme to document
    document.documentElement.classList.toggle('dark', newIsDark);
    
    // Save preference to local storage
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  const setTheme = (newTheme: string) => {
    const newIsDark = newTheme === 'dark';
    setIsDark(newIsDark);
    setInternalTheme(newTheme);
    
    // Apply new theme to document
    document.documentElement.classList.toggle('dark', newIsDark);
    
    // Save preference to local storage
    localStorage.setItem('theme', newTheme);
  };

  return {
    isDark,
    setIsDark,
    toggleTheme,
    mounted,
    theme,
    setTheme
  };
};

export default useThemeToggle;
