
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UberPersona } from '@/types/uberPersona';

interface FeaturedPersonasProps {
  personas: UberPersona[];
}

const FeaturedPersonas: React.FC<FeaturedPersonasProps> = ({ personas = [] }) => {
  const getStatusIndicator = (persona: UberPersona) => {
    return persona.isOnline ? (
      <span className="flex items-center">
        <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
        Online
      </span>
    ) : (
      <span className="flex items-center">
        <span className="h-2 w-2 rounded-full bg-gray-400 mr-1.5"></span>
        Offline
      </span>
    );
  };

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
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Featured Personas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona) => (
            <Card key={persona.id} className="overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={persona.avatarUrl || 'https://via.placeholder.com/400x600'} 
                  alt={persona.name} 
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-black/60 hover:bg-black/70">
                    {getTypeLabel(persona.type)}
                  </Badge>
                </div>
                {persona.isVerified && (
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-white text-black">
                      Verified
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{persona.displayName || persona.name}</CardTitle>
                <CardDescription className="flex justify-between">
                  <span>{persona.location || 'Unknown Location'}</span>
                  {getStatusIndicator(persona)}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {persona.tags?.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPersonas;
