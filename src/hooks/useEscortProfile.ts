
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Escort, ServiceType } from "@/types/escort";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/auth/useAuth";
import { updateEscortBoostScore } from "@/utils/boostScoreSystem";

export const useEscortProfile = (escortId?: string) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [escort, setEscort] = useState<Escort | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  /**
   * Create a new escort profile
   */
  const createEscortProfile = async (profileData: Partial<Escort>) => {
    if (!user) {
      setError("You must be logged in to create an escort profile");
      return null;
    }

    try {
      setSaving(true);
      setError(null);

      // Make sure user_id is included
      const escortData = {
        ...profileData,
        user_id: user.id,
        verified: false,
        verificationLevel: "none" as const,
        rating: 0,
        reviews: 0,
        hasVirtualContent: profileData.providesVirtualContent || false,
        providesInPersonServices: profileData.providesInPersonServices || true,
        created_at: new Date(),
        boostScore: 0 // Initialize with 0
      };

      // Use the any type to bypass TypeScript checks
      const { data, error } = await (supabase as any)
        .from('escorts')
        .insert(escortData)
        .select()
        .single();

      if (error) throw error;

      // Calculate and update the initial boost score
      if (data && data.id) {
        updateEscortBoostScore(data.id).catch(err => {
          console.error("Error updating initial boost score:", err);
        });
      }

      toast({
        title: "Profile Created",
        description: "Your escort profile has been created successfully."
      });

      setEscort(data as Escort);
      return data as Escort;
    } catch (err: any) {
      console.error("Error creating escort profile:", err);
      setError(err.message || "Failed to create escort profile");
      
      toast({
        title: "Error",
        description: err.message || "Failed to create escort profile",
        variant: "destructive"
      });
      
      return null;
    } finally {
      setSaving(false);
    }
  };

  /**
   * Update an existing escort profile
   */
  const updateEscortProfile = async (id: string, updates: Partial<Escort>) => {
    if (!user) {
      setError("You must be logged in to update an escort profile");
      return null;
    }

    try {
      setSaving(true);
      setError(null);

      // Add updated_at timestamp
      const updateData = {
        ...updates,
        updated_at: new Date()
      };

      // Use the any type to bypass TypeScript checks
      const { data, error } = await (supabase as any)
        .from('escorts')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user.id) // Ensure user can only update their own profiles
        .select()
        .single();

      if (error) throw error;

      // Update the boost score after profile updates
      updateEscortBoostScore(id).catch(err => {
        console.error("Error updating boost score after profile update:", err);
      });

      toast({
        title: "Profile Updated",
        description: "Your escort profile has been updated successfully."
      });

      setEscort(data as Escort);
      return data as Escort;
    } catch (err: any) {
      console.error("Error updating escort profile:", err);
      setError(err.message || "Failed to update escort profile");
      
      toast({
        title: "Error",
        description: err.message || "Failed to update escort profile",
        variant: "destructive"
      });
      
      return null;
    } finally {
      setSaving(false);
    }
  };

  /**
   * Add a service to an escort profile
   */
  const addService = async (id: string, service: ServiceType) => {
    if (!escort) return null;
    
    const services = escort.services || [];
    
    // Check if service already exists
    if (services.includes(service)) {
      return escort;
    }
    
    return updateEscortProfile(id, {
      services: [...services, service]
    });
  };

  /**
   * Remove a service from an escort profile
   */
  const removeService = async (id: string, service: ServiceType) => {
    if (!escort) return null;
    
    const services = escort.services || [];
    
    return updateEscortProfile(id, {
      services: services.filter(s => s !== service)
    });
  };

  /**
   * Update rates for an escort profile
   */
  const updateRates = async (id: string, rates: Escort['rates']) => {
    return updateEscortProfile(id, { rates });
  };

  /**
   * Update availability for an escort profile
   */
  const updateAvailability = async (id: string, availability: Escort['availability']) => {
    return updateEscortProfile(id, { availability });
  };

  return {
    escort,
    loading,
    saving,
    error,
    fetchEscortProfile,
    createEscortProfile,
    updateEscortProfile,
    addService,
    removeService,
    updateRates,
    updateAvailability
  };
};

export default useEscortProfile;
