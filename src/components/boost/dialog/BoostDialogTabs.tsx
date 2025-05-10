
import React from 'react';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BoostEligibilityCheck from '../BoostEligibilityCheck';
import BoostPackageList from './BoostPackageList';
import { BoostEligibility, BoostPackage, BoostStatus } from '@/types/pulse-boost';

interface BoostEligibilityCheckProps {
  eligibility: {
    eligible: boolean;
    reason: string;
    reasons: string[];
    nextEligibleTime?: string;
  };
  onClose?: () => void;
}

interface BoostDialogTabsProps {
  boostStatus: BoostStatus | null;
  packages: BoostPackage[];
  eligibility: BoostEligibility | null;
  onBoostSuccess: () => void;
  profileId?: string;
}

const BoostDialogTabs: React.FC<BoostDialogTabsProps> = ({
  boostStatus,
  packages,
  eligibility,
  onBoostSuccess,
  profileId
}) => {
  const [activeTab, setActiveTab] = React.useState('boost-packages');

  const renderEligibility = () => {
    if (!eligibility) return null;
    
    return (
      <div className="mb-4">
        <BoostEligibilityCheck 
          eligibility={{ 
            eligible: eligibility.eligible, 
            reason: eligibility.reason,
            reasons: eligibility.reasons || [],
            nextEligibleTime: eligibility.nextEligibleTime
          }}
          onClose={() => {}} // Add an empty function to satisfy the prop requirement
        />
      </div>
    );
  };

  return (
    <>
      {renderEligibility()}
      <TabsList className="w-full">
        <TabsTrigger value="boost-packages" onClick={() => setActiveTab('boost-packages')}>Boost Packages</TabsTrigger>
        <TabsTrigger value="boost-status" onClick={() => setActiveTab('boost-status')}>Boost Status</TabsTrigger>
      </TabsList>

      <TabsContent value="boost-packages" className="mt-2">
        <BoostPackageList
          packages={packages}
          selectedPackage={null}
          onSelectPackage={() => {}}
          formatBoostDuration={(duration) => duration}
          getBoostPrice={() => 0}
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
