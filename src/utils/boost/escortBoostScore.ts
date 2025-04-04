
/**
 * Utility to calculate and update escort boost scores
 */
import { supabase } from "@/integrations/supabase/client";
import { Escort } from "@/types/escort";
import { calculateProfileCompletion } from "./profileCompletion";
import { calculateInteractionScore, calculateContentScore, getHoursSinceLastActive } from "./interactionScore";
import { calculateBoostScore, getLucoinBoostCredits, BoostFactors } from "./boostCalculation";

/**
 * Calculate a complete boost score for an escort profile
 */
export async function getEscortBoostScore(escortId: string): Promise<number> {
  try {
    // Fetch escort profile
    const { data: escort, error } = await (supabase as any)
      .from('escorts')
      .select(`
        id,
        name,
        description,
        imageUrl,
        gallery,
        videos,
        services,
        rates,
        availability,
        languages,
        location,
        verified,
        lastActive,
        verificationLevel
      `)
      .eq('id', escortId)
      .single();
      
    if (error) throw error;
    
    if (!escort) {
      return 0;
    }
    
    // Calculate all the individual scores
    const profileCompletion = calculateProfileCompletion(escort);
    const lastActiveHours = getHoursSinceLastActive(escort.lastActive);
    
    // For interaction score, we need to fetch additional data
    const { data: viewsData } = await (supabase as any)
      .from('profile_views')
      .select('count(*)')
      .eq('profile_id', escortId);
      
    const { data: messagesData } = await (supabase as any)
      .from('messages')
      .select('count(*)')
      .eq('sender_id', escortId);
      
    const { data: bookingsData } = await (supabase as any)
      .from('bookings')
      .select('count(*)')
      .eq('escort_id', escortId);
    
    const viewsCount = viewsData?.[0]?.count || 0;
    const messagesCount = messagesData?.[0]?.count || 0;
    const bookingsCount = bookingsData?.[0]?.count || 0;
    
    const interactionScore = calculateInteractionScore(
      viewsCount, 
      messagesCount, 
      bookingsCount
    );
    
    // Content score
    const galleryCount = escort.gallery?.length || 0;
    const videosCount = escort.videos?.length || 0;
    const hasDescription = !!escort.description && escort.description.length > 100;
    
    const contentScore = calculateContentScore(
      galleryCount,
      videosCount,
      hasDescription
    );
    
    // Get Lucoin boost credits
    const lucoinBoostCredits = await getLucoinBoostCredits(escortId);
    
    // Calculate final boost score
    const boostFactors: BoostFactors = {
      isVerified: escort.verified || escort.verificationLevel !== 'none',
      profileCompletion,
      lastActiveHours,
      interactionScore,
      contentScore,
      lucoinBoostCredits
    };
    
    return calculateBoostScore(boostFactors);
  } catch (error) {
    console.error("Error calculating escort boost score:", error);
    return 0;
  }
}

/**
 * Update the boost score for an escort profile in the database
 */
export async function updateEscortBoostScore(escortId: string): Promise<boolean> {
  try {
    const boostScore = await getEscortBoostScore(escortId);
    
    // Update the boost score in the escorts table
    const { error } = await (supabase as any)
      .from('escorts')
      .update({ 
        boostScore: boostScore,
        updatedAt: new Date().toISOString()
      })
      .eq('id', escortId);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error updating escort boost score:", error);
    return false;
  }
}

/**
 * Export an all-in-one function for convenience
 */
export const refreshProfileBoostScore = updateEscortBoostScore;
