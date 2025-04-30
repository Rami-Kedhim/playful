
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedBoostStatus, PulseBoost, ActiveBoost } from '@/types/pulse-boost';
import { BoostPackage } from '@/modules/pulse-boost/types';

interface PulseBoostHookReturn {
  isLoading: boolean;
  error: string | null;
  userEconomy: {
    ubxBalance: number;
    paidBalance: number;
  } | null;
  pulseBoostPackages: BoostPackage[];
  activeBoosts: ActiveBoost[];
  purchaseBoost: (boostPackage: BoostPackage) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
}

/**
 * Hook for managing Pulse Boost functionality
 */
const usePulseBoost = (profileId?: string): PulseBoostHookReturn => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pulseBoostPackages, setPulseBoostPackages] = useState<BoostPackage[]>([]);
  const [activeBoosts, setActiveBoosts] = useState<ActiveBoost[]>([]);
  const [userEconomy, setUserEconomy] = useState<{ ubxBalance: number, paidBalance: number } | null>(null);

  // Fetch boost packages and active boosts
  useEffect(() => {
    const fetchData = async () => {
      if (!profileId) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch boost packages
        const { data: packagesData, error: packagesError } = await supabase
          .from('pulse_boost_packages')
          .select('*');

        if (packagesError) throw packagesError;

        // Fetch active boosts for this profile
        const { data: boostsData, error: boostsError } = await supabase
          .from('pulse_boosts_active')
          .select('*')
          .eq('user_id', profileId)
          .eq('status', 'active');

        if (boostsError) throw boostsError;

        // Fetch user economy data
        const { data: economyData, error: economyError } = await supabase
          .from('user_economy')
          .select('ubx_balance, paid_balance')
          .eq('user_id', profileId)
          .single();

        if (economyError && economyError.code !== 'PGRST116') {
          throw economyError;
        }

        setPulseBoostPackages(packagesData || []);
        setActiveBoosts(boostsData || []);
        setUserEconomy(economyData || { ubxBalance: 0, paidBalance: 0 });
      } catch (err: any) {
        console.error('Error fetching pulse boost data:', err);
        setError('Failed to load boost data. Please try again later.');
        toast({
          title: "Error Loading Boost Data",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [profileId, toast]);

  // Purchase a boost
  const purchaseBoost = async (boostPackage: BoostPackage): Promise<boolean> => {
    if (!profileId || !boostPackage) {
      toast({
        title: "Error",
        description: "Missing profile or boost package information",
        variant: "destructive",
      });
      return false;
    }

    try {
      // Check if user has enough balance
      if ((userEconomy?.ubxBalance || 0) < boostPackage.price_ubx) {
        toast({
          title: "Insufficient Balance",
          description: "You don't have enough UBX to purchase this boost",
          variant: "destructive",
        });
        return false;
      }

      // Calculate expiration time
      const startTime = new Date();
      const endTime = new Date();
      
      // Parse duration format (HH:MM:SS)
      const [hours, minutes, seconds] = boostPackage.duration.split(':').map(Number);
      endTime.setHours(endTime.getHours() + (hours || 0));
      endTime.setMinutes(endTime.getMinutes() + (minutes || 0));
      endTime.setSeconds(endTime.getSeconds() + (seconds || 0));

      // Insert into active boosts table
      const { data, error } = await supabase
        .from('pulse_boosts_active')
        .insert({
          user_id: profileId,
          boost_id: boostPackage.id,
          status: 'active',
          started_at: startTime.toISOString(),
          expires_at: endTime.toISOString(),
          price_ubx: boostPackage.price_ubx
        })
        .select()
        .single();

      if (error) throw error;

      // Update user's UBX balance
      const { error: balanceError } = await supabase
        .from('user_economy')
        .update({
          ubx_balance: (userEconomy?.ubxBalance || 0) - boostPackage.price_ubx
        })
        .eq('user_id', profileId);

      if (balanceError) throw balanceError;

      // Update local state
      setActiveBoosts([...activeBoosts, data]);
      setUserEconomy(prev => ({
        ...prev!,
        ubxBalance: (prev?.ubxBalance || 0) - boostPackage.price_ubx
      }));

      // Enhancement - Update the status automatically after a boost purchase
      const newStatus: EnhancedBoostStatus = {
        isActive: true,
        packageId: boostPackage.id,
        activeBoostId: data.id,
        startTime: startTime,
        endTime: endTime,
        remainingTime: boostPackage.duration,
        visibilityScore: boostPackage.visibility_increase,
        packageName: boostPackage.name,
        expiresAt: endTime
      };

      // We could dispatch an update to a global state here if needed

      toast({
        title: "Boost Activated",
        description: `Your ${boostPackage.name} has been activated successfully!`,
      });
      return true;
    } catch (err: any) {
      console.error('Error purchasing boost:', err);
      toast({
        title: "Boost Activation Failed",
        description: err.message || "An error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  // Cancel active boost
  const cancelBoost = async (): Promise<boolean> => {
    if (!profileId || activeBoosts.length === 0) {
      toast({
        title: "No Active Boosts",
        description: "There are no active boosts to cancel",
        variant: "destructive",
      });
      return false;
    }

    try {
      const activeBoost = activeBoosts[0]; // Assuming we're cancelling the first active boost

      // Update the boost status to 'cancelled'
      const { error } = await supabase
        .from('pulse_boosts_active')
        .update({ status: 'cancelled' })
        .eq('id', activeBoost.id)
        .eq('user_id', profileId);

      if (error) throw error;

      // Update local state
      setActiveBoosts(activeBoosts.filter(boost => boost.id !== activeBoost.id));

      // Enhancement - Update the status automatically after a boost cancellation
      const newStatus: EnhancedBoostStatus = {
        isActive: false,
        expiresAt: undefined
      };

      // We could dispatch an update to a global state here if needed

      toast({
        title: "Boost Cancelled",
        description: "Your boost has been cancelled successfully",
      });
      return true;
    } catch (err: any) {
      console.error('Error cancelling boost:', err);
      toast({
        title: "Cancellation Failed",
        description: err.message || "An error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    isLoading,
    error,
    userEconomy,
    pulseBoostPackages,
    activeBoosts,
    purchaseBoost,
    cancelBoost
  };
};

export default usePulseBoost;
