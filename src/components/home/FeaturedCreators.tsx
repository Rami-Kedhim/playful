
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Zap } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AppPaths } from '@/routes/routeConfig';

const FeaturedCreators: React.FC = () => {
  const navigate = useNavigate();
  
  const featuredCreators = [
    {
      id: 'creator-1',
      name: 'Sophia Rose',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256',
      location: 'Los Angeles, CA',
      tags: ['Videos', 'Photos', 'Live Shows'],
      subscriberCount: '12.5k',
      price: 19.99,
      isBoosted: true
    },
    {
      id: 'creator-2',
      name: 'Elena Star',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256',
      location: 'Miami, FL',
      tags: ['Photos', 'Personalized'],
      subscriberCount: '8.7k',
      price: 14.99,
      isBoosted: false
    },
    {
      id: 'creator-3',
      name: 'Jessica Taylor',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256',
      location: 'New York, NY',
      tags: ['Videos', 'Live Shows'],
      subscriberCount: '21.3k',
      price: 24.99,
      isBoosted: true
    },
    {
      id: 'creator-4',
      name: 'Mia Rivera',
      avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=256',
      location: 'Chicago, IL',
      tags: ['Photos', 'Videos'],
      subscriberCount: '5.2k',
      price: 12.99,
      isBoosted: false
    }
  ];
  
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredCreators.map((creator) => (
          <Card key={creator.id} className="overflow-hidden hover:shadow-md transition-all group">
            <div className="relative">
              <div className="aspect-[3/4] bg-gradient-to-b from-transparent to-black/50 relative overflow-hidden">
                <img 
                  src={creator.avatarUrl} 
                  alt={creator.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {creator.isBoosted && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                      <Zap className="h-3 w-3" /> Boosted
                    </Badge>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium">{creator.name}</span>
                  </div>
                  <p className="text-white/80 text-sm">{creator.location}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {creator.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-black/40 text-white">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{creator.subscriberCount}</span> subscribers
                </div>
                <div className="text-sm font-medium">
                  ${creator.price}/month
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="flex gap-1" onClick={() => navigate(`/creators/${creator.id}`)}>
                  <Heart className="h-4 w-4" />
                  Subscribe
                </Button>
                <Button size="sm" className="flex gap-1" onClick={() => navigate(`/messages/new?recipient=${creator.id}`)}>
                  <MessageSquare className="h-4 w-4" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 flex justify-center">
        <Button className="gap-2" onClick={() => navigate(AppPaths.CREATORS || '/creators')}>
          Browse All Creators
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Import ChevronRight
import { ChevronRight } from 'lucide-react';

export default FeaturedCreators;
