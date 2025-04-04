
import { supabase } from "@/integrations/supabase/client";
import { LivecamModel, LivecamsFilter, LivecamsResponse } from "@/types/livecams";
import { toast } from "sonner";

// This service will handle API communication for livecams
export const fetchLivecams = async (
  filters: LivecamsFilter = {}
): Promise<LivecamsResponse> => {
  try {
    // Call the Supabase Edge Function that now returns only mock data
    const { data, error } = await supabase.functions.invoke('get-livecams', {
      body: { ...filters }
    });
    
    if (error) {
      console.error("Error fetching livecams:", error);
      toast.error("Failed to fetch livecams: " + error.message);
      throw new Error(`Failed to fetch livecams: ${error.message}`);
    }
    
    if (!data) {
      console.error("No data received from livecams API");
      throw new Error("No data received from livecams API");
    }

    console.log("Livecams data received:", data);
    
    // Validate the response structure
    if (!Array.isArray(data.models)) {
      console.error("Invalid data format received:", data);
      throw new Error("Invalid data format received from API");
    }
    
    // Process and validate the models
    const validatedModels = data.models.map((model: any) => {
      // Ensure the model has all required fields
      const validatedModel: LivecamModel = {
        id: model.id || `id-${Math.random().toString(36).substring(2)}`,
        username: model.username || 'unknown',
        displayName: model.displayName || model.username || 'Unknown',
        imageUrl: model.imageUrl || `https://picsum.photos/seed/${model.id || model.username}/800/450`,
        thumbnailUrl: model.thumbnailUrl || `https://picsum.photos/seed/${model.id || model.username}/200/200`,
        isLive: model.isLive !== undefined ? model.isLive : false,
        viewerCount: model.viewerCount !== undefined ? model.viewerCount : 0,
        country: model.country || undefined,
        categories: Array.isArray(model.categories) ? model.categories : [],
        age: model.age || undefined,
        language: model.language || undefined,
        description: model.description || undefined,
        streamUrl: model.streamUrl || undefined
      };
      
      return validatedModel;
    });
    
    return {
      models: validatedModels,
      totalCount: data.totalCount || validatedModels.length,
      page: data.page || filters.page || 1,
      pageSize: data.pageSize || filters.limit || 24,
      hasMore: data.hasMore !== undefined ? data.hasMore : false
    };
  } catch (error: any) {
    console.error("Livecams service error:", error);
    toast.error(`Error: ${error.message || "Failed to load livecams"}`);
    
    // Return mock data when API fails
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
    const seed = id + "-" + Date.now().toString().substring(8, 13);
    mockModels.push({
      id,
      username: `model${page}${i}`,
      displayName: `Model ${page}${i}`,
      imageUrl: `https://picsum.photos/seed/${seed}/800/450`,
      thumbnailUrl: `https://picsum.photos/seed/${seed}/200/200`,
      isLive: Math.random() > 0.3,
      viewerCount: Math.floor(Math.random() * 1000),
      country: filters.country || ['US', 'CA', 'UK', 'FR', 'DE'][Math.floor(Math.random() * 5)],
      categories: filters.category ? [filters.category] : ['chat', 'dance', 'games', 'music'].slice(0, Math.floor(Math.random() * 3) + 1),
      age: 20 + Math.floor(Math.random() * 15),
      language: ['English', 'Spanish', 'French', 'German'][Math.floor(Math.random() * 4)],
      description: "Welcome to my stream! I love interacting with my viewers."
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
