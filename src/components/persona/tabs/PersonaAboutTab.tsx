
import { UberPersona } from '@/types/UberPersona'; // Fixed casing here
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Languages, Info, Award, Users, Stars } from 'lucide-react';

interface PersonaAboutTabProps {
  persona: UberPersona;
}

const PersonaAboutTab = ({ persona }: PersonaAboutTabProps) => {
  const hasDescription = !!persona.description || !!persona.bio;
  const hasLanguages = Array.isArray(persona.languages) && persona.languages.length > 0;
  const hasServices = Array.isArray(persona.services) && persona.services.length > 0;
  const hasTraits = Array.isArray(persona.traits) && persona.traits.length > 0;
  
  const responseTime = persona.stats?.responseTime;
  const responseTimeDisplay = responseTime
    ? responseTime < 60
      ? `${responseTime} minutes`
      : `${Math.floor(responseTime / 60)} hours`
    : 'Unknown';

  const rating = persona.stats?.rating ?? 'N/A';

  return (
    <div className="space-y-6">
      {hasDescription && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <Info className="w-4 h-4 mr-1 text-muted-foreground" />
              About
            </h3>
            <p className="text-muted-foreground">
              {persona.description || persona.bio}
            </p>
          </CardContent>
        </Card>
      )}
      
      {hasLanguages && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <Languages className="w-4 h-4 mr-1 text-muted-foreground" />
              Languages
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {persona.languages?.map((language) => (
                <Badge variant="outline" key={language}>
                  {language}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {hasServices && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <Award className="w-4 h-4 mr-1 text-muted-foreground" />
              Services
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {persona.services?.map((service) => (
                <Badge variant="outline" key={service}>
                  {service}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {hasTraits && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <Users className="w-4 h-4 mr-1 text-muted-foreground" />
              Personality Traits
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {persona.traits?.map((trait, index) => (
                <Badge variant="secondary" key={index}>
                  {trait}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <Stars className="w-4 h-4 mr-1 text-muted-foreground" />
            Stats
          </h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Rating</span>
              <span className="font-medium">{rating}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Reviews</span>
              <span className="font-medium">{persona.stats?.reviewCount || 0}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Response Time</span>
              <span className="font-medium">{responseTimeDisplay}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Completed Bookings</span>
              <span className="font-medium">{persona.stats?.bookingCount || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {persona.location && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
              Location
            </h3>
            <p className="text-muted-foreground">{persona.location}</p>
            
            <Button variant="outline" className="mt-4 w-full">
              View on Map
            </Button>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
            Availability
          </h3>
          <p className="text-muted-foreground">
            {persona.availability?.nextAvailable || 'Available now'}
          </p>
          
          <Button className="mt-4 w-full">
            Check Schedule
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonaAboutTab;
