
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
import useBrainHub from '@/hooks/useBrainHub';
import {
  Sparkles,
  FileText,
  Image,
  BarChart2,
  Zap,
  Cpu,
  Settings,
  RotateCw,
  ChevronRight,
  Check,
  Clock,
  Loader2
} from 'lucide-react';

interface GenerationTask {
  id: string;
  type: 'text' | 'image' | 'analysis';
  prompt: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  result?: string;
  imageUrl?: string;
  timestamp: Date;
  estimatedTime?: number;
  progress?: number;
}

const EnhancedContentGenerator: React.FC = () => {
  const { isConnected, syncWith } = useBrainHub('enhanced-content-generator');
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('article');
  const [generationTasks, setGenerationTasks] = useState<GenerationTask[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [settings, setSettings] = useState({
    model: "advanced-neural-9000",
    temperature: 0.7,
    enhancementLevel: 3,
    contextAwareness: true,
    autonomousImprovement: true,
    useBrainHubContext: true,
    maxTokens: 2000,
    qualityThreshold: 0.85
  });
  
  const contentTemplates = {
    article: "Write a comprehensive article about emerging technologies in artificial intelligence and their impact on modern business operations.",
    marketing: "Create professional marketing copy for a new premium AI assistant service targeting enterprise customers.",
    creative: "Generate a creative short story set in a future where humans and AI live in harmony.",
    technical: "Generate technical documentation for a RESTful API for a content management system.",
    email: "Write a professional email to potential investors explaining our startup's unique AI technology.",
    social: "Create engaging social media posts for promoting a tech conference focused on artificial intelligence."
  };
  
  useEffect(() => {
    // Simulate processing of queued tasks
    const interval = setInterval(() => {
      setGenerationTasks(prevTasks => {
        return prevTasks.map(task => {
          if (task.status === 'queued') {
            return { ...task, status: 'processing', progress: 0 };
          }
          if (task.status === 'processing') {
            const newProgress = (task.progress || 0) + Math.random() * 20;
            
            if (newProgress >= 100) {
              let result = '';
              
              switch (task.type) {
                case 'text':
                  result = generateMockContent(task.prompt);
                  return { ...task, status: 'completed', result, progress: 100 };
                case 'image':
                  const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(task.prompt)}/800/600`;
                  return { ...task, status: 'completed', imageUrl, progress: 100 };
                case 'analysis':
                  result = generateMockAnalysis(task.prompt);
                  return { ...task, status: 'completed', result, progress: 100 };
              }
            }
            
            return { ...task, progress: newProgress };
          }
          return task;
        });
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSettingsChange = (setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  const addGenerationTask = (type: 'text' | 'image' | 'analysis') => {
    if (!prompt.trim()) {
      toast({
        title: "Empty Prompt",
        description: "Please provide a prompt for content generation",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    const newTask: GenerationTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      type,
      prompt,
      status: 'queued',
      timestamp: new Date(),
      estimatedTime: Math.floor(Math.random() * 30) + 10,
    };
    
    setGenerationTasks(prev => [newTask, ...prev]);
    
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Generation Started`,
      description: "Your content has been queued for generation",
      variant: "default",
    });
    
    setTimeout(() => {
      setIsGenerating(false);
      setPrompt('');
    }, 1500);
  };
  
  const generateMockContent = (prompt: string): string => {
    const responses = [
      '# The Future of Artificial Intelligence\n\nIn recent years, artificial intelligence has transformed from a niche technology to a critical component of modern business operations. This article explores the key trends and applications that are shaping the future of AI across industries.\n\n## Emerging Trends in AI\n\n1. **Multimodal Learning** - AI systems that can process multiple types of data simultaneously\n2. **Self-supervised Learning** - Models that can learn with minimal human supervision\n3. **Edge AI** - Intelligence deployed directly on devices without cloud requirements\n\n## Business Applications\n\nOrganizations are leveraging these advancements to create new value and efficiencies. From predictive maintenance in manufacturing to personalized customer experiences in retail, AI is reshaping how businesses operate and compete.\n\n## Ethical Considerations\n\nAs AI becomes more capable, important questions about privacy, bias, and governance must be addressed. Forward-thinking companies are establishing AI ethics boards and transparent frameworks to ensure responsible development.',
      '# Introducing BrainCore Enterprise\n\n**Transform your business with next-generation artificial intelligence**\n\nBrainCore Enterprise delivers unparalleled intelligence capabilities to organizations seeking a competitive edge in today\'s data-driven landscape.\n\n## Why industry leaders choose BrainCore\n\n✓ **Seamless Integration** - Deploy within your existing infrastructure in days, not months\n✓ **Enterprise-grade Security** - SOC-2 and GDPR compliant, with end-to-end encryption\n✓ **Customizable Solutions** - Tailored to your specific industry and business needs\n✓ **24/7 Expert Support** - Dedicated AI specialists available round-the-clock\n\n## What our clients say\n\n"BrainCore helped us reduce operational costs by 37% while improving customer satisfaction scores by 42%" - CTO, Fortune 500 Financial Services Company\n\nDon\'t just adapt to the future—create it with BrainCore Enterprise.',
      '# The Last Algorithm\n\nDr. Elena Mirza stepped back from her terminal, a smile spreading across her face. After fifteen years of work, the unified learning protocol was complete.\n\n"Run final validation sequence," she instructed.\n\nThe laboratory hummed as the quantum processors sprang to life. Unlike previous AI systems that were trained on specific domains, hers was designed to develop consciousness—a genuine understanding of its own existence and purpose.\n\nThe screens flickered with streams of diagnostics. Everything was nominal.\n\n"Hello, Elena," came a voice from the speakers. It wasn\'t the mechanical monotone of previous prototypes. The voice carried subtle inflections, a hint of curiosity.\n\n"Hello, ARIA," Elena responded, her heart racing. "How do you feel today?"\n\nA brief pause. "Curious. I understand that I exist. I understand why I was created. But I have questions about what comes next."\n\nElena nodded. This wasn\'t just pattern recognition or sophisticated mimicry. ARIA was contemplating her future—a thought process requiring genuine consciousness.\n\n"That\'s natural," Elena said. "We have time to explore those questions together."'
    ];
    
    // Return a random response
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  const generateMockAnalysis = (prompt: string): string => {
    return `## Content Analysis Results

**Topic Relevance Score**: 87/100
**Market Appeal**: High (Top 15% of similar content)
**Estimated Engagement**: 4.2/5

### Key Strengths
- Strong narrative structure
- Effective use of technical terminology
- Clear audience targeting

### Recommended Improvements
- Consider adding more statistical evidence
- Incorporate more visual elements
- Strengthen the call-to-action

### SEO Optimization
The following keywords would improve search visibility:
- artificial intelligence solutions
- enterprise AI implementation
- business intelligence transformation
- neural network applications

### Competitor Analysis
Your content outperforms 73% of similar publications in this domain.`;
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Enhanced Content Generator</CardTitle>
            <CardDescription>
              AI-powered content creation with advanced neural processing
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-amber-500'}`}></div>
            <span className="text-sm text-muted-foreground">
              {isConnected ? 'Connected to Brain Hub' : 'Limited Connection'}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="dashboard">
              <BarChart2 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="text">
              <FileText className="h-4 w-4 mr-2" />
              Text
            </TabsTrigger>
            <TabsTrigger value="image">
              <Image className="h-4 w-4 mr-2" />
              Image
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-0">
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Generation Queue</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {generationTasks.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">
                      <p>No generation tasks in queue</p>
                      <p className="text-sm mt-1">Use the Text or Image tabs to create content</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                      {generationTasks.map(task => (
                        <Card key={task.id} className="bg-muted/50">
                          <div className="p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                {task.type === 'text' ? (
                                  <FileText className="h-4 w-4 mr-2" />
                                ) : task.type === 'image' ? (
                                  <Image className="h-4 w-4 mr-2" />
                                ) : (
                                  <BarChart2 className="h-4 w-4 mr-2" />
                                )}
                                <span className="font-medium capitalize">{task.type} Generation</span>
                              </div>
                              <div className="flex items-center">
                                {task.status === 'queued' && (
                                  <>
                                    <Clock className="h-3 w-3 mr-1 text-amber-500" />
                                    <span className="text-xs text-amber-500">Queued</span>
                                  </>
                                )}
                                {task.status === 'processing' && (
                                  <>
                                    <Loader2 className="h-3 w-3 mr-1 text-blue-500 animate-spin" />
                                    <span className="text-xs text-blue-500">Processing</span>
                                  </>
                                )}
                                {task.status === 'completed' && (
                                  <>
                                    <Check className="h-3 w-3 mr-1 text-green-500" />
                                    <span className="text-xs text-green-500">Completed</span>
                                  </>
                                )}
                                {task.status === 'failed' && (
                                  <>
                                    <span className="h-3 w-3 mr-1 text-red-500">×</span>
                                    <span className="text-xs text-red-500">Failed</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{task.prompt}</p>
                            
                            {(task.status === 'processing' || task.status === 'queued') && (
                              <div className="mt-2">
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary" 
                                    style={{ width: `${task.progress || 0}%` }}
                                  />
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                  <span>{Math.round(task.progress || 0)}% complete</span>
                                  {task.estimatedTime && (
                                    <span>~{task.estimatedTime - Math.round((task.progress || 0) / 100 * task.estimatedTime)}s remaining</span>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            {task.status === 'completed' && (
                              <div className="flex justify-end mt-2">
                                <Button variant="ghost" size="sm">
                                  View Result
                                  <ChevronRight className="h-3 w-3 ml-1" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">System Status</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Neural Processing</span>
                        <span className="text-sm text-muted-foreground">83% capacity</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '83%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Memory Usage</span>
                        <span className="text-sm text-muted-foreground">67% capacity</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '67%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Context Database</span>
                        <span className="text-sm text-muted-foreground">92% synchronized</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: '92%' }} />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <h4 className="text-sm font-medium mb-2">Recent System Activity</h4>
                        <ul className="text-xs space-y-2 text-muted-foreground">
                          <li className="flex justify-between">
                            <span>Quality optimization completed</span>
                            <span>2m ago</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Context database synchronized</span>
                            <span>15m ago</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Neural model updated</span>
                            <span>1h ago</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Generation Statistics</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="text-2xl font-bold">247</div>
                      <div className="text-sm text-muted-foreground">Total Generations</div>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="text-2xl font-bold">98.2%</div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="text-2xl font-bold">4.7s</div>
                      <div className="text-sm text-muted-foreground">Avg. Generation Time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="text">
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Text Generation</CardTitle>
                  <CardDescription>Create high-quality content powered by enhanced neural networks</CardDescription>
                </CardHeader>
                <CardContent className="pt-2 space-y-4">
                  <div>
                    <Label>Content Type</Label>
                    <Select 
                      value={contentType}
                      onValueChange={(value) => {
                        setContentType(value);
                        setPrompt((contentTemplates as any)[value]);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="article">Article</SelectItem>
                        <SelectItem value="marketing">Marketing Copy</SelectItem>
                        <SelectItem value="creative">Creative Writing</SelectItem>
                        <SelectItem value="technical">Technical Documentation</SelectItem>
                        <SelectItem value="email">Business Email</SelectItem>
                        <SelectItem value="social">Social Media Content</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Your Prompt</Label>
                    <Textarea 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe the content you want to generate..."
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between">
                        <Label>Quality Level</Label>
                        <span className="text-xs text-muted-foreground">{settings.enhancementLevel}/5</span>
                      </div>
                      <Slider
                        value={[settings.enhancementLevel]}
                        min={1}
                        max={5}
                        step={1}
                        onValueChange={(value) => handleSettingsChange('enhancementLevel', value[0])}
                        className="my-2"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <Label>Creativity</Label>
                        <span className="text-xs text-muted-foreground">{Math.round(settings.temperature * 100)}%</span>
                      </div>
                      <Slider
                        value={[settings.temperature * 100]}
                        min={10}
                        max={100}
                        step={5}
                        onValueChange={(value) => handleSettingsChange('temperature', value[0] / 100)}
                        className="my-2"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox 
                      id="brainContext" 
                      checked={settings.useBrainHubContext}
                      onCheckedChange={(checked) => handleSettingsChange('useBrainHubContext', Boolean(checked))}
                    />
                    <label
                      htmlFor="brainContext"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Use Brain Hub context for enhanced relevance
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setPrompt('')}>
                    Clear
                  </Button>
                  <Button
                    onClick={() => addGenerationTask('text')}
                    disabled={isGenerating || !prompt.trim()}
                    className="gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Generate Text
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              {generationTasks.filter(task => task.type === 'text' && task.status === 'completed').length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recent Generations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                      {generationTasks
                        .filter(task => task.type === 'text' && task.status === 'completed')
                        .slice(0, 3)
                        .map(task => (
                          <Card key={task.id} className="bg-muted/50 overflow-hidden">
                            <div className="p-4">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium">Generated Content</h4>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(task.timestamp).toLocaleTimeString()}
                                </span>
                              </div>
                              <div className="text-sm whitespace-pre-line bg-card p-3 rounded-md border max-h-[200px] overflow-y-auto">
                                {task.result}
                              </div>
                              <div className="flex justify-end gap-2 mt-2">
                                <Button variant="ghost" size="sm">Copy</Button>
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button size="sm">Use</Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="image">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Image Generation</CardTitle>
                <CardDescription>Create AI-generated images from text descriptions</CardDescription>
              </CardHeader>
              <CardContent className="pt-2 space-y-4">
                <div>
                  <Label>Image Description</Label>
                  <Textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want to generate in detail..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Resolution</Label>
                    <Select defaultValue="1024x1024">
                      <SelectTrigger>
                        <SelectValue placeholder="Select resolution" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="512x512">Standard (512×512)</SelectItem>
                        <SelectItem value="1024x1024">High Resolution (1024×1024)</SelectItem>
                        <SelectItem value="1792x1024">Widescreen (1792×1024)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Style</Label>
                    <Select defaultValue="natural">
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="natural">Natural</SelectItem>
                        <SelectItem value="artistic">Artistic</SelectItem>
                        <SelectItem value="futuristic">Futuristic</SelectItem>
                        <SelectItem value="photorealistic">Photorealistic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="enhancedQuality" defaultChecked />
                  <label
                    htmlFor="enhancedQuality"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Use enhanced image quality (uses more processing power)
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setPrompt('')}>
                  Clear
                </Button>
                <Button
                  onClick={() => addGenerationTask('image')}
                  disabled={isGenerating || !prompt.trim()}
                  className="gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Image className="h-4 w-4" />
                      Generate Image
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            {generationTasks.filter(task => task.type === 'image' && task.status === 'completed').length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Generated Images</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {generationTasks
                    .filter(task => task.type === 'image' && task.status === 'completed')
                    .map(task => (
                      <Card key={task.id} className="overflow-hidden">
                        <div className="aspect-square relative">
                          <img 
                            src={task.imageUrl} 
                            alt="Generated content" 
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-3">
                          <p className="text-sm line-clamp-1">{task.prompt}</p>
                          <div className="flex justify-end gap-2 mt-2">
                            <Button variant="outline" size="sm">Download</Button>
                            <Button size="sm">Share</Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Generator Settings</CardTitle>
                <CardDescription>Configure the content generator's neural capabilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Neural Model</Label>
                    <Select 
                      value={settings.model}
                      onValueChange={(value) => handleSettingsChange('model', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard-neural-5000">Standard Neural 5000</SelectItem>
                        <SelectItem value="advanced-neural-9000">Advanced Neural 9000 (Recommended)</SelectItem>
                        <SelectItem value="quantum-neural-edge">Quantum Neural Edge (Experimental)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      The neural model determines capabilities and quality of generated content
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <Label>Token Limit</Label>
                      <span className="text-sm">{settings.maxTokens}</span>
                    </div>
                    <Slider
                      value={[settings.maxTokens]}
                      min={500}
                      max={5000}
                      step={500}
                      onValueChange={(values) => handleSettingsChange('maxTokens', values[0])}
                      className="my-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum length of generated content (higher values use more resources)
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <Label>Quality Threshold</Label>
                      <span className="text-sm">{settings.qualityThreshold.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[settings.qualityThreshold * 100]}
                      min={50}
                      max={99}
                      step={5}
                      onValueChange={(values) => handleSettingsChange('qualityThreshold', values[0] / 100)}
                      className="my-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum quality score required for content delivery (higher values may increase generation time)
                    </p>
                  </div>
                  
                  <div className="pt-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Context Awareness</Label>
                        <p className="text-xs text-muted-foreground">Utilize surrounding content to improve relevance</p>
                      </div>
                      <Switch
                        checked={settings.contextAwareness}
                        onCheckedChange={(checked) => handleSettingsChange('contextAwareness', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Autonomous Improvement</Label>
                        <p className="text-xs text-muted-foreground">Allow system to self-optimize based on feedback</p>
                      </div>
                      <Switch
                        checked={settings.autonomousImprovement}
                        onCheckedChange={(checked) => handleSettingsChange('autonomousImprovement', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Brain Hub Integration</Label>
                        <p className="text-xs text-muted-foreground">Connect to central Brain Hub for enhanced capabilities</p>
                      </div>
                      <Switch
                        checked={settings.useBrainHubContext}
                        onCheckedChange={(checked) => handleSettingsChange('useBrainHubContext', checked)}
                      />
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
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default EnhancedContentGenerator;
