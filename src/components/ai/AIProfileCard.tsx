
import React from 'react';
import { AIProfile } from '@/types/ai-profile';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AIProfileTypeIndicator from './AIProfileTypeIndicator';
import AIEmotionStatus from './AIEmotionStatus';

interface AIProfileCardProps {
  profile: AIProfile;
  onChatClick?: () => void;
}

const AIProfileCard: React.FC<AIProfileCardProps> = ({ profile, onChatClick }) => {
  // Determine if profile is premium
  const isPremium = profile.lucoin_chat_price > 10 || profile.boost_status?.is_boosted;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md flex flex-col">
      <div className="relative">
        <img 
          src={profile.avatar_url} 
          alt={profile.name} 
          className="w-full h-[220px] object-cover object-center"
        />
        
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge className="bg-primary text-primary-foreground">
            {profile.age}
          </Badge>
          <AIProfileTypeIndicator 
            type={isPremium ? 'premium' : 'ai'} 
            showLabel={false} 
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            {profile.personality?.type && (
              <Badge className="capitalize">
                {profile.personality.type}
              </Badge>
            )}
          </div>
          <p className="text-sm opacity-90">{profile.location}</p>
        </div>
      </div>
      
      <CardContent className="p-4 flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {profile.bio}
        </p>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {profile.interests?.slice(0, 3).map((interest, i) => (
            <Badge key={i} variant="secondary" className="text-xs capitalize">
              {interest}
            </Badge>
          ))}
          {profile.interests && profile.interests.length > 3 && (
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
          Chat ({profile.lucoin_chat_price || 5} LC)
        </Button>
        
        <Button variant="outline" className="px-4">
          <Heart className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIProfileCard;
