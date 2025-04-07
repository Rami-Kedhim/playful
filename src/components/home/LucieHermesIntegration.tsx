
/**
 * LucieHermesIntegration - Connects Lucie AI assistant with HERMES
 * This enhances the Lucie assistant with intelligence from HERMES
 */
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { useHermesInsights } from '@/hooks/useHermesInsights';
import LucieAssistant from './LucieAssistant';

export type LucieHermesIntegrationProps = {
  // Optional override to manually control Lucie visibility
  forceVisible?: boolean;
  // Optional callback when Lucie is triggered by HERMES
  onLucieTriggered?: (reason: string) => void;
};

export const LucieHermesIntegration = ({ 
  forceVisible, 
  onLucieTriggered 
}: LucieHermesIntegrationProps) => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(Boolean(forceVisible));
  const [customMessage, setCustomMessage] = useState<string | undefined>(undefined);
  
  // Connect to HERMES insights if user is logged in
  const { insights } = useHermesInsights(user?.id);
  
  // Automatically show Lucie when HERMES suggests it
  useEffect(() => {
    if (insights.isLucieEnabled) {
      setIsVisible(true);
      
      // Generate a personalized message based on HERMES insights
      let personalizedMessage = '';
      
      if (insights.boostOffer) {
        personalizedMessage = `I noticed you might be interested in a boost! I can offer you ${insights.boostOffer.value} off, but it expires in ${insights.boostOffer.expires}.`;
      } else if (insights.vrEvent) {
        personalizedMessage = `Have you heard about our ${insights.vrEvent} event? It's happening soon, and I think you'd really enjoy it!`;
      } else if (insights.recommendedProfileId) {
        personalizedMessage = `Based on your interests, I think you might like to check out profile ${insights.recommendedProfileId}. They're very popular in your area!`;
      } else {
        const displayName = user?.user_metadata?.username || user?.email?.split('@')[0] || '';
        personalizedMessage = `Hey there${displayName ? ` ${displayName}` : ''}! I noticed you've been exploring our platform. Can I help you find something specific today?`;
      }
      
      setCustomMessage(personalizedMessage);
      
      if (onLucieTriggered) {
        let reason = 'HERMES insight';
        
        if (insights.boostOffer) {
          reason = `Boost offer: ${insights.boostOffer.value}`;
        } else if (insights.vrEvent) {
          reason = `VR event: ${insights.vrEvent}`;
        }
        
        onLucieTriggered(reason);
      }
    }
  }, [insights, onLucieTriggered, user]);

  // Hide Lucie after a short delay if automatically triggered
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isVisible && insights.isLucieEnabled && !forceVisible) {
      // Auto-hide after 2 minutes unless user interacts
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 120000);
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
    <LucieAssistant 
      initiallyOpen={insights.isLucieEnabled || forceVisible}
      customInitialMessage={customMessage}
      onClose={() => setIsVisible(false)}
    />
  );
};

export default LucieHermesIntegration;
