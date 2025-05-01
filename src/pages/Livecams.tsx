
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBoostDialog } from '@/hooks/useBoostDialog';
import { Zap } from 'lucide-react';
import LivecamGrid from '@/components/livecams/LivecamGrid';
import LivecamFeatured from '@/components/livecams/LivecamFeatured';
import LivecamFilters from '@/components/livecams/LivecamFilters';
import BoostDialog from '@/components/boost/BoostDialog';
import { useToast } from '@/hooks/use-toast';
import { Livecam } from '@/types/livecams';

// Mock hook for livecams data
const useLivecams = (options: any) => {
  const featuredLivecams: Livecam[] = [
    {
      id: 'live-1',
      name: 'Featured Model',
      thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
      isLive: true,
      viewerCount: 254,
      categories: ['Featured', 'Popular']
    }
  ];
  
  const livecams: Livecam[] = [
    ...featuredLivecams,
    {
      id: 'live-2',
      name: 'Model 2',
      thumbnailUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
      isLive: true,
      viewerCount: 154,
      categories: ['Popular']
    },
    {
      id: 'live-3',
      name: 'Model 3',
      thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
      isLive: false,
      viewerCount: 0,
      categories: ['New']
    }
  ];
  
  return {
    livecams,
    featured: featuredLivecams,
    isLoading: false
  };
};

const Livecams = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    tags: [],
    priceRange: [0, 500],
    onlineOnly: true
  });
  
  const { livecams, featured, isLoading } = useLivecams({
    filters: {
      ...selectedFilters,
      category: activeTab === 'all' ? undefined : activeTab
    }
  });
  
  const profileId = 'guest';
  
  const boostDialog = useBoostDialog(profileId);
  const { 
    showDialog,
    handleOpenDialog,
    handleCloseDialog,
    handleSuccess,
    toggleDialog
  } = boostDialog;

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const handleCancel = async () => {
    try {
      const success = await toggleDialog();
      if (success) {
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
    if (boostDialog.boostStatus.isActive) {
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
            loading={isLoading}
            onItemClick={(id) => console.log(`Clicked livecam ${id}`)}
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
