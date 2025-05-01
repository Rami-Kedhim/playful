
import React from 'react';
import { UberPersona } from '@/types/uberPersona';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VerifiedMark } from '@/components/shared/VerifiedMark';

interface PersonaGridProps {
  personas: UberPersona[];
  onPersonaClick?: (id: string) => void;
  loading?: boolean;
}

const PersonaGrid: React.FC<PersonaGridProps> = ({ 
  personas, 
  onPersonaClick,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-square bg-muted" />
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded mb-2 w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (personas.length === 0) {
    return (
      <div className="text-center p-12">
        <h3 className="text-lg font-medium">No personas found</h3>
        <p className="text-muted-foreground">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {personas.map((persona) => (
        <Card 
          key={persona.id} 
          className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onPersonaClick?.(persona.id)}
        >
          <div className="aspect-square relative">
            <img 
              src={persona.avatarUrl || 'https://via.placeholder.com/300'} 
              alt={persona.name}
              className="object-cover w-full h-full"
            />
            {persona.isOnline && (
              <Badge 
                className="absolute top-2 right-2" 
                variant="secondary"
              >
                Online
              </Badge>
            )}
          </div>
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium truncate flex items-center gap-1">
                {persona.name}
                {persona.isVerified && <VerifiedMark className="ml-1" />}
              </h3>
              {typeof persona.rating === 'number' && (
                <Badge variant="outline" className="text-sm">
                  ★ {persona.rating.toFixed(1)}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1 truncate">
              {persona.location || '-'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PersonaGrid;
