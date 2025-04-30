
import { useState, useEffect } from 'react';
import { formatBoostDuration } from '@/utils/boostCalculator';
import { supabase } from '@/integrations/supabase/client';
import { PulseBoost, EnhancedBoostStatus } from '@/types/pulse-boost';

const usePulseBoostAdapter = (profileId: string) => {
  const [realtimeStatus, setRealtimeStatus] = useState<EnhancedBoostStatus | null>(null);

  useEffect(() => {
    if (!profileId) return;

    // Subscribe to changes in the pulse_boosts_active table
    const channel = supabase
      .channel('pulse-boost-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pulse_boosts_active',
          filter: `user_id=eq.${profileId}`
        },
        (payload) => {
          console.log('Pulse boost update received:', payload);
          
          // Update real-time status
          if (payload.eventType === 'DELETE') {
            setRealtimeStatus({ isActive: false });
          } else {
            const boostData = payload.new;
            if (boostData) {
              const expiresAt = boostData.expires_at ? new Date(boostData.expires_at) : new Date();
              const now = new Date();
              const diff = expiresAt.getTime() - now.getTime();
              
              if (diff > 0) {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const remainingTime = `${hours}h ${minutes}m`;

                setRealtimeStatus({
                  isActive: true,
                  startTime: new Date(boostData.started_at),
                  endTime: expiresAt,
                  remainingTime,
                  activeBoostId: boostData.boost_id,
                  packageId: boostData.boost_id // Make sure we're using boost_id for packageId
                });
              } else {
                setRealtimeStatus({ isActive: false });
              }
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profileId]);

  // Format pulse duration in a user-friendly way
  const formatPulseDuration = (duration: string): string => {
    return formatBoostDuration(duration);
  };

  const adaptPulseBoost = (pulseBoost: PulseBoost) => {
    // Transform PulseBoost to a format needed by components
    return {
      ...pulseBoost,
      formattedDuration: formatPulseDuration(pulseBoost.duration || '00:00:00')
    };
  };

  return {
    formatPulseDuration,
    adaptPulseBoost,
    realtimeStatus
  };
};

export default usePulseBoostAdapter;
