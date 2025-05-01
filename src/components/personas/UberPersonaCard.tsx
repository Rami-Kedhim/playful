
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UberPersona } from '@/types/uberPersona';
import { Link } from 'react-router-dom';

interface UberPersonaCardProps {
  persona: UberPersona;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

const UberPersonaCard: React.FC<UberPersonaCardProps> = ({ 
  persona, 
  size = 'md', 
  showDetails = true 
}) => {
  if (!persona) return null;
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'escort':
        return 'Escort';
      case 'creator':
        return 'Content Creator';
      case 'livecam':
        return 'Live Cam';
      case 'ai':
        return 'AI Companion';
      default:
        return type?.charAt(0).toUpperCase() + type?.slice(1) || 'Unknown';
    }
  };

  // Set height based on card size
  const imageHeight = size === 'sm' ? 'h-48' : size === 'md' ? 'h-60' : 'h-72';
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow bg-background/80 backdrop-blur-sm border-gray-800/50">
      <Link to={`/personas/${persona.id}`}>
        <div className={`relative ${imageHeight} overflow-hidden`}>
          <img 
            src={persona.avatarUrl || `https://source.unsplash.com/random/300x400/?portrait,${persona.type}`} 
            alt={persona.name} 
            className="object-cover w-full h-full"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-black/70 hover:bg-black/80 text-white">
              {getTypeLabel(persona.type)}
            </Badge>
          </div>
          {persona.isVerified && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="secondary" className="bg-white/90 text-black">
                Verified
              </Badge>
            </div>
          )}
          {persona.isOnline && (
            <div className="absolute top-3 left-3">
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
                <span className="text-xs bg-black/70 text-white px-1.5 py-0.5 rounded">Online</span>
              </div>
            </div>
          )}
        </div>
      </Link>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">
              {persona.displayName || persona.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {persona.location || 'Location not specified'}
            </p>
          </div>
          {persona.rating && (
            <div className="flex items-center bg-gray-800/30 px-2 py-1 rounded">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-sm">{persona.rating}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      {showDetails && (
        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            {persona.tags?.slice(0, 4).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default UberPersonaCard;
