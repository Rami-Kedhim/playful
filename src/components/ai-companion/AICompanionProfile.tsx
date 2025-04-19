
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { AICompanion } from '@/types/ai-companion';

interface AICompanionProfileProps {
  companion: AICompanion;
}

const AICompanionProfile: React.FC<AICompanionProfileProps> = ({ companion }) => {
  const { 
    name, 
    avatar_url, 
    description, 
    personality_traits, 
    body_type, 
    voice_type,
    relationship_level,
    engagement_stats
  } = companion;
  
  // Set default values for stats if they don't exist
  const stats = {
    chat_messages: engagement_stats?.chat_messages ?? 0,
    images_generated: engagement_stats?.images_generated ?? 0,
    voice_messages: engagement_stats?.voice_messages ?? 0
  };
  
  const lastActive = engagement_stats?.last_interaction 
    ? new Date(engagement_stats.last_interaction).toLocaleDateString()
    : 'Never';
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatar_url} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription className="mt-1">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1">
          {personality_traits?.map((trait) => (
            <Badge key={trait} className="bg-primary/10 text-primary border-primary/20">
              {trait}
            </Badge>
          )) || null}
          {body_type && (
            <Badge className="bg-secondary/10 text-secondary border-secondary/20">
              {body_type}
            </Badge>
          )}
          {voice_type && (
            <Badge className="bg-secondary/10 text-secondary border-secondary/20">
              {voice_type} voice
            </Badge>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Trust</span>
              <span>{relationship_level?.trust ?? 0}%</span>
            </div>
            <Progress value={relationship_level?.trust ?? 0} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Affection</span>
              <span>{relationship_level?.affection ?? 0}%</span>
            </div>
            <Progress value={relationship_level?.affection ?? 0} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Intimacy</span>
              <span>{relationship_level?.intimacy ?? 0}%</span>
            </div>
            <Progress value={relationship_level?.intimacy ?? 0} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Obedience</span>
              <span>{relationship_level?.obedience ?? 0}%</span>
            </div>
            <Progress value={relationship_level?.obedience ?? 0} className="h-2" />
          </div>
        </div>
        
        <div className="pt-2 border-t text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-muted-foreground">Messages</p>
              <p className="font-medium">{stats.chat_messages}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Images</p>
              <p className="font-medium">{stats.images_generated}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Voice Clips</p>
              <p className="font-medium">{stats.voice_messages}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Last Active</p>
              <p className="font-medium">{lastActive}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AICompanionProfile;
