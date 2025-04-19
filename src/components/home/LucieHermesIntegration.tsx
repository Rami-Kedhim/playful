
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
  // The HermesInsight type doesn't officially have these properties, so we'll define optional here
  boost_offer?: {
    value?: string;
    expires?: string;
    category?: string;
  };
  vr_event?: { value?: string } | string;
  recommended_profile?: { value?: string } | string;
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

  // Because HermesInsight doesn't have these properties directly, search differently:
  // Look for boostOffer object inside insights with type 'boostOffer'
  const boostOfferInsight = insights.find((ins: any) => ins.type === 'boostOffer');
  const vrEventInsight = insights.find((ins: any) => ins.type === 'vrEvent');
  const recommendedProfileInsight = insights.find((ins: any) => ins.type === 'recommendedProfileId');

  // Determine if Lucie should be enabled
  const isLucieEnabled = insights.some((ins: any) => ins.type === 'lucieEnabled');

  // Safe getters for nested properties
  const boostOffer = boostOfferInsight?.boost_offer || boostOfferInsight;
  const vrEvent = vrEventInsight?.vr_event || vrEventInsight;
  const recommendedProfile = recommendedProfileInsight?.recommended_profile || recommendedProfileInsight;

  useEffect(() => {
    if (isLucieEnabled) {
      setIsVisible(true);

      let personalizedMessage = '';

      if (boostOffer && typeof boostOffer === 'object') {
        personalizedMessage = `I noticed you might be interested in a boost! I can offer you ${
          boostOffer.value || ''
        } off, but it expires in ${boostOffer.expires || ''}.`;
      } else if (vrEvent && typeof vrEvent === 'object') {
        personalizedMessage = `Have you heard about our ${vrEvent.value || 'VR'} event? It's happening soon, and I think you'd really enjoy it!`;
      } else if (recommendedProfile && typeof recommendedProfile === 'object') {
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

        if (boostOffer && typeof boostOffer === 'object') reason = `Boost offer: ${boostOffer.value || ''}`;
        else if (vrEvent && typeof vrEvent === 'object') reason = `VR event: ${vrEvent.value || ''}`;

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

