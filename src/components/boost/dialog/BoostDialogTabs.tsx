
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2, PlusCircle, Loader2, ZapOff, Zap } from 'lucide-react';
import BoostEligibilityCheck from './BoostEligibilityCheck';
import BoostPackages from './BoostPackages';
import HermesBoostInfo from './HermesBoostInfo';
import BoostActivePackage from './BoostActivePackage';
import { BoostStatus, BoostEligibility } from '@/types/boost';

interface BoostDialogTabsProps {
  isLoading: boolean;
  boostStatus: BoostStatus;
  eligibility: BoostEligibility;
  hermesStatus?: any;
  packages: any[];
  selectedPackage: string;
  onSelectPackage: (packageId: string) => void;
  formatBoostDuration: (duration: string) => string;
  getBoostPrice: () => number;
  onPurchase: () => void;
  onCancel: () => void;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  loading: boolean;
}

const BoostDialogTabs: React.FC<BoostDialogTabsProps> = ({
  isLoading,
  boostStatus,
  eligibility,
  hermesStatus,
  packages,
  selectedPackage,
  onSelectPackage,
  formatBoostDuration,
  getBoostPrice,
  onPurchase,
  onCancel,
  dailyBoostUsage,
  dailyBoostLimit,
  loading
}) => {
  const [activeTab, setActiveTab] = useState(boostStatus.isActive ? "active" : "packages");
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  
  // Create safe HermesBoostStatus object with all required properties
  const hermesData = hermesStatus ? {
    position: hermesStatus.position || 0,
    activeUsers: hermesStatus.activeUsers || 10,
    estimatedVisibility: hermesStatus.estimatedVisibility || 50,
    lastUpdateTime: hermesStatus.lastUpdateTime || new Date().toISOString()
  } : undefined;
  
  // Handle purchase button click
  const handlePurchase = async () => {
    if (!selectedPackage) return;
    
    setPurchaseLoading(true);
    try {
      onPurchase();
    } catch (error) {
      console.error("Purchase error:", error);
    } finally {
      setPurchaseLoading(false);
    }
  };
  
  // Handle cancel button click
  const handleCancel = async () => {
    setCancelLoading(true);
    try {
      onCancel();
    } catch (error) {
      console.error("Cancel error:", error);
    } finally {
      setCancelLoading(false);
    }
  };
  
  // Set active tab when boost status changes
  React.useEffect(() => {
    if (boostStatus.isActive) {
      setActiveTab("active");
    } else {
      setActiveTab("packages");
    }
  }, [boostStatus.isActive]);
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-between items-center mb-6">
        <TabsList>
          <TabsTrigger 
            value="packages" 
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Packages</span>
          </TabsTrigger>
          <TabsTrigger 
            value="active" 
            disabled={isLoading || !boostStatus.isActive}
            className="flex items-center gap-1"
          >
            <Zap className="h-4 w-4" />
            <span>Active Boost</span>
          </TabsTrigger>
        </TabsList>
        
        {boostStatus.isActive && (
          <Badge variant="secondary" className="px-2 py-1 text-xs">
            Active
          </Badge>
        )}
      </div>
      
      <BoostEligibilityCheck 
        eligibility={eligibility}
        loading={isLoading} 
      />
      
      <TabsContent value="packages" className="mt-6">
        <BoostPackages
          packages={packages}
          selectedPackage={selectedPackage}
          onSelectPackage={onSelectPackage}
          formatBoostDuration={formatBoostDuration}
          getBoostPrice={getBoostPrice}
          dailyBoostUsage={dailyBoostUsage}
          dailyBoostLimit={dailyBoostLimit}
          disabled={!eligibility.isEligible || isLoading}
        />
        
        <div className="flex justify-end mt-6">
          <Button
            onClick={handlePurchase}
            disabled={
              !eligibility.isEligible || 
              !selectedPackage || 
              purchaseLoading || 
              dailyBoostUsage >= dailyBoostLimit
            }
            className="ml-auto"
          >
            {purchaseLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Apply Boost ({getBoostPrice()} UBX)
              </>
            )}
          </Button>
        </div>

        <div className="mt-8">
          <HermesBoostInfo hermesData={hermesData} />
        </div>
      </TabsContent>
      
      <TabsContent value="active" className="mt-6">
        {boostStatus.isActive ? (
          <div className="space-y-6">
            <BoostActivePackage 
              boostStatus={boostStatus}
              hermesStatus={hermesData}
            />
            
            <div className="flex justify-end mt-6">
              <Button 
                variant="destructive" 
                onClick={handleCancel}
                disabled={cancelLoading}
              >
                {cancelLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  <>
                    <ZapOff className="mr-2 h-4 w-4" />
                    Cancel Boost
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-muted-foreground">No active boost</p>
            <Button 
              variant="secondary" 
              onClick={() => setActiveTab("packages")}
              className="mt-2"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Get a Boost
            </Button>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default BoostDialogTabs;
