
import React, { useState } from 'react';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Share2, Clock, Users, Bell } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const RouteSharePage = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [shareEmail, setShareEmail] = useState('');
  const [expiration, setExpiration] = useState('24');
  const [activeRoutes, setActiveRoutes] = useState([
    {
      id: 'route-1',
      name: 'Meeting in Downtown',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      sharedWith: ['contact@example.com'],
      isActive: true
    }
  ]);

  const handleAddContact = () => {
    if (!shareEmail) {
      toast({
        title: "Email Required",
        description: "Please enter a contact email.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Contact Added",
      description: `${shareEmail} will be notified about your route.`
    });
    setShareEmail('');
  };

  const handleCreateRoute = () => {
    toast({
      title: "Route Created",
      description: "Your safety route has been created and shared."
    });
  };

  const handleDeactivateRoute = (id: string) => {
    setActiveRoutes(prev => 
      prev.map(route => route.id === id ? {...route, isActive: false} : route)
    );
    
    toast({
      title: "Route Deactivated",
      description: "This route will no longer be shared."
    });
  };

  return (
    <Layout
      title="Route Sharing"
      description="Share your travel routes with trusted contacts for enhanced safety"
      showBreadcrumbs
    >
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/10 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="bg-white/10 p-4 rounded-full">
              <MapPin className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">How Route Sharing Works</h2>
              <p className="text-muted-foreground">
                Create and share your travel plans with trusted contacts. They'll receive your route details
                and be able to track your journey until you reach your destination safely.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full md:w-auto">
          <TabsTrigger value="create">Create Route</TabsTrigger>
          <TabsTrigger value="active">Active Routes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Route</CardTitle>
              <CardDescription>
                Share your route information with trusted contacts for added safety
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="route-name">Route Name</Label>
                <Input id="route-name" placeholder="e.g. Meeting in Downtown" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="start-location">Starting Location</Label>
                <div className="flex gap-2">
                  <Input id="start-location" placeholder="Enter starting address" className="flex-1" />
                  <Button variant="outline" type="button">
                    Use Current
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" placeholder="Enter destination address" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expiration">Route Expiration</Label>
                <select 
                  id="expiration" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                >
                  <option value="2">2 hours</option>
                  <option value="4">4 hours</option>
                  <option value="8">8 hours</option>
                  <option value="12">12 hours</option>
                  <option value="24">24 hours</option>
                </select>
              </div>
              
              <div className="space-y-2 border-t pt-4">
                <Label>Share With Contacts</Label>
                <div className="flex gap-2">
                  <Input 
                    type="email" 
                    placeholder="Enter contact email" 
                    value={shareEmail}
                    onChange={(e) => setShareEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleAddContact}>
                    Add
                  </Button>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    No contacts added yet. Add contacts to share your route with.
                  </p>
                </div>
              </div>
              
              <div className="pt-2">
                <Button onClick={handleCreateRoute} className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Create and Share Route
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Safety Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <Clock className="h-6 w-6 mb-2 text-primary" />
                  <h3 className="font-medium">Auto Check-In</h3>
                  <p className="text-sm text-muted-foreground">
                    Set automatic check-in times that will notify contacts if missed
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <Bell className="h-6 w-6 mb-2 text-primary" />
                  <h3 className="font-medium">Emergency Alert</h3>
                  <p className="text-sm text-muted-foreground">
                    Send immediate alerts to emergency contacts with location data
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <Users className="h-6 w-6 mb-2 text-primary" />
                  <h3 className="font-medium">Contact Groups</h3>
                  <p className="text-sm text-muted-foreground">
                    Create contact groups for quick sharing of routes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Shared Routes</CardTitle>
              <CardDescription>
                Routes you are currently sharing with contacts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeRoutes.length > 0 ? (
                <div className="space-y-4">
                  {activeRoutes.map(route => (
                    <div key={route.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{route.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Created {new Date(route.createdAt).toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Expires {new Date(route.expiresAt).toLocaleString()}
                          </p>
                          <div className="mt-2">
                            <p className="text-sm">
                              <span className="font-medium">Shared with: </span>
                              {route.sharedWith.join(', ')}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Button 
                            variant={route.isActive ? "destructive" : "outline"} 
                            size="sm"
                            onClick={() => handleDeactivateRoute(route.id)}
                            disabled={!route.isActive}
                          >
                            {route.isActive ? "Deactivate" : "Inactive"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">No active routes</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setActiveTab('create')}
                  >
                    Create New Route
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default RouteSharePage;
