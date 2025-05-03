
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Heart, Trash2, MapPin } from 'lucide-react';
import { Escort } from '@/types/Escort';
import { Link } from 'react-router-dom';

// Mock data for favorites display
const mockEscorts: Escort[] = [
  {
    id: '1',
    name: 'Sophia',
    age: 28,
    gender: 'female',
    location: 'Los Angeles, CA',
    rating: 4.9,
    reviewCount: 47,
    price: 300,
    tags: ['Elite', 'Luxury', 'Verified'],
    imageUrl: 'https://i.pravatar.cc/300?img=1',
    availableNow: true,
    isVerified: true,
    responseRate: 98
  },
  {
    id: '2',
    name: 'Isabella',
    age: 24,
    gender: 'female',
    location: 'New York, NY',
    rating: 4.8,
    reviewCount: 32,
    price: 250,
    tags: ['GFE', 'Party', 'Travel'],
    imageUrl: 'https://i.pravatar.cc/300?img=5',
    availableNow: false,
    isVerified: true,
    responseRate: 95
  }
];

const FavoritesPage = () => {
  const [activeTab, setActiveTab] = useState("escorts");
  
  // Using mock data for display purposes
  // In a real application, this would be filtered from actual favorites
  const favorites = mockEscorts;
  const hasCreators = false;
  const hasLivecams = false;
  
  const handleRemoveFavorite = (id: string) => {
    console.log('Remove favorite:', id);
    // Implementation would remove the item from favorites
  };
  
  const handleClearFavorites = () => {
    console.log('Clearing all favorites');
    // Implementation would clear all favorites
  };
  
  return (
    <MainLayout
      title="My Favorites"
      description="View and manage your favorite escorts, creators and livecams"
      showBreadcrumbs
    >
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center">
            <Heart className="mr-2 text-primary h-6 w-6" />
            My Favorites
          </h1>
          
          {favorites.length > 0 && (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleClearFavorites}
            >
              <Trash2 className="h-4 w-4 mr-2" /> 
              Clear All
            </Button>
          )}
        </div>
        
        <Tabs 
          defaultValue="escorts" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="escorts">Escorts</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
            <TabsTrigger value="livecams">Livecams</TabsTrigger>
          </TabsList>
          
          <TabsContent value="escorts">
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map(escort => (
                  <Card key={escort.id} className="p-4">
                    <div className="flex flex-col">
                      <Link to={`/escorts/${escort.id}`}>
                        <img 
                          src={escort.imageUrl} 
                          alt={escort.name} 
                          className="w-full h-64 object-cover rounded-md mb-3"
                        />
                      </Link>
                      <div className="flex justify-between items-center">
                        <div>
                          <Link to={`/escorts/${escort.id}`}>
                            <h3 className="text-lg font-medium hover:text-primary transition-colors">{escort.name}</h3>
                          </Link>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            {escort.location}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemoveFavorite(escort.id)}
                        >
                          <Heart className="h-5 w-5 fill-primary text-primary" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Heart className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <h3 className="text-2xl font-medium mb-2">No Favorites Yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't added any escorts to your favorites
                </p>
                <Button asChild>
                  <Link to="/escorts">Browse Escorts</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="creators">
            <div className="text-center py-16">
              <Heart className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <h3 className="text-2xl font-medium mb-2">No Creator Favorites</h3>
              <p className="text-muted-foreground mb-6">
                You haven't added any creators to your favorites
              </p>
              <Button asChild>
                <Link to="/creators">Browse Creators</Link>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="livecams">
            <div className="text-center py-16">
              <Heart className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <h3 className="text-2xl font-medium mb-2">No Livecam Favorites</h3>
              <p className="text-muted-foreground mb-6">
                You haven't added any livecams to your favorites
              </p>
              <Button asChild>
                <Link to="/livecams">Browse Livecams</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default FavoritesPage;
