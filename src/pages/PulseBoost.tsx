
import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePulseBoost } from "@/hooks/boost/usePulseBoost";
import { useAuth } from "@/hooks/auth/useAuth";
import { AlertCircle, Info, Star, TrendingUp, Zap } from "lucide-react";
import PulseBoostManager from "@/components/boost/PulseBoostManager";
import { SUBSCRIPTION_PLANS } from "@/constants/pulseBoostConfig";
import UBXWallet from "@/components/wallet/UBXWallet";

const PulseBoostPage = () => {
  const [activeTab, setActiveTab] = useState('manage');
  const { user, profile } = useAuth();
  const { enhancedBoostStatus, boostPower, isLoading, error } = usePulseBoost(user?.id);
  
  const subscriptionInfo = profile?.subscription_tier 
    ? SUBSCRIPTION_PLANS.find(
        plan => plan.level === profile.subscription_tier && 
               plan.role === (profile.isEscort ? 'escort' : 'client')
      )
    : SUBSCRIPTION_PLANS[0]; // Default to free plan
  
  if (isLoading) {
    return (
      <AppLayout>
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8">PULSE Boost System</h1>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-2">
              <Zap className="h-10 w-10 animate-pulse text-primary" />
              <p>Loading boost information...</p>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }
  
  if (error) {
    return (
      <AppLayout>
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8">PULSE Boost System</h1>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </AppLayout>
    );
  }
  
  return (
    <AppLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              <span className="inline-flex items-center">
                <Zap className="h-7 w-7 mr-2 text-primary" />
                PULSE Boost System
              </span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Precision Upgrade Layer for Scalable Exposure - elevate your visibility and engagement
            </p>
          </div>
          
          <div className="flex items-center gap-x-4">
            <Badge variant="outline" className="py-1.5 px-2">
              <Star className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
              {subscriptionInfo?.level.toUpperCase() || 'FREE'} PLAN
            </Badge>
            
            {enhancedBoostStatus.isActive && (
              <Badge className="py-1.5 px-2 bg-primary/20 text-primary border-primary/40">
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                BOOST ACTIVE
              </Badge>
            )}
          </div>
        </div>
        
        {/* Boost Status Card */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle>Boost Status</CardTitle>
            <CardDescription>
              Your current boost level and visibility status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Boost Power</span>
                  <Badge variant={boostPower > 0 ? "default" : "outline"}>
                    {boostPower > 0 ? "ACTIVE" : "INACTIVE"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{boostPower > 0 ? "Boosting" : "Not Boosted"}</span>
                    <span>{boostPower}%</span>
                  </div>
                  <Progress value={boostPower} className="h-2" />
                </div>
                
                {enhancedBoostStatus.pulseData && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Active Boost</AlertTitle>
                    <AlertDescription>
                      <p className="text-sm">
                        You have an active {enhancedBoostStatus.pulseData.boostType} with 
                        {enhancedBoostStatus.pulseData.visibility === 'global' ? ' global' : ''} visibility.
                        {enhancedBoostStatus.remainingTime && ` Time remaining: ${enhancedBoostStatus.remainingTime}`}
                      </p>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Subscription Benefits</h3>
                <ul className="space-y-2">
                  {subscriptionInfo?.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <svg className="h-2 w-2 fill-primary" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {subscriptionInfo?.level === 'free' && (
                  <div className="pt-2">
                    <Button variant="outline" className="w-full">
                      <Star className="h-3.5 w-3.5 mr-1.5" />
                      Upgrade Subscription
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs for Boost Management and Analytics */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="manage" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Manage Boosts
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage" className="mt-6">
            <PulseBoostManager profileId={user?.id} />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visibility Impact</CardTitle>
                  <CardDescription>
                    How PULSE boosts affect your visibility
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {boostPower > 0 ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Profile Views</span>
                        <span className="text-sm font-medium text-green-500">+{Math.round(boostPower / 2)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Search Ranking</span>
                        <span className="text-sm font-medium text-green-500">+{Math.round(boostPower / 3)} positions</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Engagement Rate</span>
                        <span className="text-sm font-medium text-green-500">+{Math.round(boostPower / 10)}%</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>Activate a PULSE boost to see visibility impact analytics</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Boost History</CardTitle>
                  <CardDescription>
                    Your recent PULSE boost activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <p>Boost history will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default PulseBoostPage;
