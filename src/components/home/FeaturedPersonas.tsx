
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UberPersona } from '@/types/uberPersona';
import { Link } from 'react-router-dom';
import { StarIcon, CheckCircle, MapPin, Tag } from 'lucide-react';
import { normalizeUberPersona } from '@/utils/typeConverters';

interface FeaturedPersonasProps {
  personas?: UberPersona[];
  maxItems?: number;
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
}

const FeaturedPersonas: React.FC<FeaturedPersonasProps> = ({
  personas = [],
  maxItems = 4,
  title = "Featured Escorts",
  showViewAll = true,
  viewAllLink = "/escorts"
}) => {
  // Normalize all personas
  const normalizedPersonas = personas.map(normalizeUberPersona);
  
  // Take only the maximum number of items to display
  const displayedPersonas = normalizedPersonas.slice(0, maxItems);

  return (
    <div className="py-8">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">{title}</h2>
          {showViewAll && (
            <Link to={viewAllLink}>
              <Button variant="outline">View All</Button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPersonas.map((persona) => (
            <Link to={`/escorts/${persona.id}`} key={persona.id}>
              <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg">
                <div className="relative aspect-[3/4]">
                  <img
                    src={persona.avatarUrl || 'https://via.placeholder.com/300x400'}
                    alt={persona.name}
                    className="object-cover w-full h-full"
                  />
                  {persona.isOnline && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="default" className="bg-green-500">Online</Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold">{persona.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>{persona.location || 'Location unknown'}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{persona.stats?.rating || persona.rating || '5.0'}</span>
                      {persona.isVerified && (
                        <CheckCircle className="h-4 w-4 text-blue-500 ml-2" />
                      )}
                    </div>
                  </div>

                  {persona.type && (
                    <Badge variant="outline" className="mb-2">
                      {persona.type}
                    </Badge>
                  )}

                  {persona.tags && persona.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {persona.tags.slice(0, 3).map((tag, i) => (
                        <Badge variant="secondary" key={i} className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {persona.tags.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{persona.tags.length - 3} more</span>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPersonas;
