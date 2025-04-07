
import { useState, useCallback } from "react";
import { useIsMobile } from "./use-mobile";

export function useMobileMenu() {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
