
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CreatorDetailPage: React.FC = () => {
  const { id } = useParams<{id: string}>();
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Creator Profile</h1>
        <Card>
          <CardHeader>
            <CardTitle>Creator ID: {id}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Content creator profile details coming soon. Check back later!
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreatorDetailPage;
