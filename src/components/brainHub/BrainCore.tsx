
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { lucieOrchestrator } from '@/core/LucieOrchestratorAdapter';
import { Brain } from 'lucide-react';

interface BrainCoreProps {
  onGeneratedContent?: (content: string) => void;
}

const BrainCore: React.FC<BrainCoreProps> = ({ onGeneratedContent }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleProcess = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    try {
      // First check if content is safe
      const isSafe = await lucieOrchestrator.isSafeContent(input);
      
      if (!isSafe) {
        setResult("This content cannot be processed due to safety policies.");
        return;
      }
      
      const processedContent = await lucieOrchestrator.generateContent({ prompt: input });
      setResult(processedContent);
      
      if (onGeneratedContent) {
        onGeneratedContent(processedContent);
      }
    } catch (error) {
      console.error("Error processing input:", error);
      setResult("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <Brain className="h-5 w-5" />
        <CardTitle>Brain Core</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter your prompt..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          disabled={isLoading}
        />
        
        <Button
          onClick={handleProcess}
          disabled={!input.trim() || isLoading}
          className="w-full"
        >
          {isLoading ? "Processing..." : "Process"}
        </Button>
        
        {result && (
          <div className="border rounded-md p-3 mt-4 bg-slate-50 dark:bg-slate-900">
            <h3 className="text-sm font-medium mb-2">Result:</h3>
            <div className="text-sm whitespace-pre-wrap">{result}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BrainCore;
