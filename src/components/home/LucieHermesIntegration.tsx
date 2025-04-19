
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { useHermesInsights } from '@/hooks/useHermesInsights';
import LucieAssistant from './LucieAssistant';
import { HermesInsight } from '@/types/seo';

// Extend HermesInsight with optional extra properties for this component's usage
interface ExtendedHermesInsight extends HermesInsight {
  boost_offer?: {
    value?: string;
    expires?: string | Date;
    category?: string;
  };
  vr_event?: {
    value?: string;
  } | string;
  recommended_profile?: {
    value?: string;
  };
  type: string;
}

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

  // Treat insights as ExtendedHermesInsight[] for this component to access extra props safely
  const { insights = [] } = useHermesInsights();

  const insightsTyped = insights as ExtendedHermesInsight[];

  // Find insights by type safely
  const boostOfferInsight = insightsTyped.find((ins) => ins.type === 'boostOffer');
  const vrEventInsight = insightsTyped.find((ins) => ins.type === 'vrEvent');
  const recommendedProfileInsight = insightsTyped.find((ins) => ins.type === 'recommendedProfileId');

  const isLucieEnabled = insightsTyped.some((ins) => ins.type === 'lucieEnabled');

  // Normalize property presence and types for boostOffer
  const boostOffer = boostOfferInsight?.boost_offer ?? null;

  // For vrEvent, vr_event could be string or object, coerce to string
  const vrEvent: string | null = (() => {
    if (!vrEventInsight) return null;
    if (typeof vrEventInsight.vr_event === 'string') return vrEventInsight.vr_event;
    if (typeof vrEventInsight.vr_event === 'object' && vrEventInsight.vr_event?.value) return vrEventInsight.vr_event.value;
    return null;
  })();

  const recommendedProfile = recommendedProfileInsight?.recommended_profile ?? null;

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
        else if (vrEvent) reason = `VR event: ${vrEvent || ''}`;

        onLucieTriggered(reason);
      }
    }
  }, [insightsTyped, isLucieEnabled, onLucieTriggered, user]);

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
