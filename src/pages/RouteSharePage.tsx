
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Share2 } from 'lucide-react';

const RouteSharePage: React.FC = () => {
  return (
    <UnifiedLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Route Sharing</h1>
          <p className="text-muted-foreground">
            Share your route with trusted contacts for added safety.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <CardTitle>Route Sharing Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p>This is the route sharing feature. Configure your safety contacts and preferences here.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              <CardTitle>Safety Contacts</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p>Add and manage contacts who will receive your location updates.</p>
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  );
};

export default RouteSharePage;
