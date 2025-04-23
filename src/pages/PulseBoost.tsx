
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, BarChart } from 'lucide-react';
import PulseBoostManager from '@/components/boost/PulseBoostManager';
import PulseBoostErrorBoundary from '@/components/boost/PulseBoostErrorBoundary';
import PulseBoostAnalytics from '@/components/boost/PulseBoostAnalytics';
import { useBoostStatus } from '@/hooks/boost/useBoostStatus';

const PulseBoostPage = () => {
  const { user, profile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { status: boostStatus } = useBoostStatus(user?.id);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>PULSE Boost System</CardTitle>
            <CardDescription>Loading boost information...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const subscriptionTier = (profile as any)?.subscription_tier || 'free';
  const isVerified = subscriptionTier !== 'free';
  const userIsEscort = (profile as any)?.isEscort || true;

  return (
    <div className="container mx-auto py-10">
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
        </TabsList>
        
        <TabsContent value="boost" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>PULSE Boost System</CardTitle>
              <CardDescription>
                Enhance your visibility with the Precision Upgrade Layer for Scalable Exposure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PulseBoostErrorBoundary>
                <PulseBoostManager profileId={user?.id} />
              </PulseBoostErrorBoundary>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <PulseBoostAnalytics 
            profileId={user?.id} 
            boostActive={boostStatus?.isActive || false}
            isLoading={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PulseBoostPage;
