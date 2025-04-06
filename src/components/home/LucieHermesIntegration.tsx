
/**
 * LucieHermesIntegration - Connects Lucie AI assistant with HERMES
 * This enhances the Lucie assistant with intelligence from HERMES
 */
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
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
  
  // Connect to HERMES insights if user is logged in
  const { insights } = useHermesInsights(user?.id);
  
  // Automatically show Lucie when HERMES suggests it
  useEffect(() => {
    if (insights.isLucieEnabled) {
      setIsVisible(true);
      
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
  }, [insights.isLucieEnabled, insights.boostOffer, insights.vrEvent, onLucieTriggered]);

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
  
  // Generate custom messages based on HERMES insights
  const getHermesCustomMessage = () => {
    if (insights.boostOffer) {
      return `I noticed you might be interested in a boost! I can offer you ${insights.boostOffer.value} off, but it expires in ${insights.boostOffer.expires}.`;
    }
    
    if (insights.vrEvent) {
      return `Have you heard about our ${insights.vrEvent} event? It's happening soon, and I think you'd really enjoy it!`;
    }
    
    return undefined; // Use default message
  };

  return (
    <LucieAssistant 
      initiallyOpen={insights.isLucieEnabled}
      customInitialMessage={getHermesCustomMessage()}
    />
  );
};

export default LucieHermesIntegration;
