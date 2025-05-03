
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { MapPin, Clock, Share2, Shield } from 'lucide-react';

const RouteSharePage = () => {
  const [destination, setDestination] = useState('');
  const [shareWith, setShareWith] = useState('');
  const [duration, setDuration] = useState('60');
  
  const handleRouteShare = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for sharing route would go here
    console.log('Sharing route to', destination, 'with', shareWith, 'for', duration, 'minutes');
  };
  
  return (
    <MainLayout
      title="Share Your Route"
      description="Share your travel plans with trusted contacts for added safety"
      showBreadcrumbs
    >
      <div className="container mx-auto py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              Route Safety Sharing
            </CardTitle>
            <CardDescription>
              Keep trusted contacts informed about your travel plans and estimated arrival times
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRouteShare} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <div className="flex gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="destination"
                    placeholder="Enter destination address"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="shareWith">Share with (email or phone)</Label>
                <Input 
                  id="shareWith"
                  placeholder="Enter contact email or phone number"
                  value={shareWith}
                  onChange={(e) => setShareWith(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Share for duration (minutes)</Label>
                <div className="flex gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="duration"
                    type="number"
                    min="10"
                    max="1440"
                    placeholder="Minutes"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Share My Route
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default RouteSharePage;
