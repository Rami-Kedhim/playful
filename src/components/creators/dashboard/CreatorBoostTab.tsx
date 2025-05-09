
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Zap, BarChart3 } from "lucide-react";
import BoostStatusCard from "./boost/BoostStatusCard";
import HermesOxumQueueVisualization from "./boost/HermesOxumQueueVisualization";
import BoostAnalytics from "./boost/BoostAnalytics";
import { toDate } from "@/utils/formatters";
import type { BoostStatus } from "@/types/boost";

interface CreatorBoostTabProps {
  creatorId?: string;
}

const CreatorBoostTab: React.FC<CreatorBoostTabProps> = ({ creatorId }) => {
  const [activeTab, setActiveTab] = useState<string>('status');
  const [boostData, setBoostData] = useState<BoostStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Simulate loading creator boost data
  useEffect(() => {
    const loadBoostData = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would fetch from an API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - simulate a boost that is currently active
        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(now.getDate() + 1);
        
        // Create a boost status object
        const boostStatus: BoostStatus = {
          isActive: true,
          packageId: "premium-boost-24h",
          expiresAt: tomorrow,
          startedAt: now,
          timeRemaining: "23:45:30",
          remainingTime: "23h 45m",
          packageName: "Premium Visibility Boost",
          progress: 25,
        };
        
        setBoostData(boostStatus);
      } catch (error) {
        console.error("Failed to load boost data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBoostData();
  }, [creatorId]);
  
  const handleActivateBoost = () => {
    // In a real implementation, this would make an API call
    alert("This would open the boost purchase dialog.");
  };
  
  const handleCancelBoost = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset boost status
      setBoostData(prevStatus => ({
        ...prevStatus,
        isActive: false,
      } as BoostStatus));
      
      return true;
    } catch (error) {
      console.error("Error cancelling boost:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to format time in a human-readable way
  const formatTimeRemaining = (timeString: string): string => {
    if (!timeString) return "0h 0m";
    return timeString;
  };
  
  // Mock data for boost info
  const boostInfo = {
    activeUserCount: 128,
    visibilityScore: 78,
    impressionsLast24h: 1240,
    engagementLast24h: 45,
  };
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 w-full max-w-md mb-8">
        <TabsTrigger value="status" className="flex items-center gap-2">
          <Zap className="w-4 h-4" />
          <span>Boost Status</span>
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          <span>Analytics</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="status" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Boost Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {boostData?.isActive ? (
                  <div className="space-y-8">
                    <BoostStatusCard
                      status={boostData as BoostStatus}
                      handleCancel={handleCancelBoost}
                      isLoading={isLoading}
                    />
                    
                    <HermesOxumQueueVisualization
                      activeUsers={boostInfo.activeUserCount}
                      visibilityScore={boostInfo.visibilityScore}
                      impressions={boostInfo.impressionsLast24h}
                      engagement={boostInfo.engagementLast24h}
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="mb-4 text-gray-400">
                        <Zap className="w-12 h-12 mx-auto stroke-[1.5px]" />
                      </div>
                      <h3 className="text-lg font-medium">
                        No Active Boost
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto">
                        Your profile is currently not boosted. Activate a boost to increase your visibility in search results and recommendations.
                      </p>
                      <Button
                        onClick={handleActivateBoost}
                        className="mt-4"
                        disabled={isLoading}
                      >
                        <Zap className="mr-2 w-4 h-4" />
                        Boost Profile
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="analytics" className="space-y-6">
        <BoostAnalytics 
          profileId={creatorId || ""} 
          boostStatus={boostData as BoostStatus} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default CreatorBoostTab;
