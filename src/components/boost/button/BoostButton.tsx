
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import BoostProfileDialog from '../BoostProfileDialog';
import { useBoost } from '@/hooks/boost/useBoost';

interface BoostButtonProps {
  profileId?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showStatus?: boolean;
}

const BoostButton: React.FC<BoostButtonProps> = ({
  profileId,
  variant = "default",
  size = "default",
  className = "",
  showStatus = false
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
        className={className}
      >
        <Zap className={`h-4 w-4 ${size === "default" || size === "lg" ? "mr-2" : ""}`} />
        {(size === "default" || size === "lg") && "Boost Profile"}
        {showStatus && isActive && (size === "default" || size === "lg") && " ✓"}
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

export default BoostButton;
