
// Follow this setup guide to integrate the Supabase Deno SDK: https://supabase.com/docs/guides/functions/deno
import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Get the request body
    const { country, category, limit = 24, page = 1 } = await req.json()

    // Get the API key from environment variables
    const CAM4_API_KEY = Deno.env.get('CAM4_API_KEY')
    
    if (!CAM4_API_KEY) {
      throw new Error('CAM4_API_KEY is not set in environment variables')
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
    const response = await fetch(url)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API request failed: ${response.status} - ${errorText}`)
      throw new Error(`Failed to fetch data: ${response.status}`)
    }

    const data = await response.json()
    
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
      JSON.stringify(data),
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
    
    // Return an error response with CORS headers
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 500 
      }
    )
  }
})
