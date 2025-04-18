
import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, Clock, MapPin, Users } from 'lucide-react';
import { Escort } from '@/types/escort';
import { useTranslation } from 'react-i18next';

interface EscortAboutProps {
  escort: Escort;
}

const EscortAbout: React.FC<EscortAboutProps> = ({ escort }) => {
  const { t } = useTranslation();
  
  // Helper function to format array data or text
  const formatList = (items: string[] | undefined) => {
    if (!items || items.length === 0) return "Not specified";
    return Array.isArray(items) ? items.join(', ') : items;
  };

  // Format availability information
  const formatAvailability = () => {
    if (!escort.availability) return "Not specified";
    
    if (Array.isArray(escort.availability) && typeof escort.availability[0] === 'string') {
      // Handle string array format
      return escort.availability.join(', ');
    }
    
    if (Array.isArray(escort.availability) && typeof escort.availability[0] === 'object') {
      // Handle object format
      const availObj = escort.availability[0];
      if (availObj.days && Array.isArray(availObj.days)) {
        return availObj.days.join(', ');
      }
    }
    
    return "Available upon request";
  };

  return (
    <div className="space-y-6">
      {/* Bio section */}
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-2">{t('About Me')}</h3>
        <p className="text-muted-foreground">
          {escort.bio || escort.description || "No bio information available."}
        </p>
      </Card>
      
      {/* Personal information */}
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">{t('Personal Information')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Age</p>
            <p className="font-medium">{escort.age || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Gender</p>
            <p className="font-medium">{escort.gender || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Ethnicity</p>
            <p className="font-medium">{escort.ethnicity || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Body Type</p>
            <p className="font-medium">{escort.bodyType || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Height</p>
            <p className="font-medium">{escort.height || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Weight</p>
            <p className="font-medium">{escort.weight || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Hair Color</p>
            <p className="font-medium">{escort.hairColor || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Eye Color</p>
            <p className="font-medium">{escort.eyeColor || 'Not specified'}</p>
          </div>
        </div>
      </Card>
      
      {/* Location and availability */}
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">{t('Location & Availability')}</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">{escort.location || 'Location not specified'}</p>
              <p className="text-sm text-muted-foreground">
                {escort.services?.includes('Travel') ? 'Available for travel' : 'Local services'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <CalendarIcon className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Availability</p>
              <p className="text-sm text-muted-foreground">
                {formatAvailability()}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Response Time</p>
              <p className="text-sm text-muted-foreground">
                {escort.responseRate ? `${escort.responseRate}% response rate` : 'Usually responds within 24 hours'}
              </p>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Languages and other information */}
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">{t('Additional Information')}</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Users className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Languages</p>
              <p className="text-sm text-muted-foreground">
                {formatList(escort.languages)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EscortAbout;
