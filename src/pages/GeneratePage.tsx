
import React, { useState } from 'react';
import { useAIGenerator } from '@/hooks/useAIGenerator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Loader2, Image as ImageIcon, FileVideo, FileText, Wand2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const GeneratePage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [selectedTab, setSelectedTab] = useState('image');
  const [selectedModel, setSelectedModel] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  
  const { 
    generateContent, 
    clearResult,
    getAvailableModels, 
    loading, 
    result,
    error 
  } = useAIGenerator({
    contentType: selectedTab as 'text' | 'image' | 'video' | 'multimodal'
  });
  
  const models = getAvailableModels();
  
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    const params = {
      prompt,
      negativePrompt,
      model: selectedModel,
      width,
      height
    };
    
    await generateContent(params);
  };
  
  const renderResult = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <Loader2 className="h-12 w-12 animate-spin mb-4" />
          <p className="text-muted-foreground">Generating your content...</p>
          <p className="text-xs text-muted-foreground mt-2">This may take up to a minute</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="p-6 text-center border border-destructive/20 bg-destructive/10 rounded-lg">
          <p className="text-destructive">{error}</p>
        </div>
      );
    }
    
    if (!result) {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-lg">
          <div className="rounded-full bg-muted p-3 mb-4">
            {selectedTab === 'image' && <ImageIcon className="h-8 w-8 text-muted-foreground" />}
            {selectedTab === 'video' && <FileVideo className="h-8 w-8 text-muted-foreground" />}
            {selectedTab === 'text' && <FileText className="h-8 w-8 text-muted-foreground" />}
          </div>
          <p className="text-muted-foreground">Your generated content will appear here</p>
        </div>
      );
    }
    
    if (result.url && selectedTab === 'image') {
      return (
        <div className="p-2 border rounded-lg overflow-hidden">
          <img 
            src={result.url} 
            alt="Generated content" 
            className="w-full h-auto rounded"
          />
        </div>
      );
    }
    
    if (result.url && selectedTab === 'video') {
      return (
        <div className="p-2 border rounded-lg overflow-hidden">
          <video 
            src={result.url} 
            controls 
            className="w-full h-auto rounded"
          />
        </div>
      );
    }
    
    if (result.text) {
      return (
        <div className="p-4 border rounded-lg bg-muted/30">
          <p className="whitespace-pre-wrap">{result.text}</p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Wand2 className="h-6 w-6" />
            AI Content Generation
          </h1>
          <p className="text-muted-foreground mt-1">
            Generate high-quality AI content for your projects
          </p>
        </div>
        
        <Tabs defaultValue="image" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="image">
              <ImageIcon className="h-4 w-4 mr-2" />
              Image
            </TabsTrigger>
            <TabsTrigger value="video">
              <FileVideo className="h-4 w-4 mr-2" />
              Video
            </TabsTrigger>
            <TabsTrigger value="text">
              <FileText className="h-4 w-4 mr-2" />
              Text
            </TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate {selectedTab}</CardTitle>
                <CardDescription>
                  Enter a detailed prompt to generate {selectedTab} content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="prompt">Prompt</Label>
                  <Textarea
                    id="prompt"
                    placeholder={`Describe the ${selectedTab} you want to generate...`}
                    className="h-32 resize-none"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select a ${selectedTab} model`} />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map(model => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Switch 
                    id="advanced" 
                    checked={showAdvanced}
                    onCheckedChange={setShowAdvanced}
                  />
                  <Label htmlFor="advanced">Advanced options</Label>
                </div>
                
                {showAdvanced && (
                  <div className="space-y-4 pt-2">
                    <Separator />
                    
                    {(selectedTab === 'image' || selectedTab === 'video') && (
                      <>
                        <div>
                          <Label htmlFor="negative-prompt">Negative Prompt</Label>
                          <Textarea
                            id="negative-prompt"
                            placeholder="What to exclude from the generation..."
                            className="h-20 resize-none"
                            value={negativePrompt}
                            onChange={(e) => setNegativePrompt(e.target.value)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="width">Width</Label>
                            <Input
                              id="width"
                              type="number"
                              value={width}
                              onChange={(e) => setWidth(Number(e.target.value))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="height">Height</Label>
                            <Input
                              id="height"
                              type="number"
                              value={height}
                              onChange={(e) => setHeight(Number(e.target.value))}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleGenerate} 
                  disabled={!prompt.trim() || loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>Generate {selectedTab}</>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Result</CardTitle>
                <CardDescription>
                  Your generated {selectedTab} will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderResult()}
              </CardContent>
              {result && (
                <CardFooter>
                  <Button 
                    variant="outline" 
                    onClick={clearResult}
                    className="w-full"
                  >
                    Clear result
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default GeneratePage;
