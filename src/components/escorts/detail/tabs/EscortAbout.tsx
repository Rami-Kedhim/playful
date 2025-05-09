
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Escort } from "@/types/Escort";

interface EscortAboutProps {
  escort: Escort;
}

const EscortAbout: React.FC<EscortAboutProps> = ({ escort }) => {
  // Format the availability data for display
  const formatAvailability = () => {
    if (!escort.availability) return <p>Availability information not provided</p>;
    
    if (escort.availability.isAvailableNow) {
      return <Badge variant="success">Available Now</Badge>;
    }
    
    if (escort.availability.days && escort.availability.days.length > 0) {
      return (
        <div className="grid grid-cols-2 gap-2">
          {escort.availability.days.map((day, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="font-medium">{day.day}:</span>
              <span>{day.available ? 'Available' : 'Unavailable'}</span>
            </div>
          ))}
        </div>
      );
    }
    
    if (escort.availability.notes) {
      return <p>{escort.availability.notes}</p>;
    }
    
    return <p>Please contact for availability</p>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bio</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{escort.bio || 'No bio provided'}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
        </CardHeader>
        <CardContent>
          {formatAvailability()}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Physical Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {escort.height && (
              <div>
                <p className="text-muted-foreground text-sm">Height</p>
                <p className="font-medium">{typeof escort.height === 'number' ? `${escort.height}cm` : escort.height}</p>
              </div>
            )}
            
            {escort.weight && (
              <div>
                <p className="text-muted-foreground text-sm">Weight</p>
                <p className="font-medium">{typeof escort.weight === 'number' ? `${escort.weight}kg` : escort.weight}</p>
              </div>
            )}
            
            {escort.hairColor && (
              <div>
                <p className="text-muted-foreground text-sm">Hair</p>
                <p className="font-medium">{escort.hairColor}</p>
              </div>
            )}
            
            {escort.eyeColor && (
              <div>
                <p className="text-muted-foreground text-sm">Eyes</p>
                <p className="font-medium">{escort.eyeColor}</p>
              </div>
            )}
            
            {escort.bodyType && (
              <div>
                <p className="text-muted-foreground text-sm">Body Type</p>
                <p className="font-medium">{escort.bodyType}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {escort.interests && escort.interests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {escort.interests.map((interest, index) => (
                <Badge key={index} variant="secondary">{interest}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EscortAbout;
