
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useBoostPackages } from "@/hooks/boost/useBoostPackages";
import BoostDialogTabs from "./BoostDialogTabs";
import { Loader2 } from "lucide-react";

export interface BoostProfileDialogProps {
  profileId?: string;
  onSuccess?: () => void;
  onClose?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const BoostProfileDialog = ({ 
  profileId,
  onSuccess,
  onClose,
  open, 
  setOpen 
}: BoostProfileDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { boostStatus } = useBoostPackages(profileId);

  const handleSuccess = () => {
    toast({
      title: "Boost applied successfully!",
      description: "Your profile visibility has been increased.",
    });
    
    if (onSuccess) onSuccess();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Boost Your Profile</DialogTitle>
          <DialogDescription>
            Increase your profile's visibility and get more attention using Pulse Boost.
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <BoostDialogTabs onBoostSuccess={handleSuccess} profileId={profileId} />
          
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={loading}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BoostProfileDialog;
