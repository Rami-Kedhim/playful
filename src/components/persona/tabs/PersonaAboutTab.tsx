
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { UberPersona } from '@/types/uberPersona';
import { Clock, Globe, Award, Heart } from 'lucide-react';

interface PersonaAboutTabProps {
  persona: UberPersona;
}

const PersonaAboutTab: React.FC<PersonaAboutTabProps> = ({ persona }) => {
  const { t } = useTranslation();
  
  // Check if the persona has description data
  const hasDescription = persona.description || persona.bio;
  
  // Check if the persona has language data
  const hasLanguages = persona.languages && persona.languages.length > 0;
  
  // Check if the persona has traits data
  const hasTraits = persona.traits && persona.traits.length > 0;
  
  // Check if the persona has stats data
  const hasStats = persona.stats && 
    (persona.stats.views || 
     persona.stats.likes || 
     persona.stats.responseRate || 
     persona.stats.responseTime);

  return (
    <div className="space-y-6">
      {/* Bio/Description Section */}
      {hasDescription && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-2">{t('About')}</h3>
            <p className="text-muted-foreground">
              {persona.description || persona.bio}
            </p>
          </CardContent>
        </Card>
      )}
      
      {/* Languages Section */}
      {hasLanguages && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-2">
              <Globe className="inline-block mr-2 h-5 w-5" />
              {t('Languages')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {persona.languages?.map((language, index) => (
                <Badge key={index} variant="outline">
                  {language}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Traits Section */}
      {hasTraits && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-2">
              <Heart className="inline-block mr-2 h-5 w-5" />
              {t('Traits')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {persona.traits?.map((trait, index) => (
                <Badge key={index} variant="secondary">
                  {trait}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Stats Section */}
      {hasStats && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-2">
              <Award className="inline-block mr-2 h-5 w-5" />
              {t('Stats')}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {persona.stats?.views !== undefined && (
                <div className="bg-secondary/20 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Profile Views</div>
                  <div className="text-xl font-semibold">{persona.stats.views.toLocaleString()}</div>
                </div>
              )}
              
              {persona.stats?.likes !== undefined && (
                <div className="bg-secondary/20 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Likes</div>
                  <div className="text-xl font-semibold">{persona.stats.likes.toLocaleString()}</div>
                </div>
              )}
              
              {persona.stats?.responseRate !== undefined && (
                <div className="bg-secondary/20 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Response Rate</div>
                  <div className="text-xl font-semibold">{persona.stats.responseRate}%</div>
                </div>
              )}
              
              {persona.stats?.responseTime !== undefined && (
                <div className="bg-secondary/20 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Response Time</div>
                  <div className="text-xl font-semibold">
                    <Clock className="inline mr-1 h-4 w-4" />
                    {typeof persona.stats.responseTime === 'string' ? 
                      persona.stats.responseTime : 
                      `${persona.stats.responseTime} min`
                    }
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PersonaAboutTab;
