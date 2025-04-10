
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { uberCore } from '@/services/neural';

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

  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-sm">User Input Processing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Enter text to process through UberCore..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={processing || !initialized}
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
            ) : 'Process'}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset}
            disabled={!userInput && !result}
          >
            Reset
          </Button>
        </div>
        
        {result && (
          <Card className="mt-4">
            <CardHeader className="py-2">
              <CardTitle className="text-sm">Processing Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-3 bg-muted rounded-md">
                <p className="font-mono">{result.output || 'No output generated'}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <h4 className="text-sm font-semibold mb-1">Confidence</h4>
                  <div className="bg-primary/10 rounded-full h-2 w-full">
                    <div 
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${(result.confidence || 0) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs mt-1">
                    {Math.round((result.confidence || 0) * 100)}%
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-1">Emotional State</h4>
                  <Badge>
                    {result.emotionalState?.dominantEmotion || 'neutral'}
                  </Badge>
                  <div className="text-xs mt-1">
                    Intensity: {Math.round((result.emotionalState?.emotionIntensity || 0) * 100)}%
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-1">UI Adaptation</h4>
                  <div className="space-x-1">
                    <Badge variant="outline">
                      {result.uiAdaptation?.tone || 'standard'}
                    </Badge>
                    <Badge variant="outline">
                      {result.uiAdaptation?.visualMode || 'standard'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {!result && !processing && initialized && (
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>Enter text above to process through the UberCore architecture</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractionPanel;
