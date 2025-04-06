
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AIProfile } from '@/types/ai-profile';
import { Escort } from '@/types/escort';

interface AIEscortSuggestionsProps {
  aiProfile?: AIProfile;
  relatedEscorts?: Escort[];
  escort?: Escort;
  relatedAIProfiles?: AIProfile[];
}

const AIEscortSuggestions: React.FC<AIEscortSuggestionsProps> = ({
  aiProfile,
  relatedEscorts,
  escort,
  relatedAIProfiles
}) => {
  // If we're viewing an AI profile, show related real escorts
  if (aiProfile && relatedEscorts && relatedEscorts.length > 0) {
    return (
      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
        <CardContent className="p-4">
          <div className="flex items-center mb-3">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="font-medium text-sm">Ready for a real experience?</h3>
          </div>
          
          <p className="text-xs text-muted-foreground mb-3">
            Meet verified escorts with similar interests to {aiProfile.name}:
          </p>
          
          <div className="grid grid-cols-1 gap-2">
            {relatedEscorts.slice(0, 2).map(escort => (
              <div key={escort.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center">
                  {escort.imageUrl ? (
                    <img 
                      src={escort.imageUrl} 
                      alt={escort.name} 
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2">
                      {escort.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-medium">{escort.name}</p>
                    <p className="text-xs text-muted-foreground">{escort.location}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild className="h-7">
                  <Link to={`/escorts/${escort.id}`}>
                    View
                  </Link>
                </Button>
              </div>
            ))}
          </div>
          
          <Button 
            variant="default"
            size="sm" 
            className="w-full mt-3" 
            asChild
          >
            <Link to="/escorts">
              Explore Real Escorts <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  // If we're viewing a real escort, show related AI profiles
  if (escort && relatedAIProfiles && relatedAIProfiles.length > 0) {
    return (
      <Card className="border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20">
        <CardContent className="p-4">
          <div className="flex items-center mb-3">
            <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
            <h3 className="font-medium text-sm">Try an AI experience first?</h3>
          </div>
          
          <p className="text-xs text-muted-foreground mb-3">
            Chat with AI companions similar to {escort.name}:
          </p>
          
          <div className="grid grid-cols-1 gap-2">
            {relatedAIProfiles.slice(0, 2).map(aiProfile => (
              <div key={aiProfile.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center">
                  {aiProfile.avatar_url ? (
                    <img 
                      src={aiProfile.avatar_url} 
                      alt={aiProfile.name} 
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2">
                      {aiProfile.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-medium">{aiProfile.name}</p>
                    <p className="text-xs text-muted-foreground">{aiProfile.personality.type} personality</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild className="h-7">
                  <Link to={`/AIProfiles/${aiProfile.id}`}>
                    Chat
                  </Link>
                </Button>
              </div>
            ))}
          </div>
          
          <Button 
            variant="default"
            size="sm" 
            className="w-full mt-3" 
            asChild
          >
            <Link to="/AIProfiles">
              Explore AI Models <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return null;
};

export default AIEscortSuggestions;
