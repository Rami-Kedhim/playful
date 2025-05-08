
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { lucieOrchestrator } from '@/core/LucieOrchestratorAdapter';
import { ModerateContentParams } from '@/types/core-systems';

const LucieAIAssistant = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isContentSafe, setIsContentSafe] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Check content moderation
      const params: ModerateContentParams = {
        content: input,
        contentType: "text",
        context: {} // Empty context object
      };
      
      const isSafe = await lucieOrchestrator.isSafeContent(input);
      setIsContentSafe(isSafe);
      
      if (isSafe) {
        const result = await lucieOrchestrator.generateContent(input);
        setResponse(result);
      } else {
        setResponse("I'm sorry, but I can't respond to that type of content.");
      }
    } catch (error) {
      console.error("Error generating AI response:", error);
      setResponse("Sorry, I encountered an error processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-medium mb-4">Lucie AI Assistant</h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ask Lucie something..."
            disabled={isLoading}
          />
        </div>
        
        <Button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? "Processing..." : "Ask Lucie"}
        </Button>
      </form>
      
      {response && (
        <div className={`p-3 rounded ${isContentSafe ? 'bg-green-50' : 'bg-red-50'}`}>
          <h3 className="font-medium mb-1">{isContentSafe ? "Response:" : "Content Moderated:"}</h3>
          <p className="text-gray-700">{response}</p>
        </div>
      )}
    </div>
  );
};

export default LucieAIAssistant;
