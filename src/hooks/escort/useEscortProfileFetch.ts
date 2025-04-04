
import { supabase } from "@/integrations/supabase/client";
import { Escort } from "@/types/escort";
import { toast } from "@/components/ui/use-toast";
import { updateEscortBoostScore } from "@/utils/boostScoreSystem";

/**
 * Custom hook for fetching escort profile data
 */
export const useEscortProfileFetch = (
  setEscort: (escort: Escort | null) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) => {
  /**
   * Fetch an escort profile by ID
   */
  const fetchEscortProfile = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      // Use the any type to bypass TypeScript checks
      const { data, error } = await (supabase as any)
        .from('escorts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setEscort(data as Escort);
      return data as Escort;
    } catch (err: any) {
      console.error("Error fetching escort profile:", err);
      setError(err.message || "Failed to load escort profile");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { fetchEscortProfile };
};
