
import React, { useState } from 'react';
import { huggingFaceService } from '@/services/ai/HuggingFaceService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAIGenerator } from '@/hooks/useAIGenerator';
import { Loader2, Download, RefreshCw, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const NSFWImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('playground-v2.5');
  const [steps, setSteps] = useState(30);
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [enableSafety, setEnableSafety] = useState(false);
  
  const { generateContent, clearResult, loading, result, error } = useAIGenerator({
    contentType: 'image',
    defaultModel: 'playground-v2.5'
  });
  
  const { toast } = useToast();
  
  const availableModels = huggingFaceService.getAvailableModels('image')
    .filter(model => model.nsfw);
  
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to generate an image",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await generateContent({
        prompt,
        model: selectedModel,
        nsfw: true,
        extra: {
          negative_prompt: negativePrompt,
          steps,
          guidance_scale: guidanceScale,
          safety_filter: enableSafety
        }
      });
    } catch (err: any) {
      toast({
        title: "Generation Failed",
        description: err.message || "Failed to generate image",
        variant: "destructive"
      });
    }
  };
  
  const handleDownload = () => {
    if (result?.url) {
      const link = document.createElement('a');
      link.href = result.url;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Image Prompt</h3>
            <Textarea
              placeholder="Describe the image you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Negative Prompt</h3>
            <Textarea
              placeholder="Elements to avoid in the generated image..."
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              rows={2}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Model</h3>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger>
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map(model => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Steps: {steps}</h3>
            </div>
            <Slider
              value={[steps]}
              min={10}
              max={50}
              step={1}
              onValueChange={(values) => setSteps(values[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Guidance Scale: {guidanceScale}</h3>
            </div>
            <Slider
              value={[guidanceScale]}
              min={1}
              max={15}
              step={0.5}
              onValueChange={(values) => setGuidanceScale(values[0])}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="safety-mode"
              checked={enableSafety}
              onCheckedChange={setEnableSafety}
            />
            <label htmlFor="safety-mode" className="text-sm font-medium">
              Enable safety filter
            </label>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Button 
              onClick={handleGenerate} 
              disabled={loading || !prompt.trim()}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : 'Generate Image'}
            </Button>
            
            <Button
              variant="outline"
              onClick={clearResult}
              disabled={!result && !error}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px] relative">
          {loading ? (
            <div className="flex flex-col items-center justify-center text-center p-8">
              <Loader2 className="h-8 w-8 animate-spin mb-4" />
              <p className="text-muted-foreground">Generating your image...</p>
              <p className="text-sm text-muted-foreground mt-2">This may take up to a minute</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center text-center p-8 border border-destructive/20 rounded-lg bg-destructive/10">
              <Info className="h-8 w-8 text-destructive mb-4" />
              <p className="font-medium text-destructive">Error generating image</p>
              <p className="text-sm text-muted-foreground mt-2">{error}</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={clearResult}
              >
                Try Again
              </Button>
            </div>
          ) : result?.url ? (
            <div className="flex flex-col items-center w-full">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border bg-muted/50">
                <img 
                  src={result.url} 
                  alt="Generated image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-center w-full mt-4">
                <Button onClick={handleDownload} className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download Image
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8">
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-4">
                <Info className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium">No image generated yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Enter a prompt and click generate to create an image
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NSFWImageGenerator;
