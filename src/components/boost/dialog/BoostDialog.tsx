
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Zap } from 'lucide-react';
import BoostDialogTabs from './BoostDialogTabs';
import { BoostEligibility, BoostStatus, BoostPackage } from '@/types/pulse-boost';

interface BoostDialogProps {
  profileId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boostStatus: BoostStatus;
  eligibility: BoostEligibility;
  packages: BoostPackage[];
  onBoost: (packageId: string) => Promise<boolean>;
  onCancel: () => Promise<boolean>;
  selectedPackage: string;
  setSelectedPackage: (id: string) => void;
}

const BoostDialog: React.FC<BoostDialogProps> = ({
  profileId,
  open,
  onOpenChange,
  boostStatus,
  eligibility,
  packages,
  onBoost,
  onCancel,
  selectedPackage,
  setSelectedPackage
}) => {
  const handleSuccess = async () => {
    if (selectedPackage) {
      return onBoost(selectedPackage);
    }
    return false;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-primary" />
            Boost Profile
          </DialogTitle>
        </DialogHeader>

        <BoostDialogTabs
          boostStatus={boostStatus}
          packages={packages}
          eligibility={eligibility}
          onSuccess={handleSuccess}
          profileId={profileId}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BoostDialog;
