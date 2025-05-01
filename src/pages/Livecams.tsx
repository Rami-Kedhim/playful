import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBoostDialog } from '@/hooks/useBoostDialog';
import { useAuth } from '@/hooks/auth';
import { Zap } from 'lucide-react';
import LivecamGrid from '@/components/livecams/LivecamGrid';
import LivecamFeatured from '@/components/livecams/LivecamFeatured';
import LivecamFilters from '@/components/livecams/LivecamFilters';
import { useLivecams } from '@/hooks/useLivecams';
import { Livecam } from '@/types/livecam';
import { useToast } from '@/hooks/use-toast';
import BoostDialog from '@/components/boost/BoostDialog';

const Livecams = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    tags: [],
    priceRange: [0, 500],
    onlineOnly: true
  });
  
  const { livecams, featured, isLoading: livecamsLoading } = useLivecams({
    filters: selectedFilters,
    category: activeTab === 'all' ? undefined : activeTab
  });
  
  const profileId = user?.id || 'guest';
  
  const { 
    showDialog, 
    isLoading, 
    boostStatus, 
    handleOpenDialog,
    handleCloseDialog,
    handleSuccess,
    toggleDialog
  } = useBoostDialog(profileId);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const handleCancel = async () => {
    try {
      // Call the appropriate cancel function
      const success = await toggleDialog(); // Or another appropriate method
      if (success) {
        // Handle successful cancellation
        toast({
          title: "Boost Cancelled",
          description: "Your boost has been cancelled successfully."
        });
      }
      return success;
    } catch (err) {
      setErrorMessage('Failed to cancel boost');
      return false;
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setSelectedFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const renderBoostButton = () => {
    if (!user) return null;
    
    if (boostStatus.isActive) {
      return (
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleOpenDialog}
        >
          <Zap className="h-4 w-4 text-amber-500" />
          <span>Boosted</span>
        </Button>
      );
    }
    
    return (
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={handleOpenDialog}
      >
        <Zap className="h-4 w-4" />
        <span>Boost Visibility</span>
      </Button>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Live Cams</h1>
          <p className="text-muted-foreground">
            Connect with live performers in real-time
          </p>
        </div>
        
        {renderBoostButton()}
      </div>
      
      {featured && featured.length > 0 && (
        <div className="mb-8">
          <LivecamFeatured livecams={featured} />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Refine your search</CardDescription>
            </CardHeader>
            <CardContent>
              <LivecamFilters 
                filters={selectedFilters}
                onChange={handleFilterChange}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="female">Female</TabsTrigger>
              <TabsTrigger value="male">Male</TabsTrigger>
              <TabsTrigger value="couple">Couples</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <LivecamGrid 
            livecams={livecams} 
            loading={livecamsLoading}
          />
        </div>
      </div>
      
      <BoostDialog 
        open={showDialog}
        onOpenChange={handleCloseDialog}
        profileId={profileId}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
      
      {errorMessage && (
        <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Livecams;
