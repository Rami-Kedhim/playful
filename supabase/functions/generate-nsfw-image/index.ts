
// NSFW Image Generator using Hugging Face API
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

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
    const HF_TOKEN = Deno.env.get('HUGGING_FACE_API_KEY');
    
    if (!HF_TOKEN) {
      throw new Error('HUGGING_FACE_API_KEY environment variable not set');
    }

    // Parse request body
    const { 
      model = 'stablediffusionapi/realistic-vision-v5',
      name = 'Lucia',
      age = '25',
      ethnicity = 'Latina',
      style = 'Glamour',
      skinTone = 'Light',
      clothing = 'Elegant dress',
      background = 'Luxury hotel suite',
      pose = 'Seductive',
      tags = []
    } = await req.json();

    // Construct the prompt
    const prompt = `${name}, ${age} years old, ${ethnicity}, ${style} style, ${skinTone} skin tone, wearing ${clothing}, in ${background}, ${pose} pose, ${tags.join(', ')}`;

    console.log(`Generating image with prompt: ${prompt}`);
    console.log(`Using model: ${model}`);

    // Make request to Hugging Face API
    const apiUrl = `https://api-inference.huggingface.co/models/${model}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        options: {
          wait_for_model: true
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
    }

    // Get response as array buffer
    const imageData = await response.arrayBuffer();

    // Return the image
    return new Response(imageData, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  } catch (error) {
    console.error('Error generating image:', error);
    
    return new Response(
      JSON.stringify({
        error: 'Failed to generate image',
        details: error.message
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    );
  }
});
