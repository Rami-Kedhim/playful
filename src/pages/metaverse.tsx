
import React, { useEffect } from 'react';
import { UnifiedLayout } from '@/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Globe, Users, Map, Layers } from 'lucide-react';

const MetaversePage = () => {
  useEffect(() => {
    // Initialize metaverse components
    console.log('Initializing metaverse components');
  }, []);

  return (
    <UnifiedLayout 
      title="Metaverse"
      description="Enter the UberEscorts Metaverse - Virtual experiences and spaces"
      showBreadcrumbs={true}
    >
      <div className="space-y-8">
        <Card className="overflow-hidden">
          <div className="h-64 bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Globe className="mr-2 h-4 w-4" />
                Enter Metaverse
              </Button>
            </div>
          </div>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-2">Welcome to the UberEscorts Metaverse</h2>
            <p className="text-muted-foreground">
              Explore virtual spaces, interact with escorts and creators in real-time, and enjoy 
              immersive experiences. Connect your avatar and start your journey now.
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="spaces" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="spaces">
              <Layers className="mr-2 h-4 w-4" />
              Virtual Spaces
            </TabsTrigger>
            <TabsTrigger value="events">
              <Users className="mr-2 h-4 w-4" />
              Live Events
            </TabsTrigger>
            <TabsTrigger value="assets">
              <Globe className="mr-2 h-4 w-4" />
              My Assets
            </TabsTrigger>
            <TabsTrigger value="map">
              <Map className="mr-2 h-4 w-4" />
              Explore Map
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="spaces" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <div className="h-40 bg-muted rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">Virtual Space #{i+1}</h3>
                    <p className="text-sm text-muted-foreground">Active users: {Math.floor(Math.random() * 20)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="mt-6">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Metaverse Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No upcoming events scheduled. Check back later!</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assets" className="mt-6">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Metaverse Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">You haven't acquired any metaverse assets yet.</p>
                  <Button className="mt-4">Browse Asset Store</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="map" className="mt-6">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Metaverse Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Metaverse Map Loading...</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </UnifiedLayout>
  );
};

export default MetaversePage;
