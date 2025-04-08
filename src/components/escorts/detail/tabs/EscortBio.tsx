
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Globe, Languages, MapPin, User } from 'lucide-react';

interface EscortBioProps {
  name: string;
  age: number;
  location: string;
  bio?: string;
  gender?: string;
  orientation?: string;
  languages?: string[];
  ethnicity?: string;
  height?: string;
  weight?: string;
  hairColor?: string;
  eyeColor?: string;
  measurements?: string;
  tags?: string[];
}

const EscortBio: React.FC<EscortBioProps> = ({
  name,
  age,
  location,
  bio,
  gender,
  orientation,
  languages = [],
  ethnicity,
  height,
  weight,
  hairColor,
  eyeColor,
  measurements,
  tags = []
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">About {name}</h2>
        <p className="text-muted-foreground whitespace-pre-line">{bio || `Hello, I'm ${name}, a ${age} year old escort based in ${location}. I offer premium companionship services tailored to your desires.`}</p>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Details</h3>
          
          <div className="space-y-2">
            {age && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{age} years old</span>
              </div>
            )}
            
            {location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{location}</span>
              </div>
            )}
            
            {gender && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{gender.charAt(0).toUpperCase() + gender.slice(1)}</span>
              </div>
            )}
            
            {orientation && (
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 text-muted-foreground">💓</span>
                <span className="text-sm">{orientation.charAt(0).toUpperCase() + orientation.slice(1)}</span>
              </div>
            )}
            
            {languages.length > 0 && (
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{languages.join(', ')}</span>
              </div>
            )}
            
            {ethnicity && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{ethnicity}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Physical</h3>
          
          <div className="space-y-2">
            {height && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Height</span>
                <span className="text-sm font-medium">{height}</span>
              </div>
            )}
            
            {weight && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Weight</span>
                <span className="text-sm font-medium">{weight}</span>
              </div>
            )}
            
            {hairColor && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Hair</span>
                <span className="text-sm font-medium">{hairColor}</span>
              </div>
            )}
            
            {eyeColor && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Eyes</span>
                <span className="text-sm font-medium">{eyeColor}</span>
              </div>
            )}
            
            {measurements && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Measurements</span>
                <span className="text-sm font-medium">{measurements}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {tags.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EscortBio;
