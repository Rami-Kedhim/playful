
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface CheckoutOptions {
  priceId?: string;
  productData?: {
    name: string;
    description?: string;
    amount: number; // in cents
    images?: string[];
    metadata?: Record<string, string>;
  };
  returnUrl?: string;
  onSuccess?: (sessionId: string) => void;
  onCancel?: () => void;
}

export function usePayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create a checkout session and redirect to Stripe
  const checkout = async (options: CheckoutOptions) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate options
      if (!options.priceId && !options.productData) {
        throw new Error('Either priceId or productData must be provided');
      }

      // Call our Stripe checkout function
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          priceId: options.priceId,
          productData: options.productData,
          returnUrl: options.returnUrl
        }
      });

      if (error) {
        throw error;
      }

      if (!data?.url) {
        throw new Error('Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
      
      return { success: true };
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'An unexpected error occurred');
      
      toast.error("Payment Error", {
        description: err.message || 'Failed to initialize payment',
      });
      
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Process the result after returning from Stripe
  const processPaymentResult = () => {
    const url = new URL(window.location.href);
    const isSuccess = url.searchParams.get('success') === 'true';
    const isCanceled = url.searchParams.get('canceled') === 'true';
    const sessionId = url.searchParams.get('session_id');

    // Clear URL parameters
    if (isSuccess || isCanceled) {
      url.searchParams.delete('success');
      url.searchParams.delete('canceled');
      url.searchParams.delete('session_id');
      window.history.replaceState({}, '', url.toString());
    }

    return { isSuccess, isCanceled, sessionId };
  };

  return {
    checkout,
    processPaymentResult,
    isLoading,
    error
  };
}
