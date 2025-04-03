
import { supabase } from "@/integrations/supabase/client";
import { LivecamModel, LivecamsFilter, LivecamsResponse } from "@/types/livecams";
import { toast } from "sonner";

// This service will handle API communication for livecams
export const fetchLivecams = async (
  filters: LivecamsFilter = {}
): Promise<LivecamsResponse> => {
  try {
    // Make an API call to our backend which will communicate with Cam4
    const { country, category, limit = 24, page = 1 } = filters;
    
    console.log("Fetching livecams with filters:", filters);
    
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('get-livecams', {
      body: { country, category, limit, page }
    });
    
    if (error) {
      console.error("Error fetching livecams:", error);
      toast.error("Failed to fetch livecams: " + error.message);
      throw new Error(`Failed to fetch livecams: ${error.message}`);
    }
    
    if (!data) {
      console.error("No data received from livecams API");
      toast.error("No data received from livecams API");
      throw new Error("No data received from livecams API");
    }

    console.log("Livecams data received:", data);
    return data as LivecamsResponse;
  } catch (error: any) {
    console.error("Livecams service error:", error);
    toast.error(`Error: ${error.message || "Failed to load livecams"}`);
    
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
