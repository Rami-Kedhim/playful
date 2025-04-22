
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import BoostDialogContainer from "@/components/boost/BoostDialogContainer";
import { toast } from '@/hooks/use-toast';

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
    try {
      // Call the onSuccess callback from props
      onSuccess();
      
      // Show success toast
      toast({
        title: "Profile boosted!",
        description: "Your profile boost has been activated successfully.",
      });
      
      return true; // Return true to satisfy the Promise<boolean> requirement
    } catch (error) {
      console.error("Error in boost success handler:", error);
      return false;
    }
  };

  return (
    <BoostDialogContainer
      profileId={profileId}
      onSuccess={handleSuccess}
      buttonText={buttonText}
      buttonVariant={buttonVariant}
      buttonSize={buttonSize}
    />
  );
};

export default BoostProfileDialog;
