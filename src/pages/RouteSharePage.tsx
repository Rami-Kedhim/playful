
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import RouteShareForm from '@/components/safety/RouteShareForm';
import RouteShareViewer from '@/components/safety/RouteShareViewer';
import MapViewer from "@/components/maps/MapViewer";
import { useAuth } from '@/hooks/auth/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import { routeShareService, RouteShare } from '@/services/route/RouteShareService';
import { MapPin, Share2, Eye } from 'lucide-react';

const RouteSharePage = () => {
  const { user } = useAuth();
  const [activeShareId, setActiveShareId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('create');
  const userId = user?.id;

  // Fetch active shares if the user is logged in
  const { data: activeShares = [], isLoading: isLoadingShares } = useQuery({
    queryKey: ['routeShares', userId],
    queryFn: async () => {
      if (!userId) return [];
      return await routeShareService.getActiveRouteSharesByUser(userId);
    },
    enabled: !!userId,
  });

  // Fetch shares shared with the current user
  const { data: sharedWithMe = [], isLoading: isLoadingSharedWithMe } = useQuery({
    queryKey: ['sharedRoutesWithMe', userId],
    queryFn: async () => {
      if (!userId) return [];
      return await routeShareService.getSharedWithMeRoutes(userId);
    },
    enabled: !!userId,
  });

  const handleShareCreated = (shareId: string) => {
    setActiveShareId(shareId);
    setActiveTab('my-shares');
  };

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Route Sharing</h1>
        <p className="text-muted-foreground mt-1">
          Share your travel routes with trusted contacts for better safety and coordination
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="create" className="flex items-center">
                <Share2 className="mr-2 h-4 w-4" />
                Create Share
              </TabsTrigger>
              <TabsTrigger value="my-shares" className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                My Shares {activeShares.length > 0 && `(${activeShares.length})`}
              </TabsTrigger>
              <TabsTrigger value="shared-with-me" className="flex items-center">
                <Eye className="mr-2 h-4 w-4" />
                Shared With Me {sharedWithMe.length > 0 && `(${sharedWithMe.length})`}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="mt-0">
              <RouteShareForm onShareCreated={handleShareCreated} />
            </TabsContent>

            <TabsContent value="my-shares" className="mt-0">
              {isLoadingShares ? (
                <Card>
                  <CardContent className="py-10">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  </CardContent>
                </Card>
              ) : activeShares.length === 0 ? (
                <Card>
                  <CardContent className="py-10">
                    <div className="text-center">
                      <Share2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No active shares</h3>
                      <p className="text-muted-foreground mt-1">
                        You haven't shared any routes yet. Go to the "Create Share" tab to share your route.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {activeShares.map((share: RouteShare) => (
                    <RouteShareViewer key={share.id} shareId={share.id} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="shared-with-me" className="mt-0">
              {isLoadingSharedWithMe ? (
                <Card>
                  <CardContent className="py-10">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  </CardContent>
                </Card>
              ) : sharedWithMe.length === 0 ? (
                <Card>
                  <CardContent className="py-10">
                    <div className="text-center">
                      <Eye className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No shares with you</h3>
                      <p className="text-muted-foreground mt-1">
                        No one has shared their route with you yet.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {sharedWithMe.map((share: RouteShare) => (
                    <RouteShareViewer key={share.id} shareId={share.id} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Route Map</CardTitle>
              <CardDescription>
                View your current shared routes on the map
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MapViewer height="400px" />
              <p className="text-sm text-muted-foreground mt-4">
                Note: For privacy reasons, the exact route is only visible when you click "View Map" on a specific route.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RouteSharePage;
