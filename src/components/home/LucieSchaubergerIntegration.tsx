
/**
 * LucieSchaubergerIntegration - Combines HERMES-OXUM with Schauberger flow principles
 * Provides a complete AI assistant experience using natural flow dynamics
 */
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { useHermesInsights } from '@/hooks/useHermesInsights';
import SchaubergerLucieAssistant from './SchaubergerLucieAssistant';
import { neuralHub } from '@/services/neural/HermesOxumNeuralHub';

export type LucieSchaubergerIntegrationProps = {
  // Optional override to manually control Lucie visibility
  forceVisible?: boolean;
  // Optional callback when Lucie is triggered by HERMES
  onLucieTriggered?: (reason: string) => void;
};

export const LucieSchaubergerIntegration = ({ 
  forceVisible, 
  onLucieTriggered 
}: LucieSchaubergerIntegrationProps) => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(Boolean(forceVisible));
  const [customMessage, setCustomMessage] = useState<string | undefined>(undefined);
  
  // Connect to HERMES insights if user is logged in
  const { insights } = useHermesInsights(user?.id);
  
  // Automatically show Lucie when HERMES suggests it (using implosive logic)
  useEffect(() => {
    if (insights.isLucieEnabled) {
      // Get system health metrics
      const healthMetrics = neuralHub.getHealthMetrics();
      
      // Apply Schauberger's implosive principle - only activate when truly beneficial
      const shouldActivate = insights.aiSuggestion?.confidence 
        ? insights.aiSuggestion.confidence > 0.7 
        : healthMetrics.userEngagement > 0.6;
      
      if (shouldActivate) {
        setIsVisible(true);
        
        // Generate a personalized message based on HERMES insights
        // with emotional engagement based on Schauberger principles
        let personalizedMessage = '';
        
        if (insights.boostOffer) {
          personalizedMessage = `I noticed you might be interested in a boost! I can offer you ${insights.boostOffer.value} off, but it expires in ${insights.boostOffer.expires}.`;
        } else if (insights.vrEvent) {
          personalizedMessage = `Have you heard about our ${insights.vrEvent} event? It's happening soon, and I think you'd really enjoy it!`;
        } else if (insights.recommendedProfileId) {
          personalizedMessage = `Based on your natural preferences, I found someone you might connect with. Would you like to check out their profile?`;
        } else if (insights.recommendedCompanionId) {
          personalizedMessage = `I sense you might enjoy connecting with one of our AI companions. They're designed to match your unique communication style.`;
        } else if (insights.aiSuggestion?.message) {
          personalizedMessage = insights.aiSuggestion.message;
        } else {
          personalizedMessage = `Hey there${user ? `, ${user.username}` : ''}! I noticed you're exploring our platform. What are you most interested in discovering today?`;
        }
        
        setCustomMessage(personalizedMessage);
        
        if (onLucieTriggered) {
          let reason = 'Schauberger flow optimization';
          
          if (insights.boostOffer) {
            reason = `Boost offer: ${insights.boostOffer.value}`;
          } else if (insights.vrEvent) {
            reason = `VR event: ${insights.vrEvent}`;
          } else if (insights.recommendedCompanionId) {
            reason = `AI companion recommendation`;
          }
          
          onLucieTriggered(reason);
        }
      }
    }
  }, [insights, onLucieTriggered, user]);

  // Auto-hide based on natural interaction flow
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isVisible && insights.isLucieEnabled && !forceVisible) {
      // Get health metrics from neural hub
      const healthMetrics = neuralHub.getHealthMetrics();
      
      // Calculate optimal timeout based on engagement (Schauberger principle)
      // Higher engagement = longer timeout
      const baseTimeout = 120000; // 2 minutes
      const engagementFactor = healthMetrics.userEngagement;
      const adjustedTimeout = baseTimeout * (1 + engagementFactor);
      
      // Auto-hide after the calculated timeout unless user interacts
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, adjustedTimeout);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isVisible, insights.isLucieEnabled, forceVisible]);

  // If not visible, don't render anything
  if (!isVisible && !forceVisible) {
    return null;
  }
  
  return (
    <SchaubergerLucieAssistant 
      initiallyOpen={insights.isLucieEnabled || forceVisible}
      customInitialMessage={customMessage}
      onClose={() => setIsVisible(false)}
    />
  );
};

export default LucieSchaubergerIntegration;
