
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import BoostPackages from './BoostPackages';
import BoostActivePackage from '../BoostActivePackage';
import BoostEligibilityCheck from '../BoostEligibilityCheck';
import HermesBoostInfo from './HermesBoostInfo';
import { BoostStatus, BoostEligibility, HermesStatus, BoostPackage } from '@/types/boost';

export interface BoostDialogTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loading: boolean;
  boostStatus: BoostStatus;
  eligibility: BoostEligibility;
  boostPackages: BoostPackage[];
  selectedPackage: string;
  setSelectedPackage: (id: string) => void;
  handleBoost: () => Promise<boolean> | void;
  handleCancel: () => Promise<boolean>;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  handleDialogClose: () => void;
  getBoostPrice?: () => number;
  hermesStatus: HermesStatus;
  formatBoostDuration?: (duration: string) => string;
}

const BoostDialogTabs: React.FC<BoostDialogTabsProps> = ({
  activeTab,
  setActiveTab,
  loading,
  boostStatus,
  eligibility,
  boostPackages,
  selectedPackage,
  setSelectedPackage,
  handleBoost,
  handleCancel,
  dailyBoostUsage,
  dailyBoostLimit,
  handleDialogClose,
  getBoostPrice,
  hermesStatus,
  formatBoostDuration
}) => {
  // When user is not eligible for boosting
  if (!eligibility.isEligible && !boostStatus.isActive) {
    return (
      <BoostEligibilityCheck
        eligibility={eligibility}
        onClose={handleDialogClose}
      />
    );
  }

  // Show active boost status if user has an active boost
  if (boostStatus.isActive) {
    return (
      <div className="space-y-4">
        <BoostActivePackage 
          boostStatus={boostStatus} 
          formatDuration={formatBoostDuration} 
          onCancel={handleCancel} 
        />
        
        <HermesBoostInfo
          hermesStatus={hermesStatus}
          isActive={true}
        />
      </div>
    );
  }

  // Default view - show boost packages
  return (
    <Tabs
      defaultValue="packages"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="packages">Packages</TabsTrigger>
        <TabsTrigger value="info">Info</TabsTrigger>
      </TabsList>
      
      <TabsContent value="packages" className="space-y-4 pt-4">
        <BoostPackages
          packages={boostPackages}
          selected={selectedPackage}
          onSelect={setSelectedPackage}
          onBoost={handleBoost}
          isLoading={loading}
          usageCount={dailyBoostUsage}
          dailyLimit={dailyBoostLimit}
          getPrice={getBoostPrice}
          formatDuration={formatBoostDuration}
        />
      </TabsContent>
      
      <TabsContent value="info" className="pt-4">
        <HermesBoostInfo
          hermesStatus={hermesStatus}
          isActive={false}
        />
      </TabsContent>
    </Tabs>
  );
};

export default BoostDialogTabs;
