
import React, { useState, useEffect } from 'react';
import { neuralHub, brainHub } from '@/services/neural/HermesOxumNeuralHub';
import { lucie } from '@/core/Lucie';

interface BrainCoreProps {
  initialRequestType: 'analysis' | 'generation' | 'moderation' | 'transformation';
  inputData?: any;
  onResult?: (result: any) => void;
}

const BrainCore: React.FC<BrainCoreProps> = ({ 
  initialRequestType, 
  inputData = {},
  onResult 
}) => {
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      // Use the processRequest method with the correct structure
      const requestData = {
        type: initialRequestType,
        data: inputData
      };

      try {
        // Now properly awaiting the Promise returned by processRequest
        const result = await brainHub.processRequest(requestData);
        
        if (result.success) {
          setResponse(JSON.stringify(result.data || "Success", null, 2));
          if (onResult) {
            onResult(result.data);
          }
        } else {
          throw new Error(result.error || "Unknown error occurred");
        }
      } catch (error: any) {
        console.error("Error processing request:", error);
        setError(error.message || "Error processing request");
        setResponse("Error processing request. See console for details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [initialRequestType, inputData, onResult]);

  // Also log this interaction through Lucie for AI analysis
  useEffect(() => {
    lucie.moderateContent(`BrainCore component initialized with ${initialRequestType}`);
  }, [initialRequestType]);

  if (isLoading) {
    return (
      <div className="p-4 bg-muted rounded-md">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
          <p>Processing request...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-md">
        <h3 className="font-medium">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-card rounded-md border">
      <h3 className="font-medium mb-2">Response from BrainHub:</h3>
      <pre className="bg-muted p-3 rounded text-sm overflow-auto max-h-60">
        {response}
      </pre>
    </div>
  );
};

export default BrainCore;
