
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { useHermesInsights } from '@/hooks/useHermesInsights';
import LucieAssistant from './LucieAssistant';

export type LucieHermesIntegrationProps = {
  forceVisible?: boolean;
  onLucieTriggered?: (reason: string) => void;
};

export const LucieHermesIntegration = ({
  forceVisible,
  onLucieTriggered,
}: LucieHermesIntegrationProps) => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(Boolean(forceVisible));
  const [customMessage, setCustomMessage] = useState<string | undefined>(undefined);

  // Use Hermes insights to determine if Lucie should be shown
  const { insights, recordAICompanionInteraction } = useHermesInsights(user?.id);
  
  // Check for insights that would trigger Lucie
  const isLucieEnabled = insights?.isLucieEnabled || false;
  const boostOffer = insights?.boostOffer;
  const vrEvent = insights?.vrEvent;
  const recommendedProfileId = insights?.recommendedProfileId;

  useEffect(() => {
    if (isLucieEnabled) {
      setIsVisible(true);

      let personalizedMessage = '';

      if (boostOffer) {
        personalizedMessage = `I noticed you might be interested in a boost! I can offer you ${
          boostOffer.value || ''
        } off, but it expires in ${boostOffer.expires || ''}.`;
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

        if (boostOffer) reason = `Boost offer: ${boostOffer.value || ''}`;
        else if (vrEvent) reason = `VR event: ${vrEvent || ''}`;

        onLucieTriggered(reason);
      }
      
      // Record this interaction for analytics
      if (user?.id) {
        recordAICompanionInteraction('lucie', 0, { trigger: 'hermes_insight' });
      }
    }
  }, [isLucieEnabled, boostOffer, vrEvent, recommendedProfileId, user, onLucieTriggered, recordAICompanionInteraction]);

  // Auto-hide Lucie after 2 minutes if not forced visible
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isVisible && isLucieEnabled && !forceVisible) {
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 120000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isVisible, isLucieEnabled, forceVisible]);

  if (!isVisible && !forceVisible) {
    return null;
  }

  return (
    <LucieAssistant
      initiallyOpen={isLucieEnabled || Boolean(forceVisible)}
      customInitialMessage={customMessage}
      onClose={() => setIsVisible(false)}
    />
  );
};

export default LucieHermesIntegration;
