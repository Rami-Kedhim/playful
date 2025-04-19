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
  value?: string;
  expires?: string;
  category?: string;
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

  // Use safer property access because HermesInsight does not declare 'value' or 'expires'
  const boostOffer = insights.find((ins: Insight) => ins.type === 'boostOffer');
  const vrEvent = insights.find((ins: Insight) => ins.type === 'vrEvent');
  const recommendedProfile = insights.find((ins: Insight) => ins.type === 'recommendedProfileId');

  // Determine if Lucie should be enabled
  const isLucieEnabled = insights.some((ins: Insight) => ins.type === 'lucieEnabled');

  useEffect(() => {
    if (isLucieEnabled) {
      setIsVisible(true);

      let personalizedMessage = '';

      if (boostOffer) {
        personalizedMessage = `I noticed you might be interested in a boost! I can offer you ${
          boostOffer.value || ''
        } off, but it expires in ${boostOffer.expires || ''}.`;
      } else if (vrEvent) {
        personalizedMessage = `Have you heard about our ${vrEvent.value || vrEvent.type} event? It's happening soon, and I think you'd really enjoy it!`;
      } else if (recommendedProfile) {
        personalizedMessage = `Based on your interests, I think you might like to check out profile ${
          recommendedProfile.value || recommendedProfile.type
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
        else if (vrEvent) reason = `VR event: ${vrEvent.value || vrEvent.type}`;

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
