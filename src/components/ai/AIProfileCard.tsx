
import React from 'react';
import { AIProfile } from '@/types/ai-profile';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AIProfileCardProps {
  profile: AIProfile;
  onChatClick?: () => void;
}

const AIProfileCard: React.FC<AIProfileCardProps> = ({ profile, onChatClick }) => {
  const getPersonalityColor = (type: string) => {
    switch(type) {
      case 'flirty': return 'bg-pink-500 hover:bg-pink-700';
      case 'shy': return 'bg-purple-500 hover:bg-purple-700';
      case 'dominant': return 'bg-red-500 hover:bg-red-700';
      case 'playful': return 'bg-blue-500 hover:bg-blue-700';
      default: return 'bg-slate-500 hover:bg-slate-700';
    }
  };

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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="bg-black/50 backdrop-blur-sm text-white border-none cursor-help">
                  <Info className="w-3 h-3 mr-1" />
                  AI
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">This is an AI-generated profile. The conversations are powered by artificial intelligence.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            {profile.personality?.type && (
              <Badge className={`${getPersonalityColor(profile.personality.type)} capitalize`}>
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
