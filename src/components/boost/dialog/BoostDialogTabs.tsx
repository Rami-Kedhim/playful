
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Zap, BarChart2, Clock, XCircle } from "lucide-react";
import BoostPackages from "./BoostPackages";
import BoostActivePackage from "./BoostActivePackage";
import BoostEligibilityCheck from "./BoostEligibilityCheck";
import HermesBoostInfo from "./HermesBoostInfo";
import {
  BoostStatus,
  BoostEligibility,
  BoostPackage,
  HermesStatus,
  BoostDialogTabsProps
} from "@/types/boost";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DialogTabsProps {
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

const BoostDialogTabs: React.FC<DialogTabsProps> = ({
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
  getBoostPrice = () => 0,
  hermesStatus,
  formatBoostDuration = (d) => d
}) => {
  // Don't show tabs if not eligible or if there's an active boost
  const shouldShowTabs = (eligibility.eligible || eligibility.isEligible) && !boostStatus.isActive;

  return (
    <div className="space-y-4">
      {/* Active Boost Status */}
      {boostStatus.isActive && (
        <div className="space-y-4">
          <BoostActivePackage 
            boostStatus={boostStatus} 
            hermesData={hermesStatus} 
          />
          
          <Button 
            variant="outline"
            className="w-full"
            onClick={handleCancel}
            disabled={loading}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Cancel Boost
          </Button>
        </div>
      )}

      {/* Eligibility Check */}
      {!boostStatus.isActive && !(eligibility.eligible || eligibility.isEligible) && (
        <BoostEligibilityCheck 
          eligibility={eligibility} 
          onClose={handleDialogClose}
        />
      )}

      {/* Boost Package Selection */}
      {shouldShowTabs && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-2">
            <TabsTrigger value="packages" className="flex items-center">
              <Zap className="mr-2 h-4 w-4" />
              Packages
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <BarChart2 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="packages" className="space-y-4">
            <ScrollArea className="max-h-[400px] pr-4">
              <BoostPackages 
                packages={boostPackages}
                selectedId={selectedPackage}
                onSelect={setSelectedPackage}
                formatDuration={formatBoostDuration}
                dailyUsage={dailyBoostUsage}
                dailyLimit={dailyBoostLimit}
                disabled={loading}
              />
            </ScrollArea>

            <div className="flex justify-end pt-2">
              <Button
                onClick={() => handleBoost()}
                disabled={loading || !selectedPackage}
              >
                <Zap className="mr-2 h-4 w-4" />
                {loading ? "Processing..." : `Boost Now (${getBoostPrice()} UBX)`}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <HermesBoostInfo hermesStatus={hermesStatus} />
            
            <div className="bg-secondary/20 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <h3 className="text-sm font-medium">Best Time to Boost</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Based on current platform activity, the optimal time to boost your profile is
                between 7PM and 10PM.
              </p>
            </div>
            
            <div className="flex justify-end pt-2">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab("packages")}
              >
                View Packages
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default BoostDialogTabs;
