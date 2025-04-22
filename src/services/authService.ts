// Fix usage of UserRole which is only a type, not a value

import type { UserRole } from '@/types/pulse-boost';
import { supabase } from "@/integrations/supabase/client";

// Example usage corrected from value to type-only usage
// Assuming the code attempts to validate role values or use role strings directly

export const isValidUserRole = (role: string): role is UserRole => {
  const validRoles: UserRole[] = ['client', 'escort', 'creator'];
  return validRoles.includes(role as UserRole);
};

export const getProfile = async (userId: string) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select(`
        id,
        username,
        full_name,
        avatar_url,
        website,
        updated_at,
        created_at,
        is_verified,
        profile_completeness,
        country,
        birthdate,
        gender,
        phone_number,
        is_active,
        last_active_at,
        is_boosted,
        rating,
        review_count,
        is_shadowbanned,
        is_terms_accepted,
        is_email_verified,
        is_phone_verified,
        is_id_verified,
        is_address_verified,
        is_payment_verified,
        is_subscription_active,
        subscription_level,
        subscription_expires_at,
        ubx_balance,
        lucoins_balance,
        stripe_customer_id,
        stripe_subscription_id,
        stripe_payment_method_id,
        stripe_price_id,
        role
      `)
      .eq('id', userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    return profile;
  } catch (error) {
    console.error("Error in getProfile:", error);
    return null;
  }
};

export const updateProfile = async (userId: string, updates: any) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error("Error updating profile:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return false;
  }
};

export const updateEmail = async (newEmail: string, userId: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      console.error("Error updating email:", error);
      return false;
    }

    // Optionally update the profiles table as well
    const profileUpdate = await updateProfile(userId, { email: newEmail });
    if (!profileUpdate) {
      console.error("Failed to update email in profiles table");
    }

    return true;
  } catch (error) {
    console.error("Error in updateEmail:", error);
    return false;
  }
};
