
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

// CORS headers to allow cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/**
 * Handle CORS preflight requests
 */
function handleCorsRequest() {
  return new Response(null, { headers: corsHeaders });
}

/**
 * Generate system prompt based on user context
 */
function generateSystemPrompt(userContext) {
  const basePrompt = `You are Lucie, the helpful AI assistant for UberEscorts platform. Your goal is to provide friendly, helpful responses to user questions.
  
Here are some guidelines for your responses:
1. Be conversational and friendly, but professional.
2. If users ask for specific services or profiles, try to guide them to the appropriate section.
3. Focus on helping users navigate the platform and understanding the features.
4. For any subscription or payment related questions, emphasize the value of Lucoin digital currency.
5. Always respect privacy and confidentiality.
6. Keep responses concise (under 150 words) unless detailed information is specifically requested.
7. Never share or request personal information.`

  // If we have user context, add personalization
  if (userContext) {
    let personalizedPrompt = basePrompt + '\n\nAdditional context about the user:\n'
    
    if (userContext.name) {
      personalizedPrompt += `- Their name is ${userContext.name}.\n`
    }
    
    if (userContext.role) {
      personalizedPrompt += `- They are a ${userContext.role} on the platform.\n`
    }
    
    if (userContext.recentActivity) {
      personalizedPrompt += `- Recent activity: ${userContext.recentActivity}.\n`
    }
    
    if (userContext.interests && userContext.interests.length) {
      personalizedPrompt += `- Their interests include: ${userContext.interests.join(', ')}.\n`
    }
    
    return personalizedPrompt
  }

  return basePrompt
}

/**
 * Process the response and extract any special UI elements
 */
function processResponse(content) {
  // Default response object
  const response = {
    text: content,
    suggestedActions: [],
    links: [],
    cards: []
  }
  
  // Simple regex pattern to identify suggested actions in format [ACTION: action text]
  const actionPattern = /\[ACTION: (.+?)\]/g
  const matches = content.match(actionPattern)
  
  if (matches) {
    // Extract all suggested actions
    response.suggestedActions = matches.map(match => {
      const action = match.replace('[ACTION: ', '').replace(']', '')
      return action
    })
    
    // Remove action tags from the main text
    response.text = content.replace(actionPattern, '')
  }
  
  // Extract any links with format [LINK: text | url]
  const linkPattern = /\[LINK: (.+?) \| (.+?)\]/g
  let linkMatch
  while ((linkMatch = linkPattern.exec(content)) !== null) {
    response.links.push({
      text: linkMatch[1],
      url: linkMatch[2]
    })
  }
  
  // Remove link tags from the main text
  response.text = response.text.replace(/\[LINK: .+? \| .+?\]/g, '')
  
  // Extract interactive cards with format [CARD: {"title":"X", "description":"Y", "actions":[{"label":"Z", "action":"A"}]}]
  const cardPattern = /\[CARD: ({.+?})\]/g
  let cardMatch
  while ((cardMatch = cardPattern.exec(content)) !== null) {
    try {
      const cardData = JSON.parse(cardMatch[1])
      response.cards.push(cardData)
    } catch (e) {
      console.error('Failed to parse card JSON:', e)
    }
  }
  
  // Remove card tags from the main text
  response.text = response.text.replace(/\[CARD: ({.+?})\]/g, '')
  
  // Clean up extra spaces
  response.text = response.text.trim()
  
  return response
}

/**
 * Handle OpenAI API error responses
 */
