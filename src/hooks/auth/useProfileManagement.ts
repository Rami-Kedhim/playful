
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { UserProfile, DatabaseGender } from "@/types/auth";

export const useProfileManagement = () => {
  // Fetch user profile from profiles table
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  };

  // Validate gender to ensure it's compatible with the database
  const validateGender = (gender: string | null): DatabaseGender => {
    if (!gender || !["male", "female", "other"].includes(gender)) {
      return "other";
    }
    
    return gender as DatabaseGender;
  };

  // Update user profile
  const updateProfile = async (userId: string, updateData: any) => {
    try {
      // Create a new object with validated gender if present
      const validatedData = {
        ...updateData,
        ...(updateData.gender && { gender: validateGender(updateData.gender) })
      };

      const { error } = await supabase
        .from("profiles")
        .update(validatedData)
        .eq("id", userId);

      if (error) {
        toast({
          title: "Error updating profile",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });

      return await fetchProfile(userId);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  // Check if username is available
  const checkUsernameAvailability = async (username: string, currentUserId?: string) => {
    try {
      const query = supabase
        .from("profiles")
        .select("id")
        .eq("username", username);
      
      // If we have the current user's ID, exclude them from the check
      if (currentUserId) {
        query.neq("id", currentUserId);
      }
      
      const { data, error } = await query;

      if (error) {
        throw error;
      }
      
      return data.length === 0;
    } catch (error) {
      console.error("Error checking username availability:", error);
      return false;
    }
  };

  return { fetchProfile, updateProfile, checkUsernameAvailability, validateGender };
};
