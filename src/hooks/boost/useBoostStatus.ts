
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { BoostStatus } from '@/types/boost';

export const useBoostStatus = (profileId?: string) => {
  const [status, setStatus] = useState<BoostStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchStatus = async () => {
    if (!profileId) {
      setLoading(false);
      return;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('pulse_boosts_active')
        .select('*')
        .eq('user_id', profileId)
        .eq('status', 'active')
        .single();

      if (fetchError) throw fetchError;

      setStatus(data ? {
        isActive: true,
        startTime: data.started_at,
        endTime: data.expires_at,
        packageId: data.boost_id,
        remainingTime: data.time_remaining
      } : { isActive: false });
      
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error fetching boost status",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    
    // Set up realtime subscription for status updates
    const subscription = supabase
      .channel('boost_status_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'pulse_boosts_active',
        filter: `user_id=eq.${profileId}`,
      }, () => {
        fetchStatus();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [profileId]);

  return { status, loading, error, refetch: fetchStatus };
};