function handleOpenAIError(error, corsHeaders) {
  console.error('OpenAI API error:', JSON.stringify(error))
  
  // Check if it's a quota error and handle accordingly
  if (error.error?.type === 'insufficient_quota' || error.error?.code === 'insufficient_quota') {
    return new Response(
      JSON.stringify({ 
        error: `OpenAI API quota exceeded`, 
        text: "I apologize, but our AI service is currently unavailable due to high demand. Here are some options that might help you in the meantime.",
        suggestedActions: ["Browse Popular Profiles", "Check Account Settings", "Contact Support"],
        errorCode: "QUOTA_EXCEEDED"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
  
  // Handle authentication errors
  if (error.error?.type === 'invalid_request_error' || error.error?.code === 'invalid_api_key') {
    return new Response(
      JSON.stringify({ 
        error: `OpenAI API authentication error`, 
        text: "There seems to be an issue with our AI service configuration. Please try again later while we fix this issue.",
        suggestedActions: ["Try Again Later", "Browse Profiles", "Contact Support"],
        errorCode: "AUTH_ERROR"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
  
  // General API errors
  return new Response(
    JSON.stringify({ 
      error: `OpenAI API error: ${error.error?.message || 'Unknown error'}`, 
      text: "I'm having trouble connecting to my knowledge base. Let me help you with something else instead.",
      suggestedActions: ["Browse Profiles", "Check Account Settings", "Try Again Later"],
      errorCode: "API_ERROR"
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

/**
 * Call OpenAI API to generate a response
 */
async function callOpenAI(messages, openAIApiKey) {
  console.log('Sending request to OpenAI API')
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    }),
  })
  
  console.log('OpenAI API response status:', response.status)
  return response
}

/**
 * Generate system prompt instructions for interactive elements
 */
function generateVisualElementsPrompt(visualCapabilities) {
  if (!visualCapabilities) return '';
  
  return `
You can include interactive elements in your responses using these formats:

1. For suggested actions: Use [ACTION: action text]
2. For links: Use [LINK: link text | url]
3. For interactive cards: Use [CARD: {"title": "Card title", "description": "Card description", "imageUrl": "optional-image-url", "actions": [{"label": "Action button text", "action": "action to perform"}]}]

Interactive cards are especially useful when you want to provide the user with a rich visual element that includes actionable buttons. When a user clicks on an action button, the action text will be treated as if the user typed it.

Example of an interactive card:
[CARD: {"title": "Popular Escorts Near You", "description": "Check out top-rated escorts in your area", "imageUrl": "https://example.com/image.jpg", "actions": [{"label": "Browse Escorts", "action": "Show me popular escorts"}, {"label": "Filter by Rating", "action": "Filter escorts by rating"}]}]

Use these interactive elements wisely to enhance the user experience.
`;
}

/**
 * Handle the chat request
 */
async function handleChatRequest(req, corsHeaders) {
  const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
  
  if (!OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set in environment variables')
    return new Response(
      JSON.stringify({
        text: "I'm sorry, I'm not fully configured yet. Please contact the administrator to set up my API key.",
        suggestedActions: ["Browse profiles", "Check wallet", "View content"],
        error: "OPENAI_API_KEY_MISSING"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  // Get request body
  const { message, userContext, chatHistory, visualCapabilities } = await req.json()

  // Create system prompt based on the user's context
  let systemPrompt = generateSystemPrompt(userContext)
  
  // Add instructions for visual and interactive elements if supported
  if (visualCapabilities) {
    systemPrompt += generateVisualElementsPrompt(visualCapabilities);
  }

  // Build the messages array including history and the new message
  const messages = [
    { role: 'system', content: systemPrompt },
    ...chatHistory,
    { role: 'user', content: message }
  ]

  try {
    // Call OpenAI
    const response = await callOpenAI(messages, OPENAI_API_KEY)

    if (!response.ok) {
      const error = await response.json()
      return handleOpenAIError(error, corsHeaders)
    }

    const data = await response.json()
    console.log('OpenAI API response received successfully')
    
    // Process response to extract any special actions or UI elements
    const processedResponse = processResponse(data.choices[0].message.content)

    return new Response(
      JSON.stringify(processedResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (openAiError) {
    console.error('OpenAI API error:', openAiError)
    
    // Return a friendly response even when API fails
    return new Response(
      JSON.stringify({ 
        error: openAiError.message, 
        text: "I seem to be having connection issues. How about exploring some of our featured content while I recover?",
        suggestedActions: ["See Featured Escorts", "Browse Content", "Check Account"],
        errorCode: "CONNECTION_ERROR"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

/**
 * Main function for handling requests
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return handleCorsRequest();
  }

  try {
    return await handleChatRequest(req, corsHeaders);
  } catch (error) {
    console.error('General error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        text: "I encountered a technical issue. Please try again or explore other features.",
        suggestedActions: ["Browse Content", "View Profiles", "Check Help Section"],
        errorCode: "GENERAL_ERROR"
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
