
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Escort, Availability } from '@/types/escort';
import { Shield, Clock, MapPin, Calendar, Languages, Ruler, HeartPulse, Scale, Palette } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Trans, useTranslation } from 'react-i18next';

interface EscortAboutProps {
  escort: Escort;
  className?: string;
}

const EscortAbout: React.FC<EscortAboutProps> = ({ escort, className }) => {
  const { t } = useTranslation();
  
  // Handle availability display
  const renderAvailability = () => {
    if (!escort.availability || (Array.isArray(escort.availability) && escort.availability.length === 0)) {
      return <span className="text-muted-foreground">{t('Not specified')}</span>;
    }
    
    // If it's a string array, just display the strings
    if (Array.isArray(escort.availability)) {
      if (typeof escort.availability[0] === 'string') {
        return (
          <div className="flex flex-wrap gap-1">
            {(escort.availability as string[]).map((day, index) => (
              <Badge key={index} variant="outline">{day}</Badge>
            ))}
          </div>
        );
      }
      
      // Handle Availability[] type
      return (
        <div className="flex flex-col gap-2">
          {(escort.availability as Availability[]).map((item, index) => (
            <div key={index} className="text-sm">
              {item.day && <div className="font-medium">{item.day}</div>}
              {item.hours && <div className="text-muted-foreground">{item.hours}</div>}
              {item.slots && item.slots.length > 0 && (
                <div className="grid grid-cols-2 gap-1 mt-1">
                  {item.slots.map((slot, slotIdx) => (
                    <span key={slotIdx} className="text-xs bg-muted/50 px-2 py-1 rounded">
                      {slot.start} - {slot.end}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }
    
    // Handle any other case
    return <span className="text-muted-foreground">{t('Contact for details')}</span>;
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t('About')} {escort.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {escort.bio || escort.description ? (
          <div>
            <h3 className="text-lg font-medium mb-2">{t('Bio')}</h3>
            <p className="text-muted-foreground">
              {escort.bio || escort.description}
            </p>
          </div>
        ) : null}
        
        <div>
          <h3 className="text-lg font-medium mb-3">{t('Details')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{t('Location')}</p>
                  <p className="text-sm text-muted-foreground">{escort.location || t('Not specified')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Languages className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{t('Languages')}</p>
                  <p className="text-sm text-muted-foreground">
                    {escort.languages?.join(', ') || t('Not specified')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Ruler className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{t('Height')}</p>
                  <p className="text-sm text-muted-foreground">{escort.height || t('Not specified')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Scale className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{t('Weight')}</p>
                  <p className="text-sm text-muted-foreground">{escort.weight || t('Not specified')}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <HeartPulse className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{t('Hair Color')}</p>
                  <p className="text-sm text-muted-foreground">{escort.hairColor || escort.hair || t('Not specified')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Palette className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{t('Eye Color')}</p>
                  <p className="text-sm text-muted-foreground">{escort.eyeColor || escort.eyes || t('Not specified')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{t('Body Type')}</p>
                  <p className="text-sm text-muted-foreground">{escort.bodyType || escort.physique?.bodyType || t('Not specified')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-3">{t('Availability')}</h3>
          <div className="flex items-start">
            <Calendar className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
            <div className="space-y-1 flex-1">
              {renderAvailability()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EscortAbout;
