
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { type, content, theme } = await req.json()
    
    // Validate request data
    if (!type || !content) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required parameters: type and content are required' 
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Process different visual element types
    switch (type) {
      case 'image':
        // In a real implementation, this would call an image generation API
        // For now, we'll return placeholder image data based on the content
        return new Response(
          JSON.stringify({
            success: true,
            data: {
              type: 'image',
              url: `https://source.unsplash.com/random/800x600/?${encodeURIComponent(content)}`,
              alt: content
            }
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      
      case 'card':
        // Generate a card element with the provided content
        return new Response(
          JSON.stringify({
            success: true,
            data: {
              type: 'card',
              title: content.title || 'Information Card',
              description: content.description || '',
              imageUrl: content.imageUrl || `https://source.unsplash.com/random/400x200/?${encodeURIComponent(content.title || '')}`,
              actions: content.actions || []
            }
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
        
      default:
        return new Response(
          JSON.stringify({ 
            error: `Unsupported visual element type: ${type}` 
          }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
    }
  } catch (error) {
    console.error('Error processing visual element request:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process visual element request',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
