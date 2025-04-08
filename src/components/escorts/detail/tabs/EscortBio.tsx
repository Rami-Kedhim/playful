
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
  physique?: string;
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
  physique,
  measurements,
  tags = []
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">About {name}</h2>
        <p className="text-gray-600 dark:text-gray-400">{bio || "No bio provided."}</p>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div className="flex items-start gap-3">
          <User className="h-5 w-5 text-primary mt-1" />
          <div>
            <p className="font-medium">Age</p>
            <p className="text-gray-600 dark:text-gray-400">{age} years</p>
          </div>
        </div>
        
        {gender && (
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-medium">Gender</p>
              <p className="text-gray-600 dark:text-gray-400">{gender}</p>
            </div>
          </div>
        )}
        
        {orientation && (
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-medium">Orientation</p>
              <p className="text-gray-600 dark:text-gray-400">{orientation}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-primary mt-1" />
          <div>
            <p className="font-medium">Location</p>
            <p className="text-gray-600 dark:text-gray-400">{location}</p>
          </div>
        </div>
        
        {languages && languages.length > 0 && (
          <div className="flex items-start gap-3">
            <Languages className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-medium">Languages</p>
              <p className="text-gray-600 dark:text-gray-400">
                {languages.join(', ')}
              </p>
            </div>
          </div>
        )}
        
        {ethnicity && (
          <div className="flex items-start gap-3">
            <Globe className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-medium">Ethnicity</p>
              <p className="text-gray-600 dark:text-gray-400">{ethnicity}</p>
            </div>
          </div>
        )}
        
        {height && (
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-medium">Height</p>
              <p className="text-gray-600 dark:text-gray-400">{height}</p>
            </div>
          </div>
        )}
        
        {weight && (
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-medium">Weight</p>
              <p className="text-gray-600 dark:text-gray-400">{weight}</p>
            </div>
          </div>
        )}
        
        {physique && (
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="font-medium">Measurements</p>
              <p className="text-gray-600 dark:text-gray-400">{physique}</p>
            </div>
          </div>
        )}
      </div>
      
      {tags && tags.length > 0 && (
        <div className="pt-4">
          <h3 className="text-lg font-medium mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="px-2.5 py-1">
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
