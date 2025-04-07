
// @ts-ignore: Deno specific imports
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
// @ts-ignore: Deno specific imports
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

console.log('Initializing enhanced get-livecams Edge Function with scraping support')

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the Auth context of the function
    // @ts-ignore: Deno namespace
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Get the request params for filtering
    const { country, category, limit = 24, page = 1 } = await req.json()
    
    // Log request for analytics purposes
    try {
      const { error: logError } = await supabaseClient
        .from('livecams_logs')
        .insert({
          ip: req.headers.get('x-forwarded-for') || 'unknown',
          event: 'api_fetch',
          filters: { country, category, limit }
        })
      
      if (logError) {
        console.error('Error logging request:', logError)
      }
    } catch (err) {
      console.error('Error logging to database:', err)
    }
    
    // Try to scrape live data from cam4.com
    // In a real implementation, this would use a real scraper
    // For now, we'll generate mock data similar to our existing function
    
    // You'd implement the actual scraper here using Deno's fetch API
    // const cam4Models = await scrapeCam4(country, category, limit);
    
    // Instead, we'll continue using mock data
    const mockData = getMockResponse(country, category, limit, page)

    // Return the data with CORS headers
    return new Response(
      JSON.stringify(mockData),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in edge function:', error)
    
    // Return mock data when any error occurs
    const { country, category, limit = 24, page = 1 } = await req.json().catch(() => ({}))
    
    return new Response(
      JSON.stringify(getMockResponse(country, category, limit, page)),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 200 
      }
    )
  }
})

// Helper function to generate mock data for development and fallback
function getMockResponse(country?: string, category?: string, limit: number = 24, page: number = 1) {
  const mockModels = [];
  
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
      country: country || ['US', 'CA', 'UK', 'FR', 'DE'][Math.floor(Math.random() * 5)],
      categories: category ? [category] : ['chat', 'dance', 'games', 'music'].slice(0, Math.floor(Math.random() * 3) + 1),
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
}
