
import React, { useState, useEffect } from 'react';
import { brainHub } from '../../services/neural/HermesOxumBrainHub';

interface BrainCoreProps {
  initialRequestType: string;
}

const BrainCore: React.FC<BrainCoreProps> = ({ initialRequestType }) => {
  const [response, setResponse] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      // Use the processRequest method with the correct structure
      const requestData = {
        type: initialRequestType,
        data: { /* Your request-specific data here */ }
      };

      try {
        const result = await brainHub.processRequest(requestData);
        setResponse(JSON.stringify(result.data || "Success"));
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
