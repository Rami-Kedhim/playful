
import { useState } from "react";
import { Escort, EscortAvailability } from "@/types/escort";
import { toast } from "@/components/ui/use-toast";

interface UseEscortAvailabilityProps {
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>;
}

export const useEscortAvailability = ({ updateEscortProfile }: UseEscortAvailabilityProps) => {
  const [saving, setSaving] = useState(false);
  
  const updateAvailability = async (id: string, availability: Omit<EscortAvailability, "id">) => {
    if (!id) {
      toast({
        title: "Error updating availability",
        description: "Escort ID is required",
        variant: "destructive",
      });
      return null;
    }
    
    setSaving(true);
    
    try {
      const updatedEscort = await updateEscortProfile(id, { 
        availability 
      });
      
      setSaving(false);
      
      if (updatedEscort) {
        toast({
          title: "Availability updated",
          description: "Your availability has been updated successfully.",
        });
      }
      
      return updatedEscort;
    } catch (error) {
      console.error("Error updating availability:", error);
      setSaving(false);
      
      toast({
        title: "Error updating availability",
        description: "Failed to update availability. Please try again.",
        variant: "destructive",
      });
      
      return null;
    }
  };
  
  return {
    saving,
    updateAvailability
  };
};

export default useEscortAvailability;
