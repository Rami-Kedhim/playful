import { supabase } from "@/supabase";
import { CreatorAnalytics } from "@/types/creator";

const TABLE_NAME = "creator_analytics";

/**
 * Fetches creator analytics for a given creator ID and date.
 * @param creatorId - The ID of the creator.
 * @param date - The date for which to fetch analytics.
 * @returns A promise that resolves to the creator analytics or null if not found.
 */
export const fetchCreatorAnalytics = async (
  creatorId: string,
  date: string
): Promise<CreatorAnalytics | null> => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .eq("creator_id", creatorId)
      .eq("date", date)
      .single();

    if (error) {
      console.error("Error fetching creator analytics:", error);
      return null;
    }

    return data ? {
      id: data.id,
      creatorId: data.creator_id,
      date: data.date,
      views: data.views,
      likes: data.likes,
      shares: data.shares,
      earnings: data.earnings,
      createdAt: data.created_at,
    } : null;
  } catch (error) {
    console.error("Error fetching creator analytics:", error);
    return null;
  }
};

/**
 * Updates creator analytics for a given creator ID and date.
 * @param creatorId - The ID of the creator.
 * @param date - The date for which to update analytics.
 * @param analytics - The analytics data to update.
 * @returns A promise that resolves to a boolean indicating success or failure.
 */
export const updateCreatorAnalytics = async (
  creatorId: string,
  date: string,
  analytics: Partial<CreatorAnalytics>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .update(analytics)
      .eq("creator_id", creatorId)
      .eq("date", date);

    if (error) {
      console.error("Error updating creator analytics:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error updating creator analytics:", error);
    return false;
  }
};

/**
 * Creates creator analytics for a given creator ID and date.
 * @param creatorId - The ID of the creator.
 * @param date - The date for which to create analytics.
 * @param analytics - The analytics data to create.
 * @returns A promise that resolves to a boolean indicating success or failure.
 */
export const createCreatorAnalytics = async (
  creatorId: string,
  date: string,
  analytics: Omit<CreatorAnalytics, "id" | "createdAt">
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          creator_id: creatorId,
          date: date,
          views: analytics.views,
          likes: analytics.likes,
          shares: analytics.shares,
          earnings: analytics.earnings,
        },
      ]);

    if (error) {
      console.error("Error creating creator analytics:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error creating creator analytics:", error);
    return false;
  }
};
