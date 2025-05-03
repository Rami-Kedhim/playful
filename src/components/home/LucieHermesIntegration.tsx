
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { useHermesInsights } from '@/hooks/useHermesInsights';
import LucieAssistant from './LucieAssistant';

export type LucieHermesIntegrationProps = {
  forceVisible?: boolean;
  onLucieTriggered?: (reason: string) => void;
};

export const LucieHermesIntegration = ({
  forceVisible = false,
  onLucieTriggered,
}: LucieHermesIntegrationProps) => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(Boolean(forceVisible));
  const [customMessage, setCustomMessage] = useState<string | undefined>(undefined);
  const [initialized, setInitialized] = useState(false);

  // Use Hermes insights to determine if Lucie should be shown
  const { insights, reportUserAction } = useHermesInsights();
  
  // Extract relevant insights
  const boostOfferInsight = insights.find(i => i.type === 'boost');
  const vrEventInsight = insights.find(i => i.type === 'vr_event');
  const recommendationInsight = insights.find(i => i.type === 'recommendation');
  
  // Default values if we can't find proper insights
  const isLucieEnabled = insights.some(i => i.type === 'ai_enabled') || true;
  const boostOffer = boostOfferInsight?.data?.boostOffer;
  const vrEvent = vrEventInsight?.description;
  const recommendedProfileId = recommendationInsight?.data?.profileId;
  
  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);
  
  useEffect(() => {
    // Only initialize once to prevent infinite loops
    if (!initialized) {
      setInitialized(true);
      
      // For demo purposes, show Lucie based on conditions or forced visibility
      const shouldShowLucie = forceVisible || Math.random() > 0.5;
      
      if (shouldShowLucie) {
        setIsVisible(true);

        let personalizedMessage = '';

        if (boostOffer) {
          personalizedMessage = `I noticed you might be interested in a boost! I can offer you ${
            boostOffer.recommendation || ''
          } off, but it expires in ${boostOffer.duration || ''}.`;
        } else if (vrEvent) {
          personalizedMessage = `Have you heard about our ${vrEvent || 'VR'} event? It's happening soon, and I think you'd really enjoy it!`;
        } else if (recommendedProfileId) {
          personalizedMessage = `Based on your interests, I think you might like to check out profile ${
            recommendedProfileId || ''
          }. They're very popular in your area!`;
        } else {
          const displayName =
            user?.username || (user?.email ? user.email.split('@')[0] : '');
          personalizedMessage = `Hey there${displayName ? ` ${displayName}` : ''}! I noticed you've been exploring our platform. Can I help you find something specific today?`;
        }

        setCustomMessage(personalizedMessage);

        if (onLucieTriggered) {
          let reason = 'HERMES insight';

          if (boostOffer) reason = `Boost offer: ${boostOffer.recommendation || ''}`;
          else if (vrEvent) reason = `VR event: ${vrEvent || ''}`;

          onLucieTriggered(reason);
        }
        
        // Record this interaction for analytics
        if (user?.id) {
          reportUserAction('lucie-shown', 'ai_companion_interaction');
        }
      }
    }
  }, [
    user, 
    onLucieTriggered, 
    reportUserAction, 
    boostOffer, 
    vrEvent, 
    recommendedProfileId, 
    forceVisible, 
    initialized
  ]);

  // Auto-hide Lucie after 2 minutes if not forced visible
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isVisible && !forceVisible) {
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 120000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isVisible, forceVisible]);

  if (!isVisible && !forceVisible) {
    return null;
  }

  return (
    <LucieAssistant
      initiallyOpen={Boolean(forceVisible)}
      customInitialMessage={customMessage}
      onClose={handleClose}
    />
  );
};

export default LucieHermesIntegration;
