
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Languages, MapPin } from 'lucide-react';
import { Escort } from '@/types/escort';

interface EscortAboutProps {
  escort: Escort;
}

const EscortAbout: React.FC<EscortAboutProps> = ({ escort }) => {
  // Helper function to safely render arrays
  const safeRenderArray = (arr: unknown, renderItem: (item: string, index: number) => React.ReactNode) => {
    if (Array.isArray(arr)) {
      return arr.map((item, index) => renderItem(String(item), index));
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">About Me</h2>
        <p className="text-muted-foreground whitespace-pre-line">
          {escort.about || escort.bio || 
            "This escort hasn't provided a bio yet. Feel free to ask them about themselves when you connect."}
        </p>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-4">Personal Details</h3>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Age</span>
                <span className="font-medium">{escort.age || 'Not specified'}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Gender</span>
                <span className="font-medium capitalize">{escort.gender || 'Not specified'}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Height</span>
                <span className="font-medium">{escort.height || 'Not specified'}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Body Type</span>
                <span className="font-medium capitalize">
                  {escort.bodyType || 'Not specified'}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Hair Color</span>
                <span className="font-medium capitalize">{escort.hairColor || 'Not specified'}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Eye Color</span>
                <span className="font-medium capitalize">{escort.eyeColor || 'Not specified'}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Ethnicity</span>
                <span className="font-medium capitalize">{escort.ethnicity || 'Not specified'}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-4">Location & Languages</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">{escort.location || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Languages className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Languages</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {Array.isArray(escort.languages) && escort.languages.length > 0 ? (
                      escort.languages.map((language, index) => (
                        <Badge key={index} variant="outline">
                          {language}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">Not specified</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <CalendarDays className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Availability</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {safeRenderArray(
                      escort.availability, 
                      (day, index) => (
                        <Badge key={index} variant="outline">
                          {day}
                        </Badge>
                      )
                    ) || (
                      <span className="text-muted-foreground">Not specified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EscortAbout;
