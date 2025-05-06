
import { useState } from 'react';
import { Loader2, Image, Video, Wand2, RefreshCcw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useMediaGeneration from '@/hooks/useMediaGeneration';

const MediaGenerator = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const { generateMedia, resetMedia, loading, mediaUrl, error } = useMediaGeneration();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    await generateMedia({
      prompt,
      type: activeTab,
      modelId: selectedModel || undefined,
    });
  };

  const handleDownload = () => {
    if (!mediaUrl) return;
    
    const link = document.createElement('a');
    link.href = mediaUrl;
    link.download = `generated-${activeTab}-${Date.now()}.${activeTab === 'image' ? 'png' : 'mp4'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {activeTab === 'image' ? <Image className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          AI Media Generator
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'image' | 'video')}>
          <TabsList className="mb-4">
            <TabsTrigger value="image" className="flex items-center gap-1">
              <Image className="h-4 w-4" /> Image
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-1">
              <Video className="h-4 w-4" /> Video
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="image">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Default (Flux Schnell)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Default (Flux Schnell)</SelectItem>
                    <SelectItem value="stabilityai/stable-diffusion-xl-base-1.0">Stable Diffusion XL</SelectItem>
                    <SelectItem value="runwayml/stable-diffusion-v1-5">Stable Diffusion v1.5</SelectItem>
                    <SelectItem value="prompthero/openjourney-v4">Openjourney v4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Prompt</label>
                <Textarea 
                  placeholder="Describe the image you want to generate..." 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="video">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Default (Zeroscope v2)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Default (Zeroscope v2)</SelectItem>
                    <SelectItem value="damo-vilab/text-to-video-ms-1.7b">Damo Text-to-Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Prompt</label>
                <Textarea 
                  placeholder="Describe the video you want to generate..." 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Note: Video generation may take longer and has a higher chance of failing due to model timeouts.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        {error && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
            {error}
          </div>
        )}
        
        {mediaUrl && (
          <div className="mt-4 flex flex-col items-center">
            <div className="w-full max-h-[400px] overflow-hidden rounded-md border bg-muted">
              {activeTab === 'image' ? (
                <img 
                  src={mediaUrl} 
                  alt="Generated image" 
                  className="w-full h-auto object-contain" 
                />
              ) : (
                <video 
                  src={mediaUrl} 
                  controls
                  className="w-full h-auto" 
                  autoPlay
                  loop
                />
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2 justify-end border-t pt-4">
        {mediaUrl && (
          <>
            <Button variant="outline" onClick={resetMedia}>
              <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
            </Button>
            <Button variant="secondary" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </>
        )}
        
        <Button onClick={handleGenerate} disabled={loading || !prompt.trim()}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" /> Generate {activeTab === 'image' ? 'Image' : 'Video'}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MediaGenerator;
