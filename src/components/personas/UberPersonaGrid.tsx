import React from 'react';
import { UberPersona } from '@/types/uberPersona';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, MapPin, Shield, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { verifyEliminixCompliance } from '@/services/eliminix/eliminixService';
import { EliminixBadge } from '@/components/eliminix';

interface UberPersonaGridProps {
  personas: UberPersona[];
  loading?: boolean;
  emptyMessage?: string;
}

const UberPersonaGrid: React.FC<UberPersonaGridProps> = ({ 
  personas, 
  loading = false,
  emptyMessage = "No profiles found"
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <div className="mt-3 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (personas.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <User className="h-10 w-10 text-muted-foreground mx-auto" />
        <p className="mt-2 text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {personas.map(persona => {
        // Check Eliminix compliance for this persona
        const isEliminixCompliant = verifyEliminixCompliance(persona);
        
        // Skip non-compliant profiles entirely - Eliminix rule is strict enforcement
        if (!isEliminixCompliant) {
          return null;
        }
        
        return (
          <Card key={persona.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-60">
              <img 
                src={persona.avatarUrl} 
                alt={persona.displayName} 
                className="w-full h-full object-cover"
              />
              
              {/* Eliminix Badge */}
              <div className="absolute top-2 right-2">
                <EliminixBadge size="sm" variant="outline" className="bg-white/80 dark:bg-black/50" />
              </div>
              
              {/* Role badges */}
              <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                {persona.roleFlags.isEscort && (
                  <Badge variant="secondary" className="bg-purple-500/70 backdrop-blur-sm">Escort</Badge>
                )}
                {persona.roleFlags.isCreator && (
                  <Badge variant="secondary" className="bg-blue-500/70 backdrop-blur-sm">Creator</Badge>
                )}
                {persona.roleFlags.isVerified && (
                  <Badge variant="secondary" className="bg-green-500/70 backdrop-blur-sm">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={persona.avatarUrl} />
                  <AvatarFallback>{persona.displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-base">{persona.displayName}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{persona.location || 'Unknown'}</span>
                  </div>
                </div>
              </div>
              
              {persona.bio && (
                <p className="mt-2 text-sm line-clamp-2 text-muted-foreground">
                  {persona.bio}
                </p>
              )}
            </CardContent>
            
            <CardFooter className="px-4 py-3 border-t flex justify-between items-center">
              {persona.tags && persona.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {persona.tags.slice(0, 2).map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {persona.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{persona.tags.length - 2}
                    </Badge>
                  )}
                </div>
              )}
              
              <Link 
                to={`/personas/${persona.id}`} 
                className="text-xs text-primary hover:underline"
              >
                View Profile
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default UberPersonaGrid;
