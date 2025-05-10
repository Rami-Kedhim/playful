import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BoostDialogTabs from './BoostDialogTabs';
import { useBoostPackages } from '@/hooks/boost/useBoostPackages';
import { BoostEligibility, BoostStatus, HermesStatus } from '@/types/pulse-boost';

interface BoostDialogContainerProps {
  profileId?: string;
  buttonText?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  onSuccess?: () => Promise<boolean> | boolean;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const BoostDialogContainer = ({ 
  profileId, 
  buttonText = "Boost Profile", 
  buttonVariant = "default",
  onSuccess,
  disabled = false,
  className = "",
  fullWidth = false,
}: BoostDialogContainerProps) => {
  const [open, setOpen] = useState(false);
  
  // Fix the type issues by ensuring we're using numbers where required
  const initialBoostStatus: BoostStatus = {
    isActive: false,
    expiresAt: new Date().toISOString(),
    remainingDays: 0, // Ensure this is a number
    boostLevel: 0,    // Ensure this is a number
    isExpiring: false
  };
  
  const [boostStatus, setBoostStatus] = useState<BoostStatus>(initialBoostStatus);
  
  // Fix the hermesStatus to match the type definition
  const initialHermesStatus: HermesStatus = {
    score: 0,
    recommendations: [],
    lastUpdated: new Date().toISOString()
  };
  
  const [hermesStatus, setHermesStatus] = useState<HermesStatus>(initialHermesStatus);
  
  const { packages, loading: packagesLoading, error: packagesError } = useBoostPackages();
  
  const initialBoostEligibility: BoostEligibility = {
    eligible: false,
    reasons: [],
    requirements: {
      profileCompletion: false,
      verification: false,
      mediaUploaded: false
    }
  };
  
  const [boostEligibility, setBoostEligibility] = useState<BoostEligibility>(initialBoostEligibility);
  
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };
  
  const handleBoostSuccess = async () => {
    if (onSuccess) {
      await onSuccess();
    }
    setOpen(false);
  };
  
  // When resetting boostStatus, make sure to use the correct type
  const resetBoostStatus = () => {
    setBoostStatus({
      isActive: false,
      expiresAt: new Date().toISOString(),
      remainingDays: 0,
      boostLevel: 0,
      isExpiring: false
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={fullWidth ? "max-w-none" : "max-w-md"}>
        <DialogHeader>
          <DialogTitle>Boost Your Profile</DialogTitle>
        </DialogHeader>
        <BoostDialogTabs
          profileId={profileId}
          packages={packages || []}
          boostStatus={boostStatus}
          hermesStatus={hermesStatus}
          boostEligibility={boostEligibility}
          onSuccess={handleBoostSuccess}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BoostDialogContainer;
