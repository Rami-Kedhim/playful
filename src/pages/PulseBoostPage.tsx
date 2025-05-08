
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { pulseService } from '@/services/boost/pulseService';
import { Zap, TrendingUp, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PulseBoostPage = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [purchasing, setPurchasing] = useState(false);
  const { toast } = useToast();
  
  // Get boost packages
  const boostPackages = pulseService.getPackages();
  
  const handlePurchase = async () => {
    if (!selectedPackage) {
      toast({
        title: 'No Package Selected',
        description: 'Please select a boost package to continue.',
        variant: 'destructive'
      });
      return;
    }
    
    setPurchasing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: 'Boost Activated',
        description: 'Your profile boost has been successfully activated!',
        variant: 'default'
      });
      
      // Reset selection after purchase
      setSelectedPackage('');
    } catch (error) {
      toast({
        title: 'Purchase Failed',
        description: 'There was an error activating your boost. Please try again.',
        variant: 'destructive'
      });
      console.error('Error purchasing boost:', error);
    } finally {
      setPurchasing(false);
    }
  };
  
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Pulse Boost</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Increase your visibility and attract more clients with Pulse Boost
        </p>
        
        <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 p-6 rounded-lg mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-purple-600/20 rounded-full p-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Why Boost Your Profile?</h2>
              <p className="text-muted-foreground">Stand out from the crowd and get more bookings</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex flex-col items-center text-center p-4">
              <Users className="h-10 w-10 text-purple-600 mb-2" />
              <h3 className="font-semibold">Increased Visibility</h3>
              <p className="text-sm text-muted-foreground">Up to 5x more profile views</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Zap className="h-10 w-10 text-pink-600 mb-2" />
              <h3 className="font-semibold">Higher Ranking</h3>
              <p className="text-sm text-muted-foreground">Appear at the top of search results</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <TrendingUp className="h-10 w-10 text-indigo-600 mb-2" />
              <h3 className="font-semibold">More Bookings</h3>
              <p className="text-sm text-muted-foreground">Convert views to paid bookings</p>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Choose Your Boost</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {boostPackages.map(pkg => (
            <Card 
              key={pkg.id}
              className={`
                cursor-pointer transition-all duration-300
                ${selectedPackage === pkg.id ? 'ring-2 ring-purple-500 shadow-lg' : ''}
                ${pkg.id === 'boost-premium' ? 'border-purple-300' : ''}
              `}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  {pkg.id === 'boost-premium' && (
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full mr-2">
                      POPULAR
                    </span>
                  )}
                  {pkg.name}
                </CardTitle>
                <CardDescription>
                  {pkg.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="text-3xl font-bold mb-1">${pkg.price}</div>
                <p className="text-sm text-muted-foreground mb-4">
                  {pkg.duration}
                </p>
                <ul className="space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex text-sm">
                      <span className="mr-2 text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button 
            size="lg"
            onClick={handlePurchase}
            disabled={!selectedPackage || purchasing}
            className={`
              w-full max-w-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700
              text-white font-medium py-6
            `}
          >
            {purchasing ? 'Processing...' : 'Activate Boost Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PulseBoostPage;
