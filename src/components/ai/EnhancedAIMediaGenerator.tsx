
import React, { useState } from 'react';
import { useDeepSeekAI } from '@/hooks/ai/useDeepSeekAI';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2, Image, Film, Type, Download, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const models = {
  image: [
    { id: 'realistic', name: 'Realistic Vision V5', description: 'Photorealistic images with high detail' },
    { id: 'deepseek', name: 'DeepSeek Vision', description: 'Advanced AI model for high-quality realistic images' },
    { id: 'realistic_xl', name: 'Stable Diffusion XL', description: 'Higher resolution and more detailed images' },
    { id: 'dream_shaper', name: 'DreamShaper 8', description: 'Creative and artistic image generation' },
    { id: 'photo_real', name: 'PhotoReal SDXL', description: 'Highly photorealistic outputs' },
    { id: 'anime', name: 'Waifu Diffusion', description: 'Anime and manga style images' }
  ],
  text: [
    { id: 'deepseek-ai/deepseek-llm-67b-chat', name: 'DeepSeek Chat 67B', description: 'Powerful chatbot model' },
    { id: 'deepseek-ai/deepseek-coder-33b-instruct', name: 'DeepSeek Coder', description: 'Code generation model' }
  ],
  video: [
    { id: 'cerspense/zeroscope_v2_576w', name: 'ZeroScope V2', description: 'Video generation model' }
  ]
};

const EnhancedAIMediaGenerator: React.FC = () => {
  const [contentType, setContentType] = useState<'image' | 'text' | 'video'>('image');
  const [model, setModel] = useState(models.image[0].id);
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('deformed, bad anatomy, disfigured, poorly drawn, extra limbs, blurry, watermark');
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [steps, setSteps] = useState(30);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  
  const { generateContent, clearResult, result, isLoading } = useDeepSeekAI();
  
  const handleGenerate = async () => {
    await generateContent({
      prompt,
      modelType: contentType,
      modelId: model,
      negativePrompt,
      guidanceScale,
      steps,
      width,
      height
    });
  };
  
  const handleDownload = () => {
    if (result?.url) {
      const a = document.createElement('a');
      a.href = result.url;
      a.download = `ai-generated-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Enhanced AI Media Generator</CardTitle>
          <Badge variant="outline" className="ml-2">Using DeepSeek & HF Models</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="image" onValueChange={(v) => setContentType(v as any)}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="h-4 w-4" /> Image
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-2">
              <Type className="h-4 w-4" /> Text
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Film className="h-4 w-4" /> Video
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="image" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imageModel">Model</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {models.image.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                      <span className="text-xs text-muted-foreground block">{m.description}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea
                id="prompt"
                placeholder="A beautiful woman in a luxury hotel suite, looking seductive, professional photography"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="advanced"
                checked={advancedMode}
                onCheckedChange={setAdvancedMode}
              />
              <Label htmlFor="advanced">Advanced options</Label>
            </div>
            
            {advancedMode && (
              <div className="space-y-4 border rounded-md p-4">
                <div className="space-y-2">
                  <Label htmlFor="negative">Negative Prompt</Label>
                  <Textarea
                    id="negative"
                    placeholder="deformed, bad anatomy, disfigured, etc."
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="guidance">Guidance Scale: {guidanceScale}</Label>
                  </div>
                  <Slider
                    id="guidance"
                    min={1}
                    max={20}
                    step={0.1}
                    value={[guidanceScale]}
                    onValueChange={(values) => setGuidanceScale(values[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="steps">Steps: {steps}</Label>
                  </div>
                  <Slider
                    id="steps"
                    min={10}
                    max={100}
                    step={1}
                    value={[steps]}
                    onValueChange={(values) => setSteps(values[0])}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Width: {width}px</Label>
                    <Select value={width.toString()} onValueChange={(v) => setWidth(Number(v))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Width" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="512">512px</SelectItem>
                        <SelectItem value="768">768px</SelectItem>
                        <SelectItem value="1024">1024px</SelectItem>
                        <SelectItem value="1280">1280px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="height">Height: {height}px</Label>
                    <Select value={height.toString()} onValueChange={(v) => setHeight(Number(v))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Height" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="512">512px</SelectItem>
                        <SelectItem value="768">768px</SelectItem>
                        <SelectItem value="1024">1024px</SelectItem>
                        <SelectItem value="1280">1280px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="text" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="textModel">Model</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {models.text.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                      <span className="text-xs text-muted-foreground block">{m.description}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="textPrompt">Prompt</Label>
              <Textarea
                id="textPrompt"
                placeholder="Write a seductive profile description for a luxury escort"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="videoModel">Model</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {models.video.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                      <span className="text-xs text-muted-foreground block">{m.description}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="videoPrompt">Prompt</Label>
              <Textarea
                id="videoPrompt"
                placeholder="A woman walking along a beach at sunset"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="text-sm text-muted-foreground bg-amber-50 dark:bg-amber-950 p-3 rounded-md">
              Note: Video generation may take up to 2 minutes to complete
            </div>
          </TabsContent>
        </Tabs>

        {result?.url && (
          <div className="mt-4 space-y-2">
            <div className="relative aspect-square w-full max-h-[500px] overflow-hidden rounded-md border bg-background">
              {contentType === 'image' ? (
                <img 
                  src={result.url} 
                  alt="Generated content" 
                  className="w-full h-full object-contain"
                />
              ) : contentType === 'video' ? (
                <video 
                  src={result.url} 
                  controls 
                  className="w-full h-full object-contain" 
                />
              ) : null}
            </div>
          </div>
        )}
        
        {result?.text && (
          <div className="mt-4 p-4 border rounded-md bg-muted/50">
            <pre className="whitespace-pre-wrap text-sm">{result.text}</pre>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="destructive" 
          onClick={clearResult}
          disabled={isLoading || (!result?.url && !result?.text)}
        >
          <Trash2 className="h-4 w-4 mr-2" /> Clear
        </Button>
        
        <div className="flex gap-2">
          {result?.url && (
            <Button variant="secondary" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
          )}
          
          <Button 
            onClick={handleGenerate} 
            disabled={isLoading || !prompt.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...
              </>
            ) : (
              <>Generate</>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EnhancedAIMediaGenerator;
