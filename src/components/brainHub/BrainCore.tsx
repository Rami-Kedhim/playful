import React, { useState, useEffect } from 'react';
import { brainHubAutoDevOpsManager } from '../../services/neural/BrainHubAutoDevOpsManager';

interface BrainCoreProps {
  initialRequestType: string;
}

const BrainCore: React.FC<BrainCoreProps> = ({ initialRequestType }) => {
  const [response, setResponse] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      // Example of how to call a method in brainHubAutoDevOpsManager
      // Assuming processRequest takes an object with 'type' and 'data' properties
      const requestData = {
        type: initialRequestType,
        data: { /* Your request-specific data here */ }
      };

      try {
        const result = await brainHubAutoDevOpsManager.processRequest(requestData);
        setResponse(result);
      } catch (error) {
        console.error("Error processing request:", error);
        setResponse("Error processing request. See console for details.");
      }
    };

    fetchData();
  }, [initialRequestType]);

  return (
    <div>
      <p>Response from BrainHub: {response}</p>
    </div>
  );
};

export default BrainCore;
