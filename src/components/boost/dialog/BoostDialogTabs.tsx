
import React from 'react';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BoostEligibilityCheck from '../BoostEligibilityCheck';
import BoostPackages from './BoostPackages';
import { BoostEligibility, BoostStatus, BoostPackage } from '@/types/pulse-boost';

interface BoostDialogTabsProps {
  boostStatus: BoostStatus | null;
  packages: BoostPackage[];
  boostEligibility: BoostEligibility | null;
  onSuccess: () => void;
  profileId?: string;
  onClose: () => void;
}

const BoostDialogTabs: React.FC<BoostDialogTabsProps> = ({
  boostStatus,
  packages,
  boostEligibility,
  onSuccess,
  profileId,
  onClose
}) => {
  const [activeTab, setActiveTab] = React.useState('boost-packages');

  const renderEligibility = () => {
    if (!boostEligibility) return null;
    
    return (
      <div className="mb-4">
        <BoostEligibilityCheck 
          eligibility={{ 
            eligible: boostEligibility.eligible, 
            reasons: boostEligibility.reasons || [],
            nextEligibleTime: boostEligibility.nextEligibleTime
          }}
          onClose={onClose}
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
        <BoostPackages
          packages={packages}
          profileId={profileId || ''}
          onSuccess={onSuccess}
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
