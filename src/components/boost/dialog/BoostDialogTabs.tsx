
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BoostStatus, BoostEligibility, BoostPackage } from '@/types/pulse-boost';
import BoostActivePackage from './BoostActivePackage';
import BoostEligibilityMessage from './BoostEligibilityMessage';
import BoostPackages from './BoostPackages';

interface BoostDialogTabsProps {
  boostStatus: BoostStatus;
  eligibility: BoostEligibility;
  packages: BoostPackage[];
  profileId: string;
  onBoostSuccess: () => Promise<boolean>;
}

const BoostDialogTabs: React.FC<BoostDialogTabsProps> = ({
  boostStatus,
  eligibility,
  packages,
  profileId,
  onBoostSuccess
}) => {
  const [activeTab, setActiveTab] = useState(
    boostStatus.isActive ? 'active' : 'packages'
  );

  const formatExpiryTime = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    
    const expiryDate = typeof date === 'string' ? new Date(date) : date;
    return expiryDate.toLocaleString();
  };

  return (
    <Tabs
      defaultValue={boostStatus.isActive ? 'active' : 'packages'}
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="packages">Boost Packages</TabsTrigger>
        <TabsTrigger value="active">Active Boost</TabsTrigger>
      </TabsList>

      <TabsContent value="packages">
        {eligibility.eligible ? (
          <BoostPackages 
            packages={packages} 
            onBoost={onBoostSuccess} 
            profileId={profileId}
          />
        ) : (
          <BoostEligibilityMessage reason={eligibility.reason} />
        )}
      </TabsContent>

      <TabsContent value="active">
        <BoostActivePackage
          isActive={boostStatus.isActive}
          packageName={boostStatus.packageName || 'N/A'}
          expiresAt={formatExpiryTime(boostStatus.expiresAt)}
          progress={boostStatus.progress || 0}
          timeRemaining={boostStatus.timeRemaining || 'N/A'} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default BoostDialogTabs;
