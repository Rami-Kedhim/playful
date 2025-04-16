import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, UserRound, Video, Image } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UberPersona } from '@/types/uberPersona';

interface UberPersonaCardProps {
  persona: UberPersona;
  className?: string;
}

const UberPersonaCard: React.FC<UberPersonaCardProps> = ({ persona, className }) => {
  // Ensure roleFlags exists
  const roleFlags = persona.roleFlags || {};
  
  // Ensure capabilities exists
  const capabilities = persona.capabilities || {
    hasContent: false,
    hasLiveStream: false,
    hasVirtualMeets: false,
    hasRealMeets: true
  };

  return (
    <Link to={`/personas/${persona.id}`}>
      <Card className={cn(
        "overflow-hidden transition-shadow hover:shadow-md group relative h-full flex flex-col",
        className
      )}>
        {/* Card badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {roleFlags.isVerified && (
            <Badge
              className="bg-green-500/80 hover:bg-green-500/90 text-white"
              variant="secondary"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
          
          {roleFlags.isFeatured && (
            <Badge
              className="bg-primary/80 hover:bg-primary/90 text-white"
              variant="secondary"
            >
              <Star className="h-3 w-3 mr-1 fill-current" />
              Featured
            </Badge>
          )}
        </div>
        
        {/* Avatar/image section */}
        <div className="relative w-full pt-[125%] overflow-hidden">
          <img
            src={persona.avatarUrl}
            alt={persona.displayName}
            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          
          {/* Online status indicator */}
          {persona.isOnline && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 bg-green-500 rounded-full" />
              <span className="text-xs text-white bg-black/50 px-1.5 py-0.5 rounded">Online</span>
            </div>
          )}
        </div>
        
        <CardContent className="flex-1 p-4">
          {/* Basic info */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg leading-tight">{persona.displayName}</h3>
              <p className="text-muted-foreground text-sm">
                {persona.age ? `${persona.age} • ` : ''}{persona.location || 'Unknown location'}
              </p>
            </div>
            <div className="flex items-center">
              {persona.rating && (
                <span className="flex items-center bg-muted text-xs rounded px-1.5 py-0.5">
                  <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400 mr-0.5" />
                  {persona.rating}
                </span>
              )}
            </div>
          </div>
          
          {/* Services/capabilities */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {capabilities.hasRealMeets && (
              <Badge variant="outline" className="text-xs">
                <UserRound className="h-3 w-3 mr-1" />
                In Person
              </Badge>
            )}
            {capabilities.hasVirtualMeets && (
              <Badge variant="outline" className="text-xs">
                <Video className="h-3 w-3 mr-1" />
                Virtual
              </Badge>
            )}
            {capabilities.hasContent && (
              <Badge variant="outline" className="text-xs">
                <Image className="h-3 w-3 mr-1" />
                Content
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default UberPersonaCard;
