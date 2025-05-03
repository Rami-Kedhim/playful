
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, X, Star, CheckCircle, Clock, Users } from 'lucide-react';
import { Escort } from '@/types/Escort';

// Mock data for favorite escorts
const initialFavorites: Escort[] = [
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
    id: '3',
    name: 'Emma',
    age: 26,
    gender: 'female',
    location: 'Miami, FL',
    rating: 4.7,
    reviewCount: 28,
    price: 280,
    tags: ['Luxury', 'Events', 'Travel'],
    imageUrl: 'https://i.pravatar.cc/300?img=9',
    availableNow: true,
    isVerified: true,
    responseRate: 90
  },
  {
    id: '5',
    name: 'Olivia',
    age: 27,
    gender: 'female',
    location: 'Las Vegas, NV',
    rating: 4.9,
    reviewCount: 41,
    price: 350,
    tags: ['VIP', 'Events', 'Travel'],
    imageUrl: 'https://i.pravatar.cc/300?img=20',
    availableNow: false,
    isVerified: true,
    responseRate: 99
  }
];

// Mock data for favorite AI companions
const initialAICompanions = [
  {
    id: '101',
    name: 'Aria',
    description: 'Virtual companion with a friendly and outgoing personality',
    rating: 4.8,
    users: 2145,
    imageUrl: 'https://i.pravatar.cc/300?img=25',
    tags: ['Friendly', 'Outgoing', 'Supportive'],
    isPremium: true
  },
  {
    id: '102',
    name: 'Luna',
    description: 'Empathetic and caring personality focused on emotional support',
    rating: 4.9,
    users: 3254,
    imageUrl: 'https://i.pravatar.cc/300?img=32',
    tags: ['Caring', 'Empathetic', 'Warm'],
    isPremium: true
  }
];

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Escort[]>(initialFavorites);
  const [aiCompanions, setAICompanions] = useState(initialAICompanions);

  const handleRemoveFavorite = (id: string) => {
    setFavorites(prev => prev.filter(escort => escort.id !== id));
  };

  const handleRemoveAICompanion = (id: string) => {
    setAICompanions(prev => prev.filter(companion => companion.id !== id));
  };

  return (
    <MainLayout
      title="My Favorites"
      description="Your saved companions and AI personalities"
      showBreadcrumbs
    >
      <div className="py-6">
        <Tabs defaultValue="escorts" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="escorts">
              <Users className="h-4 w-4 mr-2" />
              Companions
            </TabsTrigger>
            <TabsTrigger value="ai">
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V16.01M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              AI Companions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="escorts">
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((escort) => (
                  <Card key={escort.id} className="overflow-hidden">
                    <div className="relative">
                      <Link to={`/escorts/${escort.id}`}>
                        <div className="aspect-[3/4] overflow-hidden">
                          <img 
                            src={escort.imageUrl || "https://via.placeholder.com/300x400"}
                            alt={escort.name}
                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </Link>
                      
                      {escort.isVerified && (
                        <Badge className="absolute top-2 right-2 bg-green-500 text-white border-0">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      
                      {escort.availableNow && (
                        <Badge className="absolute top-2 left-2 bg-blue-500 text-white border-0">
                          Available Now
                        </Badge>
                      )}
                      
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="absolute top-2 right-2 rounded-full bg-black/70 hover:bg-black/90"
                        onClick={() => handleRemoveFavorite(escort.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <CardContent className="p-4">
                      <Link to={`/escorts/${escort.id}`}>
                        <div className="mb-2">
                          <div className="flex justify-between items-center">
                            <div className="font-semibold">{escort.name}, {escort.age}</div>
                            <div className="flex items-center text-sm">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                              <span>{escort.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{escort.location}</span>
                          </div>
                        </div>
                      
                        <div className="flex flex-wrap gap-1 mb-3">
                          {escort.tags?.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-muted-foreground text-xs flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Response rate: {escort.responseRate}%</span>
                          </div>
                          <div className="font-bold text-green-600">${escort.price}/hr</div>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Start browsing and save your favorite companions by clicking the heart icon on their profiles
                </p>
                <Button asChild>
                  <Link to="/escorts">Browse Companions</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ai">
            {aiCompanions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiCompanions.map((companion) => (
                  <Card key={companion.id} className="overflow-hidden">
                    <div className="relative">
                      <Link to={`/ai-companion`}>
                        <div className="aspect-[3/4] overflow-hidden">
                          <img 
                            src={companion.imageUrl}
                            alt={companion.name}
                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </Link>
                      
                      {companion.isPremium && (
                        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-amber-300 text-black">
                          Premium
                        </Badge>
                      )}
                      
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="absolute top-2 right-2 rounded-full bg-black/70 hover:bg-black/90"
                        onClick={() => handleRemoveAICompanion(companion.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <CardContent className="p-4">
                      <Link to={`/ai-companion`}>
                        <div className="mb-2">
                          <div className="flex justify-between items-center">
                            <div className="font-semibold">{companion.name}</div>
                            <div className="flex items-center text-sm">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                              <span>{companion.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{companion.description}</p>
                        </div>
                      
                        <div className="flex flex-wrap gap-1 mb-3">
                          {companion.tags?.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Users className="h-3 w-3 mr-1" />
                          <span>{companion.users.toLocaleString()} active users</span>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <svg className="h-12 w-12 text-muted-foreground mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 12L12 16L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 8L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="text-lg font-semibold mb-2">No AI companions saved</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Explore our AI companions and save your favorites to connect with them anytime
                </p>
                <Button asChild>
                  <Link to="/ai-companion">Explore AI Companions</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default FavoritesPage;
