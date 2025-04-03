
import { supabase } from "@/integrations/supabase/client";
import { LivecamModel, LivecamsFilter, LivecamsResponse } from "@/types/livecams";

// This service will handle API communication for livecams
export const fetchLivecams = async (
  filters: LivecamsFilter = {}
): Promise<LivecamsResponse> => {
  try {
    // Make an API call to our backend which will communicate with Cam4
    // We'll implement this with a Supabase Edge Function later
    const { country, category, limit = 24, page = 1 } = filters;
    
    // For development, we'll use a mock response
    // Later, we'll replace this with a real API call to our Supabase Edge Function
    
    console.log("Fetching livecams with filters:", filters);
    
    // Simulate an API call with the Supabase REST client
    const { data, error } = await supabase.functions.invoke('get-livecams', {
      body: { country, category, limit, page }
    });
    
    if (error) {
      console.error("Error fetching livecams:", error);
      throw new Error("Failed to fetch livecams");
    }
    
    return data as LivecamsResponse;
  } catch (error) {
    console.error("Livecams service error:", error);
    
    // For development/demo, return mock data when API fails
    return getMockLivecams(filters);
  }
};

// Helper function to generate mock data for development
const getMockLivecams = (filters: LivecamsFilter): LivecamsResponse => {
  const { limit = 24, page = 1 } = filters;
  const mockModels: LivecamModel[] = [];
  
  // Generate mock data based on the provided filters
  for (let i = 0; i < limit; i++) {
    const id = `model-${page}-${i}`;
    mockModels.push({
      id,
      username: `model${page}${i}`,
      displayName: `Model ${page}${i}`,
      imageUrl: `https://images.unsplash.com/photo-${1550000000 + i}?auto=format&fit=crop&w=500&h=500`,
      thumbnailUrl: `https://images.unsplash.com/photo-${1550000000 + i}?auto=format&fit=crop&w=200&h=200`,
      isLive: Math.random() > 0.3,
      viewerCount: Math.floor(Math.random() * 1000),
      country: filters.country || ['US', 'CA', 'UK', 'FR', 'DE'][Math.floor(Math.random() * 5)],
      categories: ['chat', 'dance', 'games', 'music'][Math.floor(Math.random() * 4)].split(','),
      age: 20 + Math.floor(Math.random() * 15),
      language: ['English', 'Spanish', 'French', 'German'][Math.floor(Math.random() * 4)]
    });
  }
  
  return {
    models: mockModels,
    totalCount: 1000,
    page,
    pageSize: limit,
    hasMore: page * limit < 1000
  };
};
