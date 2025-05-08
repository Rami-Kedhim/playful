
import React from 'react';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTitle } from '@/hooks/useTitle';

const LivecamsPage: React.FC = () => {
  useTitle("Live Cams | UberEscorts");
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Live Cams</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Featured Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our top models are streaming live.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>New Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Check out performers who just joined.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Starting Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                See who's about to go live.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LivecamsPage;
