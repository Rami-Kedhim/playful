
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
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Brain, Image as ImageIcon, FileVideo, FileText, Sparkles } from 'lucide-react';

const EnhancedAIPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('deepseek-ai/deepseek-llm-67b-chat');
  const [useHighQuality, setUseHighQuality] = useState(true);
  
  const { 
    generateContent, 
    clearResult, 
    getAvailableModels, 
    loading, 
    result, 
    error 
  } = useAIGenerator({
    defaultModel: 'deepseek-ai/deepseek-llm-67b-chat',
    contentType: 'text'
  });
  
  const models = getAvailableModels();
  
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    await generateContent({
      prompt,
      model: selectedModel,
      options: {
        quality: useHighQuality ? 'high' : 'standard',
        enhanced: true
      }
    });
  };
  
  const renderOutput = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <Loader2 className="h-12 w-12 animate-spin mb-4" />
          <p className="text-muted-foreground">Processing with DeepSeek AI...</p>
          <p className="text-xs text-muted-foreground mt-2">Enhanced models may take longer to process</p>
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
          <Brain className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Your generated content will appear here</p>
        </div>
      );
    }
    
    if (result.url) {
      if (selectedModel.includes('video')) {
        return (
          <video 
            src={result.url} 
            controls 
            className="w-full rounded-lg border"
          />
        );
      }
      
      return (
        <img 
          src={result.url} 
          alt="Generated content"
          className="w-full rounded-lg border"
        />
      );
    }
    
    if (result.text) {
      return (
        <div className="p-4 bg-muted/30 border rounded-lg max-h-[500px] overflow-y-auto">
          <pre className="whitespace-pre-wrap font-sans">{result.text}</pre>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8 flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Enhanced AI Studio</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>DeepSeek AI</CardTitle>
            <CardDescription>
              Advanced AI generation with specialized DeepSeek models
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map(model => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {models.find(m => m.id === selectedModel)?.description || "Select a model to see its description"}
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea
                id="prompt"
                placeholder="Describe what you want to create..."
                className="h-36 min-h-36"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="high-quality" 
                checked={useHighQuality} 
                onCheckedChange={setUseHighQuality} 
              />
              <label 
                htmlFor="high-quality" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Use high quality settings (slower but better results)
              </label>
            </div>
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
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate with DeepSeek
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Generated Output</CardTitle>
            <CardDescription>
              High-quality AI content created with DeepSeek models
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderOutput()}
          </CardContent>
          {result && (
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={clearResult}>
                Clear Result
              </Button>
              
              {result.processingTime && (
                <span className="text-xs text-muted-foreground">
                  Generated in {(result.processingTime / 1000).toFixed(2)} seconds
                </span>
              )}
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default EnhancedAIPage;
