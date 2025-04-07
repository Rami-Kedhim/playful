
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './auth/useAuth';
import unifiedBehavioralEngine, { 
  UnifiedBehavioralProfile,
  UIOptimizationSettings,
  EngagementStrategy,
  PredictiveInsight 
} from '@/services/behavioral/UnifiedBehavioralEngine';

export const useUnifiedBehavioral = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UnifiedBehavioralProfile | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalyzed, setLastAnalyzed] = useState<Date | null>(null);
  const [uiSettings, setUiSettings] = useState<UIOptimizationSettings | null>(null);
  const [engagementStrategy, setEngagementStrategy] = useState<EngagementStrategy | null>(null);
  const [insights, setInsights] = useState<PredictiveInsight[]>([]);

  // Analyze user behavior
  const analyzeUser = useCallback(async () => {
    if (!user) return null;
    
    setIsAnalyzing(true);
    try {
      const result = await unifiedBehavioralEngine.analyzeUser(user.id);
      setProfile(result);
      setLastAnalyzed(new Date());
      
      // Update related data
      setUiSettings(unifiedBehavioralEngine.getOptimalUISettings(user.id));
      setEngagementStrategy(unifiedBehavioralEngine.getEngagementStrategy(user.id));
      setInsights(unifiedBehavioralEngine.getPredictiveInsights(user.id));
      
      return result;
    } catch (error) {
      console.error('Error analyzing user behavior:', error);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, [user]);

  // Run analysis on first load and when user changes
  useEffect(() => {
    if (user && !profile) {
      analyzeUser();
    }
    
    // Update metrics periodically
    const interval = setInterval(() => {
      if (user) {
        unifiedBehavioralEngine.updateMetrics();
      }
    }, 60000); // Every minute
    
    return () => clearInterval(interval);
  }, [user, profile, analyzeUser]);

  return {
    profile,
    isAnalyzing,
    analyzeUser,
    lastAnalyzed,
    uiSettings,
    engagementStrategy,
    insights
  };
};

export default useUnifiedBehavioral;
