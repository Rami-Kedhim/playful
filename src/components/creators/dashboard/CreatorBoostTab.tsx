
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BoostPackage, BoostStatus } from '@/hooks/boost/types';
import { useToast } from '@/hooks/use-toast';
import BoostAnalytics from './boost/BoostAnalytics';
import { toDate } from '@/utils/formatters';

// Mock data for development purposes
const mockBoostPackages = [
  {
    id: 'basic',
    name: 'Basic Boost',
    description: 'Increase your profile visibility for 24 hours',
    price: 50,
    price_ubx: 50,
    duration: '24:00:00',
    durationMinutes: 1440,
    features: ['Increased profile visibility', 'Higher search ranking'],
    visibility: 'medium',
    visibility_increase: 25,
  },
  {
    id: 'premium',
    name: 'Premium Boost',
    description: 'Maximum visibility for 3 days with premium placement',
    price: 120,
    price_ubx: 120,
    duration: '72:00:00',
    durationMinutes: 4320,
    features: ['Maximum profile visibility', 'Top search results', 'Featured on homepage'],
    visibility: 'high',
    visibility_increase: 75,
    isMostPopular: true,
  }
] as BoostPackage[];

interface CreatorBoostTabProps {
  userId: string;
}

const CreatorBoostTab: React.FC<CreatorBoostTabProps> = ({ userId }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('status');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    expiresAt: '',
    packageName: '',
    packageId: '',
  });
  
  // Function to calculate boost price based on user's profile
  const getBoostPrice = () => {
    return 100; // Default base price
  };
  
  // Simulate purchasing a boost package
  const handlePurchaseBoost = async () => {
    if (!selectedPackage) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Update status with the newly purchased boost
      const purchasedPackage = mockBoostPackages.find(pkg => pkg.id === selectedPackage);
      if (purchasedPackage) {
        const now = new Date();
        const expirationDate = new Date(now.getTime() + purchasedPackage.durationMinutes * 60 * 1000);
        
        setBoostStatus({
          isActive: true,
          expiresAt: expirationDate.toISOString(),
          startedAt: now.toISOString(),
          packageName: purchasedPackage.name,
          packageId: purchasedPackage.id,
        });
        
        toast({
          title: "Boost purchased!",
          description: `Your ${purchasedPackage.name} is now active.`,
        });
      }
    } catch (error) {
      toast({
        title: "Purchase failed",
        description: "There was an error processing your purchase.",
        variant: "destructive",
      });
      console.error("Purchase error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel the active boost
  const handleCancelBoost = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setBoostStatus({
        isActive: false,
        expiresAt: '',
        packageName: '',
        packageId: '',
      });
      
      toast({
        title: "Boost cancelled",
        description: "Your boost has been cancelled.",
      });
    } catch (error) {
      toast({
        title: "Cancellation failed",
        description: "There was an error cancelling your boost.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Convert string dates to proper Date objects
  const formattedBoostStatus = {
    ...boostStatus,
    expiresAt: boostStatus.expiresAt ? toDate(boostStatus.expiresAt) : undefined,
    startedAt: boostStatus.startedAt ? toDate(boostStatus.startedAt) : undefined,
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Boost</CardTitle>
        <CardDescription>
          Increase your profile visibility and attract more visitors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="status" className="space-y-4">
            {/* Status content would be rendered here */}
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <h3 className="font-medium mb-2">Current Status</h3>
              {formattedBoostStatus.isActive ? (
                <div>
                  <p className="text-green-600">Your profile is currently boosted!</p>
                  <p className="text-sm text-muted-foreground">
                    {formattedBoostStatus.packageName} expires on{' '}
                    {formattedBoostStatus.expiresAt?.toLocaleString()}
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground">You don't have an active boost.</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <BoostAnalytics 
              profileId={userId} 
              boostStatus={formattedBoostStatus}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CreatorBoostTab;
