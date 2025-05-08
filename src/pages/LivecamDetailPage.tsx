
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTitle } from '@/hooks/useTitle';

const LivecamDetailPage: React.FC = () => {
  const { id } = useParams<{id: string}>();
  useTitle(`Live Stream | UberEscorts`);
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Live Stream</h1>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Stream ID: {id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black aspect-video rounded-md flex items-center justify-center">
                  <p className="text-white">Live stream will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Stream Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Details about this live stream
                </p>
                <ul className="space-y-2">
                  <li>Duration: 00:00:00</li>
                  <li>Viewers: 0</li>
                  <li>Status: Online</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LivecamDetailPage;
