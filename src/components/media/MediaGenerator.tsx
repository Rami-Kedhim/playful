
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageIcon, Video, Wand2, Loader2, Download, Copy, Share2 } from 'lucide-react';
import { useMediaGeneration } from '@/hooks/useMediaGeneration';
import { useToast } from '@/hooks/use-toast';

// Available AI media models
const imageModels = [
  { id: "black-forest-labs/FLUX.1-schnell", name: "FLUX.1 (Fast)" },
  { id: "stabilityai/stable-diffusion-xl-base-1.0", name: "Stable Diffusion XL" },
  { id: "runwayml/stable-diffusion-v1-5", name: "Stable Diffusion v1.5" }
];

const videoModels = [
  { id: "cerspense/zeroscope_v2_576w", name: "Zeroscope v2" },
  { id: "anotherjesse/zeroscope-v2-xl", name: "Zeroscope v2 XL" }
];

const presetPrompts = {
  image: [
    "A luxurious hotel suite with a city view at sunset",
    "Professional portrait photo in elegant clothing against a neutral background",
    "Candid street photography in an urban setting with natural lighting"
  ],
  video: [
    "A slow pan across a beautiful beach at sunset with waves gently rolling in",
    "Walking through a luxurious hotel lobby with elegant furnishings",
    "City streets at night with bokeh lights and slight rain"
  ]
};

const MediaGenerator: React.FC = () => {
  const { toast } = useToast();
  const { generateMedia, resetMedia, loading, mediaUrl, error } = useMediaGeneration();

  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState(
    mediaType === 'image' ? imageModels[0].id : videoModels[0].id
  );
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [useAdvanced, setUseAdvanced] = useState(false);
  
  // Update selected model when media type changes
  React.useEffect(() => {
    setSelectedModel(mediaType === 'image' ? imageModels[0].id : videoModels[0].id);
  }, [mediaType]);

  const handlePresetPrompt = (presetPrompt: string) => {
    setPrompt(presetPrompt);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a description of what you want to generate.",
        variant: "destructive",
      });
      return;
    }

    try {
      await generateMedia({
        prompt,
        type: mediaType,
        modelId: selectedModel,
        width,
        height,
        options: {},
        userId: 'anonymous'
      });
    } catch (err) {
      console.error("Error in media generation:", err);
    }
  };

  const handleReset = () => {
    resetMedia();
    setPrompt("");
  };

  const handleCopyLink = () => {
    if (mediaUrl) {
      navigator.clipboard.writeText(mediaUrl);
      toast({ title: "Link Copied", description: "Media link copied to clipboard" });
    }
  };

  const handleDownload = () => {
    if (mediaUrl) {
      const a = document.createElement('a');
      a.href = mediaUrl;
      a.download = `generated-${mediaType}-${Date.now()}.${mediaType === 'image' ? 'png' : 'mp4'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="image" onValueChange={(value) => setMediaType(value as 'image' | 'video')}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="image" className="flex items-center">
            <ImageIcon className="h-4 w-4 mr-2" /> Image Generator
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center">
            <Video className="h-4 w-4 mr-2" /> Video Generator
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {mediaType === 'image' ? 'Image Generation' : 'Video Generation'} Settings
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Prompt</Label>
                  <Textarea
                    id="prompt"
                    placeholder={`Describe the ${mediaType} you want to generate...`}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={5}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Preset Prompts</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {presetPrompts[mediaType].map((presetPrompt, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        className="text-left h-auto py-2 px-3 whitespace-normal justify-start"
                        onClick={() => handlePresetPrompt(presetPrompt)}
                      >
                        {presetPrompt}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger id="model">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      {(mediaType === 'image' ? imageModels : videoModels).map((model) => (
                        <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="advanced" checked={useAdvanced} onCheckedChange={setUseAdvanced} />
                  <Label htmlFor="advanced">Advanced Settings</Label>
                </div>
                
                {useAdvanced && (
                  <div className="space-y-4 border rounded-md p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width">Width</Label>
                        <Input 
                          id="width" 
                          type="number" 
                          value={width} 
                          onChange={(e) => setWidth(Number(e.target.value))} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height</Label>
                        <Input 
                          id="height" 
                          type="number" 
                          value={height} 
                          onChange={(e) => setHeight(Number(e.target.value))} 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleReset} disabled={loading}>
                  Reset
                </Button>
                <Button onClick={handleGenerate} disabled={loading || !prompt.trim()}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate {mediaType}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              
              <CardContent className="flex-grow flex items-center justify-center p-0">
                {error ? (
                  <div className="text-center p-6 text-red-500">
                    <p className="text-lg font-semibold">Error</p>
                    <p>{error}</p>
                  </div>
                ) : loading ? (
                  <div className="text-center p-12">
                    <Loader2 className="h-16 w-16 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-lg text-muted-foreground">Generating your {mediaType}...</p>
                    <p className="text-sm text-muted-foreground mt-2">This may take up to a minute</p>
                  </div>
                ) : mediaUrl ? (
                  <div className="w-full h-full flex items-center justify-center p-4">
                    {mediaType === 'image' ? (
                      <img 
                        src={mediaUrl} 
                        alt="Generated" 
                        className="max-w-full max-h-[500px] object-contain rounded-md shadow-md" 
                      />
                    ) : (
                      <video 
                        src={mediaUrl} 
                        controls 
                        className="max-w-full max-h-[500px] rounded-md shadow-md" 
                      />
                    )}
                  </div>
                ) : (
                  <div className="text-center p-12 border-2 border-dashed rounded-lg m-6 flex flex-col items-center justify-center text-muted-foreground">
                    {mediaType === 'image' ? (
                      <ImageIcon className="h-16 w-16 mb-4" />
                    ) : (
                      <Video className="h-16 w-16 mb-4" />
                    )}
                    <p className="text-lg">No {mediaType} generated yet</p>
                    <p className="text-sm mt-2">Enter a prompt and click Generate to create your {mediaType}</p>
                  </div>
                )}
              </CardContent>
              
              {mediaUrl && (
                <CardFooter className="flex justify-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyLink}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default MediaGenerator;
