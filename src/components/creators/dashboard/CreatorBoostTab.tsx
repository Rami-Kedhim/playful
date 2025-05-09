import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HermesOxumQueueVisualization from '@/components/creators/dashboard/boost/HermesOxumQueueVisualization';
import { BoostStatus } from '@/types/pulse-boost';
import { BoostPackages } from '@/components/boost/dialog';

interface CreatorBoostTabProps {
  profileId?: string;
  boostStatus?: BoostStatus;
  boostPackages?: any[];
  onBoostPurchase?: (packageId: string) => void;
  onBoostCancel?: () => void;
  isBoostActive?: boolean;
  activeBoostRemainingTime?: string;
  activeBoostName?: string;
  activeBoostDescription?: string;
  activeBoostPrice?: number;
  activeBoostFeatures?: string[];
  activeBoostColor?: string;
  activeBoostBadgeColor?: string;
  activeBoostVisibility?: string;
  activeBoostVisibilityIncrease?: number;
  activeBoostDuration?: string;
  activeBoostDurationMinutes?: number;
  activeBoostBoostPower?: number;
  activeBoostIsMostPopular?: boolean;
  activeBoostIsPopular?: boolean;
  activeBoostIsRecommended?: boolean;
  activeBoostIsActive?: boolean;
  activeBoostStartTime?: Date;
  activeBoostEndTime?: Date;
  activeBoostStatus?: string;
  activeBoostProgress?: number;
  activeBoostTimeRemaining?: string;
  activeBoostIsExpiring?: boolean;
  activeBoostExpiresAt?: string;
  activeBoostLevel?: number;
  activeBoostType?: string;
  activeBoostModifiers?: Record<string, number>;
  activeBoostPackageName?: string;
  activeBoostPackageId?: string;
  activeBoostStartedAt?: Date;
  activeBoostQueuePosition?: number;
  activeBoostTotalInQueue?: number;
  activeBoostEstimatedWaitTime?: number;
  activeBoostScore?: number;
  activeBoostEffectivenessScore?: number;
  activeBoostMetrics?: any;
  activeBoostAnalytics?: any;
  activeBoostAnalyticsTotalBoosts?: number;
  activeBoostAnalyticsActiveBoosts?: number;
  activeBoostAnalyticsAverageBoostScore?: number;
  activeBoostAnalyticsBoostHistory?: any[];
  activeBoostAnalyticsViews?: number;
  activeBoostAnalyticsImpressions?: any;
  activeBoostAnalyticsInteractions?: any;
  activeBoostAnalyticsAdditionalViews?: number;
  activeBoostAnalyticsEngagementIncrease?: number;
  activeBoostAnalyticsRankingPosition?: number;
  activeBoostAnalyticsViewsWithBoost?: number;
  activeBoostAnalyticsViewsWithoutBoost?: number;
  activeBoostAnalyticsInteractionsWithBoost?: number;
  activeBoostAnalyticsInteractionsWithoutBoost?: number;
  activeBoostAnalyticsImpressionsWithBoost?: number;
  activeBoostAnalyticsImpressionsWithoutBoost?: number;
  activeBoostAnalyticsImpressionsIncrease?: number;
  activeBoostAnalyticsInteractionsIncrease?: number;
  activeBoostAnalyticsImpressionsChange?: number;
  activeBoostAnalyticsInteractionsChange?: number;
  activeBoostAnalyticsImpressionsValue?: number;
  activeBoostAnalyticsInteractionsValue?: number;
  activeBoostAnalyticsImpressionsWithBoostValue?: number;
  activeBoostAnalyticsImpressionsWithoutBoostValue?: number;
  activeBoostAnalyticsInteractionsWithBoostValue?: number;
  activeBoostAnalyticsInteractionsWithoutBoostValue?: number;
  activeBoostAnalyticsImpressionsIncreaseValue?: number;
  activeBoostAnalyticsInteractionsIncreaseValue?: number;
  activeBoostAnalyticsImpressionsChangeValue?: number;
  activeBoostAnalyticsInteractionsChangeValue?: number;
  activeBoostAnalyticsImpressionsWithBoostChange?: number;
  activeBoostAnalyticsImpressionsWithoutBoostChange?: number;
  activeBoostAnalyticsInteractionsWithBoostChange?: number;
  activeBoostAnalyticsInteractionsWithoutBoostChange?: number;
  activeBoostAnalyticsImpressionsWithBoostIncrease?: number;
  activeBoostAnalyticsImpressionsWithoutBoostIncrease?: number;
  activeBoostAnalyticsInteractionsWithBoostIncrease?: number;
  activeBoostAnalyticsInteractionsWithoutBoostIncrease?: number;
  activeBoostAnalyticsImpressionsWithBoostIncreaseValue?: number;
  activeBoostAnalyticsImpressionsWithoutBoostIncreaseValue?: number;
  activeBoostAnalyticsInteractionsWithBoostIncreaseValue?: number;
  activeBoostAnalyticsInteractionsWithoutBoostIncreaseValue?: number;
  activeBoostAnalyticsImpressionsWithBoostChangeValue?: number;
  activeBoostAnalyticsImpressionsWithoutBoostChangeValue?: number;
  activeBoostAnalyticsInteractionsWithBoostChangeValue?: number;
  activeBoostAnalyticsInteractionsWithoutBoostChangeValue?: number;
  activeBoostAnalyticsImpressionsWithBoostIncreaseChange?: number;
  activeBoostAnalyticsImpressionsWithoutBoostIncreaseChange?: number;
  activeBoostAnalyticsInteractionsWithBoostIncreaseChange?: number;
  activeBoostAnalyticsInteractionsWithoutBoostIncreaseChange?: number;
  activeBoostAnalyticsImpressionsWithBoostIncreaseValueChange?: number;
  activeBoostAnalyticsImpressionsWithoutBoostIncreaseValueChange?: number;
  activeBoostAnalyticsInteractionsWithBoostIncreaseValueChange?: number;
  activeBoostAnalyticsInteractionsWithoutBoostIncreaseValueChange?: number;
  activeBoostAnalyticsImpressionsWithBoostChangeValueChange?: number;
  activeBoostAnalyticsImpressionsWithoutBoostChangeValueChange?: number;
  activeBoostAnalyticsInteractionsWithBoostChangeValueChange?: number;
  activeBoostAnalyticsInteractionsWithoutBoostChangeValueChange?: number;
  activeBoostAnalyticsImpressionsWithBoostIncreaseValueValue?: number;
  activeBoostAnalyticsImpressionsWithoutBoostIncreaseValueValue?: number;
  activeBoostAnalyticsInteractionsWithBoostIncreaseValueValue?: number;
  activeBoostAnalyticsInteractionsWithoutBoostIncreaseValueValue?: number;
  activeBoostAnalyticsImpressionsWithBoostChangeValueValue?: number;
  activeBoostAnalyticsImpressionsWithoutBoostChangeValueValue?: number;
  activeBoostAnalyticsInteractionsWithBoostChangeValueValue?: number;
  activeBoostAnalyticsInteractionsWithoutBoostChangeValueValue?: number;
  activeBoostAnalyticsImpressionsWithBoostIncreaseValueValueChange?: number;
  activeBoostAnalyticsImpressionsWithoutBoostIncreaseValueValueChange?: number;
  activeBoostAnalyticsInteractionsWithBoostIncreaseValueValueChange?: number;
  activeBoostAnalyticsInteractionsWithoutBoostIncreaseValueValueChange?: number;
  activeBoostAnalyticsImpressionsWithBoostChangeValueValueChange?: number;
  activeBoostAnalyticsImpressionsWithoutBoostChangeValueValueChange?: number;
  activeBoostAnalyticsInteractionsWithBoostChangeValueValueChange?: number;
  activeBoostAnalyticsInteractionsWithoutBoostChangeValueValueChange?: number;
}

