
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MapViewer from "@/components/maps/MapViewer";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share2, Map, AlertTriangle, Clock } from "lucide-react";

// Mock API key - in production, this would be loaded from environment variables
const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY";

interface RouteDetails {
  startLocation: {
    name: string;
    latitude: number;
    longitude: number;
  };
  endLocation: {
    name: string;
    latitude: number;
    longitude: number;
  };
  estimatedDuration: number; // in minutes
  notes: string;
  shareCode: string;
}

const RouteSharePage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("create");
  const [routeDetails, setRouteDetails] = useState<RouteDetails | null>(null);
  const [shareCode, setShareCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  // Form fields
  const [startName, setStartName] = useState<string>("");
  const [startLatitude, setStartLatitude] = useState<number>(40.7128);
  const [startLongitude, setStartLongitude] = useState<number>(-74.006);
  const [endName, setEndName] = useState<string>("");
  const [endLatitude, setEndLatitude] = useState<number>(40.7128);
  const [endLongitude, setEndLongitude] = useState<number>(-73.935);
  const [duration, setDuration] = useState<number>(30);
  const [notes, setNotes] = useState<string>("");

  // Mock function to generate share code
  const generateShareCode = (): string => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // Handle route creation
  const handleCreateRoute = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newShareCode = generateShareCode();
      
      setRouteDetails({
        startLocation: {
          name: startName,
          latitude: startLatitude,
          longitude: startLongitude
        },
        endLocation: {
          name: endName,
          latitude: endLatitude,
          longitude: endLongitude
        },
        estimatedDuration: duration,
        notes: notes,
        shareCode: newShareCode
      });
      
      setShareCode(newShareCode);
      setLoading(false);
      setActiveTab("share");
      
      toast({
        title: "Route Created",
        description: "Your route has been created successfully.",
      });
    }, 1000);
  };

  // Handle route lookup
  const handleLookupRoute = () => {
    if (!shareCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a share code.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock data - in a real app, this would come from an API
      setRouteDetails({
        startLocation: {
          name: "Mock Start Location",
          latitude: 40.7128,
          longitude: -74.006
        },
        endLocation: {
          name: "Mock End Location",
          latitude: 40.7428,
          longitude: -73.935
        },
        estimatedDuration: 45,
        notes: "This is a mock route for demonstration purposes.",
        shareCode: shareCode
      });
      
      setLoading(false);
      setActiveTab("track");
      
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Share2 className="mr-2 h-6 w-6" />
            Safety Route Sharing
          </CardTitle>
          <CardDescription>
            Share your route with trusted contacts for enhanced safety during meetings.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="create" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="create">Create Route</TabsTrigger>
              <TabsTrigger value="share">Share Code</TabsTrigger>
              <TabsTrigger value="track">Track Route</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Starting Point</h3>
                  <Input 
                    placeholder="Location name" 
                    value={startName}
                    onChange={(e) => setStartName(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      placeholder="Latitude" 
                      type="number" 
                      value={startLatitude}
                      onChange={(e) => setStartLatitude(parseFloat(e.target.value))}
                    />
                    <Input 
                      placeholder="Longitude" 
                      type="number" 
                      value={startLongitude}
                      onChange={(e) => setStartLongitude(parseFloat(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Destination</h3>
                  <Input 
                    placeholder="Location name" 
                    value={endName}
                    onChange={(e) => setEndName(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      placeholder="Latitude" 
                      type="number" 
                      value={endLatitude}
                      onChange={(e) => setEndLatitude(parseFloat(e.target.value))}
                    />
                    <Input 
                      placeholder="Longitude" 
                      type="number" 
                      value={endLongitude}
                      onChange={(e) => setEndLongitude(parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Trip Details</h3>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Estimated duration (minutes):</span>
                  <Input 
                    className="w-20" 
                    type="number" 
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    min="1"
                  />
                </div>
                <Textarea 
                  placeholder="Additional notes about your trip" 
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              
              <MapViewer 
                apiKey={GOOGLE_MAPS_API_KEY}
                latitude={startLatitude}
                longitude={startLongitude}
                markerLabel="Start"
              />
              
              <Button 
                className="w-full" 
                onClick={handleCreateRoute} 
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Route Share"}
              </Button>
            </TabsContent>
            
            <TabsContent value="share" className="space-y-4">
              {routeDetails ? (
                <>
                  <div className="bg-muted p-4 rounded-md text-center">
                    <h3 className="font-bold text-xl mb-2">Your Share Code</h3>
                    <div className="text-3xl font-mono tracking-wider bg-card p-3 rounded-md">
                      {routeDetails.shareCode}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Share this code with trusted contacts to allow them to track your journey.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">From</h4>
                      <p className="bg-card p-2 rounded">{routeDetails.startLocation.name}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">To</h4>
                      <p className="bg-card p-2 rounded">{routeDetails.endLocation.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Estimated duration:</span>
                    <span className="font-medium">{routeDetails.estimatedDuration} minutes</span>
                  </div>
                  
                  {routeDetails.notes && (
                    <div>
                      <h4 className="font-medium mb-1">Notes</h4>
                      <p className="bg-card p-2 rounded text-sm">{routeDetails.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" onClick={() => navigator.clipboard.writeText(routeDetails.shareCode)}>
                      Copy Share Code
                    </Button>
                    <Button onClick={() => setActiveTab("track")}>
                      View Tracking Page
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
                  <h3 className="text-lg font-medium">No Route Created</h3>
                  <p className="text-muted-foreground mt-2">
                    Please create a route first or enter a share code to track an existing route.
                  </p>
                  <Button className="mt-4" onClick={() => setActiveTab("create")}>
                    Create Route
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="track" className="space-y-4">
              {routeDetails ? (
                <>
                  <div className="bg-muted p-4 rounded-md mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">Active Route</h3>
                        <p className="text-sm text-muted-foreground">Code: {routeDetails.shareCode}</p>
                      </div>
                      <div className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-sm font-medium">
                        Active
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium">From</h4>
                      <p className="bg-card p-2 rounded">{routeDetails.startLocation.name}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">To</h4>
                      <p className="bg-card p-2 rounded">{routeDetails.endLocation.name}</p>
                    </div>
                  </div>
                  
                  <MapViewer 
                    apiKey={GOOGLE_MAPS_API_KEY} 
                    latitude={(routeDetails.startLocation.latitude + routeDetails.endLocation.latitude) / 2}
                    longitude={(routeDetails.startLocation.longitude + routeDetails.endLocation.longitude) / 2}
                  />
                  
                  <div className="bg-muted p-3 rounded flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Estimated arrival: </span>
                      <span className="font-medium ml-1">
                        {new Date(Date.now() + routeDetails.estimatedDuration * 60000).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-sm font-medium">
                      {routeDetails.estimatedDuration} mins remaining
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md text-center">
                    <h3 className="font-bold text-lg mb-2">Enter Share Code</h3>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Enter share code" 
                        className="font-mono tracking-wider" 
                        value={shareCode}
                        onChange={(e) => setShareCode(e.target.value.toUpperCase())}
                      />
                      <Button onClick={handleLookupRoute} disabled={loading}>
                        {loading ? "Loading..." : "Track"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteSharePage;
