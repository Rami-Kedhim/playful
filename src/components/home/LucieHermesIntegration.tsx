
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { useHermesInsights } from '@/hooks/useHermesInsights';
import LucieAssistant from './LucieAssistant';

export type LucieHermesIntegrationProps = {
  forceVisible?: boolean;
  onLucieTriggered?: (reason: string) => void;
};

interface Insight {
  type: string;
  // Use index signature to allow any extra property to avoid type errors
  [key: string]: any;
}

export const LucieHermesIntegration = ({
  forceVisible,
  onLucieTriggered,
}: LucieHermesIntegrationProps) => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(Boolean(forceVisible));
  const [customMessage, setCustomMessage] = useState<string | undefined>(undefined);

  const { insights = [] } = useHermesInsights();

  // Instead of accessing boost_offer, vr_event directly, safely extract via keys and optional chaining
  const boostOfferInsight = insights.find((ins: Insight) => ins.type === 'boostOffer');
  const vrEventInsight = insights.find((ins: Insight) => ins.type === 'vrEvent');
  const recommendedProfileInsight = insights.find((ins: Insight) => ins.type === 'recommendedProfileId');

  // Determine if Lucie should be enabled
  const isLucieEnabled = insights.some((ins: Insight) => ins.type === 'lucieEnabled');

  // Safe getters for nested properties with fallback to empty object
  const boostOffer = (boostOfferInsight && typeof boostOfferInsight.boost_offer === 'object') ? boostOfferInsight.boost_offer : null;
  const vrEvent = (vrEventInsight && typeof vrEventInsight.vr_event === 'object') ? vrEventInsight.vr_event : null;
  const recommendedProfile = (recommendedProfileInsight && typeof recommendedProfileInsight.recommended_profile === 'object') ? recommendedProfileInsight.recommended_profile : null;

  useEffect(() => {
    if (isLucieEnabled) {
      setIsVisible(true);

      let personalizedMessage = '';

      if (boostOffer) {
        personalizedMessage = `I noticed you might be interested in a boost! I can offer you ${
          boostOffer.value || ''
        } off, but it expires in ${boostOffer.expires || ''}.`;
      } else if (vrEvent) {
        personalizedMessage = `Have you heard about our ${vrEvent.value || 'VR'} event? It's happening soon, and I think you'd really enjoy it!`;
      } else if (recommendedProfile) {
        personalizedMessage = `Based on your interests, I think you might like to check out profile ${
          recommendedProfile.value || ''
        }. They're very popular in your area!`;
      } else {
        const displayName =
          user?.user_metadata?.username || user?.email?.split('@')[0] || '';
        personalizedMessage = `Hey there${displayName ? ` ${displayName}` : ''}! I noticed you've been exploring our platform. Can I help you find something specific today?`;
      }

      setCustomMessage(personalizedMessage);

      if (onLucieTriggered) {
        let reason = 'HERMES insight';

        if (boostOffer) reason = `Boost offer: ${boostOffer.value || ''}`;
        else if (vrEvent) reason = `VR event: ${vrEvent.value || ''}`;

        onLucieTriggered(reason);
      }
    }
  }, [insights, isLucieEnabled, onLucieTriggered, user]);

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

