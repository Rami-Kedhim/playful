
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import EscortCard from '@/components/escorts/EscortCard';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Button } from '@/components/ui/button';
import { Heart, Users, Video } from 'lucide-react';
import { Layout } from '@/layouts';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState("escorts");
  
  const handleRemoveFavorite = (type: 'escorts' | 'creators' | 'livecams', id: string) => {
    removeFavorite(type, id);
  };
  
  // Check if there are any favorites across all types
  const hasFavorites = 
    favorites.escorts.length > 0 || 
    favorites.creators.length > 0 || 
    favorites.livecams.length > 0;
  
  return (
    <Layout title="Favorites" description="Manage your favorite escorts, creators, and livecams" showBreadcrumbs>
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="escorts" className="flex items-center gap-1.5">
              <Heart className="h-4 w-4" />
              <span>Escorts</span>
            </TabsTrigger>
            <TabsTrigger value="creators" className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>Creators</span>
            </TabsTrigger>
            <TabsTrigger value="livecams" className="flex items-center gap-1.5">
              <Video className="h-4 w-4" />
              <span>Livecams</span>
            </TabsTrigger>
          </TabsList>
          
          {!hasFavorites && (
            <div className="text-center p-8 bg-card rounded-lg border border-border">
              <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-4">
                Save your favorite escorts, creators, and livecams to quickly access them later
              </p>
              <Button className="mr-2" asChild>
                <a href="/escorts">Browse Escorts</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/creators">Browse Creators</a>
              </Button>
            </div>
          )}
          
          <TabsContent value="escorts">
            {favorites.escorts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.escorts.map((escort) => (
                  <div key={escort.id} className="relative">
                    <EscortCard 
                      key={escort.id} 
                      name={escort.name || ''}
                      location={escort.location || ''}
                      imageUrl={escort.images?.[0] || ''}
                      id={escort.id}
                      age={escort.age || 0}
                      rating={0} // Default rating since it doesn't exist in Escort type
                      reviews={0} // Default reviews count
                      tags={escort.tags || []}
                      verified={escort.verified || false}
                      price={escort.price || 0}
                      gender="" // Provide default empty string for gender
                    />
                    <Button 
                      variant="ghost" 
                      className="absolute top-2 right-2" 
                      onClick={() => handleRemoveFavorite('escorts', escort.id)}
                    >
                      <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-card rounded-lg border border-border">
                <p>No favorite escorts yet</p>
                <Button className="mt-4" asChild>
                  <a href="/escorts">Browse Escorts</a>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="creators">
            {favorites.creators.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Creator cards would go here */}
                <p>Your favorite creators</p>
              </div>
            ) : (
              <div className="text-center p-8 bg-card rounded-lg border border-border">
                <p>No favorite creators yet</p>
                <Button className="mt-4" asChild>
                  <a href="/creators">Browse Creators</a>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="livecams">
            {favorites.livecams.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Livecam cards would go here */}
                <p>Your favorite livecams</p>
              </div>
            ) : (
              <div className="text-center p-8 bg-card rounded-lg border border-border">
                <p>No favorite livecams yet</p>
                <Button className="mt-4" asChild>
                  <a href="/livecams">Browse Livecams</a>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Favorites;
