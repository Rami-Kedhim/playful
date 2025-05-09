import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Escort } from '@/types/Escort';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';

interface EscortAboutProps {
  escort: Escort;
}

const EscortAbout: React.FC<EscortAboutProps> = ({ escort }) => {
  // Helper function to get availability days safely
  const getAvailabilityDays = (): string[] => {
    if (!escort.availability) return [];
    
    if (Array.isArray(escort.availability)) {
      return escort.availability as string[];
    }
    
    if (typeof escort.availability === 'object') {
      // Check if it has days property
      if ('days' in escort.availability && Array.isArray(escort.availability.days)) {
        return escort.availability.days;
      }
      
      // Otherwise collect day names that are present
      const days = [];
      const availObj = escort.availability as any;
      if (availObj.monday) days.push('Monday');
      if (availObj.tuesday) days.push('Tuesday');
      if (availObj.wednesday) days.push('Wednesday');
      if (availObj.thursday) days.push('Thursday');
      if (availObj.friday) days.push('Friday');
      if (availObj.saturday) days.push('Saturday');
      if (availObj.sunday) days.push('Sunday');
      return days;
    }
    
    if (typeof escort.availability === 'string') {
      return [escort.availability];
    }
    
    return [];
  };
  
  const availabilityDays = getAvailabilityDays();
  const lastActive = escort.lastActive ? new Date(escort.lastActive) : null;
  
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">About {escort.name}</h3>
          
          <p className="text-muted-foreground mb-4">
            {escort.description || escort.bio || "No description available"}
          </p>
          
          <Separator className="my-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Details</h4>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{escort.location || "Location not specified"}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {lastActive 
                      ? `Last active ${format(lastActive, "MMM d, yyyy")}`
                      : "Activity not available"}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {availabilityDays.length > 0
                      ? `Available on ${availabilityDays.join(", ")}`
                      : "Availability not specified"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Appearance</h4>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {escort.age && (
                  <>
                    <span className="text-muted-foreground">Age:</span>
                    <span>{escort.age}</span>
                  </>
                )}
                
                {escort.height && (
                  <>
                    <span className="text-muted-foreground">Height:</span>
                    <span>{String(escort.height)}</span>
                  </>
                )}
                
                {escort.weight && (
                  <>
                    <span className="text-muted-foreground">Weight:</span>
                    <span>{String(escort.weight)}</span>
                  </>
                )}
                
                {escort.bodyType && (
                  <>
                    <span className="text-muted-foreground">Body Type:</span>
                    <span>{escort.bodyType}</span>
                  </>
                )}
                
                {escort.hairColor && (
                  <>
                    <span className="text-muted-foreground">Hair:</span>
                    <span>{escort.hairColor}</span>
                  </>
                )}
                
                {escort.eyeColor && (
                  <>
                    <span className="text-muted-foreground">Eyes:</span>
                    <span>{escort.eyeColor}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EscortAbout;
