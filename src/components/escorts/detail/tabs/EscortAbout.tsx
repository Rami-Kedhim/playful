
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
  const formatMeasurements = (measurements: { bust: number; waist: number; hips: number; } | undefined) => {
    if (!measurements) return 'N/A';
    return `${measurements.bust}-${measurements.waist}-${measurements.hips}`;
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
            
            {escort.availability.days && escort.availability.days.length > 0 && (
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
            
            {escort.availability.hours && (
              <div>
                <p className="text-sm font-medium mb-2">{t('Hours')}</p>
                <p className="text-sm text-muted-foreground">{escort.availability.hours}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {escort.contactInfo && (
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">{t('Contact Information')}</h3>
            <div className="space-y-3">
              {escort.contactInfo.phone && (
                <div>
                  <p className="text-sm font-medium">{t('Phone')}</p>
                  <p className="text-sm">{escort.contactInfo.phone}</p>
                </div>
              )}
              
              {escort.contactInfo.email && (
                <div>
                  <p className="text-sm font-medium">{t('Email')}</p>
                  <p className="text-sm">{escort.contactInfo.email}</p>
                </div>
              )}
              
              {escort.contactInfo.website && (
                <div>
                  <p className="text-sm font-medium">{t('Website')}</p>
                  <a 
                    href={escort.contactInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {escort.contactInfo.website}
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EscortAbout;
