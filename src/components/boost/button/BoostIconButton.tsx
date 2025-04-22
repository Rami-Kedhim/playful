
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import BoostProfileDialog from '../BoostProfileDialog';
import { useBoost } from '@/hooks/boost/useBoost';

interface BoostIconButtonProps {
  profileId?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const BoostIconButton: React.FC<BoostIconButtonProps> = ({
  profileId,
  variant = "outline",
  size = "icon",
  className = ""
}) => {
  const [open, setOpen] = useState(false);
  const { isActive } = useBoost();
  
  const handleClick = () => {
    setOpen(true);
  };
  
  const handleSuccess = () => {
    // Refresh boost status or perform other actions
  };
  
  return (
    <>
      <Button 
        onClick={handleClick} 
        variant={variant} 
        size={size} 
        className={`${className} ${isActive ? 'text-yellow-500 border-yellow-500 hover:bg-yellow-500/10' : ''}`}
      >
        <Zap 
          className={`h-4 w-4 ${isActive ? 'fill-yellow-500' : ''}`} 
        />
        <span className="sr-only">Boost Profile</span>
      </Button>
      
      {open && (
        <BoostProfileDialog
          profileId={profileId}
          onSuccess={handleSuccess}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default BoostIconButton;
