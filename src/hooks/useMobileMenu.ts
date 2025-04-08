
import { useState, useCallback } from 'react';

export default function useMobileMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);
  
  return {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu
  };
}
