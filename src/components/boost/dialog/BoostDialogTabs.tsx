import React from 'react';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BoostEligibilityCheck from '../BoostEligibilityCheck';
import BoostPackageList from './BoostPackageList';
import { BoostEligibility, BoostPackage, BoostStatus } from '@/types/pulse-boost';

interface BoostDialogTabsProps {
  boostStatus: BoostStatus | null;
  packages: BoostPackage[];
  eligibility: BoostEligibility | null;
  onBoostSuccess: () => void;
  profileId?: string;
}

const BoostDialogTabs = ({
  boostStatus,
  packages,
  eligibility,
  onBoostSuccess,
  profileId
}) => {

  const renderEligibility = () => {
    if (!eligibility) return null;
    
    return (
      <div className="mb-4">
        <BoostEligibilityCheck 
          eligibility={{ 
            eligible: eligibility.eligible, 
            reason: eligibility.reason,
            reasons: eligibility.reasons,
            nextEligibleTime: eligibility.nextEligibleTime
          }} 
        />
      </div>
    );
  };

  

  return (
    <>
      {renderEligibility()}
      <TabsList className="w-full">
        <TabsTrigger value="boost-packages">Boost Packages</TabsTrigger>
        <TabsTrigger value="boost-status">Boost Status</TabsTrigger>
      </TabsList>

      <TabsContent value="boost-packages" className="mt-2">
        <BoostPackageList
          packages={packages}
          eligibility={eligibility}
          onBoostSuccess={onBoostSuccess}
          profileId={profileId}
        />
      </TabsContent>

      <TabsContent value="boost-status" className="mt-2">
        {boostStatus ? (
          <div>
            <p>Active Boost: {boostStatus.packageName}</p>
            <p>Expires: {boostStatus.expiresAt?.toLocaleDateString()}</p>
          </div>
        ) : (
          <p>No active boost</p>
        )}
      </TabsContent>
    </>
  );
};

export default BoostDialogTabs;
