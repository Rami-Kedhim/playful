import { supabase } from "@/integrations/supabase/client";
import { Escort } from "@/types/escort";

/**
 * Factors that contribute to the boost score of an escort profile
 */
export type BoostFactors = {
  isVerified: boolean;           // Escort has completed ID + selfie verification
  profileCompletion: number;     // Percentage from 0 to 100
  lastActiveHours: number;       // Hours since last activity (lower is better)
  interactionScore: number;      // Normalized score from user interactions (0-100)
  contentScore: number;          // Presence and quality of content (0-100)
  lucoinBoostCredits: number;    // Amount of Lucoin used in the last 7 days
};

/**
 * Calculates a boost score (0-100) based on multiple weighted factors
 */
export function calculateBoostScore(factors: BoostFactors): number {
  const {
    isVerified,
    profileCompletion,
    lastActiveHours,
    interactionScore,
    contentScore,
    lucoinBoostCredits,
  } = factors;

  const activityScore = Math.max(0, 100 - Math.min(lastActiveHours, 72));
  const lucoinScore = Math.min(lucoinBoostCredits, 100);

  const weights = {
    verification: 0.25,
    completion: 0.20,
    activity: 0.15,
    interaction: 0.10,
    content: 0.15,
    lucoin: 0.15,
  };

  const score = 
    (isVerified ? 100 : 0) * weights.verification +
    profileCompletion * weights.completion +
    activityScore * weights.activity +
    interactionScore * weights.interaction +
    contentScore * weights.content +
    lucoinScore * weights.lucoin;

  return Math.round(score);
}

/**
 * Calculates a profile completion percentage (0-100)
 */
export function calculateProfileCompletion(escort: Escort): number {
  // Define required fields and their weights
  const fieldWeights = {
    name: 10,
    description: 15,
    imageUrl: 15,
    gallery: 10,
    services: 15,
    rates: 15,
    availability: 10,
    languages: 5,
    location: 5
  };
  
  let totalWeight = 0;
  let completedWeight = 0;
  
  // Check each field and add its weight if completed
  for (const [field, weight] of Object.entries(fieldWeights)) {
    totalWeight += weight;
    
    if (field === 'gallery') {
      // Check if gallery has at least one image
      if (escort.gallery && escort.gallery.length > 0) {
        completedWeight += weight;
      }
    } else if (field === 'services') {
      // Check if services has at least one service
      if (escort.services && escort.services.length > 0) {
        completedWeight += weight;
      }
    } else if (field === 'rates') {
      // Check if rates object has hourly rate
      if (escort.rates && escort.rates.hourly > 0) {
        completedWeight += weight;
      }
    } else if (field === 'availability') {
      // Check if availability details are provided
      if (escort.availability && typeof escort.availability === 'object' && 
          'days' in escort.availability && 
          escort.availability.days && 
          escort.availability.days.length > 0) {
        completedWeight += weight;
      }
    } else if (field === 'languages') {
      // Check if languages array has at least one language
      if (escort.languages && escort.languages.length > 0) {
        completedWeight += weight;
      }
    } else {
      // For simple string fields, check if they exist and are not empty
      if (escort[field as keyof Escort] && String(escort[field as keyof Escort]).trim() !== '') {
        completedWeight += weight;
      }
    }
  }
  
  // Calculate percentage
  return Math.round((completedWeight / totalWeight) * 100);
}

/**
 * Calculates interaction score based on views, messages, bookings
 */
export function calculateInteractionScore(
  views: number, 
  messages: number, 
  bookings: number
): number {
  // Define the max values for normalization
  const maxViews = 1000;
  const maxMessages = 200;
  const maxBookings = 50;
  
  // Calculate normalized scores (0-100 for each)
  const viewsScore = Math.min(100, (views / maxViews) * 100);
  const messagesScore = Math.min(100, (messages / maxMessages) * 100);
  const bookingsScore = Math.min(100, (bookings / maxBookings) * 100);
  
  // Apply weights (bookings are most valuable)
  return Math.round(
    (viewsScore * 0.2) + (messagesScore * 0.3) + (bookingsScore * 0.5)
  );
}

/**
 * Calculates content score based on profile media
 */
export function calculateContentScore(
  galleryCount: number,
  videosCount: number,
  hasDescription: boolean
): number {
  // Max values for normalization
  const maxGalleryImages = 20;
  const maxVideos = 5;
  
  // Calculate normalized scores
  const galleryScore = Math.min(100, (galleryCount / maxGalleryImages) * 100);
  const videosScore = Math.min(100, (videosCount / maxVideos) * 100);
  const descriptionScore = hasDescription ? 100 : 0;
  
  // Apply weights (videos are more valuable than images)
  return Math.round(
    (galleryScore * 0.4) + (videosScore * 0.4) + (descriptionScore * 0.2)
  );
}

/**
 * Get the hours since last active
 */
export function getHoursSinceLastActive(lastActiveTimestamp: string | null | undefined): number {
  if (!lastActiveTimestamp) {
    return 72; // Default to max value if no timestamp
  }
  
  const lastActive = new Date(lastActiveTimestamp);
  const now = new Date();
  const diffMs = now.getTime() - lastActive.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  
  return Math.min(72, Math.max(0, diffHours)); // Cap between 0-72 hours
}

/**
 * Calculate Lucoin boost credits used in the last 7 days
 */
export async function getLucoinBoostCredits(userId: string): Promise<number> {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    // Use a type assertion to bypass type checks for the boost history table
    const { data, error } = await (supabase as any)
      .from('boost_history')
      .select('credits_spent')
      .eq('escort_id', userId)
      .gte('created_at', sevenDaysAgo.toISOString());
      
    if (error) throw error;
    
    // Sum up all credits spent
    const totalCredits = data.reduce((sum: number, item: any) => 
      sum + (item.credits_spent || 0), 0);
      
    return totalCredits;
  } catch (error) {
    console.error("Error fetching Lucoin boost credits:", error);
    return 0;
  }
}

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
