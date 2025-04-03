
import React from 'react';
import { Link } from 'react-router-dom';
import { AIProfile } from '@/types/ai-profile';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart, DollarSign } from 'lucide-react';

interface AIProfileCardProps {
  profile: AIProfile;
  onChatClick?: () => void;
}

const AIProfileCard: React.FC<AIProfileCardProps> = ({ profile, onChatClick }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <img 
          src={profile.avatar_url} 
          alt={profile.name} 
          className="w-full h-[300px] object-cover object-center"
        />
        
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge className="bg-primary text-primary-foreground">
            {profile.age}
          </Badge>
          <Badge variant="outline" className="bg-black/50 backdrop-blur-sm text-white border-none">
            AI
          </Badge>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
          <h3 className="text-xl font-semibold">{profile.name}</h3>
          <p className="text-sm opacity-90">{profile.location}</p>
        </div>
      </div>
      
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-3 min-h-[60px]">
          {profile.bio}
        </p>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {profile.interests.slice(0, 3).map((interest, i) => (
            <Badge key={i} variant="secondary" className="text-xs capitalize">
              {interest}
            </Badge>
          ))}
          {profile.interests.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{profile.interests.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 gap-2">
        <Button 
          className="flex-1" 
          variant="default"
          onClick={onChatClick}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Chat ({profile.lucoin_chat_price} LC)
        </Button>
        
        <Button variant="outline" className="px-4">
          <Heart className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIProfileCard;
