
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data for creators
const mockCreators = [
  {
    id: 'creator-1',
    name: 'Sophia',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256',
    rating: 4.9,
    followers: 12500,
    contentCount: 78,
    tags: ['Photos', 'Videos'],
    price: 9.99,
    isVerified: true
  },
  {
    id: 'creator-2',
    name: 'Emma',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=256',
    rating: 4.7,
    followers: 8200,
    contentCount: 56,
    tags: ['Photos', 'Audio'],
    price: 7.99,
    isVerified: true
  },
  {
    id: 'creator-3',
    name: 'Olivia',
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=256',
    rating: 4.8,
    followers: 9800,
    contentCount: 65,
    tags: ['Videos', 'Live'],
    price: 8.99,
    isVerified: true
  },
  {
    id: 'creator-4',
    name: 'Ava',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=256',
    rating: 4.6,
    followers: 7400,
    contentCount: 48,
    tags: ['Photos', 'Exclusive'],
    price: 6.99,
    isVerified: false
  }
];

const FeaturedCreators = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockCreators.map((creator) => (
        <Link 
          key={creator.id} 
          to={`/creator/${creator.id}`}
          className="group"
        >
          <Card className="overflow-hidden border border-border transition-all hover:shadow-md hover:border-primary/20">
            <div className="aspect-[2/3] relative">
              <img 
                src={creator.imageUrl} 
                alt={creator.name} 
                className="w-full h-full object-cover"
              />
              {creator.isVerified && (
                <Badge className="absolute top-2 right-2 bg-primary text-white">
                  Verified
                </Badge>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <Button variant="default" className="w-full">
                  View Profile
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-base">{creator.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm">{creator.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-1 mb-2">
                {creator.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> {(creator.followers / 1000).toFixed(1)}k
                  </span>
                </div>
                <div className="text-primary font-medium">
                  ${creator.price}/mo
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedCreators;
