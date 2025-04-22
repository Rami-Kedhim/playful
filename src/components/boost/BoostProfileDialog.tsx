
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
  onSuccess,
  buttonText = "Boost Profile",
  buttonVariant = "outline",
  buttonSize = "sm"
}: BoostProfileDialogProps) => {
  return (
    <BoostDialogContainer
      profileId={profileId}
      onSuccess={onSuccess}
      buttonText={buttonText}
      buttonVariant={buttonVariant}
      buttonSize={buttonSize}
    />
  );
};

export default BoostProfileDialog;
