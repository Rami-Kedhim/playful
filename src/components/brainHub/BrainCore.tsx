
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Send, Brain } from 'lucide-react';
import { lucieAI } from '@/core';
import { GenerateContentParams } from '@/types/ai-chat';

const BrainCore: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setIsLoading(true);
    
    try {
      const params: GenerateContentParams = {
        prompt: input,
        options: {
          temperature: 0.7,
          maxTokens: 500
        }
      };
      
      const response = await lucieAI.generateContent(params);
      setOutput(response.content || "I couldn't generate a response.");
      
      // Log for analytics
      console.log(`Query: ${input} | Response length: ${response.content?.length || 0}`);
      
    } catch (error) {
      console.error('Generation error:', error);
      setOutput('An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Brain Core Interface
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="prompt" className="text-sm font-medium">Your Query</label>
            <Input
              id="prompt"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your instructions or question..."
              className="min-h-[80px] resize-y"
            />
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="gap-2">
              <Send className="h-4 w-4" />
              {isLoading ? 'Processing...' : 'Submit'}
            </Button>
          </div>
        </form>
        
        {output && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">BrainCore Response:</h3>
            <div className="p-4 bg-muted rounded-md whitespace-pre-wrap">{output}</div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <span>BrainCore v1.0</span>
        <span>Powered by UberCore</span>
      </CardFooter>
    </Card>
  );
};

export default BrainCore;
