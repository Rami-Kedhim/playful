
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface BoostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileId: string;
  onSuccess?: () => void;
  onCancel?: () => Promise<boolean>;
}

const BoostDialog: React.FC<BoostDialogProps> = ({
  open,
  onOpenChange,
  profileId,
  onSuccess,
  onCancel
}) => {
  const handleBoostClick = () => {
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleCancelClick = async () => {
    if (onCancel) {
      await onCancel();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <span>Boost Your Profile</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <p>
            Boosting your profile increases your visibility and helps you attract more viewers.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Basic Boost</h3>
              <p className="text-sm text-muted-foreground mb-4">4x visibility for 1 hour</p>
              <Button onClick={handleBoostClick} className="w-full">
                Boost for 500 UBX
              </Button>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Premium Boost</h3>
              <p className="text-sm text-muted-foreground mb-4">10x visibility for 2 hours</p>
              <Button onClick={handleBoostClick} className="w-full">
                Boost for 1000 UBX
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleCancelClick}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BoostDialog;
