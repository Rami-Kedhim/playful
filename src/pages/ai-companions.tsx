
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Robot, Star, Heart, Clock } from 'lucide-react';

const AICompanionsPage = () => {
  return (
    <UnifiedLayout
      title="AI Companions"
      description="Meet your perfect AI companion - intelligent, responsive, personalized"
      showBreadcrumbs
    >
      <div className="space-y-8">
        <Card className="bg-gradient-to-r from-blue-900 to-indigo-900">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-2">Meet Your Perfect AI Companion</h2>
                <p className="text-blue-100">
                  Our AI companions offer intellectually stimulating conversation, emotional support, and personalized experiences.
                </p>
              </div>
              <Button size="lg" className="whitespace-nowrap bg-white text-blue-900 hover:bg-blue-50">
                <Robot className="mr-2 h-4 w-4" />
                Create Custom AI
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="featured">
              <Star className="mr-2 h-4 w-4" />
              Featured
            </TabsTrigger>
            <TabsTrigger value="popular">
              <Heart className="mr-2 h-4 w-4" />
              Popular
            </TabsTrigger>
            <TabsTrigger value="recent">
              <Clock className="mr-2 h-4 w-4" />
              Recently Added
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Heart className="mr-2 h-4 w-4 fill-current" />
              My Favorites
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-64 bg-muted"></div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-1">AI Companion #{i+1}</h3>
                    <p className="text-sm text-muted-foreground mb-3">Personality: Friendly, Caring, Intellectual</p>
                    <Button className="w-full" variant="outline">View Profile</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="popular" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular AI Companions</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Loading popular AI companions...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recently Added</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Loading recently added AI companions...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="favorites" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Favorite AI Companions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">You haven't saved any AI companions to your favorites yet.</p>
                <Button className="mt-4" variant="outline">Browse AI Companions</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </UnifiedLayout>
  );
};

export default AICompanionsPage;