const CreatorBoostTab: React.FC<CreatorBoostTabProps> = ({
  profileId,
  boostStatus,
  boostPackages,
  onBoostPurchase,
  onBoostCancel,
  isBoostActive,
  activeBoostRemainingTime,
  activeBoostName,
  activeBoostDescription,
  activeBoostPrice,
  activeBoostFeatures,
  activeBoostColor,
  activeBoostBadgeColor,
  activeBoostVisibility,
  activeBoostVisibilityIncrease,
  activeBoostDuration,
  activeBoostDurationMinutes,
  activeBoostBoostPower,
  activeBoostIsMostPopular,
  activeBoostIsPopular,
  activeBoostIsRecommended,
  activeBoostIsActive,
  activeBoostStartTime,
  activeBoostEndTime,
  activeBoostStatus,
  activeBoostProgress,
  activeBoostTimeRemaining,
  activeBoostIsExpiring,
  activeBoostExpiresAt,
  activeBoostLevel,
  activeBoostType,
  activeBoostModifiers,
  activeBoostPackageName,
  activeBoostPackageId,
  activeBoostStartedAt,
  activeBoostQueuePosition,
  activeBoostTotalInQueue,
  activeBoostEstimatedWaitTime,
  activeBoostScore,
  activeBoostEffectivenessScore,
  activeBoostMetrics,
  activeBoostAnalytics,
  activeBoostAnalyticsTotalBoosts,
  activeBoostAnalyticsActiveBoosts,
  activeBoostAnalyticsAverageBoostScore,
  activeBoostAnalyticsBoostHistory,
  activeBoostAnalyticsViews,
  activeBoostAnalyticsImpressions,
  activeBoostAnalyticsInteractions,
  activeBoostAnalyticsAdditionalViews,
  activeBoostAnalyticsEngagementIncrease,
  activeBoostAnalyticsRankingPosition,
  activeBoostAnalyticsViewsWithBoost,
  activeBoostAnalyticsViewsWithoutBoost,
  activeBoostAnalyticsInteractionsWithBoost,
  activeBoostAnalyticsInteractionsWithoutBoost,
  activeBoostAnalyticsImpressionsWithBoostValue,
  activeBoostAnalyticsImpressionsWithoutBoostValue,
  activeBoostAnalyticsInteractionsWithBoostValue,
  activeBoostAnalyticsInteractionsWithoutBoostValue,
  activeBoostAnalyticsImpressionsIncreaseValue,
  activeBoostAnalyticsInteractionsIncreaseValue,
  activeBoostAnalyticsImpressionsChangeValue,
  activeBoostAnalyticsInteractionsChangeValue,
  activeBoostAnalyticsImpressionsWithBoostChange,
  activeBoostAnalyticsImpressionsWithoutBoostChange,
  activeBoostAnalyticsInteractionsWithBoostChange,
  activeBoostAnalyticsInteractionsWithoutBoostChange,
  activeBoostAnalyticsImpressionsWithBoostIncrease,
  activeBoostAnalyticsImpressionsWithoutBoostIncrease,
  activeBoostAnalyticsInteractionsWithBoostIncrease,
  activeBoostAnalyticsInteractionsWithoutBoostIncrease,
  activeBoostAnalyticsImpressionsWithBoostIncreaseValueChange,
  activeBoostAnalyticsImpressionsWithoutBoostIncreaseValueChange,
  activeBoostAnalyticsInteractionsWithBoostIncreaseValueChange,
  activeBoostAnalyticsInteractionsWithoutBoostIncreaseValueChange,
  activeBoostAnalyticsImpressionsWithBoostChangeValueChange,
  activeBoostAnalyticsImpressionsWithoutBoostChangeValueChange,
  activeBoostAnalyticsInteractionsWithBoostChangeValueChange,
  activeBoostAnalyticsInteractionsWithoutBoostChangeValueChange,
  activeBoostAnalyticsImpressionsWithBoostIncreaseValueValue,
  activeBoostAnalyticsImpressionsWithoutBoostIncreaseValueValue,
  activeBoostAnalyticsInteractionsWithBoostIncreaseValueValue,
  activeBoostAnalyticsInteractionsWithoutBoostIncreaseValueValue,
  activeBoostAnalyticsImpressionsWithBoostChangeValueValue,
  activeBoostAnalyticsImpressionsWithoutBoostChangeValueValue,
  activeBoostAnalyticsInteractionsWithBoostChangeValueValue,
  activeBoostAnalyticsInteractionsWithoutBoostChangeValueValue,
  activeBoostAnalyticsImpressionsWithBoostIncreaseValueValueChange,
  activeBoostAnalyticsImpressionsWithoutBoostIncreaseValueValueChange,
  activeBoostAnalyticsInteractionsWithBoostIncreaseValueValueChange,
  activeBoostAnalyticsInteractionsWithoutBoostIncreaseValueValueChange,
  activeBoostAnalyticsImpressionsWithBoostChangeValueValueChange,
  activeBoostAnalyticsImpressionsWithoutBoostChangeValueValueChange,
  activeBoostAnalyticsInteractionsWithBoostChangeValueValueChange,
  activeBoostAnalyticsInteractionsWithoutBoostChangeValueValueChange,
}) => {
  const activeBoostCount = boostStatus?.isActive ? 1 : 0;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="packages">Boost Packages</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Boost</CardTitle>
            </CardHeader>
            <CardContent>
              {boostStatus?.isActive ? (
                <div>
                  <p>Your profile is currently boosted!</p>
                  <p>Time remaining: {boostStatus.remainingTime}</p>
                </div>
              ) : (
                <p>No active boost</p>
              )}
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Boosts</CardTitle>
              </CardHeader>
              <CardContent>
                {activeBoostAnalyticsTotalBoosts}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Active Boosts</CardTitle>
              </CardHeader>
              <CardContent>
                {activeBoostAnalyticsActiveBoosts}
              </CardContent>
            </Card>
            
            <HermesOxumQueueVisualization 
              userId={profileId} 
              activeBoosts={activeBoostCount}
            />
          </div>
          
          <div>
            {/* Additional overview content */}
          </div>
        </TabsContent>
        
        <TabsContent value="packages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Boost Packages</CardTitle>
            </CardHeader>
            <CardContent>
              <BoostPackages />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Boost Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Boost analytics content */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorBoostTab;
