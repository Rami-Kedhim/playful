
import { useState } from 'react';
import { AuthResult } from '@/types/auth';

// Auth flow hook
const useAuthFlow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  // Generic wrapper for auth operations
  const executeAuthFlow = async <T extends any>(
    operation: () => Promise<AuthResult>
  ): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const result = await operation();
      
      if (result.success) {
        setSuccess(true);
        // Success notification logic here if needed
      } else {
        setError(result.error || 'An error occurred');
        // Error notification logic here if needed
      }
      
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      // Error notification logic here if needed
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Execute an auth flow and redirect on success
  const executeAuthFlowWithRedirect = async (
    operation: () => Promise<AuthResult>,
    redirectFn?: () => void
  ): Promise<void> => {
    const result = await executeAuthFlow(operation);
    
    if (result.success && redirectFn) {
      redirectFn();
    }
  };
  
  return {
    isLoading,
    error,
    success,
    executeAuthFlow,
    executeAuthFlowWithRedirect
  };
};

export default useAuthFlow;
