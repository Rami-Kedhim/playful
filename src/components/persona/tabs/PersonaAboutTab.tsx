
import React from 'react';
import { UberPersona } from '@/types/uberPersona';
import { Badge } from '@/components/ui/badge';

interface PersonaAboutTabProps {
  persona: UberPersona;
}

const PersonaAboutTab: React.FC<PersonaAboutTabProps> = ({ persona }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <p className="text-muted-foreground whitespace-pre-wrap">
          {persona.bio || "No bio information available."}
        </p>
      </div>
      
      {persona.tags.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Interests & Services</h3>
          <div className="flex flex-wrap gap-2">
            {persona.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {persona.roleFlags.isVerified && (
        <div className="bg-blue-500/10 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2 text-blue-500">Verified Profile</h3>
          <p className="text-muted-foreground">
            This profile has been verified by our team. Verification ensures 
            authenticity and builds trust in the UberEscorts community.
          </p>
        </div>
      )}
    </div>
  );
};

export default PersonaAboutTab;
