
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const HF_API_KEY = Deno.env.get('HUGGINGFACE_API_KEY');
    
    if (!HF_API_KEY) {
      throw new Error('HUGGINGFACE_API_KEY environment variable not set');
    }

    // Parse request body
    const { 
      prompt,
      model = 'stablediffusionapi/realistic-vision-v5',
      guidance_scale = 7.5,
      num_inference_steps = 30,
      negative_prompt = "deformed, bad anatomy, disfigured, poorly drawn, extra limbs, blurry, watermark, logo, bad lighting"
    } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { 
          status: 400, 
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    console.log(`Generating image with prompt: ${prompt}`);
    console.log(`Using model: ${model}`);

    // Make request to Hugging Face API
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          guidance_scale,
          num_inference_steps,
          negative_prompt
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
