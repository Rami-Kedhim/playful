
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ProcessingStatus } from '@/types/ai-profile';
import { Loader2, CheckCircle2, AlertCircle, Sparkles, Image } from 'lucide-react';
import useAIModelGenerator from '@/hooks/ai/useAIModelGenerator';
import { Progress } from '@/components/ui/progress';

const AIModelGenerationDashboard = () => {
  const [modelParams, setModelParams] = useState({
    name: '',
    type: 'companion',
    gender: 'female',
    personality: [] as string[],
    traits: [] as string[],
    description: '',
    prompt: ''
  });
  const [activeTab, setActiveTab] = useState('basic');
  
  const { isGenerating, currentResult, startGeneration } = useAIModelGenerator();
  
  const personalityOptions = [
    { id: 'caring', label: 'Caring' },
    { id: 'flirty', label: 'Flirty' },
    { id: 'intellectual', label: 'Intellectual' },
    { id: 'playful', label: 'Playful' },
    { id: 'mysterious', label: 'Mysterious' },
    { id: 'adventurous', label: 'Adventurous' }
  ];
  
  const handleChange = (field: string, value: string | string[]) => {
    setModelParams(prev => ({ ...prev, [field]: value }));
  };
  
  const handlePersonalityChange = (id: string, checked: boolean) => {
    if (checked) {
      setModelParams(prev => ({
        ...prev,
        personality: [...prev.personality, id]
      }));
    } else {
      setModelParams(prev => ({
        ...prev,
        personality: prev.personality.filter(item => item !== id)
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await startGeneration(modelParams);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">AI Model Generation Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Model Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="personality">Personality</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        value={modelParams.name} 
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Enter AI model name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select 
                        value={modelParams.type} 
                        onValueChange={(value) => handleChange('type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="companion">Companion</SelectItem>
                          <SelectItem value="assistant">Assistant</SelectItem>
                          <SelectItem value="romantic">Romantic Partner</SelectItem>
                          <SelectItem value="guide">Guide</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select 
                        value={modelParams.gender} 
                        onValueChange={(value) => handleChange('gender', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="non-binary">Non-binary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="personality" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Personality Traits</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {personalityOptions.map(option => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`personality-${option.id}`} 
                              checked={modelParams.personality.includes(option.id)}
                              onCheckedChange={(checked) => {
                                handlePersonalityChange(option.id, checked as boolean);
                              }}
                            />
                            <label htmlFor={`personality-${option.id}`} className="text-sm">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        value={modelParams.description} 
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Describe the AI personality"
                        rows={4}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="advanced" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="prompt">Generation Prompt</Label>
                      <Textarea 
                        id="prompt" 
                        value={modelParams.prompt} 
                        onChange={(e) => handleChange('prompt', e.target.value)}
                        placeholder="Detailed prompt for model generation"
                        rows={6}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Advanced prompt to guide the AI generation process. Leave empty to use default settings.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={isGenerating || !modelParams.name} 
                    className="space-x-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Generate AI Model</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Generation Status</CardTitle>
            </CardHeader>
            <CardContent>
              {currentResult ? (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    {currentResult.avatarUrl ? (
                      <img 
                        src={currentResult.avatarUrl}
                        alt={currentResult.name}
                        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full mx-auto bg-secondary flex items-center justify-center">
                        <Image className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <h3 className="text-lg font-medium mt-2">{currentResult.name}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="font-medium">
                        {currentResult.status === ProcessingStatus.IDLE && "Ready"}
                        {currentResult.status === ProcessingStatus.PROCESSING && "Processing"}
                        {currentResult.status === ProcessingStatus.COMPLETED && "Completed"}
                        {currentResult.status === ProcessingStatus.FAILED && "Failed"}
                      </span>
                    </div>
                    
                    <Progress value={currentResult.progress || 0} className="h-2" />
                    
                    <div className="flex justify-center mt-4">
                      {currentResult.status === ProcessingStatus.PROCESSING && (
                        <div className="flex items-center space-x-2 text-amber-500">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Generating...</span>
                        </div>
                      )}
                      
                      {currentResult.status === ProcessingStatus.COMPLETED && (
                        <div className="flex items-center space-x-2 text-green-500">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Generation Complete</span>
                        </div>
                      )}
                      
                      {currentResult.status === ProcessingStatus.FAILED && (
                        <div className="flex items-center space-x-2 text-red-500">
                          <AlertCircle className="h-4 w-4" />
                          <span>Generation Failed</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {currentResult.status === ProcessingStatus.COMPLETED && (
                    <div className="mt-4 pt-4 border-t">
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No active generation</p>
                  <p className="text-sm">Fill out parameters and generate your first AI model</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIModelGenerationDashboard;
