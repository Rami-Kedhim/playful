
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only enable theme switching on client-side
  useEffect(() => {
    setMounted(true);
    
    // Apply transition classes to body for smooth theme transitions
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.add('transition-colors', 'duration-300');
      
      // Add a class for theme change animations
      document.documentElement.classList.add('theme-transition');
      
      const transitionEndHandler = () => {
        document.documentElement.classList.remove('theme-transition');
      };
      
      document.documentElement.addEventListener('transitionend', transitionEndHandler);
      
      return () => {
        document.documentElement.removeEventListener('transitionend', transitionEndHandler);
      };
    }
    
  }, []);
  
  // Apply the theme class to document element separately
  useEffect(() => {
    if (resolvedTheme && mounted) {
      document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
      
      // Apply transition class for animation
      document.documentElement.classList.add('theme-transition');
      
      // Remove the class after animation completes
      const timeout = setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [resolvedTheme, mounted]);
  
  const toggleTheme = () => {
    if (!mounted) return;
    
    // Add transition class before changing theme
    document.documentElement.classList.add('theme-transition');
    
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

export default useThemeToggle;
