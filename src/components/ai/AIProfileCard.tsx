
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Heart, Info } from 'lucide-react';
import { AIProfile } from '@/types/ai';

export interface AIProfileCardProps {
  profile: AIProfile;
  onChatClick?: () => void; // Added this prop
}

const AIProfileCard = ({ profile, onChatClick }: AIProfileCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-[3/4] relative bg-muted">
        <img 
          src={profile.avatarUrl || '/placeholder-avatar.jpg'} 
          alt={profile.name}
          className="object-cover w-full h-full"
        />
        
        {profile.isVerified && (
          <Badge className="absolute top-2 right-2 bg-primary">Verified</Badge>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <h3 className="text-white font-medium">{profile.name}</h3>
          <p className="text-white/80 text-xs">{profile.age} • {profile.gender}</p>
        </div>
      </div>
      
      <CardContent className="p-4">
        <p className="text-sm line-clamp-2">{profile.bio}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {profile.tags?.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {profile.tags && profile.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{profile.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="ghost" size="sm">
          <Heart className="h-4 w-4 mr-1" />
          <span className="sr-only">Like</span>
        </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          className="ml-auto"
          onClick={onChatClick}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          Chat
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIProfileCard;
