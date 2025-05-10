
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  ChevronRight, 
  TrendingUp, 
  Users, 
  Calendar, 
  Clock 
} from 'lucide-react';
import BoostAnalytics from './boost/BoostAnalytics';
import useBoostOperations from '@/hooks/boost/useBoostOperations';
import { useAuth } from '@/contexts/AuthContext';
import BoostProfileDialog from '@/components/boost/BoostProfileDialog';

const CreatorBoostTab: React.FC = () => {
  const { user } = useAuth();
  const creatorId = user?.id || '';
  
  // State for boost dialog
  const [showBoostDialog, setShowBoostDialog] = useState(false);
  
  // Use the hook
  const {
    boostStatus,
    boostEligibility,
    boostPackages,
    getBoostPrice,
    hermesMetrics,
    loading,
    error,
    boostProfile
  } = useBoostOperations(creatorId);
  
  // Format relative date for expiry
  const formatExpiryDate = (date?: Date) => {
    if (!date) return 'N/A';
    
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    
    // If already expired
    if (diff <= 0) return 'Expired';
    
    // Convert to days, hours
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
  };
  
  // Handle successful boost
  const handleBoostSuccess = () => {
    console.log('Boost successful');
    // Could show a toast notification here
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Profile Boost</h2>
          <p className="text-muted-foreground">
            Increase your visibility and get more clients
          </p>
        </div>
        <Button 
          onClick={() => setShowBoostDialog(true)}
          variant={boostStatus.isActive ? "outline" : "default"}
          className="gap-1"
        >
          <Zap className="h-4 w-4" />
          {boostStatus.isActive ? 'Manage Boost' : 'Boost Profile'}
        </Button>
      </div>
      
      {boostStatus.isActive && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="font-medium flex items-center text-primary">
                  <Zap className="h-4 w-4 mr-2" /> 
                  Active Boost
                </h3>
                <p className="text-muted-foreground mt-1">
                  Your profile is currently boosted (Level {boostStatus.level})
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 space-y-1">
                <div className="flex items-center text-sm">
                  <Calendar className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Expires in:</span>
                  <span className="font-medium ml-1">
                    {formatExpiryDate(boostStatus.expiresAt)}
                  </span>
                </div>
                
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Visibility Increase:</span>
                  <span className="font-medium ml-1">+{boostStatus.level * 50}%</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Users className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Package:</span>
                  <span className="font-medium ml-1">
                    {boostStatus.level === 1 ? 'Basic' : boostStatus.level === 2 ? 'Standard' : 'Premium'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="analytics">
        <TabsList className="mb-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="boost-options">Boost Options</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analytics">
          <BoostAnalytics 
            profileId={creatorId} 
            boostStatus={boostStatus} 
          />
        </TabsContent>
        
        <TabsContent value="boost-options">
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
            {boostPackages.map((pkg) => (
              <Card key={pkg.id} className={`${pkg.level === 2 ? 'border-primary/40' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {pkg.name}
                    {pkg.level === 2 && (
                      <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">Most Popular</span>
                    )}
                  </CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">${pkg.price.toFixed(2)}</div>
                  
                  <div className="space-y-2 text-sm">
                    {pkg.features?.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-2 text-primary" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    {pkg.duration}
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    variant={pkg.level === 2 ? "default" : "outline"}
                    onClick={() => setShowBoostDialog(true)}
                  >
                    <Zap className="h-4 w-4 mr-1.5" /> 
                    Select
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Boost Profile Dialog */}
      <BoostProfileDialog
        open={showBoostDialog}
        setOpen={setShowBoostDialog}
        profileId={creatorId}
        onSuccess={handleBoostSuccess}
      />
    </div>
  );
};

export default CreatorBoostTab;
