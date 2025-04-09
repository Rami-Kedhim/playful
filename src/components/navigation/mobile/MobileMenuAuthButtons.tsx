
import React from "react";
import { Button } from "@/components/ui/button";

interface MobileMenuAuthButtonsProps {
  isAuthenticated: boolean;
  onClose: () => void;
  t: (key: string) => string;
}

const MobileMenuAuthButtons: React.FC<MobileMenuAuthButtonsProps> = ({ 
  isAuthenticated, 
  onClose,
  t
}) => {
  if (isAuthenticated) return null;
  
  const handleLoginClick = () => {
    onClose();
    window.location.href = '/auth';
  };

  const handleRegisterClick = () => {
    onClose();
    window.location.href = '/auth?tab=register';
  };
  
  return (
    <div className="mt-6 space-y-2">
      <Button
        variant="default"
        className="w-full"
        onClick={handleLoginClick}
      >
        {t('auth.login')}
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={handleRegisterClick}
      >
        {t('auth.register')}
      </Button>
    </div>
  );
};

export default MobileMenuAuthButtons;
