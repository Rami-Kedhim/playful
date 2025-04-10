
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, BrainCircuit, Send, RefreshCcw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { uberCore } from '@/services/neural';
import { Progress } from '@/components/ui/progress';

interface InteractionPanelProps {
  initialized: boolean;
  updateStatus: () => void;
}

const InteractionPanel: React.FC<InteractionPanelProps> = ({ initialized, updateStatus }) => {
  const [userInput, setUserInput] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Record<string, any> | null>(null);
  const { toast } = useToast();

  // Process user input through UberCore
  const handleProcessInput = async () => {
    if (!userInput.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter some text to process.",
        variant: "destructive"
      });
      return;
    }
    
    setProcessing(true);
    
    try {
      const response = await uberCore.processUserInput(
        'user-1',  // Demo user ID
        userInput,
        {
          source: 'web-interface',
          sessionId: `session-${Date.now()}`
        }
      );
      
      setResult(response);
      updateStatus();
      
      toast({
        title: "Processing Complete",
        description: `Processed with ${Math.round(response.confidence * 100)}% confidence.`
      });
    } catch (error) {
      console.error('Error processing input:', error);
      toast({
        title: "Processing Error",
        description: "An error occurred while processing your input.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  // Reset user input and results
  const handleReset = () => {
    setUserInput('');
    setResult(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !processing && initialized && userInput.trim()) {
      handleProcessInput();
    }
  };

  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-sm flex items-center">
          <BrainCircuit className="h-4 w-4 mr-2 text-primary" />
          Neural Processing Interface
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Enter text to process through UberCore..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={processing || !initialized}
            className="flex-grow"
          />
          <Button 
            onClick={handleProcessInput} 
            disabled={processing || !initialized || !userInput.trim()}
          >
            {processing ? (
              <>
                <span className="animate-spin mr-2">⚙️</span>
                Processing
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Process
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset}
            disabled={!userInput && !result}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
        
        {result && (
          <Card className="mt-4 border-t-4 border-t-primary">
            <CardHeader className="py-2">
              <CardTitle className="text-sm">Processing Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-4 bg-muted rounded-md">
                <h3 className="text-sm font-medium mb-1">Output</h3>
                <p className="font-mono text-sm whitespace-pre-wrap">{result.output || 'No output generated'}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <h4 className="text-sm font-semibold mb-1">Confidence</h4>
                  <div className="flex items-center">
                    <Progress 
                      value={(result.confidence || 0) * 100}
                      className="h-2 flex-grow mr-2"
                    />
                    <span className="text-xs font-medium">
                      {Math.round((result.confidence || 0) * 100)}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-1">Emotional State</h4>
                  <Badge className="bg-pink-500">
                    {result.emotionalState?.dominantEmotion || 'neutral'}
                  </Badge>
                  <div className="text-xs mt-1">
                    Intensity: {Math.round((result.emotionalState?.emotionIntensity || 0) * 100)}%
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-1">UI Adaptation</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-blue-500 text-blue-500">
                      Tone: {result.uiAdaptation?.tone || 'standard'}
                    </Badge>
                    <Badge variant="outline" className="border-purple-500 text-purple-500">
                      Visual: {result.uiAdaptation?.visualMode || 'standard'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {result.context && (
                <div className="mt-3">
                  <h4 className="text-sm font-semibold mb-1">Context Analysis</h4>
                  <div className="text-xs bg-muted rounded-md p-3">
                    <pre className="whitespace-pre-wrap">{JSON.stringify(result.context, null, 2)}</pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        {!result && !processing && initialized && (
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>Enter text above to process through the UberCore architecture</p>
            <p className="text-xs mt-2">Try phrases about emotions, ethical questions, or general queries</p>
          </div>
        )}
        
        {!initialized && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-md p-4 text-center text-yellow-800 dark:text-yellow-300">
            <AlertCircle className="h-5 w-5 mx-auto mb-2" />
            <p>UberCore is not initialized. Please initialize the system first.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractionPanel;
