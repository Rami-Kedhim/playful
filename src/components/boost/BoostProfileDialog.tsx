
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import BoostDialogContainer from "./BoostDialogContainer";
import { BoostDialogContainerProps } from './types';

interface BoostProfileDialogProps {
  profileId: string;
  onSuccess?: () => void;
  buttonText?: string;
  buttonVariant?: string; 
  buttonSize?: string;
}

const BoostProfileDialog = ({ 
  profileId, 
  onSuccess = () => {},
  buttonText = "Boost Profile",
  buttonVariant = "outline",
  buttonSize = "sm"
}: BoostProfileDialogProps) => {
  // Create a wrapper function that accepts the boolean result and calls onSuccess
  const handleSuccess = async () => {
    await onSuccess();
    return true; // Return true to satisfy the Promise<boolean> requirement
  };

  return (
    <BoostDialogContainer
      profileId={profileId}
      onSuccess={handleSuccess}
      buttonProps={{
        text: buttonText,
        variant: buttonVariant,
        size: buttonSize
      }}
    />
  );
};

export default BoostProfileDialog;
