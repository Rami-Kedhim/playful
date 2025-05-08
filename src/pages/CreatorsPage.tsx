
import React from 'react';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTitle } from '@/hooks/useTitle';

const CreatorsPage: React.FC = () => {
  useTitle("Content Creators | UberEscorts");
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Content Creators</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Featured Creators</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our top content creators with exclusive material.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>New Creators</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Check out creators who just joined the platform.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Popular Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Browse creators by popular categories.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CreatorsPage;
