
import React from 'react';
import { Escort } from '@/types/Escort';

interface AboutTabProps {
  escort: Escort;
}

const AboutTab: React.FC<AboutTabProps> = ({ escort }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">About</h3>
        <p className="text-muted-foreground">{escort.bio || "No bio available"}</p>
      </div>
      
      {escort.stats && (
        <div>
          <h3 className="text-lg font-medium mb-2">Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {escort.age && (
              <div>
                <p className="text-sm font-medium">Age</p>
                <p className="text-muted-foreground">{escort.age}</p>
              </div>
            )}
            
            {escort.stats.height && (
              <div>
                <p className="text-sm font-medium">Height</p>
                <p className="text-muted-foreground">{escort.stats.height}</p>
              </div>
            )}
            
            {escort.stats.weight && (
              <div>
                <p className="text-sm font-medium">Weight</p>
                <p className="text-muted-foreground">{escort.stats.weight}</p>
              </div>
            )}
            
            {escort.stats.bust && (
              <div>
                <p className="text-sm font-medium">Bust</p>
                <p className="text-muted-foreground">{escort.stats.bust}</p>
              </div>
            )}
            
            {escort.stats.waist && (
              <div>
                <p className="text-sm font-medium">Waist</p>
                <p className="text-muted-foreground">{escort.stats.waist}</p>
              </div>
            )}
            
            {escort.stats.hips && (
              <div>
                <p className="text-sm font-medium">Hips</p>
                <p className="text-muted-foreground">{escort.stats.hips}</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {escort.languages && escort.languages.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">Languages</h3>
          <p className="text-muted-foreground">
            {escort.languages.join(', ')}
          </p>
        </div>
      )}
      
      {escort.interests && escort.interests.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {escort.interests.map((interest, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-secondary rounded-full text-xs"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutTab;
