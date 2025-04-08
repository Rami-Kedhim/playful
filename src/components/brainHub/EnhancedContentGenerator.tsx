
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";

import {
  ImageIcon,
  PersonStanding,
  FileText,
  Wand2,
  MessageSquare,
  VolumeIcon,
  CheckCircle,
  ArrowRight,
  Clock,
} from 'lucide-react';

interface GenerationTemplate {
  id: string;
  name: string;
  type: 'profile' | 'message' | 'voice' | 'description';
  template: string;
  parameters: {
    [key: string]: string;
  };
  lastUsed?: Date;
}

interface GeneratedContent {
  id: string;
  type: 'profile' | 'message' | 'voice' | 'description' | 'image';
  content: string;
  timestamp: Date;
  parameters: {
    [key: string]: string | number | boolean;
  };
  status: 'pending' | 'completed' | 'failed';
  imageUrl?: string;
  audioUrl?: string;
}

interface ProfilePreset {
  id: string;
  name: string;
  personality: string;
  interests: string[];
  style: string;
  demographics: {
    ageRange: [number, number];
    region: string;
    language: string;
  };
}

const EnhancedContentGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profiles");
  const [templates, setTemplates] = useState<GenerationTemplate[]>([]);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [profilePresets, setProfilePresets] = useState<ProfilePreset[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [customParameters, setCustomParameters] = useState<{[key: string]: string}>({});
  const [generatingContent, setGeneratingContent] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [tempContent, setTempContent] = useState<string>("");
  const [creativityLevel, setCreativityLevel] = useState<number>(60);
  const [useNsfw, setUseNsfw] = useState<boolean>(false);
  const [generationMode, setGenerationMode] = useState<'single' | 'batch'>('single');
  const [batchSize, setBatchSize] = useState<number>(5);
  const [selectedContent, setSelectedContent] = useState<GeneratedContent | null>(null);
  const [imagePrompt, setImagePrompt] = useState<string>("");

  // Load initial data
  useEffect(() => {
    // In a real app, these would be loaded from an API
    const mockTemplates: GenerationTemplate[] = [
      {
        id: 'tmpl-1',
        name: 'Flirty Female Profile',
        type: 'profile',
        template: 'Create a flirty personality for a female AI companion named {{name}} who is {{age}} years old and is interested in {{interests}}.',
        parameters: {
          name: '',
          age: '25',
          interests: 'fashion, travel, photography'
        },
        lastUsed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'tmpl-2',
        name: 'Professional Male Profile',
        type: 'profile',
        template: 'Create a professional personality for a male AI companion named {{name}} who is {{age}} years old and works as a {{profession}}.',
        parameters: {
          name: '',
          age: '32',
          profession: 'business consultant'
        },
        lastUsed: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'tmpl-3',
        name: 'Flirty Response',
        type: 'message',
        template: 'Generate a flirty response to the message: "{{userMessage}}" as if you are {{characterType}}.',
        parameters: {
          userMessage: '',
          characterType: 'playful and confident'
        },
        lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'tmpl-4',
        name: 'Voice Message Script',
        type: 'voice',
        template: 'Create a script for a voice message that sounds {{tone}} and talks about {{topic}}. The message should be {{length}} sentences long.',
        parameters: {
          tone: 'intimate',
          topic: 'missing the user',
          length: '3-5'
        }
      },
      {
        id: 'tmpl-5',
        name: 'Profile Description',
        type: 'description',
        template: 'Write a captivating profile description for a {{gender}} who is {{age}} years old and is passionate about {{passions}}. The tone should be {{tone}}.',
        parameters: {
          gender: 'female',
          age: '27',
          passions: 'art, music, and nature',
          tone: 'mysterious yet inviting'
        }
      }
    ];
    
    setTemplates(mockTemplates);
    
    // Set up profile presets
    const mockPresets: ProfilePreset[] = [
      {
        id: 'preset-1',
        name: 'Flirty Young Professional',
        personality: 'flirty, confident, intelligent',
        interests: ['fitness', 'travel', 'fine dining', 'art'],
        style: 'sophisticated casual',
        demographics: {
          ageRange: [25, 32],
          region: 'North America',
          language: 'English'
        }
      },
      {
        id: 'preset-2',
        name: 'Playful Creative',
        personality: 'playful, artistic, expressive',
        interests: ['photography', 'music', 'travel', 'culinary arts'],
        style: 'bohemian modern',
        demographics: {
          ageRange: [22, 30],
          region: 'Europe',
          language: 'English'
        }
      },
      {
        id: 'preset-3',
        name: 'Confident Businessperson',
        personality: 'confident, ambitious, witty',
        interests: ['business', 'luxury', 'fitness', 'travel'],
        style: 'business casual',
        demographics: {
          ageRange: [28, 40],
          region: 'Global',
          language: 'English'
        }
      },
    ];
    
    setProfilePresets(mockPresets);
    
    // Sample generated content
    const mockGeneratedContent: GeneratedContent[] = [
      {
        id: 'gen-1',
        type: 'profile',
        content: 'Sofia is a 26-year-old photographer with a passion for capturing life\'s most intimate moments. Her flirtatious nature is balanced by her artistic depth, making conversations with her both stimulating and playful. She loves to travel and shares stories of her adventures across Europe. When she\'s not behind the camera, she enjoys sipping wine at hidden cafes and discussing art and philosophy.',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        parameters: {
          name: 'Sofia',
          age: 26,
          interests: 'photography, travel, art',
          personality: 'flirty'
        },
        status: 'completed',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80'
      },
      {
        id: 'gen-2',
        type: 'message',
        content: 'I've been thinking about our last conversation all day. You have this way of making me smile even when you're not around. What are you up to tonight? I might have some free time for someone interesting like you... 😉',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        parameters: {
          userMessage: 'Hey, how was your day?',
          characterType: 'flirty and playful'
        },
        status: 'completed'
      },
    ];
    
    setGeneratedContent(mockGeneratedContent);
  }, []);

  // Reset parameters when template changes
  useEffect(() => {
    if (selectedTemplate) {
      const template = templates.find(t => t.id === selectedTemplate);
      if (template) {
        setCustomParameters({...template.parameters});
      }
    }
  }, [selectedTemplate, templates]);
  
  // Reset parameters when preset changes
  useEffect(() => {
    if (selectedPreset && activeTab === "profiles") {
      const preset = profilePresets.find(p => p.id === selectedPreset);
      if (preset) {
        setCustomParameters({
          name: '',
          age: String(Math.floor(Math.random() * 
            (preset.demographics.ageRange[1] - preset.demographics.ageRange[0] + 1)) + 
            preset.demographics.ageRange[0]),
          interests: preset.interests.join(', '),
          personality: preset.personality,
          region: preset.demographics.region
        });
      }
    }
  }, [selectedPreset, activeTab, profilePresets]);

  // Generate content
  const handleGenerateContent = async () => {
    if (!selectedTemplate && activeTab !== 'images') {
      toast({
        title: "No Template Selected",
        description: "Please select a template before generating content",
        variant: "destructive",
      });
      return;
    }
    
    if (activeTab === 'images' && !imagePrompt) {
      toast({
        title: "No Image Prompt",
        description: "Please enter an image prompt before generating",
        variant: "destructive",
      });
      return;
    }
    
    setGeneratingContent(true);
    setGenerationProgress(0);
    
    // Progress simulation
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      if (generationMode === 'batch') {
        // Generate batch content
        const batchContent: GeneratedContent[] = [];
        
        for (let i = 0; i < batchSize; i++) {
          if (activeTab === 'profiles') {
            // Generate profile with random variations
            const firstName = ['Sophia', 'Emma', 'Olivia', 'Ava', 'Isabella', 'Mia', 'Charlotte', 'Amelia', 'Harper', 'Evelyn', 'James', 'Noah', 'William', 'Oliver', 'Benjamin', 'Elijah', 'Lucas', 'Liam'];
            const lastName = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor'];
            const interests = ['photography', 'travel', 'fitness', 'cooking', 'music', 'art', 'fashion', 'technology', 'reading', 'writing', 'hiking', 'yoga', 'dancing'];
            
            const randomName = firstName[Math.floor(Math.random() * firstName.length)] + ' ' + lastName[Math.floor(Math.random() * lastName.length)];
            const randomAge = Math.floor(Math.random() * (35 - 22)) + 22;
            const randomInterests = Array.from({length: Math.floor(Math.random() * 3) + 2}, () => interests[Math.floor(Math.random() * interests.length)]);
            
            batchContent.push({
              id: `gen-batch-${Date.now()}-${i}`,
              type: 'profile',
              content: `${randomName} is a ${randomAge}-year-old with interests in ${randomInterests.join(', ')}. With a ${Math.random() > 0.5 ? 'playful' : 'mysterious'} personality and an eye for detail, ${randomName.split(' ')[0]} loves engaging in deep conversations about life, sharing stories, and connecting on a personal level.`,
              timestamp: new Date(),
              parameters: {
                name: randomName,
                age: randomAge,
                interests: randomInterests.join(', ')
              },
              status: 'completed'
            });
          }
        }
        
        setGeneratedContent(prev => [...batchContent, ...prev]);
        
        toast({
          title: `Batch Generation Complete`,
          description: `Successfully generated ${batchSize} new profiles`,
          variant: "success",
        });
      } else {
        // Generate single content
        let newContent: GeneratedContent;
        
        if (activeTab === 'images') {
          // Generate image content
          newContent = {
            id: `gen-${Date.now()}`,
            type: 'image',
            content: `Image generated with prompt: ${imagePrompt}`,
            timestamp: new Date(),
            parameters: {
              prompt: imagePrompt,
              creativity: creativityLevel,
              nsfw: useNsfw
            },
            status: 'completed',
            imageUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=400`
          };
          
          setImagePrompt('');
        } else {
          // Get selected template
          const template = templates.find(t => t.id === selectedTemplate);
          
          if (!template) {
            throw new Error("Template not found");
          }
          
          // Generate content based on template type
          let generatedText = "";
          
          switch (template.type) {
            case 'profile':
              generatedText = `${customParameters.name || 'Anonymous'} is a ${customParameters.age || '25'}-year-old with a passion for ${customParameters.interests || 'various activities'}. With a ${customParameters.personality || 'friendly'} demeanor, they enjoy engaging in meaningful conversations and sharing experiences with others.`;
              break;
            case 'message':
              generatedText = `Hey there! I was just thinking about you. How's your day going? I'd love to hear more about what you're up to lately.`;
              break;
            case 'voice':
              generatedText = `I've been missing you so much lately. Every time I close my eyes, I think about our conversations. I can't wait until we can talk again soon.`;
              break;
            case 'description':
              generatedText = `A captivating ${customParameters.gender || 'person'} with a passion for life and a magnetic personality. At ${customParameters.age || '27'} years old, they have developed a deep appreciation for ${customParameters.passions || 'art and culture'}.`;
              break;
            default:
              generatedText = "Content could not be generated.";
          }
          
          newContent = {
            id: `gen-${Date.now()}`,
            type: template.type,
            content: generatedText,
            timestamp: new Date(),
            parameters: {...customParameters},
            status: 'completed'
          };
          
          // Add audio URL for voice messages
          if (template.type === 'voice') {
            newContent.audioUrl = 'https://example.com/sample-audio.mp3';
          }
        }
        
        setGeneratedContent(prev => [newContent, ...prev]);
        
        // Update last used timestamp for the template
        if (selectedTemplate) {
          setTemplates(templates.map(t => 
            t.id === selectedTemplate 
              ? { ...t, lastUsed: new Date() } 
              : t
          ));
        }
        
        toast({
          title: "Content Generated",
          description: `Successfully generated new ${activeTab === 'images' ? 'image' : newContent.type} content`,
          variant: "success",
        });
      }
    } catch (error) {
      console.error('Error generating content:', error);
      
      toast({
        title: "Generation Failed",
        description: "There was an error generating content.",
        variant: "destructive",
      });
    } finally {
      clearInterval(interval);
      setGeneratingContent(false);
      setGenerationProgress(100);
      
      // Reset progress after a delay
      setTimeout(() => {
        setGenerationProgress(0);
      }, 1000);
    }
  };
  
  // View content details
  const handleViewContent = (content: GeneratedContent) => {
    setSelectedContent(content);
  };
  
  // Close content details
  const handleCloseContentView = () => {
    setSelectedContent(null);
  };

  // Format timestamp
  const formatTimestamp = (date: Date): string => {
    return new Date(date).toLocaleString();
  };
  
  // Get template options based on active tab
  const getTemplateOptions = () => {
    switch (activeTab) {
      case 'profiles':
        return templates.filter(t => t.type === 'profile');
      case 'messages':
        return templates.filter(t => t.type === 'message');
      case 'voice':
        return templates.filter(t => t.type === 'voice');
      case 'descriptions':
        return templates.filter(t => t.type === 'description');
      default:
        return templates;
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Advanced Content Generation</CardTitle>
            <CardDescription>
              AI-powered content generation for profiles and messages
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={generationMode} onValueChange={(value) => setGenerationMode(value as 'single' | 'batch')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Generation Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Generation</SelectItem>
                <SelectItem value="batch">Batch Generation</SelectItem>
              </SelectContent>
            </Select>
            
            {generationMode === 'batch' && (
              <Select value={String(batchSize)} onValueChange={(value) => setBatchSize(Number(value))}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Batch Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 items</SelectItem>
                  <SelectItem value="10">10 items</SelectItem>
                  <SelectItem value="20">20 items</SelectItem>
                  <SelectItem value="50">50 items</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="profiles">
              <PersonStanding className="h-4 w-4 mr-2" />
              Profiles
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="voice">
              <VolumeIcon className="h-4 w-4 mr-2" />
              Voice Scripts
            </TabsTrigger>
            <TabsTrigger value="descriptions">
              <FileText className="h-4 w-4 mr-2" />
              Descriptions
            </TabsTrigger>
            <TabsTrigger value="images">
              <ImageIcon className="h-4 w-4 mr-2" />
              Images
            </TabsTrigger>
          </TabsList>

          {activeTab !== 'images' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Content Generator</h3>
                    
                    {activeTab === 'profiles' && (
                      <div className="mb-4">
                        <Label htmlFor="preset">Profile Preset (Optional)</Label>
                        <Select value={selectedPreset || ''} onValueChange={setSelectedPreset}>
                          <SelectTrigger id="preset">
                            <SelectValue placeholder="Select a preset" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">No Preset</SelectItem>
                            {profilePresets.map(preset => (
                              <SelectItem key={preset.id} value={preset.id}>
                                {preset.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <Label htmlFor="template">Template</Label>
                      <Select value={selectedTemplate || ''} onValueChange={setSelectedTemplate}>
                        <SelectTrigger id="template">
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                        <SelectContent>
                          {getTemplateOptions().map(template => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedTemplate && (
                      <div className="space-y-3">
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm text-muted-foreground">Template:</p>
                          <p className="text-sm">
                            {templates.find(t => t.id === selectedTemplate)?.template}
                          </p>
                        </div>
                        
                        {Object.entries(customParameters).map(([key, value]) => (
                          <div key={key}>
                            <Label htmlFor={key} className="capitalize">{key}</Label>
                            {key === 'interests' || key === 'passions' || key === 'topic' ? (
                              <Textarea
                                id={key}
                                value={value}
                                onChange={(e) => setCustomParameters({...customParameters, [key]: e.target.value})}
                                placeholder={`Enter ${key}`}
                                className="mt-1"
                              />
                            ) : (
                              <Input
                                id={key}
                                value={value}
                                onChange={(e) => setCustomParameters({...customParameters, [key]: e.target.value})}
                                placeholder={`Enter ${key}`}
                                className="mt-1"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="space-y-4 mt-6">
                      <div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="creativity">Creativity Level: {creativityLevel}%</Label>
                        </div>
                        <Slider
                          id="creativity"
                          min={0}
                          max={100}
                          step={5}
                          value={[creativityLevel]}
                          onValueChange={(value) => setCreativityLevel(value[0])}
                          className="mt-2"
                        />
                        <span className="text-xs text-muted-foreground">
                          {creativityLevel < 30 ? 'Conservative - More predictable, factual responses' : 
                           creativityLevel < 70 ? 'Balanced - Blend of creativity and predictability' :
                           'Experimental - More unique, unexpected content'}
                        </span>
                      </div>
                      
                      {(activeTab === 'profiles' || activeTab === 'messages' || activeTab === 'descriptions') && (
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="nsfw"
                            checked={useNsfw}
                            onCheckedChange={setUseNsfw}
                          />
                          <Label htmlFor="nsfw">Allow NSFW Content</Label>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Button
                      className="w-full"
                      size="lg"
                      disabled={generatingContent || (!selectedTemplate && activeTab !== 'images')}
                      onClick={handleGenerateContent}
                    >
                      {generatingContent ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-4 w-4" />
                          {generationMode === 'batch' ? `Generate ${batchSize} Items` : 'Generate Content'}
                        </>
                      )}
                    </Button>
                    
                    {generationProgress > 0 && (
                      <Progress value={generationProgress} className="mt-2" />
                    )}
                  </div>
                </Card>
                
                <Card className="p-4">
                  <h3 className="text-lg font-medium mb-4">Preview</h3>
                  {tempContent ? (
                    <div className="bg-muted rounded-md p-4 h-[400px] overflow-y-auto">
                      <p className="whitespace-pre-wrap">{tempContent}</p>
                    </div>
                  ) : (
                    <div className="bg-muted rounded-md p-4 flex items-center justify-center h-[400px]">
                      <p className="text-muted-foreground text-center">
                        Generate content to see a preview here
                      </p>
                    </div>
                  )}
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Generated {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedContent.filter(content => content.type === activeTab.slice(0, -1)).length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No generated content of this type yet.</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {generatedContent
                        .filter(content => content.type === activeTab.slice(0, -1))
                        .slice(0, 5)
                        .map(content => (
                          <div key={content.id} className="py-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {content.status === 'completed' ? (
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                ) : content.status === 'pending' ? (
                                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                                )}
                                <span className="font-medium">
                                  {content.parameters.name || `Generated ${content.type}`}
                                </span>
                                <span className="text-xs text-muted-foreground ml-2">
                                  {formatTimestamp(content.timestamp)}
                                </span>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => handleViewContent(content)}>
                                View
                              </Button>
                            </div>
                            <p className="mt-2 text-sm line-clamp-2">{content.content}</p>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline">View All Generated Content</Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            // Image Generation Tab
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Image Generator</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="imagePrompt">Image Prompt</Label>
                        <Textarea
                          id="imagePrompt"
                          value={imagePrompt}
                          onChange={(e) => setImagePrompt(e.target.value)}
                          placeholder="Describe the image you want to generate (e.g., 'A beautiful woman with long brown hair in a professional setting')"
                          className="mt-1 h-32"
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="imageCreativity">Creativity Level: {creativityLevel}%</Label>
                        </div>
                        <Slider
                          id="imageCreativity"
                          min={0}
                          max={100}
                          step={5}
                          value={[creativityLevel]}
                          onValueChange={(value) => setCreativityLevel(value[0])}
                          className="mt-2"
                        />
                        <span className="text-xs text-muted-foreground">
                          {creativityLevel < 30 ? 'Photo-realistic style' : 
                           creativityLevel < 70 ? 'Balanced style' :
                           'Artistic and creative style'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="imageNsfw"
                          checked={useNsfw}
                          onCheckedChange={setUseNsfw}
                        />
                        <Label htmlFor="imageNsfw">Allow NSFW Content</Label>
                      </div>
                      
                      <div className="mt-4">
                        <Label>Image Size</Label>
                        <Select defaultValue="512x512">
                          <SelectTrigger>
                            <SelectValue placeholder="Select image size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="256x256">256x256 (Small)</SelectItem>
                            <SelectItem value="512x512">512x512 (Medium)</SelectItem>
                            <SelectItem value="1024x1024">1024x1024 (Large)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Image Style</Label>
                        <Select defaultValue="realistic">
                          <SelectTrigger>
                            <SelectValue placeholder="Select image style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realistic">Realistic</SelectItem>
                            <SelectItem value="anime">Anime</SelectItem>
                            <SelectItem value="digital-art">Digital Art</SelectItem>
                            <SelectItem value="photography">Photography</SelectItem>
                            <SelectItem value="portrait">Portrait</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button
                      className="w-full"
                      size="lg"
                      disabled={generatingContent || !imagePrompt.trim()}
                      onClick={handleGenerateContent}
                    >
                      {generatingContent ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="mr-2 h-4 w-4" />
                          {generationMode === 'batch' ? `Generate ${batchSize} Images` : 'Generate Image'}
                        </>
                      )}
                    </Button>
                    
                    {generationProgress > 0 && (
                      <Progress value={generationProgress} className="mt-2" />
                    )}
                  </div>
                </Card>
                
                <Card className="p-4">
                  <h3 className="text-lg font-medium mb-4">Preview</h3>
                  <div className="bg-muted rounded-md flex items-center justify-center h-[400px]">
                    {generatedContent.filter(content => content.type === 'image').length > 0 ? (
                      <img 
                        src={generatedContent.filter(content => content.type === 'image')[0].imageUrl} 
                        alt="Generated" 
                        className="max-w-full max-h-full rounded-md"
                      />
                    ) : (
                      <p className="text-muted-foreground text-center">
                        Generate an image to see a preview here
                      </p>
                    )}
                  </div>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Generated Images</CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedContent.filter(content => content.type === 'image').length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No generated images yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {generatedContent
                        .filter(content => content.type === 'image')
                        .slice(0, 8)
                        .map(content => (
                          <div key={content.id} className="relative group cursor-pointer" onClick={() => handleViewContent(content)}>
                            <img 
                              src={content.imageUrl} 
                              alt="Generated" 
                              className="w-full h-48 object-cover rounded-md"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                              <Button variant="outline" className="text-white border-white">View</Button>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline">View All Generated Images</Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </Tabs>
      </CardContent>
      
      {/* Content View Modal */}
      {selectedContent && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {selectedContent.parameters.name 
                    ? `${selectedContent.parameters.name}'s ${selectedContent.type}` 
                    : `Generated ${selectedContent.type.charAt(0).toUpperCase() + selectedContent.type.slice(1)}`}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={handleCloseContentView}>
                  &times;
                </Button>
              </div>
              <CardDescription>
                Generated on {formatTimestamp(selectedContent.timestamp)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedContent.type === 'image' ? (
                <div className="flex justify-center">
                  <img 
                    src={selectedContent.imageUrl} 
                    alt="Generated" 
                    className="max-w-full max-h-[400px] rounded-md"
                  />
                </div>
              ) : (
                <div className="bg-muted p-4 rounded-md">
                  <p className="whitespace-pre-wrap">{selectedContent.content}</p>
                </div>
              )}
              
              {selectedContent.audioUrl && (
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Audio Preview</h4>
                  <audio controls className="w-full">
                    <source src={selectedContent.audioUrl} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
              
              <div>
                <h4 className="font-medium mb-2">Parameters Used</h4>
                <div className="bg-muted p-4 rounded-md">
                  <dl className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedContent.parameters).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <dt className="text-sm font-medium capitalize">{key}</dt>
                        <dd className="text-sm text-muted-foreground">
                          {typeof value === 'boolean' 
                            ? value ? 'Yes' : 'No'
                            : String(value)
                          }
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleCloseContentView}>
                Close
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Use Content
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </Card>
  );
};

export default EnhancedContentGenerator;
