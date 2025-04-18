
import React from 'react';
import { UberPersona } from '@/types/UberPersona';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Star, MessageCircle, HeartHandshake, Languages } from 'lucide-react';
import { VerificationBadge } from '@/components/verification/VerificationBadge';

interface PersonaAboutTabProps {
  persona: UberPersona;
}

export const PersonaAboutTab: React.FC<PersonaAboutTabProps> = ({ persona }) => {
  // Safe access to potentially undefined properties
  const description = persona.bio || 'No description available';
  const location = persona.location || 'Location not specified';
  
  // Handle optional properties with fallbacks
  const languages = persona.languages || [];
  const hasLanguages = Array.isArray(languages) && languages.length > 0;
  
  const services = persona.services || [];
  const hasServices = Array.isArray(services) && services.length > 0;
  
  const traits = persona.traits || [];
  const hasTraits = Array.isArray(traits) && traits.length > 0;
  
  // Extract statistics
  const stats = persona.stats || {};
  const responseTime = stats.responseTime ?? undefined;
  
  return (
    <div className="space-y-6">
      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold mb-2">About</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Location */}
        <Card>
          <CardContent className="p-4 flex items-center">
            <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm text-muted-foreground">{location}</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Languages */}
        {hasLanguages && (
          <Card>
            <CardContent className="p-4 flex items-center">
              <Languages className="h-5 w-5 text-muted-foreground mr-3" />
              <div>
                <p className="text-sm font-medium">Languages</p>
                <p className="text-sm text-muted-foreground">
                  {languages.join(', ')}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Verification */}
        <Card>
          <CardContent className="p-4 flex items-center">
            <VerificationBadge size="sm" level={persona.verificationLevel || 'basic'} />
            <div className="ml-3">
              <p className="text-sm font-medium">Verification</p>
              <p className="text-sm text-muted-foreground">
                {persona.verificationLevel ? `${persona.verificationLevel.charAt(0).toUpperCase()}${persona.verificationLevel.slice(1)} verified` : 'Not verified'}
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Response Time if available */}
        {responseTime !== undefined && (
          <Card>
            <CardContent className="p-4 flex items-center">
              <Clock className="h-5 w-5 text-muted-foreground mr-3" />
              <div>
                <p className="text-sm font-medium">Response Time</p>
                <p className="text-sm text-muted-foreground">
                  {typeof responseTime === 'number' && responseTime < 60 
                    ? `${responseTime} minutes` 
                    : `${Math.floor((typeof responseTime === 'number' ? responseTime : 0) / 60)} hours`}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Services */}
      {hasServices && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Services</h3>
          <div className="flex flex-wrap gap-2">
            {services.map((service, index) => (
              <Badge key={index} variant="secondary">{service}</Badge>
            ))}
          </div>
        </div>
      )}
      
      {/* Traits/Personality */}
      {hasTraits && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Personality Traits</h3>
          <div className="flex flex-wrap gap-2">
            {traits.map((trait, index) => {
              if (typeof trait === 'string') {
                return <Badge key={index} variant="outline">{trait}</Badge>;
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
