import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Brain } from 'lucide-react';
import { lucieAI, lucieOrchestrator } from '@/core';

const BrainCore: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [sentimentScore, setSentimentScore] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const processInput = async (input: string) => {
    if (!input.trim()) return;
    
    try {
      setIsProcessing(true);
      
      if (lucieOrchestrator && typeof lucieOrchestrator.isSafeContent === 'function') {
        const safeCheck = await lucieOrchestrator.isSafeContent(input);
        if (!safeCheck.safe) {
          console.warn("Content moderation flagged the input as unsafe:", safeCheck.reason);
          setOutput(`I'm sorry, but I cannot process content that violates safety guidelines. Reason: ${safeCheck.reason}`);
          return;
        }
      }
      
      const params = {
        prompt: input,
        options: { maxTokens: 500 }
      };
      
      const response = await lucieAI.generateContent(params);
      const responseContent: string = response.text || response.content || "Unable to process your request.";
      
      setOutput(responseContent);
      
      const sentimentResult = await lucieAI.analyzeSentiment({ text: responseContent });
      
      setSentiment(sentimentResult.sentiment);
      setSentimentScore(sentimentResult.confidence || 0);
      
    } catch (error) {
      console.error("Error processing input:", error);
      setOutput("An error occurred while processing your request.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Brain Core
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter your prompt..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            className="flex-1"
          />
          <Button onClick={() => processInput(input)} disabled={isProcessing}>
            <Send className="h-4 w-4 mr-2" />
            Process
          </Button>
        </div>
        {output && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Output:</p>
            <div className="rounded-md border p-4 bg-muted/50">
              {output}
            </div>
            {sentiment && (
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Sentiment:</p>
                <Badge variant="secondary">
                  {sentiment} ({sentimentScore.toFixed(2)})
                </Badge>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BrainCore;
