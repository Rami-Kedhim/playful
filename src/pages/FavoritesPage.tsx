
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Placeholder for favorites data
const placeholderEscorts = [
  { id: '1', name: 'Sophia', location: 'Los Angeles', avatar_url: '/avatars/sophia.jpg' },
  { id: '2', name: 'Emma', location: 'New York', avatar_url: '/avatars/emma.jpg' },
  { id: '3', name: 'Isabella', location: 'Miami', avatar_url: '/avatars/isabella.jpg' }
];

const placeholderCreators = [
  { id: '4', name: 'Luna', location: 'Las Vegas', avatar_url: '/avatars/luna.jpg' },
  { id: '5', name: 'Aria', location: 'Chicago', avatar_url: '/avatars/aria.jpg' }
];

const FavoritesPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('escorts');
  const [favoriteEscorts, setFavoriteEscorts] = useState(placeholderEscorts);
  const [favoriteCreators, setFavoriteCreators] = useState(placeholderCreators);
  
  // In a real app, you would fetch favorites from your API
  useEffect(() => {
    // Fetch favorites logic would go here
  }, [user?.id]);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const FavoriteCard = ({ item }: { item: any }) => (
    <Card className="overflow-hidden">
      <div className="h-40 bg-gradient-to-r from-gray-800 to-gray-900 flex justify-center items-center">
        {item.avatar_url ? (
          <img 
            src={item.avatar_url} 
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-xl font-bold">
            {getInitials(item.name)}
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg">{item.name}</h3>
        <p className="text-sm text-muted-foreground">{item.location}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <button className="text-sm text-primary hover:underline">View Profile</button>
        <button className="text-sm text-destructive hover:underline">Remove</button>
      </CardFooter>
    </Card>
  );
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
          <TabsTrigger value="escorts">Escorts</TabsTrigger>
          <TabsTrigger value="creators">Creators</TabsTrigger>
        </TabsList>
        
        <TabsContent value="escorts">
          {favoriteEscorts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoriteEscorts.map(escort => (
                <FavoriteCard key={escort.id} item={escort} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-muted-foreground">No favorite escorts yet</h2>
              <p className="mt-2">Browse our escort profiles and add some favorites</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="creators">
          {favoriteCreators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoriteCreators.map(creator => (
                <FavoriteCard key={creator.id} item={creator} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-muted-foreground">No favorite creators yet</h2>
              <p className="mt-2">Browse our creator profiles and add some favorites</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FavoritesPage;
