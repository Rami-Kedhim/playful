
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

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
      name = 'Sofia',
      age = '25',
      ethnicity = 'Caucasian',
      style = 'Professional',
      outfitType = 'Elegant dress',
      background = 'Luxury hotel lobby',
      settings = {}
    } = await req.json();

    // Craft safe, professional prompt
    const prompt = `Professional portrait photo of ${name}, ${age} years old, ${ethnicity} woman in ${outfitType}, ${style} style, in ${background}. Professional photograph, high resolution, detailed, clear face, soft lighting, sophisticated, elegant pose.`;
    
    // Ensure prompt is appropriate
    const safePrompt = prompt.replace(/nude|naked|explicit|sexual|nsfw/gi, 'professional');

    console.log(`Generating image with prompt: ${safePrompt}`);
    console.log(`Using model: black-forest-labs/FLUX.1-schnell`);

    // Make request to Hugging Face API
    const response = await fetch('https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: safePrompt,
        parameters: {
          negative_prompt: "nude, undressed, explicit content, nsfw, watermark, low quality, blurry",
          guidance_scale: 7.5,
          num_inference_steps: 25
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
