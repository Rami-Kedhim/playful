
import { supabase } from "@/integrations/supabase/client";

export const useAuthActions = (
  setIsLoading: (loading: boolean) => void,
  refreshProfile: () => Promise<void>
) => {
  const signUp = async (email: string, password: string, metadata = {}) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      
      if (error) {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, signIn, signOut };
};
