
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Zap } from "lucide-react";
import BoostDialogContainer from '@/components/boost/BoostDialogContainer';
import { useAuth } from '@/hooks/auth';

interface BoostProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileId?: string;
}

const BoostProfileDialog: React.FC<BoostProfileDialogProps> = ({
  open,
  onOpenChange,
  profileId
}) => {
  const { user } = useAuth();
  const userId = profileId || user?.id;
  
  const handleBoostSuccess = async () => {
    // Simulate success after boosting
    return true;
  };

  if (!userId) {
    return null;
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Boost Your Profile</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-center text-muted-foreground mb-6">
            Get more visibility and appear higher in search results with a profile boost.
          </p>
          
          <BoostDialogContainer 
            profileId={userId} 
            onSuccess={handleBoostSuccess}
            buttonText="Boost Now"
            buttonVariant="default"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BoostProfileDialog;
