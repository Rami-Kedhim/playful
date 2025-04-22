
/**
 * Enhanced livecamsService that uses the LivecamScraper
 */
import { supabase } from "@/integrations/supabase/client";
import { LivecamModel } from "@/types/livecams";
import { toast } from "sonner";
import { LivecamScraper } from "@/services/scrapers/LivecamScraper";

// Removed import of non-existent LivecamsFilter and LivecamsResponse types

export const fetchLivecams = async (
  filters: any = {}
): Promise<any> => {   // Use any for now due to missing types
  try {
    // Try first with the Supabase Edge Function
    try {
      const { data, error } = await supabase.functions.invoke('get-livecams', {
        body: { ...filters }
      });
      
      if (error) {
        console.error("Error fetching livecams from edge function:", error);
        throw new Error(`Edge function error: ${error.message}`);
      }
      
      if (!data) {
        console.error("No data received from livecams API");
        throw new Error("No data received from livecams API");
      }
      
      console.log("Livecams data received from edge function:", data);
      
      if (!Array.isArray(data.models)) {
        console.error("Invalid data format received:", data);
        throw new Error("Invalid data format received from API");
      }
      
      const validatedModels = data.models.map((model: any) => {
        // Validate existence of previewVideoUrl and remove it from object
        const validatedModel: LivecamModel = {
          id: model.id || `id-${Math.random().toString(36).substring(2)}`,
          name: model.name || model.username || model.displayName || 'Unknown',
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
    } catch (edgeFunctionError) {
      console.log("Edge function failed, falling back to scraper:", edgeFunctionError);

      // Removed getInstance() usage - directly use LivecamScraper.scrapeLivecams()
      // But we need to change scraper usage accordingly.
      // Since LivecamScraper now exports a method not a class singleton, adjust usage:
      
      const scrapedLivecams = await LivecamScraper.scrapeLivecams();

      // Return data in expected format with filters applied manually if needed
      return {
        models: scrapedLivecams,
        totalCount: scrapedLivecams.length,
        page: 1,
        pageSize: scrapedLivecams.length,
        hasMore: false
      };
    }
  } catch (error: any) {
    console.error("Livecams service error:", error);
    toast.error(`Error: ${error.message || "Failed to load livecams"}`);

    return getMockLivecams(filters);
  }
};

const getMockLivecams = (filters: any) => {
  const { limit = 24, page = 1 } = filters;
  const mockModels: LivecamModel[] = [];

  for (let i = 0; i < limit; i++) {
    const id = `model-${page}-${i}`;
    const seed = id + "-" + Date.now().toString().substring(8, 13);
    const username = `model${page}${i}`;
    mockModels.push({
      id,
      name: `Model ${page}${i}`,
      username,
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
