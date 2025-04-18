
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UberCoreService } from '@/types/ubercore';

interface InteractionPanelProps {
  service: UberCoreService;
}

const InteractionPanel: React.FC<InteractionPanelProps> = ({ service }) => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Array<{ user: string; system: string }>>([]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    setLoading(true);
    
    try {
      const systemResponse = await service.processUserInput(userInput);
      
      setResponse(systemResponse);
      setHistory(prevHistory => [
        ...prevHistory, 
        { user: userInput, system: systemResponse }
      ]);
      setUserInput('');
    } catch (error) {
      console.error('Error processing input:', error);
      setResponse('Error: Could not process your request.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <Card className="max-h-[400px] overflow-y-auto">
        <CardHeader>
          <CardTitle>Interaction History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {history.length === 0 ? (
            <p className="text-muted-foreground">No interactions yet. Send a message to start.</p>
          ) : (
            history.map((entry, index) => (
              <div key={index} className="space-y-2">
                <div className="bg-secondary/30 p-2 rounded-md">
                  <p className="text-sm font-medium">You:</p>
                  <p className="text-sm">{entry.user}</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-md">
                  <p className="text-sm font-medium">System:</p>
                  <p className="text-sm">{entry.system}</p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={loading || !userInput.trim()}>
            {loading ? 'Processing...' : 'Send'}
          </Button>
        </div>
      </form>
      
      {response && (
        <Card>
          <CardHeader>
            <CardTitle>Latest Response</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              value={response} 
              readOnly 
              className="min-h-[100px]"
            />
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigator.clipboard.writeText(response)}
            >
              Copy to Clipboard
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default InteractionPanel;
