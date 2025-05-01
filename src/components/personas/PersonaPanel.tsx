
import React from 'react';
import { UberPersona } from '@/types/uberPersona';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Zap } from 'lucide-react';

interface PersonaPanelProps {
  persona: UberPersona;
  onChatClick?: () => void;
  onBoostClick?: () => void;
}

const PersonaPanel: React.FC<PersonaPanelProps> = ({ 
  persona, 
  onChatClick,
  onBoostClick
}) => {
  return (
    <Card className="overflow-hidden h-full">
      <div className="aspect-video relative">
        <img 
          src={persona.avatarUrl || 'https://via.placeholder.com/400x200'} 
          alt={persona.name}
          className="object-cover w-full h-full"
        />
        {persona.isPremium && (
          <Badge 
            variant="default"
            className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-amber-700"
          >
            Premium
          </Badge>
        )}
      </div>
      
      <CardHeader>
        <CardTitle>{persona.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {persona.description || 'No description available'}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {persona.tags?.map((tag, i) => (
            <Badge key={i} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button onClick={onChatClick}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat Now
          </Button>
          
          <Button variant="outline" onClick={onBoostClick}>
            <Zap className="h-4 w-4 mr-2" />
            Boost Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonaPanel;
