
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Zap, CheckCircle, XCircle, Info } from "lucide-react";
import { BoostStatus, BoostEligibility, HermesBoostStatus } from "./types";
import BoostPackages from "./dialog/BoostPackages";
import BoostEligibilityCheck from "./dialog/BoostEligibilityCheck";
import BoostActivePackage from "./dialog/BoostActivePackage";
import HermesBoostInfo from "./dialog/HermesBoostInfo";

interface BoostDialogTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  boostStatus: BoostStatus;
  eligibility: BoostEligibility;
  boostPackages: any[];
  selectedPackage: string | null;
  setSelectedPackage: (packageId: string) => void;
  handlePurchase: () => Promise<boolean>;
  handleCancel: () => Promise<boolean>;
  handleDialogClose: () => void;
  boostAnalytics: any;
  formatBoostDuration: (duration: string) => string;
  getBoostPrice: () => number;
  loading: boolean;
  dailyBoostUsage?: number;
  dailyBoostLimit?: number;
  hermesBoostStatus?: HermesBoostStatus;
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
  dailyBoostUsage = 0,
  dailyBoostLimit = 3,
  hermesBoostStatus
}: BoostDialogTabsProps) => {
  // Function to wrap and make handlePurchase return a boolean
  const handlePurchaseWrapper = async (): Promise<boolean> => {
    try {
      return await handlePurchase();
    } catch (error) {
      console.error("Error in handlePurchase:", error);
      return false;
    }
  };
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="packages" disabled={loading}>
          <Zap className="mr-2 h-4 w-4" />
          Boost Packages
        </TabsTrigger>
        <TabsTrigger value="eligibility" disabled={loading}>
          <Info className="mr-2 h-4 w-4" />
          Eligibility
        </TabsTrigger>
        <TabsTrigger value="active" disabled={loading}>
          {boostStatus.isActive ? (
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="mr-2 h-4 w-4" />
          )}
          Active Boost
        </TabsTrigger>
      </TabsList>

      <TabsContent value="packages" className="space-y-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Available Boost Packages</h3>
            <p className="text-sm text-muted-foreground">
              Select a package to boost your visibility
            </p>
          </div>
          <Badge variant="outline" className="flex gap-1">
            <Zap className="h-3 w-3" />
            {dailyBoostUsage}/{dailyBoostLimit} today
          </Badge>
        </div>

        <BoostPackages 
          boostPackages={boostPackages} 
          selectedPackage={selectedPackage || ""} 
          onSelectPackage={setSelectedPackage}
          formatDuration={formatBoostDuration} 
          disabled={loading || !eligibility.eligible} 
        />
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button 
            onClick={handlePurchaseWrapper}
            disabled={!selectedPackage || loading || !eligibility.eligible}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              <>
                Purchase Boost
                {getBoostPrice() > 0 && ` (${getBoostPrice()} UBX)`}
              </>
            )}
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="eligibility" className="space-y-4 py-4">
        <BoostEligibilityCheck 
          eligibility={eligibility} 
          loading={loading}
        />
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleDialogClose}>
            Close
          </Button>
          <Button 
            onClick={() => setActiveTab("packages")}
            disabled={!eligibility.eligible || loading}
          >
            View Packages
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="active" className="space-y-4 py-4">
        <BoostActivePackage 
          boostStatus={boostStatus}
          handleCancel={handleCancel}
          analytics={boostAnalytics}
          loading={loading}
        />
        
        {hermesBoostStatus && (
          <HermesBoostInfo hermesStatus={hermesBoostStatus} />
        )}
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleDialogClose}>
            Close
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default BoostDialogTabs;
