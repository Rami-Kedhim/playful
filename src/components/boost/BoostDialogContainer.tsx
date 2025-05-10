
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import BoostDialog from './BoostDialog';
import { BoostStatus, HermesStatus, BoostEligibility } from '@/types/pulse-boost';

interface BoostDialogContainerProps {
  profileId: string;
  onSuccess?: () => Promise<boolean>;
  buttonText?: string;
  buttonVariant?: string;
  buttonSize?: string;
  buttonProps?: {
    text: string;
    variant: string;
    size: string;
  };
}

const BoostDialogContainer: React.FC<BoostDialogContainerProps> = ({
  profileId,
  onSuccess,
  buttonText = "Boost Profile",
  buttonVariant = "default",
  buttonSize = "default",
  buttonProps
}) => {
  const [open, setOpen] = useState(false);
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    expiresAt: "",
    remainingDays: 0,
    boostLevel: 0,
    isExpiring: false,
    progress: 0,
    timeRemaining: "00:00:00",
    remainingTime: "00:00:00"
  });
  
  const [hermesStatus, setHermesStatus] = useState<HermesStatus>({
    score: 0,
    recommendations: [],
    lastUpdated: new Date(),
    position: 0, 
    activeUsers: 0,
    estimatedVisibility: 0,
    lastUpdateTime: "",
    boostScore: 0,
    effectivenessScore: 0
  });
  
  const [eligibility, setEligibility] = useState<BoostEligibility>({
    eligible: true,
    reason: "",
    reasons: []
  });

  const fetchBoostStatus = useCallback(async () => {
    // In a real implementation, fetch from an API
    // This is a mock implementation
    setTimeout(() => {
      setBoostStatus({
        isActive: false,
        expiresAt: "",
        remainingDays: 0,
        boostLevel: 0,
        isExpiring: false,
        progress: 0,
        timeRemaining: "00:00:00",
        remainingTime: "00:00:00"
      });
      
      setHermesStatus({
        score: 0,
        recommendations: [],
        lastUpdated: new Date(),
        position: 0, 
        activeUsers: 0,
        estimatedVisibility: 0,
        lastUpdateTime: "",
        boostScore: 0,
        effectivenessScore: 0
      });
      
      setEligibility({
        eligible: true,
        reason: "",
        reasons: []
      });
    }, 500);
  }, []);

  useEffect(() => {
    if (open) {
      fetchBoostStatus();
    }
  }, [open, fetchBoostStatus]);

  const handleSuccess = async () => {
    if (onSuccess) {
      await onSuccess();
    }
    
    // Update boost status after success
    setBoostStatus({
      isActive: true,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toString(),
      remainingDays: 1,
      boostLevel: 1,
      isExpiring: false,
      progress: 0,
      timeRemaining: "24:00:00",
      remainingTime: "24:00:00"
    });
    
    setOpen(false);
  };

  // Determine button props
  const finalButtonText = buttonProps?.text || buttonText;
  const finalButtonVariant = buttonProps?.variant || buttonVariant;
  const finalButtonSize = buttonProps?.size || buttonSize;

  return (
    <>
      <Button
        variant={finalButtonVariant as any}
        size={finalButtonSize as any}
        onClick={() => setOpen(true)}
        className="gap-2"
      >
        <Zap className="h-4 w-4" />
        {finalButtonText}
      </Button>

      <BoostDialog
        profileId={profileId}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};

export default BoostDialogContainer;
