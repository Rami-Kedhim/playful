import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2, PlusCircle, Loader2, ZapOff, Zap } from 'lucide-react';
import BoostEligibilityCheck from './dialog/BoostEligibilityCheck';
import BoostPackages from './dialog/BoostPackages';
import HermesBoostInfo from './dialog/HermesBoostInfo';
import BoostActivePackage from './dialog/BoostActivePackage';
import { BoostStatus, BoostEligibility } from '@/types/boost';
import { BoostDialogTabsProps } from './types';

const BoostDialogTabs: React.FC<BoostDialogTabsProps> = ({
  activeTab: initialActiveTab,
  setActiveTab: externalSetActiveTab,
  loading: isLoading,
  boostStatus,
  eligibility,
  hermesStatus,
  boostPackages,
  selectedPackage,
  setSelectedPackage,
  handleBoost: onPurchase,
  handleCancel: onCancel,
  dailyBoostUsage,
  dailyBoostLimit,
  hermesBoostStatus,
  formatBoostDuration,
  getBoostPrice,
  handlePurchase,
  handleDialogClose,
  handleCancel,
  boostAnalytics
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(boostStatus.isActive ? "active" : "packages");
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  
  const activeTab = initialActiveTab || internalActiveTab;
  const setActiveTab = externalSetActiveTab || setInternalActiveTab;
  
  const compatibleEligibility: BoostEligibility = {
    isEligible: eligibility.isEligible !== undefined ? eligibility.isEligible : false,
    reason: eligibility.reason,
    reasons: eligibility.reasons,
    minimumProfileCompleteness: eligibility.minimumProfileCompleteness,
    missingFields: eligibility.missingFields,
    minRequiredBalance: eligibility.minRequiredBalance
  };
  
  const compatibleStatus: BoostStatus = {
    ...boostStatus,
    progress: boostStatus.progress || 0
  };
  
  const safeHermesStatus = hermesBoostStatus || hermesStatus || {
    position: 0,
    activeUsers: 0,
    estimatedVisibility: 0,
    lastUpdateTime: new Date().toISOString(),
  };
  
  const handlePurchaseWrapper = async () => {
    if (handlePurchase) {
      return handlePurchase();
    }
    
    if (!selectedPackage) return;
    
    setPurchaseLoading(true);
    try {
      await onPurchase();
      return;
    } catch (error) {
      console.error("Purchase error:", error);
    } finally {
      setPurchaseLoading(false);
    }
  };
  
  const handleCancelWrapper = async () => {
    if (handleCancel) {
      return handleCancel();
    }
    
    setCancelLoading(true);
    try {
      await onCancel();
    } catch (error) {
      console.error("Cancel error:", error);
    } finally {
      setCancelLoading(false);
    }
  };
  
  const formatDuration = formatBoostDuration || ((duration: string) => {
    const [hours, minutes] = duration.split(":").map(Number);
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days !== 1 ? 's' : ''}`;
    }
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  });
  
  const calculateBoostPrice = getBoostPrice || (() => {
    const pkg = boostPackages.find(p => p.id === selectedPackage);
    return pkg ? pkg.price_ubx : 0;
  });
  
  React.useEffect(() => {
    if (boostStatus.isActive) {
      setActiveTab("active");
    }
  }, [boostStatus.isActive, setActiveTab]);
  
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
            disabled={isLoading || !compatibleStatus.isActive}
            className="flex items-center gap-1"
          >
            <Zap className="h-4 w-4" />
            <span>Active Boost</span>
          </TabsTrigger>
        </TabsList>
        
        {compatibleStatus.isActive && (
          <Badge variant="secondary" className="px-2 py-1 text-xs">
            Active
          </Badge>
        )}
      </div>
      
      <BoostEligibilityCheck 
        eligibility={compatibleEligibility}
        loading={isLoading} 
      />
      
      <TabsContent value="packages" className="mt-6">
        <BoostPackages
          packages={boostPackages}
          selectedId={selectedPackage}
          onSelect={setSelectedPackage}
          formatDuration={formatDuration}
          dailyUsage={dailyBoostUsage}
          dailyLimit={dailyBoostLimit}
          disabled={!compatibleEligibility.isEligible || isLoading}
        />
        
        <div className="flex justify-end mt-6">
          <Button
            onClick={handlePurchaseWrapper}
            disabled={
              !compatibleEligibility.isEligible || 
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
                Apply Boost ({calculateBoostPrice()} UBX)
              </>
            )}
          </Button>
        </div>

        <div className="mt-8">
          <HermesBoostInfo 
            hermesStatus={safeHermesStatus}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="active" className="mt-6">
        {compatibleStatus.isActive ? (
          <div className="space-y-6">
            <BoostActivePackage 
              boostStatus={compatibleStatus}
            />
            
            <div className="flex justify-end mt-6">
              <Button 
                variant="destructive" 
                onClick={handleCancelWrapper}
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
