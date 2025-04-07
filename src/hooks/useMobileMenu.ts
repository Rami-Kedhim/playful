
import { useState, useCallback, useEffect } from "react";
import { useIsMobile } from "./use-mobile";
import { useLocation } from "react-router-dom";

/**
 * Hook for managing mobile menu state and behaviors
 * Provides automatic closing on route changes and responsive detection
 */
export function useMobileMenu() {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname, isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return {
    isMobile,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu
  };
}

export default useMobileMenu;
