
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTitle } from '@/hooks/useTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart } from 'lucide-react';

const CreatorDetailPage: React.FC = () => {
  const { id } = useParams<{id: string}>();
  useTitle(`Creator Profile | UberEscorts`);
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-8">Creator Profile</h1>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Creator ID: {id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-32 h-32 bg-gray-800 rounded-full"></div>
                  <div>
                    <h2 className="text-2xl font-bold">Creator Name</h2>
                    <p className="text-muted-foreground mt-2 mb-4">
                      Professional content creator specializing in premium adult content
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        Favorite
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="content">
              <TabsList className="w-full">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div className="aspect-video bg-gray-800 rounded"></div>
                      <div className="aspect-video bg-gray-800 rounded"></div>
                      <div className="aspect-video bg-gray-800 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="about">
                <Card>
                  <CardContent className="p-6">
                    <p>Bio and details about the creator will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card>
                  <CardContent className="p-6">
                    <p>No reviews yet. Be the first to leave a review.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Subscription Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-semibold">Monthly</h3>
                    <p className="text-2xl font-bold my-2">$9.99</p>
                    <Button className="w-full">Subscribe</Button>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="font-semibold">Yearly</h3>
                    <p className="text-2xl font-bold my-2">$99.99</p>
                    <p className="text-xs text-muted-foreground mb-2">Save 16%</p>
                    <Button className="w-full">Subscribe</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatorDetailPage;
