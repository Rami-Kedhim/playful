
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { aiProfileGenerator } from '@/services/aiProfileGenerator';
import { AIProfile } from '@/types/ai-profile';
import AIProfileCard from '@/components/ai/AIProfileCard';

interface AIProfileGeneratorProps {
  onSelectProfile?: (profile: AIProfile) => void;
}

const AIProfileGenerator = ({ onSelectProfile }: AIProfileGeneratorProps) => {
  const [count, setCount] = useState<number>(4);
  const [generated, setGenerated] = useState<AIProfile[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Add a small delay to simulate processing
    setTimeout(async () => {
      const profiles = await aiProfileGenerator.generateMultipleProfiles(count);
      setGenerated(profiles);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Personality Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="count">Number of Profiles</Label>
              <span className="text-sm text-muted-foreground">{count}</span>
            </div>
            <Slider
              id="count"
              min={1}
              max={12}
              step={1}
              value={[count]}
              onValueChange={(values) => setCount(values[0])}
              className="py-4"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerate} 
            className="w-full"
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate AI Personalities'}
          </Button>
        </CardFooter>
      </Card>

      {generated.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Generated Personalities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generated.map((profile) => (
              <AIProfileCard 
                key={profile.id} 
                profile={profile} 
                onChatClick={() => onSelectProfile?.(profile)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIProfileGenerator;
