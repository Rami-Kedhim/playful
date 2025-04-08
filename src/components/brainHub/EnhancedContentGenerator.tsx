
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { 
  BarChart, 
  Bot, 
  CheckCircle, 
  Clock, 
  Code, 
  FileText, 
  Layers, 
  LayoutGrid, 
  MessageSquare, 
  Pencil, 
  Plus, 
  RefreshCcw, 
  Sparkles, 
  Workflow
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useBrainHub } from "@/hooks/useBrainHub";

interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  type: 'message' | 'profile' | 'story' | 'post';
  tags: string[];
  template: string;
  variables: string[];
  previewImage?: string;
}

interface ContentGeneration {
  id: string;
  name: string;
  status: 'queued' | 'generating' | 'completed' | 'failed';
  progress: number;
  contentType: 'message' | 'profile' | 'story' | 'post';
  createdAt: Date;
  completedAt?: Date;
  result?: string;
  prompt?: string;
  error?: string;
}

const DEMO_TEMPLATES: ContentTemplate[] = [
  {
    id: 'templ-1',
    name: 'Flirty Greeting',
    description: 'A customizable flirty first message template',
    type: 'message',
    tags: ['greeting', 'flirty', 'introduction'],
    template: 'Hey {{name}}, I noticed you like {{interest}}. That's one of my favorite things too! Would you like to chat about it sometime?',
    variables: ['name', 'interest']
  },
  {
    id: 'templ-2',
    name: 'Detailed Profile',
    description: 'A complete profile with personality traits',
    type: 'profile',
    tags: ['detailed', 'personality', 'complete'],
    template: 'I'm {{name}}, {{age}} years old from {{location}}. My passion is {{hobby}}, and I love spending my free time {{activity}}. I'm looking for someone who {{trait}}.',
    variables: ['name', 'age', 'location', 'hobby', 'activity', 'trait']
  },
  {
    id: 'templ-3',
    name: 'Fantasy Story',
    description: 'A short fantasy scenario for roleplay',
    type: 'story',
    tags: ['fantasy', 'roleplay', 'scenario'],
    template: 'Imagine we're in {{setting}}. I'm dressed as {{character}} and you've just approached me at {{location}}. The mood is {{mood}} and we lock eyes across the {{place}}...',
    variables: ['setting', 'character', 'location', 'mood', 'place']
  }
];

