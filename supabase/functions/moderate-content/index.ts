
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ModerateContentRequest {
  text: string;
}

interface OpenAIModerationResponse {
  id: string;
  model: string;
  results: {
    flagged: boolean;
    categories: Record<string, boolean>;
    category_scores: Record<string, number>;
  }[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable not set');
    }

    // Parse request body
    const { text }: ModerateContentRequest = await req.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: 'Text to moderate is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Call OpenAI moderation API
    const response = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({ input: text }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json() as OpenAIModerationResponse;
    
    // Return moderation results
    return new Response(
      JSON.stringify({
        isSafe: !data.results[0].flagged,
        categories: data.results[0].category_scores,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in content moderation:', error);
    
    return new Response(
      JSON.stringify({
        error: 'Content moderation failed',
        details: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
