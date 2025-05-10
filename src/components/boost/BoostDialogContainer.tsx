
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import BoostDialog from './BoostDialog';

export interface BoostDialogContainerProps {
  profileId: string;
  onSuccess?: () => Promise<boolean>;
  buttonText?: string;
  buttonVariant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
  buttonSize?: "default" | "sm" | "lg" | "icon";
}

const BoostDialogContainer: React.FC<BoostDialogContainerProps> = ({
  profileId,
  onSuccess,
  buttonText = "Boost Profile",
  buttonVariant = "outline",
  buttonSize = "sm"
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setDialogOpen(true)}
        variant={buttonVariant}
        size={buttonSize}
      >
        <Zap className="mr-2 h-4 w-4" />
        {buttonText}
      </Button>
      
      <BoostDialog 
        profileId={profileId}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};

export default BoostDialogContainer;
