
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { UberPersona } from '@/types/uberPersona';

interface PersonaAboutTabProps {
  persona: UberPersona;
}

const PersonaAboutTab: React.FC<PersonaAboutTabProps> = ({ persona }) => {
  const formattedDate = persona.system?.lastActiveAt ? 
    formatDistanceToNow(new Date(persona.system.lastActiveAt), { addSuffix: true }) : 
    'Unknown';

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">About</h3>
          <p className="text-muted-foreground whitespace-pre-line">{persona.bio || 'No bio available.'}</p>
          
          {(persona.tags && persona.tags.length > 0) && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Interests & Services</h4>
              <div className="flex flex-wrap gap-2">
                {persona.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t space-y-3">
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{persona.location || 'Location not specified'}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Last active {formattedDate}</span>
            </div>
            
            {(typeof persona.roleFlags === 'object' && persona.roleFlags.isVerified) && (
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span className="text-green-600">Verified Profile</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonaAboutTab;
