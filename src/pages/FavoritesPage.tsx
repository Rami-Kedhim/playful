
import React, { useState, useEffect } from 'react';
import { Layout } from '@/layouts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import EscortGrid from '@/components/escorts/EscortGrid';
import { Escort } from '@/types/Escort';
import { Loader2, Heart, Calendar, Clock, X } from 'lucide-react';

// Mock favorites data
const mockFavorites: Escort[] = [
  {
    id: 'fav-1',
    name: 'Sophia',
    age: 24,
    location: 'New York',
    price: 250,
    rating: 4.8,
    reviewCount: 32,
    tags: ['VIP', 'Dinner Date', 'Travel'],
    imageUrl: 'https://picsum.photos/seed/sophia/800/1200',
    isVerified: true,
    gender: 'female',
    availableNow: true,
    responseRate: 98
  },
  {
    id: 'fav-2',
    name: 'Emma',
    age: 26,
    location: 'Los Angeles',
    price: 300,
    rating: 4.9,
    reviewCount: 45,
    tags: ['GFE', 'Events', 'Travel'],
    imageUrl: 'https://picsum.photos/seed/emma/800/1200',
    isVerified: true,
    gender: 'female',
    availableNow: false,
    lastActive: new Date(Date.now() - 3600000),
    responseRate: 95
  },
  {
    id: 'fav-3',
    name: 'Michael',
    age: 28,
    location: 'Miami',
    price: 280,
    rating: 4.7,
    reviewCount: 27,
    tags: ['Professional', 'Events', 'Travel Companion'],
    imageUrl: 'https://picsum.photos/seed/michael/800/1200',
    isVerified: true,
    gender: 'male',
    availableNow: false,
    lastActive: new Date(Date.now() - 7200000),
    responseRate: 92
  }
];

// Mock recent views data
const mockRecentViews: Escort[] = [
  {
    id: 'recent-1',
    name: 'Olivia',
    age: 23,
    location: 'Chicago',
    price: 220,
    rating: 4.5,
    reviewCount: 18,
    tags: ['New', 'College', 'Events'],
    imageUrl: 'https://picsum.photos/seed/olivia/800/1200',
    isVerified: false,
    gender: 'female',
    availableNow: true
  },
  {
    id: 'recent-2',
    name: 'James',
    age: 27,
    location: 'San Francisco',
    price: 300,
    rating: 4.6,
    reviewCount: 23,
    tags: ['VIP', 'Events', 'Travel'],
    imageUrl: 'https://picsum.photos/seed/james/800/1200',
    isVerified: true,
    gender: 'male',
    availableNow: false,
    lastActive: new Date(Date.now() - 5400000)
  }
];

const FavoritesPage = () => {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Escort[]>([]);
  const [recentViews, setRecentViews] = useState<Escort[]>([]);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setFavorites(mockFavorites);
      setRecentViews(mockRecentViews);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle removing from favorites
  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(escort => escort.id !== id));
  };
  
  return (
    <Layout title="Favorites" description="Manage your favorite escorts" showBreadcrumbs>
      <Tabs defaultValue="favorites">
        <TabsList className="mb-6">
          <TabsTrigger value="favorites" className="flex items-center gap-1.5">
            <Heart className="h-4 w-4" />
            <span>Favorites</span>
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>Recently Viewed</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="favorites" className="mt-0 animate-fade-in">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : favorites.length > 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {favorites.map(escort => (
                  <div key={escort.id} className="relative group">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveFavorite(escort.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <EscortCard escort={escort} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Favorites Yet</h3>
              <p className="text-muted-foreground mb-6">
                Add escorts to your favorites to see them here
              </p>
              <Button asChild>
                <a href="/escorts">Browse Escorts</a>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent" className="mt-0 animate-fade-in">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : recentViews.length > 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recentViews.map(escort => (
                  <div key={escort.id}>
                    <EscortCard escort={escort} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Recent Views</h3>
              <p className="text-muted-foreground mb-6">
                Profiles you view will appear here
              </p>
              <Button asChild>
                <a href="/escorts">Browse Escorts</a>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

// Helper card component for this view
const EscortCard = ({ escort }: { escort: Escort }) => {
  return (
    <div className="rounded-lg overflow-hidden border bg-card shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[3/4] relative">
        <img
          src={escort.imageUrl}
          alt={escort.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="text-white font-medium">
            {escort.name}, {escort.age}
          </div>
          <div className="text-white/80 text-sm">
            {escort.location}
          </div>
        </div>
        
        {escort.availableNow && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
            Available Now
          </div>
        )}
        
        {escort.isVerified && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="gold" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span className="ml-1">{escort.rating}</span>
            <span className="text-muted-foreground text-xs ml-1">({escort.reviewCount})</span>
          </div>
          <span className="font-bold text-primary">${escort.price}/hr</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {escort.tags.slice(0, 2).map((tag, i) => (
            <div key={i} className="bg-secondary px-2 py-0.5 rounded-full text-xs">
              {tag}
            </div>
          ))}
          {escort.tags.length > 2 && (
            <div className="bg-secondary px-2 py-0.5 rounded-full text-xs">
              +{escort.tags.length - 2}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