const EnhancedContentGenerator: React.FC = () => {
  const { syncWith, isConnected } = useBrainHub('content-generator');
  
  const [templates, setTemplates] = useState<ContentTemplate[]>(DEMO_TEMPLATES);
  const [generationHistory, setGenerationHistory] = useState<ContentGeneration[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<ContentTemplate | null>(null);
  const [templateVariables, setTemplateVariables] = useState<{[key: string]: string}>({});
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [generationName, setGenerationName] = useState<string>('');
  const [selectedContentType, setSelectedContentType] = useState<'message' | 'profile' | 'story' | 'post'>('message');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [newTemplateName, setNewTemplateName] = useState<string>('');
  const [newTemplateContent, setNewTemplateContent] = useState<string>('');
  const [newTemplateType, setNewTemplateType] = useState<'message' | 'profile' | 'story' | 'post'>('message');
  const [enhancedGeneration, setEnhancedGeneration] = useState<boolean>(true);
  const [personalityTraits, setPersonalityTraits] = useState<string[]>([
    'flirty', 'intelligent', 'caring'
  ]);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  
  // Initialize with demo data
  useEffect(() => {
    setGenerationHistory([
      {
        id: 'gen-1',
        name: 'Welcome message for John',
        status: 'completed',
        progress: 100,
        contentType: 'message',
        createdAt: new Date(Date.now() - 3600000),
        completedAt: new Date(Date.now() - 3590000),
        result: 'Hey John, I noticed you like hiking. That's one of my favorite things too! Would you like to chat about it sometime?'
      },
      {
        id: 'gen-2',
        name: 'Sophie profile update',
        status: 'completed',
        progress: 100,
        contentType: 'profile',
        createdAt: new Date(Date.now() - 7200000),
        completedAt: new Date(Date.now() - 7150000),
        result: 'I'm Sophie, 28 years old from Miami. My passion is photography, and I love spending my free time at the beach capturing the perfect sunset. I'm looking for someone who appreciates art and nature.'
      }
    ]);
  }, []);
  
  const handleTemplateSelect = (template: ContentTemplate) => {
    setActiveTemplate(template);
    // Reset variables
    const initialVariables: {[key: string]: string} = {};
    template.variables.forEach(v => {
      initialVariables[v] = '';
    });
    setTemplateVariables(initialVariables);
    setGeneratedContent('');
  };
  
  const handleVariableChange = (variable: string, value: string) => {
    setTemplateVariables({
      ...templateVariables,
      [variable]: value
    });
  };
  
  const generateFromTemplate = () => {
    if (!activeTemplate) return;
    
    setIsGenerating(true);
    setGeneratedContent('');
    
    // Create a new generation record
    const newGeneration: ContentGeneration = {
      id: `gen-${Date.now()}`,
      name: generationName || `${activeTemplate.type} - ${new Date().toLocaleString()}`,
      status: 'generating',
      progress: 0,
      contentType: activeTemplate.type,
      createdAt: new Date(),
      prompt: activeTemplate.template
    };
    
    setGenerationHistory([newGeneration, ...generationHistory]);
    
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      
      setGenerationHistory(prev => 
        prev.map(gen => 
          gen.id === newGeneration.id 
            ? { ...gen, progress: Math.min(progress, 100) } 
            : gen
        )
      );
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Generate content from template
        let result = activeTemplate.template;
        for (const [variable, value] of Object.entries(templateVariables)) {
          result = result.replace(new RegExp(`{{${variable}}}`, 'g'), value || variable);
        }
        
        // Update with completion
        setGenerationHistory(prev => 
          prev.map(gen => 
            gen.id === newGeneration.id 
              ? { 
                  ...gen, 
                  status: 'completed', 
                  progress: 100, 
                  completedAt: new Date(),
                  result
                } 
              : gen
          )
        );
        
        setIsGenerating(false);
        setGeneratedContent(result);
        
        toast({
          title: "Content Generated",
          description: "Your content has been generated successfully",
        });
        
        // Sync with Brain Hub
        if (isConnected) {
          syncWith('brain-core', {
            contentGenerated: result,
            template: activeTemplate.id,
            timestamp: new Date().toISOString()
          });
        }
      }
    }, 300);
  };
  
  const generateFromPrompt = () => {
    if (!customPrompt.trim()) return;
    
    setIsGenerating(true);
    setGeneratedContent('');
    
    // Create a new generation record
    const newGeneration: ContentGeneration = {
      id: `gen-${Date.now()}`,
      name: generationName || `Custom ${selectedContentType} - ${new Date().toLocaleString()}`,
      status: 'generating',
      progress: 0,
      contentType: selectedContentType,
      createdAt: new Date(),
      prompt: customPrompt
    };
    
    setGenerationHistory([newGeneration, ...generationHistory]);
    
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      
      setGenerationHistory(prev => 
        prev.map(gen => 
          gen.id === newGeneration.id 
            ? { ...gen, progress: Math.min(progress, 100) } 
            : gen
        )
      );
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // For demo, generate placeholder content
        const personalityFactor = enhancedGeneration ? 
          ` with ${personalityTraits.join(', ')} personality traits` : '';
          
        const demoResults = {
          'message': `Here's a custom message based on your prompt "${customPrompt}"${personalityFactor}. This would be generated by the AI model in a real implementation.`,
          'profile': `This is a generated profile based on "${customPrompt}"${personalityFactor}. In a real implementation, this would be a complete profile with the specified characteristics.`,
          'story': `Once upon a time... [This is where a story based on "${customPrompt}"${personalityFactor} would be generated by the AI model]`,
          'post': `[Generated social media post about "${customPrompt}"${personalityFactor}. The actual implementation would use an AI model to create engaging content.]`
        };
        
        // Update with completion
        setGenerationHistory(prev => 
          prev.map(gen => 
            gen.id === newGeneration.id 
              ? { 
                  ...gen, 
                  status: 'completed', 
                  progress: 100, 
                  completedAt: new Date(),
                  result: demoResults[selectedContentType]
                } 
              : gen
          )
        );
        
        setIsGenerating(false);
        setGeneratedContent(demoResults[selectedContentType]);
        
        toast({
          title: "Custom Content Generated",
          description: "Your content has been generated successfully",
        });
        
        // Sync with Brain Hub
        if (isConnected) {
          syncWith('brain-core', {
            contentGenerated: demoResults[selectedContentType],
            prompt: customPrompt,
            timestamp: new Date().toISOString()
          });
        }
      }
    }, 200);
  };
  
  const createNewTemplate = () => {
    if (!newTemplateName || !newTemplateContent) return;
    
    // Extract variables from content (anything with {{variable}} format)
    const variableRegex = /{{([^}]+)}}/g;
    const matches = newTemplateContent.match(variableRegex) || [];
    const variables = [...new Set(matches.map(match => match.replace(/{{|}}/g, '')))];
    
    const newTemplate: ContentTemplate = {
      id: `templ-${Date.now()}`,
      name: newTemplateName,
      description: `Custom template for ${newTemplateType}`,
      type: newTemplateType,
      tags: ['custom', newTemplateType],
      template: newTemplateContent,
      variables: variables
    };
    
    setTemplates([newTemplate, ...templates]);
    setNewTemplateName('');
    setNewTemplateContent('');
    
    toast({
      title: "Template Created",
      description: "Your custom template has been created successfully",
    });
  };
  
  const copyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    
    toast({
      title: "Copied to Clipboard",
      description: "Content copied to clipboard successfully",
    });
  };
  
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Enhanced Content Generator</CardTitle>
            <CardDescription>
              AI-powered content creation for messages, profiles, and stories
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="enhanced-mode" className="text-sm">Enhanced Generation</Label>
              <Switch 
                id="enhanced-mode" 
                checked={enhancedGeneration} 
                onCheckedChange={setEnhancedGeneration} 
              />
            </div>
            <Button variant="outline" size="sm" onClick={() => syncWith('brain-core', { action: 'fetch_templates' })}>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Sync
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="custom">Custom Generation</TabsTrigger>
            <TabsTrigger value="history">Generation History</TabsTrigger>
            <TabsTrigger value="create">Create Template</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {templates.map(template => (
                <Card 
                  key={template.id} 
                  className={`cursor-pointer transition-all ${activeTemplate?.id === template.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{template.name}</h3>
                      <Badge variant="outline">{template.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {activeTemplate && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Generate from Template: {activeTemplate.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4">
                    <div>
                      <Label htmlFor="generation-name">Generation Name</Label>
                      <Input
                        id="generation-name"
                        placeholder="Enter a name for this generation"
                        value={generationName}
                        onChange={(e) => setGenerationName(e.target.value)}
                      />
                    </div>
                    
                    {activeTemplate.variables.map(variable => (
                      <div key={variable}>
                        <Label htmlFor={`var-${variable}`}>{variable.charAt(0).toUpperCase() + variable.slice(1)}</Label>
                        <Input
                          id={`var-${variable}`}
                          placeholder={`Enter ${variable}`}
                          value={templateVariables[variable] || ''}
                          onChange={(e) => handleVariableChange(variable, e.target.value)}
                        />
                      </div>
                    ))}
                    
                    {enhancedGeneration && (
                      <div>
                        <Label>Personality Enhancement</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {['flirty', 'intelligent', 'caring', 'mysterious', 'playful', 'direct'].map(trait => (
                            <Badge
                              key={trait}
                              variant={personalityTraits.includes(trait) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => {
                                if (personalityTraits.includes(trait)) {
                                  setPersonalityTraits(personalityTraits.filter(t => t !== trait));
                                } else {
                                  setPersonalityTraits([...personalityTraits, trait]);
                                }
                              }}
                            >
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={generateFromTemplate}
                    disabled={isGenerating || Object.values(templateVariables).some(v => !v)}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Bot className="h-4 w-4 mr-2" />
                        Generate Content
                      </>
                    )}
                  </Button>
                  
                  {generatedContent && (
                    <div className="mt-6 p-4 bg-muted rounded-md relative">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="absolute top-2 right-2"
                        onClick={() => copyContent(generatedContent)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <p className="pr-8">{generatedContent}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="custom">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4 mb-4">
                  <div>
                    <Label htmlFor="custom-name">Generation Name</Label>
                    <Input
                      id="custom-name"
                      placeholder="Enter a name for this generation"
                      value={generationName}
                      onChange={(e) => setGenerationName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="content-type">Content Type</Label>
                    <Select
                      value={selectedContentType}
                      onValueChange={(value) => setSelectedContentType(value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="message">Message</SelectItem>
                        <SelectItem value="profile">Profile</SelectItem>
                        <SelectItem value="story">Story</SelectItem>
                        <SelectItem value="post">Social Media Post</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="custom-prompt">Prompt</Label>
                    <Textarea
                      id="custom-prompt"
                      placeholder="Describe what you want to generate..."
                      rows={4}
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                    />
                  </div>
                  
                  {enhancedGeneration && (
                    <div>
                      <Label>Personality Traits</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['flirty', 'intelligent', 'caring', 'mysterious', 'playful', 'direct'].map(trait => (
                          <Badge
                            key={trait}
                            variant={personalityTraits.includes(trait) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              if (personalityTraits.includes(trait)) {
                                setPersonalityTraits(personalityTraits.filter(t => t !== trait));
                              } else {
                                setPersonalityTraits([...personalityTraits, trait]);
                              }
                            }}
                          >
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={generateFromPrompt}
                  disabled={isGenerating || !customPrompt.trim()}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Bot className="h-4 w-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
                
                {generatedContent && (
                  <div className="mt-6 p-4 bg-muted rounded-md relative">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="absolute top-2 right-2"
                      onClick={() => copyContent(generatedContent)}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <p className="pr-8">{generatedContent}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-4">
              {generationHistory.map(gen => (
                <Card key={gen.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-medium">{gen.name}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{gen.contentType}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {gen.createdAt.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant={
                          gen.status === 'completed' ? 'default' :
                          gen.status === 'generating' ? 'secondary' :
                          gen.status === 'failed' ? 'destructive' : 'outline'
                        }
                      >
                        {gen.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {gen.status === 'generating' && <Clock className="h-3 w-3 mr-1 animate-spin" />}
                        {gen.status.charAt(0).toUpperCase() + gen.status.slice(1)}
                      </Badge>
                    </div>
                    
                    {gen.status === 'generating' && (
                      <Progress value={gen.progress} className="h-2 mt-2" />
                    )}
                    
                    {gen.result && (
                      <div className="mt-3 p-3 bg-muted rounded-md relative text-sm">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="absolute top-2 right-2 h-7 w-7 p-0"
                          onClick={() => copyContent(gen.result!)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <p className="pr-8 line-clamp-3">{gen.result}</p>
                      </div>
                    )}
                    
                    {gen.error && (
                      <div className="mt-3 p-2 bg-red-50 text-red-800 rounded-md text-sm">
                        Error: {gen.error}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              {generationHistory.length === 0 && (
                <Card>
                  <CardContent className="py-8 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-medium text-lg mb-1">No generation history</h3>
                    <p className="text-muted-foreground">
                      Your content generation history will appear here
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="create">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="new-template-name">Template Name</Label>
                    <Input
                      id="new-template-name"
                      placeholder="Enter template name"
                      value={newTemplateName}
                      onChange={(e) => setNewTemplateName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="new-template-type">Content Type</Label>
                    <Select
                      value={newTemplateType}
                      onValueChange={(value) => setNewTemplateType(value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="message">Message</SelectItem>
                        <SelectItem value="profile">Profile</SelectItem>
                        <SelectItem value="story">Story</SelectItem>
                        <SelectItem value="post">Social Media Post</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="new-template-content">Template Content</Label>
                    <div className="text-xs text-muted-foreground mb-2">
                      Use <code>{"{{variable_name}}"}</code> for variables (e.g., <code>{"{{name}}"}</code>)
                    </div>
                    <Textarea
                      id="new-template-content"
                      placeholder="Enter template content with {{variables}}"
                      rows={5}
                      value={newTemplateContent}
                      onChange={(e) => setNewTemplateContent(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    onClick={createNewTemplate}
                    disabled={!newTemplateName || !newTemplateContent}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Template
                  </Button>
                </div>
                
                {/* Template preview section */}
                {newTemplateName && newTemplateContent && (
                  <div className="mt-6">
                    <Label className="text-sm">Preview</Label>
                    <div className="p-3 bg-muted rounded-md mt-2">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium text-sm">{newTemplateName}</h3>
                        <Badge variant="outline">{newTemplateType}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{newTemplateContent}</p>
                      
                      {/* Show detected variables */}
                      {newTemplateContent.match(/{{([^}]+)}}/g) && (
                        <div className="mt-2 pt-2 border-t">
                          <p className="text-xs text-muted-foreground mb-1">Detected variables:</p>
                          <div className="flex flex-wrap gap-1">
                            {[...new Set((newTemplateContent.match(/{{([^}]+)}}/g) || []).map(v => v.replace(/{{|}}/g, '')))].map(variable => (
                              <Badge key={variable} variant="secondary" className="text-xs">{variable}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnhancedContentGenerator;
