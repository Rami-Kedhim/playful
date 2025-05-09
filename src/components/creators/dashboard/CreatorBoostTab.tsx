import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useBoost } from "@/hooks/useBoost";
import { formatCurrency } from "@/utils/formatters";
import BoostStatusCard from "./boost/BoostStatusCard";
import BoostPackageSelection from "./boost/BoostPackageSelection";
import BoostPurchaseConfirmation from "./boost/BoostPurchaseConfirmation";
import BoostAnalytics from "./boost/BoostAnalytics";
import { BoostStatus as PulseBoostStatus } from "@/types/pulse-boost";
import { BoostStatus as BoostStatusType } from "@/types/boost";
import { toDate } from '@/utils/formatters';

interface CreatorBoostTabProps {
  profileId: string;
  profileCompleteness?: number;
  rating?: number;
  isVerified?: boolean;
  country?: string;
  role?: 'verified' | 'regular' | 'AI';
  ubxBalance?: number;
}

const CreatorBoostTab: React.FC<CreatorBoostTabProps> = ({
  profileId,
  profileCompleteness = 70,
  rating = 4.5,
  isVerified = true,
  country = "United States",
  role = 'verified',
  ubxBalance = 100
}) => {
  const {
    boostStatus,
    packages,
    boostProfile,
    cancelBoost,
    loading,
    error,
    eligibility,
    hermesStatus
  } = useBoost();
  
  const [activeTab, setActiveTab] = useState("packages");
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [activeStep, setActiveStep] = useState<"select" | "confirm">("select");
  
  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handleContinueToPayment = () => {
    if (!selectedPackage) {
      console.error("No package selected");
      return;
    }
    setActiveStep("confirm");
  };
  
  const handlePurchase = async () => {
    if (!selectedPackage) return;
    
    try {
      await boostProfile(profileId, selectedPackage);
      setActiveTab("status");
      setActiveStep("select");
    } catch (error) {
      console.error("Failed to purchase boost", error);
    }
  };
  
  const handleCancel = async () => {
    try {
      await cancelBoost();
    } catch (error) {
      console.error("Failed to cancel boost", error);
    }
  };
  
  const getBoostPrice = () => {
    const selected = packages.find(p => p.id === selectedPackage);
    return selected?.price_ubx || 0;
  };
  
  const selectedBoostPackage = packages.find(p => p.id === selectedPackage);

  // Convert BoostStatus between types to fix compatibility issues
  const convertBoostStatus = (status: BoostStatusType): PulseBoostStatus => {
    return {
      isActive: status.isActive,
      packageId: status.packageId,
      expiresAt: status.expiresAt,
      startedAt: status.startedAt,
      timeRemaining: status.timeRemaining,
      remainingTime: status.remainingTime,
      packageName: status.packageName,
      progress: status.progress
    };
  };

  // Use pulseBoostStatus instead of boostStatus when passing to components
  // that expect PulseBoostStatus
  const pulseBoostStatus: PulseBoostStatus = convertBoostStatus(boostStatus);

  // Fix the mock status creation to use proper types
  const createMockBoostStatus = (active: boolean): BoostStatus => {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    if (!active) {
      return {
        isActive: false,
      };
    }

    return {
      isActive: true,
      packageName: "24 Hour Boost",
      startedAt: now,
      expiresAt: expiresAt,
      timeRemaining: "23:59:59",
      progress: 5,
      packageId: "boost-24h"
    };
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="packages">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="status">Status</TabsTrigger>
          <TabsTrigger value="packages">Boost Packages</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Boost Status</CardTitle>
            </CardHeader>
            <CardContent>
              <BoostStatusCard
                boostStatus={boostStatus}
                onCancel={handleCancel}
                loading={loading}
                dailyBoostUsage={0}
                dailyBoostLimit={3}
              />
            </CardContent>
          </Card>
          
          {/* Analytics Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>Impact Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Current Position</p>
                  <p className="text-2xl font-bold">{hermesStatus.position}</p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Profile Views</p>
                  <p className="text-2xl font-bold">+47%</p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Visibility Score</p>
                  <p className="text-2xl font-bold">{hermesStatus.boostScore}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="packages">
          {!boostStatus.isActive ? (
            <Card>
              <CardHeader>
                <CardTitle>Boost Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                {activeStep === "select" ? (
                  <BoostPackageSelection
                    profileCompleteness={profileCompleteness}
                    rating={rating}
                    country={country}
                    role={role}
                    packages={packages}
                    selectedPackage={selectedPackage}
                    onSelectPackage={handleSelectPackage}
                    onContinue={handleContinueToPayment}
                    getBoostPrice={getBoostPrice}
                    loading={loading}
                  />
                ) : (
                  <BoostPurchaseConfirmation
                    selectedPackage={selectedBoostPackage}
                    ubxBalance={ubxBalance}
                    onBack={() => setActiveStep("select")}
                    onPurchase={handlePurchase}
                    onCancel={() => setActiveStep("select")}
                    loading={loading}
                  />
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-primary/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-2">Your Profile is Currently Boosted</h3>
                <p className="text-muted-foreground mb-4">
                  Your profile is currently being boosted and receiving enhanced visibility.
                  You cannot purchase a new boost package until the current boost expires.
                </p>
                
                <div className="mb-4 mt-6 bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Current Boost Package</p>
                  <p className="text-lg font-semibold">{boostStatus.packageName || "Standard Boost"}</p>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("status")}
                  className="w-full"
                >
                  View Boost Status
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="analytics">
          <BoostAnalytics
            profileId={profileId}
            boostStatus={{
              isActive: boostStatus.isActive,
              expiresAt: boostStatus.expiresAt,
              startedAt: boostStatus.startedAt,
              packageName: boostStatus.packageName,
              packageId: boostStatus.packageId,
              progress: boostStatus.progress,
              timeRemaining: boostStatus.timeRemaining
            } as BoostStatus}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorBoostTab;
