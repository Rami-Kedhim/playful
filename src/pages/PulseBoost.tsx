
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import PulseBoostManager from '@/components/boost/PulseBoostManager';

const PulseBoostPage = () => {
  const { user, profile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

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
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>PULSE Boost System</CardTitle>
          <CardDescription>
            Enhance your visibility with the Precision Upgrade Layer for Scalable Exposure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PulseBoostManager profileId={user?.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PulseBoostPage;
