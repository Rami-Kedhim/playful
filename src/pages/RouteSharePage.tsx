
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Share2, Map, Clock, Users, Shield } from "lucide-react";
import RouteShareForm from "@/components/safety/RouteShareForm";
import RouteShareViewer from "@/components/safety/RouteShareViewer";
import MapViewer from "@/components/maps/MapViewer";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { routeShareService, RouteShare, RouteLocation } from "@/services/route/RouteShareService";

const RouteSharePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("create");
  const [activeShareId, setActiveShareId] = useState<string | null>(null);
  const [activeShares, setActiveShares] = useState<RouteShare[]>([]);
  const [sharedWithMe, setSharedWithMe] = useState<RouteShare[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRouteShares = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Load user's active shares
        const userActiveShares = await routeShareService.getActiveRouteSharesByUser(user.id);
        setActiveShares(userActiveShares);
        
        // Load shares shared with the user
        const sharesWithMe = await routeShareService.getSharedWithMeRoutes(user.id);
        setSharedWithMe(sharesWithMe);
        
        // If there's at least one active share, select it
        if (userActiveShares.length > 0) {
          setActiveShareId(userActiveShares[0].id);
          setActiveTab("view");
        }
      } catch (error) {
        console.error("Error loading route shares:", error);
        toast({
          title: "Error",
          description: "Failed to load route shares",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadRouteShares();
  }, [user]);

  const handleShareCreated = (shareId: string) => {
    setActiveShareId(shareId);
    setActiveTab("view");
    
    // Reload active shares
    if (user) {
      routeShareService.getActiveRouteSharesByUser(user.id)
        .then(shares => setActiveShares(shares))
        .catch(err => console.error("Error reloading shares:", err));
    }
    
    toast({
      title: "Route Shared Successfully",
      description: "Your contacts can now track your journey"
    });
  };

  const handleShareAction = (action: string, shareId: string) => {
    console.log(`Action ${action} on share ${shareId}`);
    
    switch (action) {
      case "view":
        setActiveShareId(shareId);
        setActiveTab("view");
        break;
      case "viewMap":
        setActiveShareId(shareId);
        setActiveTab("map");
        break;
      case "cancel":
        routeShareService.cancelRouteShare(shareId)
          .then(success => {
            if (success) {
              toast({
                title: "Route Share Cancelled",
                description: "This route is no longer being shared"
              });
              // Reload shares
              if (user) {
                routeShareService.getActiveRouteSharesByUser(user.id)
                  .then(shares => setActiveShares(shares));
              }
            }
          })
          .catch(err => {
            console.error("Error cancelling route share:", err);
            toast({
              title: "Error",
              description: "Failed to cancel route share",
              variant: "destructive"
            });
          });
        break;
    }
  };

  return (
    <MainLayout
      title="Safety Routes"
      description="Share your route with trusted contacts for safety"
    >
      <div className="flex flex-col space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Create New</span>
              <span className="sm:hidden">New</span>
            </TabsTrigger>
            <TabsTrigger value="view" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Active Routes</span>
              <span className="sm:hidden">Active</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Route Map</span>
              <span className="sm:hidden">Map</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <div className="grid md:grid-cols-[1fr_1.5fr] gap-6">
              <div className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Safety First
                  </h2>
                  <p>
                    Share your route with trusted contacts for enhanced safety.
                    They'll receive real-time updates about your journey.
                  </p>
                  <ul className="space-y-2">
                    <li>Choose who can view your route</li>
                    <li>Set how long your route will be shared</li>
                    <li>Automatic notifications when you arrive</li>
                    <li>Panic button for emergencies</li>
                  </ul>
                </div>
              </div>

              <RouteShareForm onShareCreated={handleShareCreated} />
            </div>
          </TabsContent>

          <TabsContent value="view">
            <div className="grid md:grid-cols-[1fr_2fr] gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-medium">Active Routes</h2>
                
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : activeShares.length > 0 ? (
                  <div className="space-y-3">
                    {activeShares.map((share) => (
                      <Button
                        key={share.id}
                        variant={activeShareId === share.id ? "default" : "outline"}
                        className="w-full justify-start text-left"
                        onClick={() => handleShareAction("view", share.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Navigation className="h-4 w-4" />
                          <div className="truncate">
                            <div className="font-medium truncate">
                              {share.endLocation.name || share.endLocation.address || "Destination"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Created {new Date(share.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No active route shares</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setActiveTab("create")}
                    >
                      Create a New Share
                    </Button>
                  </div>
                )}

                {sharedWithMe.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2 mt-6">Shared With Me</h3>
                    <div className="space-y-3">
                      {sharedWithMe.map((share) => (
                        <Button
                          key={share.id}
                          variant={activeShareId === share.id ? "secondary" : "outline"}
                          className="w-full justify-start text-left"
                          onClick={() => handleShareAction("view", share.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Users className="h-4 w-4" />
                            <div className="truncate">
                              <div className="font-medium truncate">From: User #{share.userId.substring(0, 8)}</div>
                              <div className="text-xs text-muted-foreground">
                                Shared {new Date(share.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                {activeShareId ? (
                  <RouteShareViewer
                    shareId={activeShareId}
                    onAction={handleShareAction}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center bg-muted p-12 rounded-lg">
                    <Map className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium text-center">No Route Selected</h3>
                    <p className="text-muted-foreground text-center mt-2">
                      Select a route from the list or create a new one
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="map">
            <div className="space-y-4">
              <MapViewer
                height="500px"
                showControls={true}
              />
              
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("view")}
                >
                  Back to Route Details
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default RouteSharePage;
