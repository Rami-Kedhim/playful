
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UberPersona } from '@/types/uberPersona';
import { Globe, Heart, Award, Activity } from 'lucide-react';
import { normalizeUberPersona } from '@/utils/typeConverters';

interface PersonaAboutTabProps {
  persona: UberPersona;
}

const PersonaAboutTab: React.FC<PersonaAboutTabProps> = ({ persona }) => {
  // Normalize persona to ensure all properties exist
  const normalizedPersona = normalizeUberPersona(persona);
  const { bio, languages, traits, stats } = normalizedPersona;
  
  const hasLanguages = languages && languages.length > 0;
  const hasTraits = traits && traits.length > 0;
  const hasStats = stats && (
    stats.popularity !== undefined ||
    stats.intelligence !== undefined ||
    stats.charm !== undefined ||
    stats.energy !== undefined
  );

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-line">
              {bio || 'No biography available.'}
            </p>
          </CardContent>
        </Card>

        {hasLanguages && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {languages.map((language, index) => (
                <Badge key={index} variant="secondary">
                  {language}
                </Badge>
              ))}
            </CardContent>
          </Card>
        )}

        {hasTraits && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Personality Traits
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {traits.map((trait, index) => (
                <Badge key={index} variant="outline">
                  {trait}
                </Badge>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {hasStats && (
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.popularity !== undefined && (
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Popularity</span>
                    <span>{stats.popularity}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${stats.popularity}%` }}
                    />
                  </div>
                </div>
              )}
              
              {stats.intelligence !== undefined && (
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Intelligence</span>
                    <span>{stats.intelligence}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${stats.intelligence}%` }}
                    />
                  </div>
                </div>
              )}
              
              {stats.charm !== undefined && (
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Charm</span>
                    <span>{stats.charm}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${stats.charm}%` }}
                    />
                  </div>
                </div>
              )}
              
              {stats.energy !== undefined && (
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Energy</span>
                    <span>{stats.energy}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${stats.energy}%` }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PersonaAboutTab;
