
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ImagePlus, Download } from "lucide-react";

interface ImageGenerationParams {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  steps?: number;
  cfgScale?: number;
  seed?: number;
  modelId?: string;
}

const NSFWImageGenerator: React.FC = () => {
  const [tab, setTab] = useState<string>("text-to-image");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [params, setParams] = useState<ImageGenerationParams>({
    prompt: "",
    negativePrompt: "blurry, bad anatomy, bad hands, cropped, worst quality",
    width: 512,
    height: 768,
    steps: 30,
    cfgScale: 7,
    seed: -1,
    modelId: "realistic-vision-v5"
  });
  
  const { toast } = useToast();

  const updateParam = <K extends keyof ImageGenerationParams>(
    key: K,
    value: ImageGenerationParams[K]
  ) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    if (!params.prompt) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsGenerating(true);
      // Placeholder for API call - this would be replaced by actual implementation
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Mock generated image
      setGeneratedImage(`https://picsum.photos/${params.width}/${params.height}?random=${Date.now()}`);
      
      toast({
        title: "Image generated",
        description: "Your image has been generated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate image",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    // Fixed: Changed to use only one argument
    downloadImage(generatedImage);
  };

  // Updated downloadImage function to take a single parameter
  const downloadImage = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>NSFW Image Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="text-to-image">Text to Image</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text-to-image" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="prompt">Prompt</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe what you want to generate..."
                    rows={4}
                    value={params.prompt}
                    onChange={(e) => updateParam('prompt', e.target.value)}
                    className="resize-none"
                  />
                </div>
                
                <div>
                  <Label htmlFor="negative-prompt">Negative Prompt</Label>
                  <Textarea
                    id="negative-prompt"
                    placeholder="Describe what to avoid..."
                    rows={2}
                    value={params.negativePrompt}
                    onChange={(e) => updateParam('negativePrompt', e.target.value)}
                    className="resize-none"
                  />
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center border rounded-lg p-4 min-h-[300px] bg-muted/30">
                {isGenerating ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Generating image...</p>
                  </div>
                ) : generatedImage ? (
                  <div className="w-full h-full flex flex-col items-center">
                    <img
                      src={generatedImage}
                      alt="Generated"
                      className="max-w-full max-h-[300px] object-contain rounded-md"
                    />
                    <Button 
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={handleDownload}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <ImagePlus className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Generated image will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <Label className="mb-2 block">Image Dimensions</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="width" className="text-xs">Width</Label>
                    <Input
                      id="width"
                      type="number"
                      value={params.width}
                      onChange={(e) => updateParam('width', Number(e.target.value))}
                      min={256}
                      max={1024}
                      step={64}
                    />
                  </div>
                  <div>
                    <Label htmlFor="height" className="text-xs">Height</Label>
                    <Input
                      id="height"
                      type="number"
                      value={params.height}
                      onChange={(e) => updateParam('height', Number(e.target.value))}
                      min={256}
                      max={1024}
                      step={64}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="mb-1 block">Steps: {params.steps}</Label>
                <Slider
                  value={[params.steps || 30]}
                  min={10}
                  max={50}
                  step={1}
                  onValueChange={(value) => updateParam('steps', value[0])}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Higher values = better quality, slower generation
                </p>
              </div>
              
              <div>
                <Label className="mb-1 block">CFG Scale: {params.cfgScale}</Label>
                <Slider
                  value={[params.cfgScale || 7]}
                  min={1}
                  max={14}
                  step={0.5}
                  onValueChange={(value) => updateParam('cfgScale', value[0])}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  How closely to follow the prompt
                </p>
              </div>
              
              <div>
                <Label htmlFor="seed">Seed (-1 for random)</Label>
                <Input
                  id="seed"
                  type="number"
                  value={params.seed}
                  onChange={(e) => updateParam('seed', Number(e.target.value))}
                />
              </div>
              
              <div>
                <Label htmlFor="model">Model</Label>
                <select
                  id="model"
                  value={params.modelId}
                  onChange={(e) => updateParam('modelId', e.target.value)}
                  className="w-full border border-input bg-background px-3 py-2 rounded-md"
                >
                  <option value="realistic-vision-v5">Realistic Vision 5.0</option>
                  <option value="dreamshaper-8">DreamShaper 8</option>
                  <option value="deliberate-2">Deliberate 2</option>
                  <option value="anything-v5">Anything V5</option>
                </select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating || !params.prompt}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Image"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NSFWImageGenerator;
