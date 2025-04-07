
// Enhanced Lucie Chat function using Schauberger flow principles
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Schauberger-inspired dynamic token allocation
function getOptimalTokenWindow(flowState: any) {
  // Default token window
  const baseTokens = 200;
  
  // Apply Schauberger principle - adjust based on flow state
  if (!flowState) return baseTokens;
  
  const { emotionalFlow, vortexStrength, resourceAllocation } = flowState;
  
  // Resource-based allocation (implosive principle - use only what's needed)
  switch(resourceAllocation) {
    case 'minimal':
      return baseTokens;
    case 'standard':
      return baseTokens * 1.5;
    case 'enhanced':
      return baseTokens * 2;
    case 'maximum':
      return baseTokens * 3;
    default:
      return baseTokens;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract request data
    const { message, userContext, chatHistory, visualCapabilities = false, flowState } = await req.json();
    
    // Validate input
    if (!message) {
      throw new Error('Message is required');
    }

    // Get API key from environment variable
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }
    
    console.log(`Processing request with flow state: ${JSON.stringify(flowState)}`);

    // Apply Schauberger flow dynamics
    const maxTokens = getOptimalTokenWindow(flowState);
    
    // Dynamic temperature based on flow state (vortex principle)
    let temperature = 0.7; // Default
    if (flowState) {
      if (flowState.emotionalFlow === 'peaking') {
        temperature = 0.9; // More creative when engagement is high
      } else if (flowState.emotionalFlow === 'declining') {
        temperature = 0.5; // More focused when re-engaging
      }
    }

    // Prepare system message with visual capabilities
    const systemMessage = {
      role: "system",
      content: `You are Lucie, a helpful and friendly personal assistant. ${
        visualCapabilities 
          ? "You can include visual elements in your responses. Use [IMAGE: description] to include an image. Use [CARD: {\"title\": \"Card Title\", \"description\": \"Card description\", \"actions\": [{\"label\": \"Action\", \"action\": \"do_something\"}]}] to include interactive cards." 
          : ""
      } Keep your responses concise and conversational.`
    };
    
    // Add Schauberger-based response guidance based on flow state
    if (flowState) {
      const flowGuidance = `Current user emotional flow: ${flowState.emotionalFlow}. ` +
        `If emotional flow is 'peaking' or 'rising', be more engaging and enthusiastic. ` +
        `If 'declining', focus on re-engaging with questions and clear value. ` +
        `If 'neutral', be friendly but straightforward.`;
      
      systemMessage.content += " " + flowGuidance;
    }

    // Prepare messages
    const messages = [
      systemMessage,
      ...(chatHistory || []),
      { role: "user", content: message }
    ];

    // Make request to OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAIApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages,
        max_tokens: maxTokens,
        temperature: temperature,
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Extract suggestions and links if they exist
    const suggestedActionsMatch = aiResponse.match(/\[SUGGESTIONS:(.*?)\]/s);
    const linksMatch = aiResponse.match(/\[LINKS:(.*?)\]/s);
    const emotionMatch = aiResponse.match(/\[EMOTION:(.*?)\]/s);
    
    // Parse cards if they exist
    const cardMatches = aiResponse.match(/\[CARD: ({.*?})\]/gs);
    const cards = cardMatches 
      ? cardMatches.map(match => {
          try {
            const cardJson = match.replace('[CARD: ', '').replace(']', '');
            return JSON.parse(cardJson);
          } catch (e) {
            console.error('Error parsing card:', e);
            return null;
          }
        }).filter(Boolean)
      : [];

    // Clean up the text
    let cleanedText = aiResponse
      .replace(/\[SUGGESTIONS:.*?\]/gs, '')
      .replace(/\[LINKS:.*?\]/gs, '')
      .replace(/\[EMOTION:.*?\]/gs, '')
      .trim();

    // Extract suggestions, links, and emotion
    const suggestedActions = suggestedActionsMatch 
      ? suggestedActionsMatch[1].split(',').map(s => s.trim())
      : [];
      
    const links = linksMatch 
      ? linksMatch[1].split(',').map(link => {
          const [text, url] = link.split('|').map(s => s.trim());
          return { text, url };
        })
      : [];
      
    const emotion = emotionMatch ? emotionMatch[1].trim() : 'neutral';

    // Prepare the response
    const responseData = {
      text: cleanedText,
      suggestedActions,
      links,
      emotion,
      cards: cards.length > 0 ? cards : undefined
    };

    // Return the response
    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error('Error in lucie-chat:', error.message);
    
    return new Response(JSON.stringify({
      error: error.message,
      text: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
      errorCode: error.message.includes('API key') ? 'CONFIG_ERROR' : 'PROCESSING_ERROR'
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
