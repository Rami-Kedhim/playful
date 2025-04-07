
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
    const { message, userContext, chatHistory } = await req.json()

    // Create system prompt based on the user's context
    const systemPrompt = generateSystemPrompt(userContext)

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
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
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

// Helper function to generate system prompt based on user context
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

// Helper function to process the response and extract any special UI elements
function processResponse(content) {
  // Default response object
  const response = {
    text: content,
    suggestedActions: [],
    links: [],
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
  
  // Clean up extra spaces
  response.text = response.text.trim()
  
  return response
}
