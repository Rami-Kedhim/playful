
import React from 'react';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LivecamsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Live Cams</h1>
        <Card>
          <CardHeader>
            <CardTitle>Online Now</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Live cam listings coming soon. Check back later!
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LivecamsPage;
