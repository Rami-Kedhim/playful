
import { useState, useCallback } from 'react';

interface UseMobileMenuReturn {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;
}

const useMobileMenu = (): UseMobileMenuReturn => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu
  };
};

export default useMobileMenu;
