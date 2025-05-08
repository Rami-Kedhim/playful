
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { boostService } from '@/services/boostService';
import { BoostPackage } from '@/types/boost';
import { getPulsePackages } from '@/services/boost/pulseService';

const PulseBoostPage = () => {
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoostPackages = async () => {
      try {
        setIsLoading(true);
        const boostPackages = await getPulsePackages();
        setPackages(boostPackages);
      } catch (err: any) {
        console.error('Error fetching boost packages:', err);
        setError(err.message || 'Failed to load boost packages');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBoostPackages();
  }, []);

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Pulse Boost</h1>
      <p className="text-muted-foreground mb-6">
        Supercharge your visibility and reach more potential clients with Pulse Boost
      </p>
      
      <Tabs defaultValue="packages">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="packages">Boost Packages</TabsTrigger>
          <TabsTrigger value="current">Current Boost</TabsTrigger>
          <TabsTrigger value="history">Boost History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="packages">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Loading boost packages...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-800 p-6 rounded-md text-center">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <BoostPackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="current">
          <CurrentBoostStatus />
        </TabsContent>
        
        <TabsContent value="history">
          <BoostHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface BoostPackageCardProps {
  package: BoostPackage;
}

const BoostPackageCard: React.FC<BoostPackageCardProps> = ({ package: pkg }) => {
  return (
    <Card className="overflow-hidden border-2 hover:border-primary transition-colors">
      <div className="bg-primary/10 p-4">
        <h3 className="text-xl font-bold">{pkg.name}</h3>
        <p className="text-muted-foreground">{pkg.description}</p>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="text-3xl font-bold mb-1">{pkg.price_ubx} UBX</div>
          <div className="text-sm text-muted-foreground">or ${pkg.price.toFixed(2)} USD</div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Duration: {pkg.duration}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            <span>Visibility: {pkg.visibility}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            <span>Increase visibility by {pkg.visibility_increase}%</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Button className="w-full">Purchase with UBX</Button>
          <Button variant="outline" className="w-full">Purchase with USD</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const CurrentBoostStatus = () => {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        
        <h3 className="text-xl font-bold mb-2">No Active Boost</h3>
        <p className="text-muted-foreground mb-6">
          You don't have any active boosts at the moment.
          Purchase a boost to increase your profile visibility!
        </p>
        
        <Button>Purchase Boost</Button>
      </CardContent>
    </Card>
  );
};

const BoostHistory = () => {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        
        <h3 className="text-xl font-bold mb-2">No Boost History</h3>
        <p className="text-muted-foreground mb-6">
          You haven't purchased any boosts yet.
          Try your first boost to see how it can increase your visibility!
        </p>
        
        <Button>Try Your First Boost</Button>
      </CardContent>
    </Card>
  );
};

export default PulseBoostPage;
