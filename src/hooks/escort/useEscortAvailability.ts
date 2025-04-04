
import { useState } from "react";
import { Escort, EscortAvailability } from "@/types/escort";

export const useEscortAvailability = (initialAvailability?: EscortAvailability) => {
  const [availability, setAvailability] = useState<EscortAvailability>(
    initialAvailability || { days: [], hours: "" }
  );

  const updateAvailability = (newAvailability: Partial<EscortAvailability>) => {
    setAvailability(prev => ({
      ...prev,
      ...newAvailability
    }));
  };

  const addDay = (day: string) => {
    if (availability.days?.includes(day)) return;
    
    setAvailability(prev => ({
      ...prev,
      days: [...(prev.days || []), day]
    }));
  };

  const removeDay = (day: string) => {
    setAvailability(prev => ({
      ...prev,
      days: prev.days?.filter(d => d !== day) || []
    }));
  };

  const setHours = (hours: string) => {
    setAvailability(prev => ({
      ...prev,
      hours
    }));
  };

  return {
    availability,
    updateAvailability,
    addDay,
    removeDay,
    setHours
  };
};

export default useEscortAvailability;
