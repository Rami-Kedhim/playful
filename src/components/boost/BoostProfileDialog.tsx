
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useBoostDialog } from '@/hooks/boost/useBoostDialog';
import BoostDialogTabs from './dialog/BoostDialogTabs';
import { BoostProfileDialogProps } from '@/types/boost';
import { Loader2 } from 'lucide-react';

const BoostProfileDialog: React.FC<BoostProfileDialogProps> = ({ 
  profileId = '',
  onSuccess,
  open,
  setOpen
}) => {
  const [loading, setLoading] = useState(false);
  
  const {
    activeTab,
    setActiveTab,
    selectedPackage,
    setSelectedPackage,
    boostStatus,
    eligibility,
    boostPackages,
    dailyBoostUsage,
    dailyBoostLimit,
    hermesStatus,
    handleBoost: handleBoostAction,
    cancelBoost,
    formatBoostDuration,
    getBoostPrice,
    loading: hookLoading,
    error
  } = useBoostDialog(profileId);
  
  // Handle boost purchase
  const handleBoost = async () => {
    setLoading(true);
    const success = await handleBoostAction();
    setLoading(false);
    
    if (success) {
      if (onSuccess) {
        onSuccess();
      }
      setOpen(false);
    }
  };
  
  // Handle cancel
  const handleCancel = async () => {
    setLoading(true);
    const success = await cancelBoost();
    setLoading(false);
    
    if (success && onSuccess) {
      onSuccess();
    }
    
    return success;
  };

  // Loading state
  if (hookLoading) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <div className="min-h-[300px] flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p className="text-muted-foreground">Loading boost data...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {boostStatus?.isActive ? 'Active Boost' : 'Boost Your Profile'}
          </DialogTitle>
          <DialogDescription>
            {boostStatus?.isActive
              ? 'Manage your active boost and check analytics'
              : 'Increase visibility and get more views with profile boosting'
            }
          </DialogDescription>
        </DialogHeader>
        
        <BoostDialogTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          loading={loading}
          boostStatus={boostStatus}
          eligibility={eligibility}
          boostPackages={boostPackages}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
          handleBoost={handleBoost}
          handleCancel={handleCancel}
          dailyBoostUsage={dailyBoostUsage}
          dailyBoostLimit={dailyBoostLimit}
          hermesStatus={hermesStatus}
          formatBoostDuration={formatBoostDuration}
          getBoostPrice={getBoostPrice}
          handleDialogClose={() => setOpen(false)}
          onBoostSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BoostProfileDialog;
