
import React from "react";
import { Progress } from "@/components/ui/progress";
import { PersonalityTrait } from "@/types/ai-personality";

interface AIPersonalityTraitsProps {
  traits: PersonalityTrait[];
  compact?: boolean;
}

const AIPersonalityTraits: React.FC<AIPersonalityTraitsProps> = ({ 
  traits, 
  compact = false 
}) => {
  if (!traits || traits.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className={compact ? "text-sm font-medium mb-2" : "text-lg font-medium mb-3"}>
        Personality Traits
      </h3>
      
      <div className="space-y-2">
        {traits.map((trait, index) => (
          <div key={`trait-${index}`} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className={compact ? "text-xs font-medium" : "text-sm font-medium"}>
                {trait.name}
              </span>
              {!compact && trait.description && (
                <span className="text-xs text-muted-foreground">
                  {trait.description}
                </span>
              )}
            </div>
            <Progress value={trait.intensity} className="h-1.5" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIPersonalityTraits;
