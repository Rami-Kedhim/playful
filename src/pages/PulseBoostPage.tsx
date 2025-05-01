
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, BarChart, Clock, Wallet, TrendingUp } from 'lucide-react';
import { ScrollRevealGroup } from '@/components/ui/scroll-reveal-group';
import { RevealChild } from '@/components/ui/scroll-reveal-group';
import PulseBoostErrorBoundary from '@/components/boost/PulseBoostErrorBoundary';
import PageLayout from '@/components/layout/PageLayout';
import { useBoostStatus } from '@/hooks/boost/useBoostStatus';
import { boostService } from '@/services/boostService';
import { logInteraction } from '@/utils/uberCore';
import { useNeuralOptimization } from '@/hooks/useNeuralOptimization';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const PulseBoostPage = () => {
  const { user, profile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [boostPackages, setBoostPackages] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const { status: boostStatus, loading: statusLoading } = useBoostStatus(user?.id);
  const { metrics: neuralMetrics, refreshMetrics } = useNeuralOptimization();
  
  // Log page access with Hermes
  useEffect(() => {
    logInteraction('PulseBoost', 'page-view', { 
      userId: user?.id,
      timestamp: new Date().toISOString()
    });
  }, [user?.id]);

  // Fetch boost packages and analytics
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.id) {
          const packages = await boostService.getBoostPackages();
          setBoostPackages(packages);
          
          if (boostStatus?.isActive) {
            const analyticsData = await boostService.getBoostAnalytics(user.id);
            setAnalytics(analyticsData);
          }
        }
      } catch (error) {
        console.error('Error fetching boost data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user?.id, boostStatus?.isActive]);

  // Get profile information
  const profileId = user?.id;
  const subscriptionTier = (profile as any)?.subscription_tier || 'free';
  const isVerified = subscriptionTier !== 'free';
  
  // Format remaining time for active boost
  const formatRemainingTime = (timeString) => {
    if (!timeString) return '--:--:--';
    return timeString;
  };

  // Render active boost card
  const renderActiveBoost = () => {
    if (!boostStatus?.isActive) return null;
    
    const progress = boostStatus.progress || 0;
    const packageName = boostStatus.packageName || 'Boost';
    const remainingTime = formatRemainingTime(boostStatus.remainingTime);
    
    return (
      <Card className="border-gradient-boost">
        <CardHeader className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Active PULSE Boost
          </CardTitle>
          <CardDescription>
            Your profile is currently boosted
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Package</span>
              <span className="font-medium">{packageName}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Remaining time</span>
              <span className="font-medium font-mono">{remainingTime}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Start time</span>
              <span className="text-sm">{boostStatus.startedAt?.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Expiry time</span>
              <span className="text-sm">{boostStatus.expiresAt?.toLocaleString()}</span>
            </div>
            
            <Button 
              variant="destructive" 
              className="w-full mt-4"
              onClick={() => cancelActiveBoost()}
            >
              Cancel Boost
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  // Handle canceling active boost
  const cancelActiveBoost = async () => {
    try {
      if (!user?.id) return;
      
      const success = await boostService.cancelBoost(user.id);
      
      if (success) {
        // Refresh status
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to cancel boost:', error);
    }
  };

  // Show loading state
  if (isLoading || statusLoading) {
    return (
      <PageLayout title="PULSE Boost System">
        <div className="container mx-auto py-10">
          <Card>
            <CardHeader>
              <CardTitle>Loading PULSE Boost</CardTitle>
              <CardDescription>Please wait while we retrieve your boost information...</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="PULSE Boost System" 
      subtitle="Enhance your visibility with the Precision Upgrade Layer for Scalable Exposure"
    >
      <Tabs defaultValue="boost" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="boost" className="flex items-center">
            <Zap className="mr-2 h-4 w-4" />
            Boost Manager
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="neural" className="flex items-center">
            <TrendingUp className="mr-2 h-4 w-4" />
            Neural Insights
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="boost" className="space-y-6">
          <ScrollRevealGroup
            animation="fade-up"
            staggerDelay={0.1}
            containerClassName="space-y-6"
          >
            <RevealChild>
              {boostStatus?.isActive ? renderActiveBoost() : (
                <Card>
                  <CardHeader>
                    <CardTitle>Boost Your Profile</CardTitle>
                    <CardDescription>
                      Increase your visibility and attract more attention by activating a PULSE boost
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PulseBoostErrorBoundary>
                      <p className="mb-4">Select a boost package below to enhance your visibility:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Boost packages would be rendered here */}
                        {boostPackages.length === 0 && (
                          <p>No boost packages available at the moment.</p>
                        )}
                      </div>
                    </PulseBoostErrorBoundary>
                  </CardContent>
                </Card>
              )}
            </RevealChild>
            
            <RevealChild>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Boost History
                  </CardTitle>
                  <CardDescription>
                    Your previous PULSE boost activations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-6">
                    You have no boost history yet. Activate your first boost to get started.
                  </p>
                </CardContent>
              </Card>
            </RevealChild>
          </ScrollRevealGroup>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <ScrollRevealGroup
            animation="fade-up"
            staggerDelay={0.1}
            containerClassName="space-y-6"
          >
            <RevealChild>
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Overview</CardTitle>
                  <CardDescription>
                    Performance metrics and visibility statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {analytics ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-md bg-background border">
                        <p className="text-sm text-muted-foreground">Additional Views</p>
                        <p className="text-2xl font-bold">{analytics.additionalViews || 0}</p>
                      </div>
                      <div className="p-4 rounded-md bg-background border">
                        <p className="text-sm text-muted-foreground">Engagement Increase</p>
                        <p className="text-2xl font-bold">{analytics.engagementIncrease || 0}%</p>
                      </div>
                      <div className="p-4 rounded-md bg-background border">
                        <p className="text-sm text-muted-foreground">Ranking Position</p>
                        <p className="text-2xl font-bold">{analytics.rankingPosition || '--'}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-6">
                      No analytics data available. Activate a boost to start collecting insights.
                    </p>
                  )}
                </CardContent>
              </Card>
            </RevealChild>
            
            <RevealChild>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wallet className="mr-2 h-5 w-5" />
                    UBX Usage
                  </CardTitle>
                  <CardDescription>
                    Your UBX spending on boosts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-6">
                    No UBX spending data available yet.
                  </p>
                </CardContent>
              </Card>
            </RevealChild>
          </ScrollRevealGroup>
        </TabsContent>
        
        <TabsContent value="neural" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Neural Optimization</CardTitle>
              <CardDescription>
                AI-powered insights powered by Hermes, Oxum and Lucie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-md bg-background border">
                    <p className="text-sm text-muted-foreground">System Load</p>
                    <p className="text-2xl font-bold">{neuralMetrics.systemLoad}%</p>
                  </div>
                  <div className="p-4 rounded-md bg-background border">
                    <p className="text-sm text-muted-foreground">Hermes Efficiency</p>
                    <p className="text-2xl font-bold">{neuralMetrics.hermesEfficiency}%</p>
                  </div>
                  <div className="p-4 rounded-md bg-background border">
                    <p className="text-sm text-muted-foreground">Oxum Precision</p>
                    <p className="text-2xl font-bold">{neuralMetrics.oxumPrecision}%</p>
                  </div>
                  <div className="p-4 rounded-md bg-background border">
                    <p className="text-sm text-muted-foreground">Optimization Gain</p>
                    <p className="text-2xl font-bold">{neuralMetrics.optimizationGain}%</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium">Recommended Actions</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {neuralMetrics.recommendedActions.map((action, index) => (
                      <li key={index} className="text-sm">{action}</li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  onClick={() => refreshMetrics()}
                  className="w-full mt-4"
                >
                  Refresh Neural Metrics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default PulseBoostPage;
