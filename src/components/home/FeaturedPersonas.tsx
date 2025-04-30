
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FeaturedPersona } from '@/types/home';
import { Check, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedPersonasProps {
  personas: FeaturedPersona[];
  title?: string;
  subtitle?: string;
}

const FeaturedPersonas: React.FC<FeaturedPersonasProps> = ({ 
  personas, 
  title = "Featured Personas",
  subtitle = "Discover our verified UberPersonas"
}) => {
  if (!personas || personas.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <p>No featured personas available at the moment</p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {personas.map((persona) => (
            <Link 
              to={`/persona/${persona.id}`} 
              key={persona.id}
              className="block hover:scale-[1.02] transition-transform duration-200"
            >
              <Card className="overflow-hidden h-full bg-card/50 backdrop-blur-sm border-white/10">
                <div className="relative aspect-[3/4] bg-gradient-to-b from-transparent to-background/50">
                  {persona.avatarUrl ? (
                    <img 
                      src={persona.avatarUrl} 
                      alt={persona.displayName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-4xl font-bold opacity-50">
                        {persona.displayName.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Status indicator */}
                  {persona.isOnline !== undefined && (
                    <div className="absolute top-3 right-3">
                      <div className={`w-3 h-3 rounded-full ${persona.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </div>
                  )}
                  
                  {/* Type badge */}
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="capitalize">
                      {persona.type}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-lg flex items-center">
                        {persona.displayName}
                        {persona.isVerified && (
                          <Check className="h-4 w-4 ml-1 text-blue-500" />
                        )}
                      </h3>
                      {persona.location && (
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" /> {persona.location}
                        </p>
                      )}
                    </div>
                    {/* Add a simple rating display if we have enough data */}
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">4.9</span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {persona.tags && persona.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {persona.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs py-0">
                          {tag}
                        </Badge>
                      ))}
                      {persona.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs py-0">
                          +{persona.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPersonas;
