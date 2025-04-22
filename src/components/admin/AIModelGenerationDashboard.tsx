
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Toggle } from '@/components/ui/toggle';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAIModelGenerator } from '@/hooks/ai/useAIModelGenerator';
import { AIProfile, AIGenerationOptions, ProcessingStatus } from '@/types/ai-profile';
import { Loader2, Check, Brain, BarChart3, Users, Sparkles, Upload } from 'lucide-react';

const AIModelGenerationDashboard: React.FC = () => {
  const { toast } = useToast();
  const { 
    generateModels, 
    processModelsWithHermesOxum,
    generatedModels, 
    processingStatus, 
    isGenerating, 
    isProcessing 
  } = useAIModelGenerator();

  const [count, setCount] = useState<number>(5);
  const [ageRange, setAgeRange] = useState<[number, number]>([21, 45]);
  const [selectedPersonalities, setSelectedPersonalities] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const personalities = ['flirty', 'shy', 'dominant', 'playful', 'professional'];
  const regions = ['North America', 'Europe', 'Asia', 'South America', 'Australia'];

  const handleGenerate = async () => {
    try {
      // Pass all options to the generator
      const options: AIGenerationOptions = {
        count,
        personalityTypes: selectedPersonalities.length > 0 ? 
          selectedPersonalities as any : undefined,
        ageRange: {
          min: ageRange[0],
          max: ageRange[1]
        },
        regions: selectedRegions.length > 0 ? selectedRegions : undefined
      };
      
      const results = await generateModels(options);
      
      toast({
        title: "AI Models Generated",
        description: `Successfully generated ${results.length} AI models.`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate AI models.",
        variant: "destructive",
      });
    }
  };

  const handleProcess = async () => {
    if (generatedModels.length === 0) {
      toast({
        title: "No Models to Process",
        description: "Please generate models first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await processModelsWithHermesOxum();
      
      if (result.status === 'completed') {
        toast({
          title: "Processing Complete",
          description: `Successfully processed ${result.completedCount} AI models.`,
        });
      } else if (result.status === 'error') {
        toast({
          title: "Processing Failed",
          description: result.message || "An error occurred during processing.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Processing Failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const togglePersonality = (personality: string) => {
    setSelectedPersonalities(prev => 
      prev.includes(personality) 
        ? prev.filter(p => p !== personality)
        : [...prev, personality]
    );
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  const getProgressColor = () => {
    if (processingStatus.status === 'error') return 'bg-destructive';
    if (processingStatus.status === 'completed') return 'bg-green-500';
    return undefined; // default color
  };

  // Filter personality and region data down to more compact form for display
  const getPersonalityDistribution = (): Record<string, number> => {
    if (generatedModels.length === 0) return {};
    
    // Initialize with zeros for all known personalities 
    const distCount: Record<string, number> = {};
    personalities.forEach(p => distCount[p] = 0);
    
    // Count occurrences of each personality
    generatedModels.forEach(model => {
      if (model.personality && typeof model.personality === 'string') {
        const personality = model.personality.toLowerCase();
        if (personalities.includes(personality)) {
          distCount[personality] = (distCount[personality] || 0) + 1;
        }
      }
    });
    
    return distCount;
  };

  const getRegionDistribution = (): Record<string, number> => {
    if (generatedModels.length === 0) return {};
    
    const distCount: Record<string, number> = {};
    regions.forEach(r => distCount[r] = 0);
    
    // Use location (country) as a proxy for region
    generatedModels.forEach(model => {
      if (model.location) {
        // Simplified mapping - in a real app would be more sophisticated
        let region = 'Other';
        
        if (model.country?.includes('US') || model.country?.includes('Canada')) {
          region = 'North America';
        } else if (model.country?.includes('Europe')) {
          region = 'Europe';
        }
        
        distCount[region] = (distCount[region] || 0) + 1;
      }
    });
    
    return distCount;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Model Generation Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5" /> Generation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="count">Number of Models: {count}</Label>
                <Slider 
                  id="count" 
                  min={1} 
                  max={50} 
                  step={1} 
                  value={[count]}
                  onValueChange={(v) => setCount(v[0])}
                  disabled={isGenerating}
                  className="my-2"
                />
              </div>
              
              <div>
                <Label htmlFor="age-range">Age Range: {ageRange[0]} - {ageRange[1]}</Label>
                <Slider
                  id="age-range"
                  min={18}
                  max={65}
                  step={1}
                  value={ageRange}
                  onValueChange={setAgeRange}
                  disabled={isGenerating}
                  className="my-2"
                />
              </div>
              
              <div>
                <Label className="block mb-2">Personality Types:</Label>
                <div className="flex flex-wrap gap-2">
                  {personalities.map(personality => (
                    <Toggle
                      key={personality}
                      pressed={selectedPersonalities.includes(personality)}
                      onPressedChange={() => togglePersonality(personality)}
                      disabled={isGenerating}
                      variant="outline"
                      size="sm"
                      className="capitalize"
                    >
                      {personality}
                    </Toggle>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="block mb-2">Regions:</Label>
                <div className="flex flex-wrap gap-2">
                  {regions.map(region => (
                    <Toggle
                      key={region}
                      pressed={selectedRegions.includes(region)}
                      onPressedChange={() => toggleRegion(region)}
                      disabled={isGenerating}
                      variant="outline"
                      size="sm"
                    >
                      {region}
                    </Toggle>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Generating...
                  </>
                ) : (
                  <>Generate Models</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5" /> Hermes-Oxum Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className="block mb-2">Processing Status:</Label>
                <div className="bg-muted p-3 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">
                      {processingStatus.status === 'processing' && 'Processing...'}
                      {processingStatus.status === 'completed' && 'Processing Complete'}
                      {processingStatus.status === 'error' && 'Processing Failed'}
                      {processingStatus.status === 'idle' && 'Ready to Process'}
                    </span>
                    <span className="text-sm font-medium">
                      {processingStatus.completedCount}/{processingStatus.totalCount}
                    </span>
                  </div>
                  <Progress 
                    value={processingStatus.totalCount ? (processingStatus.completedCount / processingStatus.totalCount) * 100 : 0} 
                    className={`h-2 ${getProgressColor()}`}
                  />
                  {processingStatus.message && (
                    <p className="text-xs text-muted-foreground mt-2">{processingStatus.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <Label className="block mb-2">Neural Processing Options:</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Toggle
                    variant="outline"
                    size="sm"
                    disabled={isProcessing}
                  >
                    Visual Enhancement
                  </Toggle>
                  <Toggle
                    variant="outline"
                    size="sm"
                    disabled={isProcessing}
                  >
                    Personality Matrix
                  </Toggle>
                  <Toggle
                    variant="outline"
                    size="sm"
                    disabled={isProcessing}
                  >
                    Knowledge Base
                  </Toggle>
                  <Toggle
                    variant="outline"
                    size="sm"
                    disabled={isProcessing}
                  >
                    Emotion Engine
                  </Toggle>
                </div>
              </div>
              
              <Button 
                onClick={handleProcess} 
                variant="default" 
                disabled={isProcessing || generatedModels.length === 0}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Processing...
                  </>
                ) : (
                  <>Process with Hermes-Oxum</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" /> Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Total Models</span>
                  <span className="font-medium">{generatedModels.length}</span>
                </div>
                <Progress value={Math.min(generatedModels.length / 50 * 100, 100)} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Processed</span>
                  <span className="font-medium">
                    {processingStatus.completedCount}/{generatedModels.length}
                  </span>
                </div>
                <Progress 
                  value={generatedModels.length ? (processingStatus.completedCount / generatedModels.length) * 100 : 0} 
                  className="h-2"
                />
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-medium mb-2">Personality Distribution:</h4>
                {generatedModels.length > 0 ? (
                  <div className="space-y-1">
                    {Object.entries(getPersonalityDistribution()).map(([type, count]) => (
                      <div key={type} className="flex justify-between text-sm">
                        <span className="capitalize">{type}</span>
                        <span>{count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No models generated yet</p>
                )}
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-medium mb-2">Region Distribution:</h4>
                {generatedModels.length > 0 ? (
                  <div className="space-y-1">
                    {Object.entries(getRegionDistribution())
                      .filter(([region, count]) => count > 0)
                      .map(([region, count]) => (
                        <div key={region} className="flex justify-between text-sm">
                          <span>{region}</span>
                          <span>{count}</span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No models generated yet</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" /> Generated Models
          </CardTitle>
        </CardHeader>
        <CardContent>
          {generatedModels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {generatedModels.map(model => (
                <Card key={model.id} className="overflow-hidden">
                  <div className="aspect-square bg-muted relative">
                    <img 
                      src={model.avatarUrl || model.imageUrl} 
                      alt={model.name} 
                      className="object-cover h-full w-full"
                    />
                    {model.personality && (
                      <div className="absolute top-2 right-2 bg-background/80 text-xs px-2 py-1 rounded">
                        {model.personality}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm truncate">{model.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {model.age ? `${model.age} • ` : ''}{model.country || model.location}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs bg-muted px-2 py-0.5 rounded">
                        {processingStatus.status === 'completed' ? (
                          <Check className="h-3 w-3 inline mr-1 text-green-500" />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-amber-500 inline-block mr-1"></span>
                        )}
                        {processingStatus.status === 'completed' ? 'Processed' : 'Pending'}
                      </span>
                      <span className="text-xs text-muted-foreground">ID: {model.id.substring(0, 6)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No models generated yet. Use the panel above to create AI models.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIModelGenerationDashboard;
