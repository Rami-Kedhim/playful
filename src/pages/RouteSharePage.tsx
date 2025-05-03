
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MainLayout } from '@/layouts';

const RouteSharePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const shareId = queryParams.get('id') || 'No ID provided';
  const shareType = queryParams.get('type') || 'Unknown type';

  return (
    <MainLayout title="Shared Content" showBreadcrumbs>
      <div className="container mx-auto p-6">      
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Shared Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <strong>Share ID:</strong> {shareId}
              </div>
              <div>
                <strong>Type:</strong> {shareType}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Content will load here</h2>
          <p className="text-muted-foreground">
            This is a placeholder for shared content. In a real implementation, this would fetch 
            the content based on the share ID and type.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default RouteSharePage;
