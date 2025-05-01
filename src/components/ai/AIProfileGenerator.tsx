
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { AIProfile } from '@/types/ai-profile';

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
    setTimeout(() => {
      // Mock implementation for generating profiles
      const mockProfiles: AIProfile[] = Array(count).fill(null).map((_, i) => ({
        id: `ai-${Date.now()}-${i}`,
        name: `AI Persona ${i+1}`,
        avatarUrl: `https://i.pravatar.cc/300?u=ai-${Date.now()}-${i}`,
        description: "A generated AI persona with unique traits and capabilities.",
        traits: ["friendly", "intelligent", "creative"],
        languages: ["English", "Spanish"],
        gender: Math.random() > 0.5 ? "female" : "male",
        age: Math.floor(Math.random() * 20) + 25,
      }));
      
      setGenerated(mockProfiles);
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
              <Card key={profile.id} className="cursor-pointer hover:shadow-lg transition-all" onClick={() => onSelectProfile?.(profile)}>
                <div className="aspect-square relative">
                  <img 
                    src={profile.avatarUrl} 
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">{profile.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {profile.traits?.map((trait, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-primary/10 rounded-full">{trait}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIProfileGenerator;
