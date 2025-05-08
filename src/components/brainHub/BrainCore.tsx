import React, { useState } from 'react';
import { lucieAI } from '@/core/Lucie';
import { ModerateContentParams } from '@/types/core-systems';

interface BrainCoreProps {
  onStatusUpdate?: (status: string) => void;
}

const BrainCore: React.FC<BrainCoreProps> = ({ onStatusUpdate }) => {
  const [systemHealth, setSystemHealth] = useState(85);
  const [processingPower, setProcessingPower] = useState(72);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Simulate system health fluctuation
    const healthInterval = setInterval(() => {
      setSystemHealth(prevHealth => {
        const newHealth = prevHealth + (Math.random() * 2 - 1);
        return Math.max(70, Math.min(99, newHealth));
      });
    }, 5000);
    
    return () => clearInterval(healthInterval);
  }, []);

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsProcessing(true);
    if (onStatusUpdate) onStatusUpdate('Processing neural query...');
    
    try {
      // First moderate the content
      const moderationParams: ModerateContentParams = {
        content: query,
        contentType: 'text'
      };
      
      const moderation = await lucieAI.moderateContent(moderationParams);
      
      if (!moderation.safe) {
        setResponse('Neural query rejected: Content violates system parameters.');
        return;
      }
      
      // Process the query if it passed moderation
      const result = await lucieAI.generateContent(query);
      setResponse(result.content);
      
      // Simulate system working hard
      setProcessingPower(prev => Math.max(30, prev - 15));
      setTimeout(() => {
        setProcessingPower(prev => Math.min(95, prev + 25));
      }, 3000);
      
    } catch (error) {
      console.error('Neural processing error:', error);
      setResponse('Neural processing error detected. System unable to complete request.');
    } finally {
      setIsProcessing(false);
      if (onStatusUpdate) onStatusUpdate('Idle');
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
          <form onSubmit={handleQuerySubmit} className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter neural query..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isProcessing}
              />
              <Button type="submit" disabled={isProcessing || !query.trim()}>
                {isProcessing ? 'Processing...' : 'Process'}
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
