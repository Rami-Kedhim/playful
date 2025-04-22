import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import BoostPackages from "../BoostPackages";
import BoostEligibilityCheck from "./BoostEligibilityCheck";
import BoostActivePackage from "../BoostActivePackage";
import HermesBoostInfo from './HermesBoostInfo';
import { BoostStatus, HermesBoostStatus, BoostDialogTabsProps } from '@/types/boost';

export interface BoostDialogTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loading: boolean;
  boostStatus: BoostStatus;
  eligibility: BoostEligibility;
  boostPackages: BoostPackage[];
  selectedPackage: string | null;
  setSelectedPackage: (id: string) => void;
  handleBoost: () => Promise<boolean>;
  handleCancel: () => Promise<boolean>;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  hermesStatus: HermesStatus;
  formatBoostDuration?: (duration: string) => string;
  getBoostPrice?: () => number;
  handleDialogClose: () => void;
  onBoostSuccess?: () => void;
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
  hermesStatus,
  formatBoostDuration = (duration) => {
    const [hours] = duration.split(':').map(Number);
    return hours >= 24 ? `${Math.floor(hours / 24)} days` : `${hours} hours`;
  },
  getBoostPrice = () => 0,
  handleDialogClose
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="active">
          {boostStatus?.isActive ? "Active Boost" : "Status"}
        </TabsTrigger>
        <TabsTrigger value="packages" disabled={loading}>
          Packages
        </TabsTrigger>
        <TabsTrigger value="analytics" disabled={loading}>
          Analytics
        </TabsTrigger>
      </TabsList>
      
      <div className="mt-4">
        {/* Active Boost Tab */}
        <TabsContent value="active">
          {boostStatus?.isActive ? (
            <div className="space-y-6">
              <BoostActivePackage 
                boostStatus={boostStatus}
              />
              
              <div className="flex justify-end mt-4">
                <Button 
                  variant="destructive"
                  onClick={handleCancel}
                  disabled={loading}
                  className="w-full"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Cancel Boost
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <BoostEligibilityCheck eligibility={eligibility} />
              
              <p className="text-sm text-muted-foreground">
                No active boost. Select a boost package to increase your profile visibility.
              </p>
              
              <Button 
                onClick={() => setActiveTab('packages')} 
                disabled={!eligibility?.isEligible || loading}
                className="w-full"
              >
                View Packages
              </Button>
            </div>
          )}
        </TabsContent>
        
        {/* Packages Tab */}
        <TabsContent value="packages">
          <div className="space-y-6">
            <BoostEligibilityCheck eligibility={eligibility} />
            
            {eligibility?.isEligible && (
              <>
                <BoostPackages
                  packages={boostPackages}
                  selectedId={selectedPackage}
                  onSelect={setSelectedPackage}
                  formatDuration={formatBoostDuration}
                  dailyUsage={dailyBoostUsage}
                  dailyLimit={dailyBoostLimit}
                  disabled={loading}
                  getBoostPrice={getBoostPrice}
                />
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={handleDialogClose}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleBoost}
                    disabled={!selectedPackage || loading}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Apply Boost
                  </Button>
                </div>
              </>
            )}
          </div>
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="space-y-6">
            <HermesBoostInfo hermesStatus={hermesStatus} />
            
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={handleDialogClose}>
                Close
              </Button>
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default BoostDialogTabs;
