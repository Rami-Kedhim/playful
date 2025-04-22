
// Fix BoostAnalytics type by removing non-existing 'messageRequests' property and fix correct import for Creator

import { BoostPackage, BoostStatus, BoostEligibility, BoostAnalytics } from '@/types/boost';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const getBoostPackages = async (): Promise<BoostPackage[]> => {
  try {
    const { data, error } = await supabase
      .from('boost_packages')
      .select('*')
      .order('price', { ascending: true });
    
    if (error) {
      console.error('Error fetching boost packages:', error);
      return [];
    }
    
    return data as BoostPackage[];
  } catch (error) {
    console.error('Error in getBoostPackages:', error);
    return [];
  }
};

export const getBoostStatus = async (profileId: string): Promise<BoostStatus | null> => {
  try {
    const { data, error } = await supabase
      .from('profile_boosts')
      .select('*')
      .eq('profile_id', profileId)
      .maybeSingle(); // Avoid single() to handle no rows case safely

    if (error) {
      if (error.code !== 'PGRST116') {
        console.error('Error fetching boost status:', error);
      }
      return null;
    }

    return {
      isActive: data?.is_active ?? false,
      remainingTime: data?.remaining_time,
      expiresAt: data?.expires_at,
      boost_level: data?.boost_level
    };
  } catch (error) {
    console.error('Error in getBoostStatus:', error);
    return null;
  }
};

export const checkBoostEligibility = async (profileId: string): Promise<BoostEligibility> => {
  try {
    const { data, error } = await supabase
      .rpc('check_boost_eligibility', { profile_id: profileId });

    if (error) {
      console.error('Error checking boost eligibility:', error);
      return {
        isEligible: false,
        reason: 'Error checking eligibility'
      };
    }

    return {
      isEligible: data.is_eligible,
      reason: data.reason || null
    };
  } catch (error) {
    console.error('Error in checkBoostEligibility:', error);
    return {
      isEligible: false,
      reason: 'System error'
    };
  }
};

export const purchaseBoost = async (
  profileId: string, 
  packageId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const { data, error } = await supabase
      .rpc('purchase_profile_boost', { 
        p_profile_id: profileId,
        p_package_id: packageId
      });
    
    if (error) {
      console.error('Error purchasing boost:', error);
      toast.error('Failed to purchase boost', {
        description: error.message
      });
      return {
        success: false,
        message: error.message
      };
    }
    
    toast.success('Boost purchased successfully!', {
      description: 'Your profile visibility has been increased.'
    });
    
    return {
      success: true,
      message: 'Boost purchased successfully'
    };
  } catch (error: any) {
    console.error('Error in purchaseBoost:', error);
    toast.error('Failed to purchase boost', {
      description: error.message || 'An unexpected error occurred'
    });
    return {
      success: false,
      message: error.message || 'An unexpected error occurred'
    };
  }
};

export const cancelBoost = async (
  profileId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const { data, error } = await supabase
      .rpc('cancel_profile_boost', { 
        p_profile_id: profileId
      });
    
    if (error) {
      console.error('Error canceling boost:', error);
      toast.error('Failed to cancel boost', {
        description: error.message
      });
      return {
        success: false,
        message: error.message
      };
    }
    
    toast.success('Boost canceled successfully');
    
    return {
      success: true,
      message: 'Boost canceled successfully'
    };
  } catch (error: any) {
    console.error('Error in cancelBoost:', error);
    toast.error('Failed to cancel boost', {
      description: error.message || 'An unexpected error occurred'
    });
    return {
      success: false,
      message: error.message || 'An unexpected error occurred'
    };
  }
};

export const getBoostAnalytics = async (
  profileId: string
): Promise<BoostAnalytics | null> => {
  try {
    const { data, error } = await supabase
      .rpc('get_boost_analytics', {
        p_profile_id: profileId
      });

    if (error) {
      console.error('Error fetching boost analytics:', error);
      return null;
    }

    const analyticsReport: BoostAnalytics = {
      impressions: data.impressions || 0,
      clicks: data.clicks || 0,
      bookingRequests: data.booking_requests || 0,
      clickThroughRate: data.click_through_rate || 0,
      boostROI: data.boost_roi || 0,
      periodStart: data.period_start,
      periodEnd: data.period_end
    };

    return analyticsReport;
  } catch (error) {
    console.error('Error in getBoostAnalytics:', error);
    return null;
  }
};

export const getDailyBoostUsage = async (
  profileId: string
): Promise<{ used: number; limit: number }> => {
  try {
    const { data, error } = await supabase
      .rpc('get_daily_boost_usage', { 
        p_profile_id: profileId
      });
    
    if (error) {
      console.error('Error fetching daily boost usage:', error);
      return { used: 0, limit: 3 }; // Default values
    }
    
    return {
      used: data.used || 0,
      limit: data.limit || 3
    };
  } catch (error) {
    console.error('Error in getDailyBoostUsage:', error);
    return { used: 0, limit: 3 }; // Default values
  }
};
