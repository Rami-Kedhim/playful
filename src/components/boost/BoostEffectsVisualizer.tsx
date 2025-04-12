
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  TrendingUp, 
  Eye, 
  MousePointer, 
  Search, 
  Users, 
  Info
} from "lucide-react";

interface BoostEffectsVisualizerProps {
  isActive: boolean;
  analyticsData: any | null;
  loading?: boolean;
}

const BoostEffectsVisualizer: React.FC<BoostEffectsVisualizerProps> = ({
  isActive,
  analyticsData,
  loading = false
}) => {
  const [activeTab, setActiveTab] = useState<string>("visibility");
  const [showHint, setShowHint] = useState<boolean>(true);

  useEffect(() => {
    if (analyticsData) {
      const timer = setTimeout(() => setShowHint(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [analyticsData]);

  if (!isActive) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-muted-foreground" />
            Boost Effects
          </CardTitle>
          <CardDescription>
            No active boost to display effects for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="rounded-full bg-muted p-3">
              <TrendingUp className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Activate a boost to see how it impacts your profile's visibility and engagement metrics in real-time.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Boost Effects
          </CardTitle>
          <CardDescription>
            Loading boost effect data...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <div className="h-32 flex items-center">
            <div className="animate-pulse flex space-x-4">
              <div className="space-y-3">
                <div className="h-3 bg-muted rounded w-24"></div>
                <div className="h-6 bg-muted rounded w-72"></div>
                <div className="h-3 bg-muted rounded w-32"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analyticsData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Boost Effects
          </CardTitle>
          <CardDescription>
            Your boost is active but we're still collecting data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-sm text-muted-foreground max-w-xs">
              Effects data will be available soon. Check back in a few minutes to see how your boost is performing.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary" />
          Boost Effects
        </CardTitle>
        <CardDescription>
          Real-time performance metrics from your active boost
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {showHint && (
          <Alert className="mb-4 bg-primary/5 border-primary/20">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className="text-xs">
              These metrics show how your profile performance has improved with the boost.
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 h-9">
            <TabsTrigger value="visibility" className="text-xs">
              <Eye className="h-3.5 w-3.5 mr-1" />
              Visibility
            </TabsTrigger>
            <TabsTrigger value="engagement" className="text-xs">
              <MousePointer className="h-3.5 w-3.5 mr-1" />
              Engagement
            </TabsTrigger>
            <TabsTrigger value="ranking" className="text-xs">
              <Search className="h-3.5 w-3.5 mr-1" />
              Ranking
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="visibility" className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Profile Views</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium">
                    {analyticsData.views.withBoost}
                  </span>
                  <span className="text-xs text-green-500 ml-2">
                    +{analyticsData.views.increase}%
                  </span>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs inline-block py-1 rounded-full bg-primary/10 px-2">
                      Without Boost: {analyticsData.views.withoutBoost}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs inline-block py-1 rounded-full bg-primary px-2 text-white">
                      With Boost: {analyticsData.views.withBoost}
                    </span>
                  </div>
                </div>
                <div className="h-2 mb-4">
                  <div className="relative flex h-2 overflow-hidden rounded-full bg-muted">
                    <Progress
                      value={(analyticsData.views.withBoost / (analyticsData.views.withBoost * 1.2)) * 100}
                      className="h-2 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="text-xs text-muted-foreground">Additional Views</div>
                <div className="text-xl font-semibold flex items-center">
                  {analyticsData.additionalViews}
                  <span className="text-xs text-green-500 ml-1">+{Math.round(analyticsData.views.increase)}%</span>
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="text-xs text-muted-foreground">Effectiveness</div>
                <div className="text-xl font-semibold flex items-center">
                  {analyticsData.effectiveness}%
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Profile Clicks</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium">
                    {analyticsData.clicks.withBoost}
                  </span>
                  <span className="text-xs text-green-500 ml-2">
                    +{analyticsData.clicks.increase}%
                  </span>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs inline-block py-1 rounded-full bg-primary/10 px-2">
                      Without Boost: {analyticsData.clicks.withoutBoost}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs inline-block py-1 rounded-full bg-primary px-2 text-white">
                      With Boost: {analyticsData.clicks.withBoost}
                    </span>
                  </div>
                </div>
                <div className="h-2 mb-4">
                  <div className="relative flex h-2 overflow-hidden rounded-full bg-muted">
                    <Progress
                      value={(analyticsData.clicks.withBoost / (analyticsData.clicks.withBoost * 1.2)) * 100}
                      className="h-2 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="text-xs text-muted-foreground">Engagement Rate</div>
                <div className="text-xl font-semibold flex items-center">
                  {Math.round((analyticsData.clicks.withBoost / analyticsData.views.withBoost) * 100)}%
                  <span className="text-xs text-green-500 ml-1">
                    +{analyticsData.engagementIncrease}%
                  </span>
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="text-xs text-muted-foreground">Click-through Rate</div>
                <div className="text-xl font-semibold flex items-center">
                  {Math.round((analyticsData.clicks.withBoost / analyticsData.views.withBoost) * 100)}%
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ranking" className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <div className="mr-4">
                  <div className="text-xs text-muted-foreground">Search Position</div>
                  <div className="text-2xl font-semibold">{analyticsData.searchRanking.withBoost}</div>
                </div>
                <div className="grow">
                  <div className="text-xs text-muted-foreground mb-1 flex items-center justify-between">
                    <span>Without Boost: #{analyticsData.searchRanking.withoutBoost}</span>
                    <span className="text-xs text-green-500">
                      Improved by {analyticsData.searchRanking.improvement}
                    </span>
                  </div>
                  <div className="h-2">
                    <div className="relative flex h-2 overflow-hidden rounded-full bg-muted">
                      <Progress
                        value={((20 - analyticsData.searchRanking.withBoost) / 20) * 100}
                        className="h-2 w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 p-3 rounded-md">
                <div className="text-xs text-muted-foreground">Current Ranking</div>
                <div className="text-xl font-semibold flex items-center justify-between">
                  #{analyticsData.searchRanking.withBoost}
                  <Users className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="bg-primary/10 p-3 rounded-md">
                <div className="text-xs text-muted-foreground">Position Improvement</div>
                <div className="text-xl font-semibold flex items-center justify-between">
                  {analyticsData.searchRanking.improvement} positions
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BoostEffectsVisualizer;
