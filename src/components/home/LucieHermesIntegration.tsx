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

interface Insight {
  type: string;
  value?: string;
  expires?: string;
  category?: string;
  // other possible fields
  [key: string]: any;
}

export const LucieHermesIntegration = ({
  forceVisible,
  onLucieTriggered,
}: LucieHermesIntegrationProps) => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(Boolean(forceVisible));
  const [customMessage, setCustomMessage] = useState<string | undefined>(undefined);

  // insights is an array
  const insights: Insight[] = useHermesInsights(user?.id).insights ?? [];

  // Find specific insights by type
  const boostOffer = insights.find((ins) => ins.type === 'boostOffer');
  const vrEvent = insights.find((ins) => ins.type === 'vrEvent');
  const recommendedProfile = insights.find((ins) => ins.type === 'recommendedProfileId');

  // Determine if Lucie should be enabled
  const isLucieEnabled = insights.some((ins) => ins.type === 'lucieEnabled');

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
      }, 120000); // Auto-hide after 2 minutes
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
