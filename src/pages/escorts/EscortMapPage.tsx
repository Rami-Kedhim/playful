
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

const EscortMapPage = () => {
  return (
    <UnifiedLayout
      title="Escort Map"
      description="Find escorts near your location"
      showBreadcrumbs
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Search Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input placeholder="Enter location" />
                  <Button size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Search radius</p>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <Button variant="outline" size="sm">1km</Button>
                    <Button variant="outline" size="sm">5km</Button>
                    <Button variant="outline" size="sm">10km</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Escorts Nearby</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 hover:bg-accent rounded-md cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Sofia V.</p>
                      <p className="text-xs text-muted-foreground">0.8 km away</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
                
                <div className="flex justify-between items-center p-2 hover:bg-accent rounded-md cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Emma L.</p>
                      <p className="text-xs text-muted-foreground">1.2 km away</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
                
                <div className="flex justify-between items-center p-2 hover:bg-accent rounded-md cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Ava M.</p>
                      <p className="text-xs text-muted-foreground">2.5 km away</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle>Map View</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-full">
              <div className="bg-muted h-full flex items-center justify-center">
                <p className="text-muted-foreground">
                  Map integration will be displayed here.
                  <br />
                  Please connect Google Maps API or Leaflet to enable this feature.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default EscortMapPage;
