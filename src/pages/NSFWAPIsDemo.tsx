
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useNSFWAPIs } from '@/hooks/apis/useNSFWAPIs';
import { Loader2, Image, Video, MessageSquare, Shield } from 'lucide-react';

const NSFWAPIsDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('image-generation');
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { loading, generateImage, getAPIOptions, availableCategories } = useNSFWAPIs();

  const handleGenerateImage = async () => {
    if (!prompt) return;
    
    const imageUrl = await generateImage({
      prompt,
      model: 'stablediffusionapi/realistic-vision-v5',
    });
    
    if (imageUrl) {
      setGeneratedImage(imageUrl);
    }
  };

  return (
    <div className="container py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">NSFW-Friendly APIs Integration</h1>
      <p className="text-muted-foreground mb-8">
        Explore and test various NSFW-friendly APIs with generous free tiers that can be integrated into the UberEscorts ecosystem.
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="image-generation" className="flex items-center gap-2">
            <Image className="h-4 w-4" /> Image Generation
          </TabsTrigger>
          <TabsTrigger value="video-generation" className="flex items-center gap-2">
            <Video className="h-4 w-4" /> Video Generation
          </TabsTrigger>
          <TabsTrigger value="text-generation" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Text Generation
          </TabsTrigger>
          <TabsTrigger value="moderation" className="flex items-center gap-2">
            <Shield className="h-4 w-4" /> Content Moderation
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="image-generation">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Image Generation</CardTitle>
                <CardDescription>
                  Generate images using Stable Diffusion models via Hugging Face
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleGenerateImage();
                }}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="prompt">Prompt</Label>
                      <Textarea 
                        id="prompt" 
                        placeholder="Describe the image you want to generate..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <Button type="submit" disabled={loading || !prompt}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>Generate Image</>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Generated Result</CardTitle>
                <CardDescription>
                  Your generated image will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center h-80 bg-muted rounded-md">
                    <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                  </div>
                ) : generatedImage ? (
                  <div className="flex items-center justify-center">
                    <img 
                      src={generatedImage} 
                      alt="Generated" 
                      className="max-h-80 rounded-md object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-80 bg-muted rounded-md">
                    <p className="text-muted-foreground">No image generated yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Available Image Generation APIs</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {getAPIOptions('imageGeneration').map((api, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-base">{api.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2"><span className="font-medium">Free Tier:</span> {api.freeTier}</p>
                    <p className="text-sm mb-2"><span className="font-medium">Paid Plans:</span> {api.paidTier}</p>
                    <p className="text-sm text-muted-foreground">{api.notes}</p>
                    <Button variant="link" className="p-0 h-auto mt-2" asChild>
                      <a href={api.url} target="_blank" rel="noopener noreferrer">Visit Website</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="video-generation">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Generation APIs</CardTitle>
                <CardDescription>
                  Available NSFW-friendly video generation services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {getAPIOptions('videoGeneration').map((api, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-base">{api.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-2"><span className="font-medium">Free Tier:</span> {api.freeTier}</p>
                        <p className="text-sm mb-2"><span className="font-medium">Paid Plans:</span> {api.paidTier}</p>
                        <p className="text-sm text-muted-foreground">{api.notes}</p>
                        <Button variant="link" className="p-0 h-auto mt-2" asChild>
                          <a href={api.url} target="_blank" rel="noopener noreferrer">Visit Website</a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="text-generation">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Text Generation APIs</CardTitle>
                <CardDescription>
                  Available NSFW-friendly text generation services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {getAPIOptions('textGeneration').map((api, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-base">{api.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-2"><span className="font-medium">Free Tier:</span> {api.freeTier}</p>
                        <p className="text-sm mb-2"><span className="font-medium">Paid Plans:</span> {api.paidTier}</p>
                        <p className="text-sm text-muted-foreground">{api.notes}</p>
                        <Button variant="link" className="p-0 h-auto mt-2" asChild>
                          <a href={api.url} target="_blank" rel="noopener noreferrer">Visit Website</a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="moderation">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Moderation APIs</CardTitle>
                <CardDescription>
                  Services for content moderation in adult content contexts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {getAPIOptions('contentModeration').map((api, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-base">{api.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-2"><span className="font-medium">Free Tier:</span> {api.freeTier}</p>
                        <p className="text-sm mb-2"><span className="font-medium">Paid Plans:</span> {api.paidTier}</p>
                        <p className="text-sm text-muted-foreground">{api.notes}</p>
                        <Button variant="link" className="p-0 h-auto mt-2" asChild>
                          <a href={api.url} target="_blank" rel="noopener noreferrer">Visit Website</a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Age Verification Services</CardTitle>
                <CardDescription>
                  Reliable age verification solutions for adult content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {getAPIOptions('ageVerification').map((api, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-base">{api.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-2"><span className="font-medium">Free Tier:</span> {api.freeTier}</p>
                        <p className="text-sm mb-2"><span className="font-medium">Paid Plans:</span> {api.paidTier}</p>
                        <p className="text-sm text-muted-foreground">{api.notes}</p>
                        <Button variant="link" className="p-0 h-auto mt-2" asChild>
                          <a href={api.url} target="_blank" rel="noopener noreferrer">Visit Website</a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NSFWAPIsDemo;
