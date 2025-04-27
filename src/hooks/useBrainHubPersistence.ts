
import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface BrainHubPersistenceOptions {
  useLocalStorage?: boolean;
  autoLoad?: boolean;
}

const useBrainHubPersistence = (options: BrainHubPersistenceOptions = {}) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const saveState = useCallback(async () => {
    setIsSaving(true);
    setError(null);

    try {
      // Simulating API call to save state
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Update last saved timestamp
      const now = new Date();
      setLastSaved(now);
      
      toast({
        title: "Configuration saved",
        description: "Brain Hub configuration has been saved successfully",
      });
      
      setIsSaving(false);
      return true;
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to save configuration';
      setError(errorMessage);
      
      toast({
        title: "Save failed",
        description: errorMessage,
        variant: "destructive"
      });
      
      setIsSaving(false);
      return false;
    }
  }, [toast]);

  const loadState = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulating API call to load state
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Configuration loaded",
        description: "Brain Hub configuration has been loaded successfully",
      });
      
      setIsLoading(false);
      return true;
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to load configuration';
      setError(errorMessage);
      
      toast({
        title: "Load failed",
        description: errorMessage,
        variant: "destructive"
      });
      
      setIsLoading(false);
      return false;
    }
  }, [toast]);

  return {
    lastSaved,
    isSaving,
    isLoading,
    error,
    saveState,
    loadState
  };
};

export default useBrainHubPersistence;
