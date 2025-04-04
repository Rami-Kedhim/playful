
import { useState } from 'react';

/**
 * Custom hook to manage loading states for payouts
 */
const usePayoutLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  return {
    isLoading,
    setIsLoading,
    isSubmitting,
    setIsSubmitting
  };
};

export default usePayoutLoading;
