
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Heart, Lock, Unlock } from 'lucide-react';
import { AICompanion } from '@/types/ai-companion';

interface AICompanionCardProps {
  companion: AICompanion;
  onSelect: (companionId: string) => void;
  isSelected?: boolean;
}

const AICompanionCard: React.FC<AICompanionCardProps> = ({ companion, onSelect, isSelected }) => {
  const { name, description, personality_traits, body_type, relationship_level } = companion;
  
  return (
    <Card className={`w-full transition-shadow hover:shadow-md ${isSelected ? 'border-primary' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          {companion.is_preset && <Badge variant="secondary">Preset</Badge>}
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1 mb-2">
          {personality_traits.map((trait) => (
            <Badge key={trait} variant="outline" className="text-xs">
              {trait}
            </Badge>
          ))}
          <Badge variant="outline" className="text-xs">{body_type}</Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Heart className="h-3 w-3 text-rose-500" />
            <span>Affection: {relationship_level.affection}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3 text-blue-500" />
            <span>Messages: {companion.engagement_stats.chat_messages}</span>
          </div>
          <div className="flex items-center gap-1">
            <Lock className="h-3 w-3 text-amber-500" />
            <span>Trust: {relationship_level.trust}</span>
          </div>
          <div className="flex items-center gap-1">
            <Unlock className="h-3 w-3 text-emerald-500" />
            <span>Intimacy: {relationship_level.intimacy}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onSelect(companion.id)} 
          className="w-full"
          variant={isSelected ? "default" : "secondary"}
        >
          {isSelected ? 'Currently Selected' : 'Chat Now'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AICompanionCard;
