
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { lucieOrchestrator } from '@/core/LucieOrchestratorAdapter';

interface LucieAIAssistantProps {
  initialPrompt?: string;
  onGenerate?: (content: string) => void;
}

const LucieAIAssistant: React.FC<LucieAIAssistantProps> = ({
  initialPrompt = '',
  onGenerate
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    try {
      // Check content moderation if the method exists
      if (lucieOrchestrator.isSafeContent) {
        const isSafe = await lucieOrchestrator.isSafeContent(prompt);
        
        if (!isSafe) {
          setResult("I'm sorry, but I can't respond to that type of content.");
          return;
        }
      }
      
      // Generate content
      const content = await lucieOrchestrator.generateContent({ 
        prompt: prompt
      });
      
      // Handle the result as string or object
      let generatedText = '';
      if (typeof content === 'string') {
        generatedText = content;
      } else if (content && typeof content === 'object') {
        generatedText = content.toString();
      }
      
      setResult(generatedText);
      if (onGenerate) onGenerate(generatedText);
    } catch (error) {
      console.error('Error generating content:', error);
      setResult('An error occurred while generating content.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        className="resize-none"
        disabled={isLoading}
      />
      
      <Button 
        onClick={handleGenerate} 
        disabled={!prompt.trim() || isLoading}
        className="w-full"
      >
        {isLoading ? 'Generating...' : 'Generate Response'}
      </Button>
      
      {result && (
        <div className="border rounded-md p-4 bg-muted/30">
          <h3 className="font-medium mb-2">Generated Response:</h3>
          <p className="whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
};

export default LucieAIAssistant;
