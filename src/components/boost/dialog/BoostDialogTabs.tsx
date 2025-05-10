
import React from 'react';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BoostEligibilityCheck from '../BoostEligibilityCheck';
import BoostPackages from './BoostPackages';
import BoostStatus from './BoostStatus';
import { BoostEligibility, BoostPackage, BoostStatus as BoostStatusType } from '@/types/pulse-boost';

interface BoostDialogTabsProps {
  packages: BoostPackage[];
  eligibility: BoostEligibility;
  boostStatus: BoostStatusType | null;
  profileId: string;
  onBoostSuccess: () => Promise<boolean>;
}

const BoostDialogTabs: React.FC<BoostDialogTabsProps> = ({
  packages,
  eligibility,
  boostStatus,
  profileId,
  onBoostSuccess
}) => {
  const handleClose = () => {
    // Implementation for close action
  };

  return (
    <div className="space-y-4">
      <BoostEligibilityCheck 
        eligibility={{ 
          eligible: eligibility.eligible,
          reasons: eligibility.reasons || [],
          // Convert Date objects to strings if needed
          nextEligibleTime: typeof eligibility.nextEligibleTime === 'string' 
            ? eligibility.nextEligibleTime 
            : eligibility.nextEligibleTime?.toString() || ''
        }} 
        onClose={handleClose} 
      />
      
      <TabsList className="w-full">
        <TabsTrigger value="packages">Boost Packages</TabsTrigger>
        <TabsTrigger value="status">Boost Status</TabsTrigger>
      </TabsList>
      
      <TabsContent value="packages">
        <BoostPackages 
          packages={packages} 
          onBoost={onBoostSuccess} 
        />
      </TabsContent>
      
      <TabsContent value="status">
        <BoostStatus boostStatus={boostStatus} />
      </TabsContent>
    </div>
  );
};

export default BoostDialogTabs;
