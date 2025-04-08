
import React from 'react';
import { Link } from 'react-router-dom';
import { Creator } from '@/hooks/useCreators';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Star, Users, ImageIcon, Video, Zap, Bot } from 'lucide-react';

interface CreatorGridProps {
  creators: Creator[];
}

const CreatorGrid: React.FC<CreatorGridProps> = ({ creators }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {creators.map((creator) => (
        <CreatorCard key={creator.id} creator={creator} />
      ))}
    </div>
  );
};

const CreatorCard: React.FC<{ creator: Creator }> = ({ creator }) => {
  return (
    <Link to={`/creators/${creator.id}`}>
      <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={creator.imageUrl} 
            alt={creator.name}
            className="object-cover w-full h-full"
          />
          
          {creator.isLive && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-red-500 hover:bg-red-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                LIVE
              </Badge>
            </div>
          )}
          
          {creator.isPremium && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-amber-500 hover:bg-amber-600 flex items-center gap-1">
                <Zap className="h-3 w-3" />
                PREMIUM
              </Badge>
            </div>
          )}
          
          {creator.isAI && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-purple-500/80 hover:bg-purple-600 flex items-center gap-1 text-xs">
                <Bot className="h-3 w-3" />
                AI GENERATED
              </Badge>
            </div>
          )}
          
          <div className="absolute bottom-2 right-2 flex gap-1">
            <Badge variant="secondary" className="flex items-center gap-1 bg-black/70 text-white border-none">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              {creator.rating.toFixed(1)}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <Avatar className="h-6 w-6">
              <AvatarImage src={creator.imageUrl} alt={creator.name} />
              <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm leading-none">{creator.name}</h3>
              <p className="text-xs text-muted-foreground">@{creator.username}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {creator.subscriberCount.toLocaleString()}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="flex items-center">
                <ImageIcon className="h-3 w-3 mr-1" />
                {creator.contentCount?.photos || 0}
              </span>
              <span className="flex items-center">
                <Video className="h-3 w-3 mr-1" />
                {creator.contentCount?.videos || 0}
              </span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-3 pt-0">
          <Button variant="outline" size="sm" className="w-full text-xs">
            ${creator.price}/mo
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CreatorGrid;
