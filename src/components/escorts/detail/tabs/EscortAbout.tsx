
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User, MapPin, Ruler, Calendar, Clock, Languages, Globe } from 'lucide-react';
import { Escort } from '@/types/escort';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EscortAboutProps {
  escort: Escort;
}

const EscortAbout: React.FC<EscortAboutProps> = ({ escort }) => {
  // Function to check if an attribute exists
  const hasAttribute = (attr: any): boolean => {
    return attr !== undefined && attr !== null && attr !== '';
  };
  
  // Format the measurements
  const formatMeasurements = () => {
    if (!escort.measurements) return null;
    
    const { bust, waist, hips } = escort.measurements;
    if (!bust && !waist && !hips) return null;
    
    return (
      <div className="grid grid-cols-3 gap-2 mb-4">
        {bust && (
          <div className="text-center p-2 bg-accent rounded-md">
            <div className="text-sm text-muted-foreground">Bust</div>
            <div className="font-medium">{bust}</div>
          </div>
        )}
        {waist && (
          <div className="text-center p-2 bg-accent rounded-md">
            <div className="text-sm text-muted-foreground">Waist</div>
            <div className="font-medium">{waist}</div>
          </div>
        )}
        {hips && (
          <div className="text-center p-2 bg-accent rounded-md">
            <div className="text-sm text-muted-foreground">Hips</div>
            <div className="font-medium">{hips}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">About {escort.name}</h2>
        
        <ScrollArea className="max-h-[200px] rounded-md">
          <div className="space-y-2 p-1">
            {escort.bio ? (
              <p className="text-muted-foreground">{escort.bio}</p>
            ) : (
              <p className="text-muted-foreground italic">No bio provided.</p>
            )}
          </div>
        </ScrollArea>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-4">Personal Details</h3>
            <div className="space-y-3">
              {hasAttribute(escort.age) && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground text-sm">Age</span>
                    <p>{escort.age} years</p>
                  </div>
                </div>
              )}
              
              {hasAttribute(escort.physique?.bodyType) && (
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground text-sm">Body Type</span>
                    <p>{escort.physique?.bodyType}</p>
                  </div>
                </div>
              )}
              
              {hasAttribute(escort.height) && (
                <div className="flex items-center gap-3">
                  <Ruler className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground text-sm">Height</span>
                    <p>{escort.height}</p>
                  </div>
                </div>
              )}
              
              {hasAttribute(escort.ethnicity) && (
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground text-sm">Ethnicity</span>
                    <p>{escort.ethnicity}</p>
                  </div>
                </div>
              )}
              
              {Array.isArray(escort.languages) && escort.languages.length > 0 && (
                <div className="flex items-center gap-3">
                  <Languages className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground text-sm">Languages</span>
                    <p>{escort.languages.join(', ')}</p>
                  </div>
                </div>
              )}
              
              {escort.availability && (
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground text-sm">Availability</span>
                    <p>{escort.availability}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-4">Physical Attributes</h3>
            
            {formatMeasurements()}
            
            <div className="space-y-3">
              {hasAttribute(escort.hair) && (
                <div className="flex items-center justify-between py-1 border-b">
                  <span className="text-muted-foreground">Hair</span>
                  <span>{escort.hair}</span>
                </div>
              )}
              
              {hasAttribute(escort.eyes) && (
                <div className="flex items-center justify-between py-1 border-b">
                  <span className="text-muted-foreground">Eyes</span>
                  <span>{escort.eyes}</span>
                </div>
              )}
              
              {hasAttribute(escort.physique?.build) && (
                <div className="flex items-center justify-between py-1 border-b">
                  <span className="text-muted-foreground">Build</span>
                  <span>{escort.physique?.build}</span>
                </div>
              )}
              
              {hasAttribute(escort.physique?.features?.join(', ')) && (
                <div className="flex items-center justify-between py-1 border-b">
                  <span className="text-muted-foreground">Features</span>
                  <span>{escort.physique?.features?.join(', ')}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EscortAbout;
