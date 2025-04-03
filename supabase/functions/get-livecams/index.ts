
// @ts-ignore: Deno specific imports
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
// @ts-ignore: Deno specific imports
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

console.log('Hello from get-livecams Supabase Edge Function!')

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

    // Get the request body
    const { country, category, limit = 24, page = 1 } = await req.json()

    // For mock/testing purposes - uncomment this to bypass the real API
    // return new Response(
    //   JSON.stringify(getMockResponse(country, category, limit, page)),
    //   { 
    //     headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    //     status: 200 
    //   }
    // )

    // Get the API key from environment variables
    // @ts-ignore: Deno namespace
    const CAM4_API_KEY = Deno.env.get('CAM4_API_KEY')
    
    if (!CAM4_API_KEY) {
      console.error('CAM4_API_KEY is not set in environment variables')
      return new Response(
        JSON.stringify({
          error: 'API key configuration error',
          models: [],
          totalCount: 0,
          page: page,
          pageSize: limit,
          hasMore: false
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }

    // Construct the API URL with query parameters
    let url = `https://tools.cam4pays.com/api/cams?apiKey=${CAM4_API_KEY}&limit=${limit}`
    
    if (country) url += `&country=${country}`
    if (category) url += `&category=${category}`
    
    // Calculate pagination offset
    const offset = (page - 1) * limit
    if (offset > 0) {
      url += `&offset=${offset}`
    }

    console.log(`Fetching cams from: ${url.replace(CAM4_API_KEY, '[REDACTED]')}`)

    // Make request to the Cam4 API
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API request failed: ${response.status} - ${errorText}`)
      
      // Return mock data when API fails
      return new Response(
        JSON.stringify(getMockResponse(country, category, limit, page)),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    const data = await response.json()
    
    // Transform the data to match our expected format if needed
    const transformedData = transformApiResponse(data, page, limit)
    
    // Log the request for analytics purposes
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

    // Return the data with CORS headers
    return new Response(
      JSON.stringify(transformedData),
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

// Helper function to transform API response to our format
function transformApiResponse(apiData: any, page: number, limit: number) {
  // Implement transformation logic based on the actual API response structure
  // This is a placeholder - modify based on actual Cam4 API response format
  const models = Array.isArray(apiData.cams) ? apiData.cams.map((cam: any) => ({
    id: cam.id || `cam-${Math.random().toString(36).substring(2, 9)}`,
    username: cam.username || cam.name || 'unknown',
    displayName: cam.displayName || cam.name || cam.username || 'Unknown Model',
    imageUrl: cam.imageUrl || cam.image || `https://picsum.photos/seed/${cam.id || Math.random()}/800/450`,
    thumbnailUrl: cam.thumbnailUrl || cam.thumbnail || `https://picsum.photos/seed/${cam.id || Math.random()}/200/200`,
    isLive: cam.isLive !== undefined ? cam.isLive : true,
    viewerCount: cam.viewerCount || cam.viewers || Math.floor(Math.random() * 1000),
    country: cam.country || 'Unknown',
    categories: cam.categories || cam.tags || ['chat'],
    age: cam.age || Math.floor(Math.random() * 10) + 20,
    language: cam.language || 'English'
  })) : [];

  return {
    models,
    totalCount: apiData.total || models.length * 10,
    page,
    pageSize: limit,
    hasMore: models.length >= limit
  };
}

// Helper function to generate mock data for development
function getMockResponse(country?: string, category?: string, limit: number = 24, page: number = 1) {
  const mockModels = [];
  
  // Generate mock data based on the provided filters
  for (let i = 0; i < limit; i++) {
    const id = `model-${page}-${i}`;
    mockModels.push({
      id,
      username: `model${page}${i}`,
      displayName: `Model ${page}${i}`,
      // Use more reliable placeholder images
      imageUrl: `https://picsum.photos/seed/${id}/800/450`,
      thumbnailUrl: `https://picsum.photos/seed/${id}/200/200`,
      isLive: Math.random() > 0.3,
      viewerCount: Math.floor(Math.random() * 1000),
      country: country || ['US', 'CA', 'UK', 'FR', 'DE'][Math.floor(Math.random() * 5)],
      categories: category ? [category] : ['chat', 'dance', 'games', 'music'][Math.floor(Math.random() * 4)].split(','),
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
}
