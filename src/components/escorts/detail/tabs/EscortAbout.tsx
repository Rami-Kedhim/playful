
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Escort } from "@/types/escort";

interface EscortAboutProps {
  escort: Escort;
}

const EscortAbout: React.FC<EscortAboutProps> = ({ escort }) => {
  const { t } = useTranslation();

  // Format measurements as string for display
  const formatMeasurements = (measurements: { bust?: number | string; waist?: number | string; hips?: number | string; } | string | undefined) => {
    if (!measurements) return 'N/A';
    if (typeof measurements === 'string') return measurements;
    return `${measurements.bust || '-'}-${measurements.waist || '-'}-${measurements.hips || '-'}`;
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">{t('About Me')}</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {escort.bio || escort.description || 
              `I am a sophisticated companion offering an unforgettable experience. My warm personality and attention to detail ensure our time together will be remarkable and memorable.`
            }
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">{t('Physical Attributes')}</h3>
          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <p className="text-sm font-medium">{t('Age')}</p>
              <p className="text-sm text-muted-foreground">{escort.age}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium">{t('Gender')}</p>
              <p className="text-sm text-muted-foreground capitalize">{escort.gender}</p>
            </div>
            
            {escort.height && (
              <div>
                <p className="text-sm font-medium">{t('Height')}</p>
                <p className="text-sm text-muted-foreground">{escort.height} cm</p>
              </div>
            )}
            
            {escort.weight && (
              <div>
                <p className="text-sm font-medium">{t('Weight')}</p>
                <p className="text-sm text-muted-foreground">{escort.weight} kg</p>
              </div>
            )}
            
            {escort.measurements && (
              <div>
                <p className="text-sm font-medium">{t('Measurements')}</p>
                <p className="text-sm text-muted-foreground">{formatMeasurements(escort.measurements)}</p>
              </div>
            )}
            
            {escort.hairColor && (
              <div>
                <p className="text-sm font-medium">{t('Hair Color')}</p>
                <p className="text-sm text-muted-foreground capitalize">{escort.hairColor}</p>
              </div>
            )}
            
            {escort.eyeColor && (
              <div>
                <p className="text-sm font-medium">{t('Eye Color')}</p>
                <p className="text-sm text-muted-foreground capitalize">{escort.eyeColor}</p>
              </div>
            )}
            
            {escort.ethnicity && (
              <div>
                <p className="text-sm font-medium">{t('Ethnicity')}</p>
                <p className="text-sm text-muted-foreground capitalize">{escort.ethnicity}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {escort.services && escort.services.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">{t('Services')}</h3>
            <div className="flex flex-wrap gap-2">
              {escort.services.map((service, index) => (
                <div key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
                  {service}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {escort.languages && escort.languages.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">{t('Languages')}</h3>
            <div className="flex flex-wrap gap-2">
              {escort.languages.map((language, index) => (
                <div key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
                  {language}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {escort.availability && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">{t('Availability')}</h3>
            
            {escort.availability && typeof escort.availability === 'object' && 'days' in escort.availability && 
              escort.availability.days && escort.availability.days.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">{t('Days')}</p>
                <div className="flex flex-wrap gap-2">
                  {escort.availability.days.map((day, index) => (
                    <div key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs capitalize">
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {escort.availability && typeof escort.availability === 'object' && 'hours' in escort.availability && 
              escort.availability.hours && (
              <div>
                <p className="text-sm font-medium mb-2">{t('Hours')}</p>
                <p className="text-sm text-muted-foreground">{Array.isArray(escort.availability.hours) ? escort.availability.hours.join(', ') : escort.availability.hours}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Contact information section is removed since contactInfo property doesn't exist in the Escort interface */}
    </div>
  );
};

export default EscortAbout;
