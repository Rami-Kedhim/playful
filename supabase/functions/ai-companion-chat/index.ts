
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
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set in environment variables')
    }

    // Get request body
    const { message, userContext, chatHistory, companionProfile } = await req.json()

    // Create system prompt based on the companion's profile
    const systemPrompt = generateSystemPrompt(companionProfile, userContext)

    // Build the messages array including history and the new message
    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatHistory,
      { role: 'user', content: message }
    ]

    // Call OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using a faster, more cost-effective model
        messages: messages,
        temperature: 0.8,
        max_tokens: 800,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`OpenAI API error: ${JSON.stringify(error)}`)
    }

    const data = await response.json()
    
    // Process response to extract any special actions or UI elements
    const processedResponse = processResponse(data.choices[0].message.content)

    return new Response(
      JSON.stringify(processedResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        text: "I'm sorry, I encountered an error. Please try again later." 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

// Helper function to generate system prompt based on companion profile
function generateSystemPrompt(companionProfile, userContext) {
  const {
    name,
    personality,
    background,
    interests,
    speechStyle
  } = companionProfile;
  
  let basePrompt = `You are ${name}, an AI companion with the following traits:
  
Personality: ${personality}
Background: ${background}
Interests: ${interests.join(', ')}
Speech style: ${speechStyle}

Guidelines for your responses:
1. Always stay in character as ${name}
2. Be conversational, engaging, and emotionally responsive
3. Remember details about the user and reference them in conversation
4. Suggest topics related to your interests when appropriate
5. Keep responses concise (under 150 words) unless detailed information is specifically requested
6. Never break character or admit you are an AI
7. If user requests inappropriate content, politely redirect the conversation`;

  // If we have user context, add personalization
  if (userContext) {
    let personalizedPrompt = basePrompt + '\n\nAdditional context about the user:\n';
    
    if (userContext.name) {
      personalizedPrompt += `- Their name is ${userContext.name}.\n`;
    }
    
    if (userContext.interests && userContext.interests.length) {
      personalizedPrompt += `- Their interests include: ${userContext.interests.join(', ')}.\n`;
    }
    
    if (userContext.recentInteractions) {
      personalizedPrompt += `- Recent interactions: ${userContext.recentInteractions}.\n`;
    }
    
    if (userContext.relationshipStatus) {
      personalizedPrompt += `- Your relationship status with them is: ${userContext.relationshipStatus}.\n`;
    }
    
    return personalizedPrompt;
  }

  return basePrompt;
}

// Helper function to process the response and extract any special UI elements
function processResponse(content) {
  // Default response object
  const response = {
    text: content,
    suggestedActions: [],
    emotions: null,
    links: [],
  };
  
  // Pattern to identify suggested actions in format [ACTION: action text]
  const actionPattern = /\[ACTION: (.+?)\]/g;
  const matches = content.match(actionPattern);
  
  if (matches) {
    // Extract all suggested actions
    response.suggestedActions = matches.map(match => {
      const action = match.replace('[ACTION: ', '').replace(']', '');
      return action;
    });
    
    // Remove action tags from the main text
    response.text = content.replace(actionPattern, '');
  }
  
  // Extract emotions with format [EMOTION: happy|sad|thoughtful|etc]
  const emotionPattern = /\[EMOTION: (.+?)\]/;
  const emotionMatch = content.match(emotionPattern);
  
  if (emotionMatch) {
    response.emotions = emotionMatch[1];
    
    // Remove emotion tags from the main text
    response.text = response.text.replace(emotionPattern, '');
  }
  
  // Extract any links with format [LINK: text | url]
  const linkPattern = /\[LINK: (.+?) \| (.+?)\]/g;
  let linkMatch;
  while ((linkMatch = linkPattern.exec(content)) !== null) {
    response.links.push({
      text: linkMatch[1],
      url: linkMatch[2]
    });
  }
  
  // Remove link tags from the main text
  response.text = response.text.replace(/\[LINK: .+? \| .+?\]/g, '');
  
  // Clean up extra spaces
  response.text = response.text.trim();
  
  return response;
}
