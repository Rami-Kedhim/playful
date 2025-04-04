
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { EscortAvailability } from "@/types/escort";

/**
 * Custom hook for managing escort availability
 */
export const useEscortAvailability = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Create availability slot
   */
  const createAvailabilitySlot = async (
    escortId: string,
    date: string,
    startTime: string,
    endTime: string,
    isRecurring: boolean = false,
    recurringDays?: string[]
  ) => {
    try {
      setLoading(true);
      setError(null);

      const newSlot: Omit<EscortAvailability, 'id'> = {
        escortId,
        date,
        startTime,
        endTime,
        isBooked: false,
        isRecurring,
        recurringDays
      };

      // Use the any type to bypass TypeScript checks
      const { data, error } = await (supabase as any)
        .from('escort_availability')
        .insert([newSlot])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Availability added",
        description: "Your availability slot has been added",
      });
      
      return data;
    } catch (err: any) {
      console.error("Error creating availability slot:", err);
      setError(err.message || "Failed to create availability slot");
      
      toast({
        title: "Error adding availability",
        description: err.message || "Failed to add availability slot",
        variant: "destructive",
      });
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update availability slot
   */
  const updateAvailabilitySlot = async (
    id: string,
    updates: Partial<EscortAvailability>
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Use the any type to bypass TypeScript checks
      const { data, error } = await (supabase as any)
        .from('escort_availability')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Availability updated",
        description: "Your availability slot has been updated",
      });
      
      return data;
    } catch (err: any) {
      console.error("Error updating availability slot:", err);
      setError(err.message || "Failed to update availability slot");
      
      toast({
        title: "Error updating availability",
        description: err.message || "Failed to update availability slot",
        variant: "destructive",
      });
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete availability slot
   */
  const deleteAvailabilitySlot = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      // Use the any type to bypass TypeScript checks
      const { error } = await (supabase as any)
        .from('escort_availability')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Availability removed",
        description: "Your availability slot has been removed",
      });
      
      return true;
    } catch (err: any) {
      console.error("Error deleting availability slot:", err);
      setError(err.message || "Failed to delete availability slot");
      
      toast({
        title: "Error removing availability",
        description: err.message || "Failed to remove availability slot",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get availability for an escort
   */
  const getEscortAvailability = async (escortId: string) => {
    try {
      setLoading(true);
      setError(null);

      // Use the any type to bypass TypeScript checks
      const { data, error } = await (supabase as any)
        .from('escort_availability')
        .select('*')
        .eq('escortId', escortId)
        .order('date', { ascending: true });

      if (error) throw error;
      
      return data as EscortAvailability[];
    } catch (err: any) {
      console.error("Error fetching escort availability:", err);
      setError(err.message || "Failed to fetch availability");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createAvailabilitySlot,
    updateAvailabilitySlot,
    deleteAvailabilitySlot,
    getEscortAvailability
  };
};

export default useEscortAvailability;
