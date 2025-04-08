
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface BrainHubState {
  userPreferences: Record<string, any>;
  lastActiveModels: string[];
  autonomySettings: {
    enabled: boolean;
    level: number;
  };
  uiConfiguration: Record<string, any>;
}

interface UseBrainHubPersistenceResult {
  saveState: () => Promise<boolean>;
  loadState: () => Promise<boolean>;
  lastSaved: Date | null;
  isSaving: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook for persisting Brain Hub state to the user's profile
 * and restoring it when they return
 */
export function useBrainHubPersistence(): UseBrainHubPersistenceResult {
  const { user, isAuthenticated } = useAuth();
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Save the current Brain Hub state to the user profile
  const saveState = async (): Promise<boolean> => {
    if (!isAuthenticated || !user) {
      setError("User must be authenticated to save state");
      return false;
    }

    setIsSaving(true);
    setError(null);

    try {
      // Collect the current state
      const currentState: BrainHubState = {
        userPreferences: brainHub.getModelParameters(),
        lastActiveModels: brainHub.getModels()
          .filter(model => model.status === 'active')
          .map(model => model.id),
        autonomySettings: brainHub.getAutonomyStatus(),
        uiConfiguration: brainHub.storeInMemory('ui_config') || {}
      };

      // Save to the database
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          brain_hub_state: currentState,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) {
        throw new Error(updateError.message);
      }

      setLastSaved(new Date());
      return true;
    } catch (err: any) {
      console.error("Error saving Brain Hub state:", err);
      setError(err.message || "Failed to save state");
      toast({
        title: "Save Failed",
        description: "Could not save your Brain Hub configuration",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Load the Brain Hub state from the user profile
  const loadState = async (): Promise<boolean> => {
    if (!isAuthenticated || !user) {
      setError("User must be authenticated to load state");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch from the database
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('brain_hub_state')
        .eq('id', user.id)
        .single();

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      if (!data?.brain_hub_state) {
        // No saved state found, but this is not an error
        return false;
      }

      const savedState = data.brain_hub_state as BrainHubState;

      // Apply the saved state
      if (savedState.userPreferences) {
        brainHub.updateModelParameters(savedState.userPreferences);
      }

      if (savedState.autonomySettings) {
        if (savedState.autonomySettings.enabled) {
          brainHub.enableAutonomy();
        } else {
          brainHub.disableAutonomy();
        }
        brainHub.setAutonomyLevel(savedState.autonomySettings.level);
      }

      // Store UI configuration in memory
      if (savedState.uiConfiguration) {
        brainHub.storeInMemory('ui_config', savedState.uiConfiguration);
      }

      toast({
        title: "Configuration Restored",
        description: "Your Brain Hub settings have been loaded",
      });

      return true;
    } catch (err: any) {
      console.error("Error loading Brain Hub state:", err);
      setError(err.message || "Failed to load state");
      toast({
        title: "Load Failed",
        description: "Could not load your Brain Hub configuration",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-save when user makes significant changes
  useEffect(() => {
    if (!isAuthenticated) return;

    // Set up event listeners for auto-saving
    const autoSaveHandler = () => {
      // Only auto-save if the last save was more than 5 minutes ago
      if (!lastSaved || (new Date().getTime() - lastSaved.getTime() > 5 * 60 * 1000)) {
        saveState();
      }
    };

    // Subscribe to Brain Hub events that should trigger auto-save
    brainHub.addObserver(autoSaveHandler);

    return () => {
      brainHub.removeObserver(autoSaveHandler);
    };
  }, [isAuthenticated, lastSaved]);

  return {
    saveState,
    loadState,
    lastSaved,
    isSaving,
    isLoading,
    error
  };
}

export default useBrainHubPersistence;
