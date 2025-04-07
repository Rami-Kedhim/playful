
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { PersonalityTrait } from '@/types/ai-personality';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Heart, 
  Brain, 
  Flame, 
  Sparkles, 
  Coffee, 
  Book, 
  Glasses, 
  Ghost,
  Lightbulb
} from 'lucide-react';

interface AIPersonalityTraitsProps {
  traits: PersonalityTrait[];
  compact?: boolean;
}

const getTraitIcon = (traitName: string) => {
  const name = traitName.toLowerCase();
  
  if (name.includes('passion') || name.includes('love') || name.includes('flirt')) return <Heart className="h-4 w-4" />;
  if (name.includes('intellect') || name.includes('smart')) return <Brain className="h-4 w-4" />;
  if (name.includes('energy') || name.includes('active')) return <Flame className="h-4 w-4" />;
  if (name.includes('creative')) return <Sparkles className="h-4 w-4" />;
  if (name.includes('adventurous')) return <Coffee className="h-4 w-4" />;
  if (name.includes('knowledgeable')) return <Book className="h-4 w-4" />;
  if (name.includes('nerdy') || name.includes('scientific')) return <Glasses className="h-4 w-4" />;
  if (name.includes('mysterious')) return <Ghost className="h-4 w-4" />;
  
  // Default icon
  return <Lightbulb className="h-4 w-4" />;
};

const AIPersonalityTraits: React.FC<AIPersonalityTraitsProps> = ({ traits, compact = false }) => {
  // Sort traits by intensity (highest first)
  const sortedTraits = [...traits].sort((a, b) => b.intensity - a.intensity);
  
  // Take top 5 traits if in compact mode
  const displayTraits = compact ? sortedTraits.slice(0, 5) : sortedTraits;

  if (compact) {
    return (
      <div className="space-y-2">
        {displayTraits.map((trait) => (
          <div key={trait.name} className="flex items-center gap-2">
            <div className="w-6 text-muted-foreground flex justify-center">
              {getTraitIcon(trait.name)}
            </div>
            <div className="flex-1">
              <Progress value={trait.intensity} className="h-1.5" />
            </div>
            <span className="text-xs font-medium w-10">{trait.name}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md">Personality Traits</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {displayTraits.map((trait) => (
            <div key={trait.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getTraitIcon(trait.name)}
                  <span className="text-sm font-medium">{trait.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{trait.intensity}%</span>
              </div>
              <Progress value={trait.intensity} className="h-2" />
              {trait.description && (
                <p className="text-xs text-muted-foreground pt-1">{trait.description}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIPersonalityTraits;
