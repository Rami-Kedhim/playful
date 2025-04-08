
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import Alert from '@/components/common/Alert';
import {
  PenTool,
  Image,
  MessageSquare,
  Video,
  BarChart2,
  Check,
  Loader2,
  Copy,
  Settings,
  Sparkles,
  Sliders,
  FileText,
  RefreshCcw
} from 'lucide-react';

const ContentGenerationPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("text");
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  
  const [settings, setSettings] = useState({
    model: "gpt-4o",
    temperature: 0.7,
    maxTokens: 1000,
    tonePreset: "professional",
    generateVariants: false,
    autoFormat: true,
    stylePreset: "balanced",
    imageSize: "1024x1024",
    imageStyle: "vivid",
    imageQuality: "standard"
  });
  
  const [contentHistory, setContentHistory] = useState<{
    id: string;
    type: string;
    prompt: string;
    content?: string;
    imageUrl?: string;
    timestamp: Date;
  }[]>([]);
  
  const handleSettingsChange = (setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  const generateTextContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty Prompt",
        description: "Please provide a prompt for content generation",
        variant: "destructive",
      });
      return;
    }
    
    setGenerating(true);
    setGeneratedContent(null);
    
    try {
      // In a real implementation, this would call an API or brainHub
      // brainHub.generateContent(prompt, settings)
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Mock response based on the prompt
      const mockResponses = {
        article: "# The Future of AI Technology\n\nArtificial intelligence has rapidly evolved over the past decade, transforming industries and changing how we interact with technology. This article explores the current landscape and future possibilities of AI.\n\n## Current Applications\n\nToday, AI powers everything from recommendation systems to autonomous vehicles. Machine learning models analyze vast amounts of data to identify patterns and make predictions with unprecedented accuracy.\n\n## Ethical Considerations\n\nAs AI becomes more powerful, important ethical questions arise. Issues of privacy, bias, and accountability require careful consideration as we integrate AI systems into critical infrastructure.\n\n## Future Directions\n\nThe next frontier of AI development includes more sophisticated language models, enhanced computer vision, and systems with greater reasoning capabilities. These advancements will likely transform healthcare, education, and many other sectors.",
        
        marketing: "# Revolutionary New Product Launch\n\nIntroducing our game-changing solution that transforms how businesses operate in the digital age. Our innovative platform combines cutting-edge technology with intuitive design to deliver unprecedented results.\n\n## Key Benefits\n\n- Increase productivity by up to 35%\n- Reduce operational costs significantly\n- Gain valuable insights through advanced analytics\n- Scale effortlessly as your business grows\n\n## Limited Time Offer\n\nEarly adopters receive exclusive access to premium features and personalized onboarding. Contact our sales team today to schedule your demo and see the difference for yourself.",
        
        creative: "# The Forgotten Gate\n\nThe old iron gate stood at the edge of the forest, its hinges rusted with time and neglect. Village elders whispered that it had appeared overnight during a storm many generations ago, though no one could remember exactly when.\n\nSome claimed the gate led nowhere—that it was merely an ornament from a forgotten time. Others insisted it opened to different places depending on the phase of the moon, the time of day, or the intentions of those who approached it.\n\nWhat everyone agreed upon was that no one had successfully opened it in living memory. The intricate lock mechanism had no keyhole, only strange symbols that seemed to shift when viewed from different angles.\n\nUntil today, when a child with curious eyes and nimble fingers traced the pattern that had been hiding in plain sight all along..."
      };
      
      let generatedText;
      if (prompt.toLowerCase().includes('article')) {
        generatedText = mockResponses.article;
      } else if (prompt.toLowerCase().includes('marketing')) {
        generatedText = mockResponses.marketing;
      } else {
        generatedText = mockResponses.creative;
      }
      
      setGeneratedContent(generatedText);
      
      const newHistoryEntry = {
        id: Math.random().toString(36).substring(2, 9),
        type: "text",
        prompt,
        content: generatedText,
        timestamp: new Date()
      };
      
      setContentHistory(prev => [newHistoryEntry, ...prev]);
      
      toast({
        title: "Content Generated",
        description: "Your text content has been generated successfully",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your content",
        variant: "destructive",
      });
      console.error("Error generating content:", error);
    } finally {
      setGenerating(false);
    }
  };
  
  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty Prompt",
        description: "Please provide a prompt for image generation",
        variant: "destructive",
      });
      return;
    }
    
    setGenerating(true);
    setGeneratedImageUrl(null);
    
    try {
      // In a real implementation, this would call an API or brainHub
      // brainHub.generateImage(prompt, settings)
      await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate API call
      
      // Use a placeholder image
      const placeholderUrl = `https://picsum.photos/seed/${encodeURIComponent(prompt)}/800/800`;
      setGeneratedImageUrl(placeholderUrl);
      
      const newHistoryEntry = {
        id: Math.random().toString(36).substring(2, 9),
        type: "image",
        prompt,
        imageUrl: placeholderUrl,
        timestamp: new Date()
      };
      
      setContentHistory(prev => [newHistoryEntry, ...prev]);
      
      toast({
        title: "Image Generated",
        description: "Your image has been generated successfully",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your image",
        variant: "destructive",
      });
      console.error("Error generating image:", error);
    } finally {
      setGenerating(false);
    }
  };
  
  const handleGenerate = () => {
    if (activeTab === "text") {
      generateTextContent();
    } else if (activeTab === "image") {
      generateImage();
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "Content has been copied to clipboard",
      variant: "success",
    });
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="text">
            <PenTool className="h-4 w-4 mr-2" />
            Text Generation
          </TabsTrigger>
          <TabsTrigger value="image">
            <Image className="h-4 w-4 mr-2" />
            Image Generation
          </TabsTrigger>
          <TabsTrigger value="history">
            <FileText className="h-4 w-4 mr-2" />
            Generation History
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Generation Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="text" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Text Content Generator</CardTitle>
              <CardDescription>
                Generate articles, marketing copy, creative content, and more using AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Your Prompt</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe the content you want to generate..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px] resize-y"
                  />
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <Label>Content Type</Label>
                    <Select 
                      defaultValue="article" 
                      onValueChange={(value) => {
                        switch(value) {
                          case "article":
                            setPrompt("Write an informative article about artificial intelligence technology trends");
                            break;
                          case "marketing":
                            setPrompt("Create compelling marketing copy for a new productivity software");
                            break;
                          case "creative":
                            setPrompt("Write a short creative story about a mysterious gate in a forest");
                            break;
                          case "social":
                            setPrompt("Generate social media post ideas for a fitness brand");
                            break;
                          case "email":
                            setPrompt("Compose a professional email announcing a company merger");
                            break;
                        }
                      }}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="article">Article</SelectItem>
                        <SelectItem value="marketing">Marketing Copy</SelectItem>
                        <SelectItem value="creative">Creative Writing</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Label>Tone</Label>
                    <Select 
                      value={settings.tonePreset}
                      onValueChange={(value) => handleSettingsChange('tonePreset', value)}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="persuasive">Persuasive</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Creativity Level</Label>
                      <span className="text-sm">{Math.round(settings.temperature * 100)}%</span>
                    </div>
                    <Slider
                      value={[settings.temperature * 100]}
                      min={0}
                      max={100}
                      step={10}
                      onValueChange={(values) => handleSettingsChange('temperature', values[0] / 100)}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Precise</span>
                      <span>Balanced</span>
                      <span>Creative</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setPrompt("")}>Clear</Button>
              <Button 
                onClick={handleGenerate} 
                disabled={generating || !prompt.trim()}
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Content
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          {generatedContent && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Generated Content</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => copyToClipboard(generatedContent)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="whitespace-pre-line bg-muted p-4 rounded-md overflow-auto max-h-[500px]" 
                       dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, '<br/>') }} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-xs text-muted-foreground">
                <div>Model: {settings.model}</div>
                <div>Temperature: {settings.temperature}</div>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="image" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Image Generator</CardTitle>
              <CardDescription>
                Create stunning images from text descriptions using advanced AI models
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="imagePrompt">Image Description</Label>
                <Textarea
                  id="imagePrompt"
                  placeholder="Describe the image you want to generate in detail..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] resize-y"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Image Size</Label>
                  <Select 
                    value={settings.imageSize} 
                    onValueChange={(value) => handleSettingsChange('imageSize', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1024x1024">Square (1024x1024)</SelectItem>
                      <SelectItem value="1024x1792">Portrait (1024x1792)</SelectItem>
                      <SelectItem value="1792x1024">Landscape (1792x1024)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Image Style</Label>
                  <Select 
                    value={settings.imageStyle} 
                    onValueChange={(value) => handleSettingsChange('imageStyle', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vivid">Vivid</SelectItem>
                      <SelectItem value="natural">Natural</SelectItem>
                      <SelectItem value="artistic">Artistic</SelectItem>
                      <SelectItem value="photographic">Photographic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="generateVariants" 
                  checked={settings.generateVariants}
                  onCheckedChange={(checked) => handleSettingsChange('generateVariants', Boolean(checked))}
                />
                <label
                  htmlFor="generateVariants"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Generate multiple variants
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setPrompt("")}>Clear</Button>
              <Button 
                onClick={handleGenerate} 
                disabled={generating || !prompt.trim()}
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Image className="mr-2 h-4 w-4" />
                    Generate Image
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          {generatedImageUrl && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Generated Image</CardTitle>
                <CardDescription>Based on your prompt</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <img 
                    src={generatedImageUrl} 
                    alt="AI Generated Content" 
                    className="rounded-md max-h-[500px] object-contain"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
                <Button>
                  Download Image
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Generation History</CardTitle>
              <CardDescription>
                Review and reuse your previously generated content
              </CardDescription>
            </CardHeader>
            <CardContent>
              {contentHistory.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No content has been generated yet</p>
                  <p className="text-sm">Generate some content to see it here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contentHistory.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {item.type === "text" ? (
                              <FileText className="h-4 w-4 mr-2" />
                            ) : (
                              <Image className="h-4 w-4 mr-2" />
                            )}
                            <CardTitle className="text-base">
                              {item.type === "text" ? "Text Content" : "Image Generation"}
                            </CardTitle>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.timestamp.toLocaleString()}
                          </div>
                        </div>
                        <CardDescription className="line-clamp-2 mt-1">
                          {item.prompt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        {item.type === "text" && item.content && (
                          <div className="text-sm line-clamp-3">{item.content}</div>
                        )}
                        {item.type === "image" && item.imageUrl && (
                          <img 
                            src={item.imageUrl} 
                            alt="Generated Content" 
                            className="h-32 w-full object-cover" 
                          />
                        )}
                      </CardContent>
                      <CardFooter className="pt-2 flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setPrompt(item.prompt);
                            setActiveTab(item.type);
                          }}
                        >
                          Reuse Prompt
                        </Button>
                        {item.type === "text" && item.content && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => copyToClipboard(item.content || "")}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Generation Settings</CardTitle>
              <CardDescription>
                Configure AI models and generation parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Text Generation</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>AI Model</Label>
                    <Select 
                      value={settings.model}
                      onValueChange={(value) => handleSettingsChange('model', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4o">GPT-4o (Most Powerful)</SelectItem>
                        <SelectItem value="gpt-4o-mini">GPT-4o Mini (Fast)</SelectItem>
                        <SelectItem value="claude-3">Claude 3 Sonnet</SelectItem>
                        <SelectItem value="llama-3">Llama 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Different models have different capabilities and response characteristics
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Temperature</Label>
                      <span className="text-sm">{settings.temperature.toFixed(1)}</span>
                    </div>
                    <Slider
                      value={[settings.temperature * 100]}
                      min={0}
                      max={100}
                      step={10}
                      onValueChange={(values) => handleSettingsChange('temperature', values[0] / 100)}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>More Deterministic</span>
                      <span>More Random</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Controls randomness: Lower values are more focused and deterministic, higher values are more creative
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Maximum Length</Label>
                      <span className="text-sm">{settings.maxTokens} tokens</span>
                    </div>
                    <Slider
                      value={[settings.maxTokens]}
                      min={100}
                      max={4000}
                      step={100}
                      onValueChange={(values) => handleSettingsChange('maxTokens', values[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum length of generated content in tokens (approximately 4 characters per token)
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="autoFormat" 
                      checked={settings.autoFormat}
                      onCheckedChange={(checked) => handleSettingsChange('autoFormat', Boolean(checked))}
                    />
                    <label
                      htmlFor="autoFormat"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Auto-format generated content (headings, lists, paragraphs)
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Image Generation</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Image Quality</Label>
                    <Select 
                      value={settings.imageQuality}
                      onValueChange={(value) => handleSettingsChange('imageQuality', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="hd">HD</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Higher quality images consume more resources
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Style Preset</Label>
                    <Select 
                      value={settings.stylePreset}
                      onValueChange={(value) => handleSettingsChange('stylePreset', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select style preset" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="photographic">Photographic</SelectItem>
                        <SelectItem value="digital-art">Digital Art</SelectItem>
                        <SelectItem value="anime">Anime</SelectItem>
                        <SelectItem value="cinematic">Cinematic</SelectItem>
                        <SelectItem value="3d-model">3D Model</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentGenerationPanel;
