
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BoostActivePackage from "./BoostActivePackage";
import BoostEligibilityMessage from "./BoostEligibilityMessage";
import BoostPackages from "./BoostPackages";
import HermesBoostInfo from "./HermesBoostInfo";
import { BoostStatus } from "@/types/boost";
import { HermesBoostStatus } from "@/hooks/boost/useHermesOxumBoost";
import { AnalyticsData } from "@/hooks/boost/useBoostAnalytics";

interface BoostDialogTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  boostStatus: BoostStatus;
  eligibility: { eligible: boolean; reason?: string };
  boostPackages: any[];
  selectedPackage: string | null;
  setSelectedPackage: (packageId: string) => void;
  handlePurchase: () => void;
  handleCancel: () => Promise<boolean>;
  handleDialogClose: () => void;
  boostAnalytics: AnalyticsData | null;
  formatBoostDuration: (duration: string) => string;
  getBoostPrice: () => number;
  loading: boolean;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  hermesBoostStatus: HermesBoostStatus | null;
}

const BoostDialogTabs = ({
  activeTab,
  setActiveTab,
  boostStatus,
  eligibility,
  boostPackages,
  selectedPackage,
  setSelectedPackage,
  handlePurchase,
  handleCancel,
  handleDialogClose,
  boostAnalytics,
  formatBoostDuration,
  getBoostPrice,
  loading,
  dailyBoostUsage,
  dailyBoostLimit,
  hermesBoostStatus
}: BoostDialogTabsProps) => {
  return (
    <Tabs 
      defaultValue="packages" 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="mt-2"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="packages">Boost Packages</TabsTrigger>
        <TabsTrigger value="active">Active Boost</TabsTrigger>
      </TabsList>
      
      <TabsContent value="packages" className="space-y-4 mt-4">
        {!eligibility.eligible ? (
          <BoostEligibilityMessage reason={eligibility.reason} />
        ) : (
          <BoostPackages
            packages={boostPackages}
            selectedPackage={selectedPackage}
            onSelectPackage={setSelectedPackage}
            formatBoostDuration={formatBoostDuration}
            getBoostPrice={getBoostPrice}
            dailyBoostUsage={dailyBoostUsage}
            dailyBoostLimit={dailyBoostLimit}
            onPurchase={handlePurchase}
            loading={loading}
            onCancel={handleDialogClose}
          />
        )}
      </TabsContent>
      
      <TabsContent value="active" className="space-y-4 mt-4">
        <BoostActivePackage 
          boostStatus={boostStatus}
          boostAnalytics={boostAnalytics}
          onCancel={handleCancel}
          dailyBoostUsage={dailyBoostUsage}
          dailyBoostLimit={dailyBoostLimit}
        />
        
        {/* Add Hermes Boost Info when active */}
        {boostStatus.isActive && (
          <HermesBoostInfo hermesData={hermesBoostStatus} />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default BoostDialogTabs;
