
import React from 'react';
import { Link } from 'react-router-dom';
import { AIProfile } from '@/types/ai-profile';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Heart, 
  Info, 
  Image,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
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

  // Get a personality-specific message preview
  const getMessagePreview = () => {
    if (profile.sample_messages && profile.sample_messages.length > 0) {
      return profile.sample_messages[Math.floor(Math.random() * profile.sample_messages.length)];
    }
    
    switch(profile.personality.type) {
      case 'flirty':
        return "Can't wait to chat with you... I've been thinking about it all day 😘";
      case 'shy':
        return "Hi... I don't usually talk much, but I'd like to get to know you...";
      case 'dominant':
        return "I expect you to be on your best behavior when we talk.";
      case 'playful':
        return "Hey there! Ready for some fun conversation? I sure am! 😊";
      default:
        return "Hello, I'd be happy to have a conversation with you.";
    }
  };

  // Get online status
  const getOnlineStatus = () => {
    if (profile.availability_status === 'online') {
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
          Online now
        </Badge>
      );
    }
    
    if (profile.availability_status === 'away') {
      return (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
          Away
        </Badge>
      );
    }
    
    if (profile.last_active) {
      return (
        <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">
          Active {formatDistanceToNow(new Date(profile.last_active), { addSuffix: true })}
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">
        <Clock className="w-3 h-3 mr-1" />
        Replies in 2-5 min
      </Badge>
    );
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md flex flex-col">
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
            <Badge className={`${getPersonalityColor(profile.personality.type)} capitalize`}>
              {profile.personality.type}
            </Badge>
          </div>
          <p className="text-sm opacity-90">{profile.location}</p>
        </div>
      </div>
      
      <CardContent className="p-4 flex-1">
        <div className="flex items-center mb-2">
          {getOnlineStatus()}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-3 min-h-[4.5rem]">
          {profile.bio}
        </p>
        
        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm italic line-clamp-2">"{getMessagePreview()}"</p>
        </div>
        
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
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="px-4">
                <Image className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Request images ({profile.lucoin_image_price} LC each)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="px-4">
                <Heart className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to favorites</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default AIProfileCard;
