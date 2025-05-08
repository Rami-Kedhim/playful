
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { lucieOrchestrator } from '@/core/LucieOrchestratorAdapter';
import { ModerateContentParams } from '@/types/core-systems';
import { Brain, Activity, Zap, MessageCircle } from 'lucide-react';

interface BrainCoreProps {
  initialPrompt?: string;
  onResponseGenerated?: (response: string) => void;
}

const BrainCore: React.FC<BrainCoreProps> = ({ 
  initialPrompt = '',
  onResponseGenerated
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [systemHealth, setSystemHealth] = useState(85);
  const [processingPower, setProcessingPower] = useState(72);

  useEffect(() => {
    // Initialize brain core
    setIsInitialized(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    
    try {
      // Check content moderation
      const params: ModerateContentParams = {
        content: prompt,
        contentType: "text",
        context: {} // Empty context object
      };
      
      const isSafe = await lucieOrchestrator.isSafeContent(prompt);
      
      if (isSafe) {
        // Generate response
        const generatedResponse = await lucieOrchestrator.generateContent(prompt);
        setResponse(generatedResponse);
        
        if (onResponseGenerated) {
          onResponseGenerated(generatedResponse);
        }
      } else {
        setResponse("I'm sorry, but I can't respond to that type of content.");
      }
    } catch (error) {
      console.error('Error generating brain response:', error);
      setResponse('Error: Could not generate a response. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5 text-primary" />
            Neural Core Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-1 items-center">
                <span className="text-sm">System Health</span>
                <Badge variant={systemHealth > 80 ? 'default' : 'destructive'}>
                  {systemHealth.toFixed(1)}%
                </Badge>
              </div>
              <Progress value={systemHealth} className="mb-4" />
              
              <div className="flex justify-between mb-1 items-center">
                <span className="text-sm">Processing Power</span>
                <Badge variant={processingPower > 50 ? 'default' : 'destructive'}>
                  {processingPower.toFixed(1)}%
                </Badge>
              </div>
              <Progress value={processingPower} className="mb-4" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center text-sm">
                  <Activity className="mr-2 h-4 w-4 text-green-500" />
                  Neural Network
                </span>
                <Badge variant="outline">Online</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="flex items-center text-sm">
                  <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                  Cognitive Matrix
                </span>
                <Badge variant="outline">Stable</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="flex items-center text-sm">
                  <MessageCircle className="mr-2 h-4 w-4 text-blue-500" />
                  Language Processing
                </span>
                <Badge variant="outline">Active</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Neural Interface</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <Textarea
                placeholder="Enter neural query..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
              />
              <Button type="submit" disabled={isGenerating || !prompt.trim()}>
                {isGenerating ? 'Processing...' : 'Process'}
              </Button>
            </div>
            
            {response && (
              <div className="p-4 border rounded-md bg-muted/50 whitespace-pre-wrap">
                {response}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrainCore;
