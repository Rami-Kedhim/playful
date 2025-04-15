
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UberPersona } from '@/types/uberPersona';
import { Heart, Star, Video, MessageCircle, CheckCircle, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UberPersonaCardProps {
  persona: UberPersona;
  className?: string;
}

const UberPersonaCard: React.FC<UberPersonaCardProps> = ({ persona, className }) => {
  // Determine the route based on role flags
  const getPersonaRoute = () => {
    if (persona.roleFlags.isEscort) {
      return `/escorts/${persona.id}`;
    } else if (persona.roleFlags.isCreator) {
      return `/creators/${persona.id}`;
    } else if (persona.roleFlags.isLivecam) {
      return `/livecams/${persona.id}`;
    }
    // Default fallback
    return `/personas/${persona.id}`;
  };

  const profileUrl = getPersonaRoute();
  
  // Extract key properties for display
  const { displayName, avatarUrl, location, age, tags } = persona;

  return (
    <Link to={profileUrl}>
      <Card
        className={cn(
          "overflow-hidden transition-all hover:shadow-md",
          persona.roleFlags.isFeatured && "border-primary/50 bg-gradient-to-br from-background to-primary/5",
          className
        )}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-secondary/50">
              <span className="text-muted-foreground">No Image</span>
            </div>
          )}
          <div className="absolute top-2 right-2 flex gap-1 flex-col items-end">
            {persona.roleFlags.isVerified && (
              <Badge variant="secondary" className="bg-white/80 text-primary flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> Verified
              </Badge>
            )}
            {persona.roleFlags.isFeatured && (
              <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                <Award className="h-3 w-3" /> Featured
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-base line-clamp-1">{displayName}</h3>
            <div className="text-sm text-muted-foreground">{age > 0 ? `${age}` : ""}</div>
          </div>
          
          <div className="text-sm text-muted-foreground mb-2">{location}</div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs py-0">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs py-0">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex space-x-2">
              {persona.roleFlags.isEscort && <span>Escort</span>}
              {persona.roleFlags.isCreator && <span>Creator</span>}
              {persona.roleFlags.isLivecam && <span>Livecam</span>}
            </div>
            
            <div className="flex gap-2">
              {persona.capabilities.hasLiveStream && (
                <Video className="h-4 w-4 text-red-500" />
              )}
              {persona.capabilities.hasChat && (
                <MessageCircle className="h-4 w-4" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default UberPersonaCard;
