
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { lucieOrchestrator } from '@/core/LucieOrchestratorAdapter';
import { ModerateContentParams } from '@/types/core-systems';

interface BrainCoreProps {
  coreId: string;
  coreName: string;
  coreDescription?: string;
}

const BrainCore: React.FC<BrainCoreProps> = ({
  coreId,
  coreName,
  coreDescription
}) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    setResponse('');
    
    try {
      // Moderate content
      const params: ModerateContentParams = {
        content: query,
        contentType: "text"
      };
      
      const isSafe = await lucieOrchestrator.isSafeContent(query);
      
      if (isSafe) {
        // Process with brain core
        const result = await lucieOrchestrator.generateContent(
          `[${coreName}] ${query}`
        );
        setResponse(result);
      } else {
        setResponse("This query cannot be processed due to content restrictions.");
      }
    } catch (error) {
      console.error(`Error processing query with ${coreName}:`, error);
      setResponse(`Error: Unable to process your request with ${coreName}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{coreName}</CardTitle>
      </CardHeader>
      <CardContent>
        {coreDescription && <p className="mb-4 text-muted-foreground">{coreDescription}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Ask ${coreName}...`}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !query.trim()}>
              {isLoading ? "Processing..." : "Submit"}
            </Button>
          </div>
        </form>
        
        {response && (
          <div className="mt-4 p-3 bg-muted rounded">
            <p className="font-medium">Response:</p>
            <p className="mt-1">{response}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BrainCore;
