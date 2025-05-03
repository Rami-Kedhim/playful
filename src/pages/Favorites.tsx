
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFavorites } from '@/contexts/FavoritesContext';
import Layout from '@/components/layout/Layout';
import EscortCard from '@/components/escorts/EscortCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Escort } from '@/types/Escort';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState<'escorts' | 'creators' | 'livecams'>('escorts');
  
  // Check if all sections are empty
  const isEmpty = !favorites.escorts.length && 
                 !favorites.creators.length && 
                 !favorites.livecams.length;
  
  const handleRemoveFavorite = (type: 'escorts' | 'creators' | 'livecams', id: string) => {
    toggleFavorite(type, id);
  };
  
  return (
    <Layout title="My Favorites" description="View and manage your favorite escorts, creators and livecams">
      <div className="max-w-7xl mx-auto">
        {isEmpty ? (
          <Card className="text-center">
            <CardContent className="pt-10 pb-10">
              <div className="flex flex-col items-center">
                <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
                <p className="text-muted-foreground mb-6">
                  Add escorts, creators or livecams to your favorites to view them here
                </p>
                <div className="flex gap-2">
                  <Button asChild>
                    <a href="/escorts">Browse Escorts</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/creators">Browse Creators</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'escorts' | 'creators' | 'livecams')}>
              <TabsList className="mb-8">
                <TabsTrigger value="escorts">
                  Escorts ({favorites.escorts.length})
                </TabsTrigger>
                <TabsTrigger value="creators">
                  Creators ({favorites.creators.length})
                </TabsTrigger>
                <TabsTrigger value="livecams">
                  Livecams ({favorites.livecams.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="escorts">
                {favorites.escorts.length === 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>No favorite escorts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>You haven't added any escorts to your favorites yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.escorts.map((escort) => (
                      <div key={escort.id} className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
                          onClick={() => handleRemoveFavorite('escorts', escort.id)}
                        >
                          <Heart className="h-5 w-5 fill-current" />
                        </Button>
                        <EscortCard
                          id={escort.id}
                          name={escort.name || "Escort"}
                          age={escort.age || 25}
                          location={escort.location || "Unknown"}
                          rating={escort.rating || 4.5}
                          reviews={escort.reviewCount || 0}
                          tags={escort.tags || []}
                          imageUrl={escort.imageUrl || escort.profileImage || ""}
                          price={escort.price || 0}
                          verified={escort.isVerified || false}
                          gender={escort.gender || "Female"}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="creators">
                {favorites.creators.length === 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>No favorite creators</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>You haven't added any creators to your favorites yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.creators.map(creator => (
                      <div key={creator.id}>Creator card will go here</div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="livecams">
                {favorites.livecams.length === 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>No favorite livecams</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>You haven't added any livecams to your favorites yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.livecams.map(livecam => (
                      <div key={livecam.id}>Livecam card will go here</div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;
