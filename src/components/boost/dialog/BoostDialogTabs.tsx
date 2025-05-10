
import React from 'react';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BoostEligibilityCheck from '../BoostEligibilityCheck';
import BoostPackages from './BoostPackages';
import { BoostEligibility, BoostStatus, BoostPackage } from '@/types/pulse-boost';

export interface BoostDialogTabsProps {
  boostStatus: BoostStatus | null;
  packages: BoostPackage[];
  boostEligibility?: BoostEligibility | null;
  eligibility?: BoostEligibility | null;
  onSuccess?: () => void | Promise<void>;
  onBoostSuccess?: () => Promise<boolean>;
  profileId?: string;
  onClose: (open?: boolean) => void;
}

const BoostDialogTabs: React.FC<BoostDialogTabsProps> = ({
  boostStatus,
  packages,
  boostEligibility,
  eligibility,
  onSuccess,
  onBoostSuccess,
  profileId,
  onClose
}) => {
  const [activeTab, setActiveTab] = React.useState('boost-packages');

  // Use either boostEligibility or eligibility, prioritizing boostEligibility
  const eligibilityData = boostEligibility || eligibility;

  const renderEligibility = () => {
    if (!eligibilityData) return null;
    
    return (
      <div className="mb-4">
        <BoostEligibilityCheck 
          eligibility={{ 
            eligible: eligibilityData.eligible, 
            reasons: eligibilityData.reasons || [],
            nextEligibleTime: eligibilityData.nextEligibleTime
          }}
          onClose={() => onClose()}
        />
      </div>
    );
  };

  // Create a wrapper function that safely handles the promise
  const handleSuccess = async () => {
    if (onSuccess) {
      const result = onSuccess();
      // If it returns a promise, await it, otherwise just return
      if (result instanceof Promise) {
        await result;
      }
    }
  };

  // Create a wrapper for onBoostSuccess that returns void
  const handleBoostSuccess = async () => {
    if (onBoostSuccess) {
      await onBoostSuccess();
    }
  };

  return (
    <>
      {renderEligibility()}
      <TabsList className="w-full">
        <TabsTrigger value="boost-packages" onClick={() => setActiveTab('boost-packages')}>Boost Packages</TabsTrigger>
        <TabsTrigger value="boost-status" onClick={() => setActiveTab('boost-status')}>Boost Status</TabsTrigger>
      </TabsList>

      <TabsContent value="boost-packages" className="mt-2">
        <BoostPackages
          packages={packages}
          profileId={profileId || ''}
          onSuccess={handleSuccess}
          onBoost={handleBoostSuccess}
        />
      </TabsContent>

      <TabsContent value="boost-status" className="mt-2">
        {boostStatus ? (
          <div>
            <p>Active Boost: {boostStatus.packageName}</p>
            <p>Expires: {boostStatus.expiresAt?.toString()}</p>
          </div>
        ) : (
          <p>No active boost</p>
        )}
      </TabsContent>
    </>
  );
};

export default BoostDialogTabs;
