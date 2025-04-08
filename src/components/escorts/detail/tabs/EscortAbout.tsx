
import React from 'react';
import { Escort } from "@/types/escort";
import { Card, CardContent } from "@/components/ui/card";

interface EscortAboutProps {
  escort: Escort;
}

const EscortAbout: React.FC<EscortAboutProps> = ({ escort }) => {
  // Fake data for presentation if not provided in the escort object
  const details = {
    height: escort.height || "168 cm",
    weight: escort.weight || "54 kg",
    measurements: escort.measurements || "34-24-36",
    languages: escort.languages || ["English"],
    available: escort.availability?.days?.join(", ") || "Monday to Friday",
    hairColor: escort.hairColor || "Blonde",
    eyeColor: escort.eyeColor || "Blue",
    ethnicity: escort.ethnicity || "Caucasian",
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div className="text-muted-foreground">Age</div>
          <div>{escort.age} years</div>
          
          <div className="text-muted-foreground">Gender</div>
          <div className="capitalize">{escort.gender || "Not specified"}</div>
          
          <div className="text-muted-foreground">Sexual Orientation</div>
          <div className="capitalize">{escort.sexualOrientation || "Not specified"}</div>
          
          <div className="text-muted-foreground">Height</div>
          <div>{details.height}</div>
          
          <div className="text-muted-foreground">Weight</div>
          <div>{details.weight}</div>
          
          <div className="text-muted-foreground">Measurements</div>
          <div>{details.measurements}</div>
          
          <div className="text-muted-foreground">Hair Color</div>
          <div>{details.hairColor}</div>
          
          <div className="text-muted-foreground">Eye Color</div>
          <div>{details.eyeColor}</div>
          
          <div className="text-muted-foreground">Ethnicity</div>
          <div>{details.ethnicity}</div>
          
          <div className="text-muted-foreground">Languages</div>
          <div>{details.languages.join(", ")}</div>
          
          <div className="text-muted-foreground">Availability</div>
          <div>{details.available}</div>
        </div>
        
        <h3 className="font-semibold mt-6 mb-2">About Me</h3>
        <p className="text-sm text-muted-foreground">
          {escort.bio || escort.description || `I'm a fun-loving, adventurous companion looking for genuine connections. 
          I enjoy both quiet evenings and exciting adventures. Let's create unforgettable 
          memories together in ${escort.location}. I provide high-class companionship services 
          and prioritize discretion and comfort.`}
        </p>
      </CardContent>
    </Card>
  );
};

export default EscortAbout;
