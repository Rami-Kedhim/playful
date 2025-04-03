
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// Define response headers for CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";

    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set in environment variables");
    }

    // Initialize Supabase client
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Get request body
    const { 
      user_id, 
      conversation_id, 
      user_message, 
      ai_profile_id 
    } = await req.json();

    if (!user_id || !conversation_id || !user_message || !ai_profile_id) {
      throw new Error("Missing required parameters");
    }

    // Get AI profile from database
    const { data: aiProfile, error: profileError } = await supabaseAdmin
      .from("ai_profiles")
      .select("*")
      .eq("id", ai_profile_id)
      .single();

    if (profileError || !aiProfile) {
      throw new Error(`Failed to fetch AI profile: ${profileError?.message || "Profile not found"}`);
    }

    // Get recent messages from the conversation for context
    const { data: recentMessages, error: messagesError } = await supabaseAdmin
      .from("ai_messages")
      .select("*")
      .eq("conversation_id", conversation_id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (messagesError) {
      throw new Error(`Failed to fetch conversation messages: ${messagesError.message}`);
    }

    // Prepare conversation history for OpenAI
    const conversationHistory = recentMessages
      ? recentMessages
          .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
          .map(msg => ({
            role: msg.is_ai ? "assistant" : "user",
            content: msg.content
          }))
      : [];

    // Create system prompt based on AI personality
    const personalityType = aiProfile.personality?.type || "professional";
    const systemPrompt = aiProfile.systemPrompt || 
      `You are ${aiProfile.name}, a ${personalityType} ${aiProfile.age}-year-old virtual companion from ${aiProfile.location}.
       Some facts about you: ${aiProfile.bio}
       Your interests include: ${aiProfile.interests.join(", ")}
       Respond in a ${personalityType} tone. Be engaging, conversational, and stay in character.
       Keep responses concise (under 100 words) unless the user asks for more detail.
       Never mention that you are an AI, act as if you are a real person chatting.`;

    // Choose the OpenAI model based on payment tier
    const model = aiProfile.response_quality === "premium" ? "gpt-4o" : "gpt-4o-mini";

    // Call OpenAI API
    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          ...conversationHistory,
          { role: "user", content: user_message }
        ],
        max_tokens: 300,
        temperature: personalityType === "flirty" ? 0.9 : 
                     personalityType === "shy" ? 0.7 : 
                     personalityType === "dominant" ? 0.8 : 
                     personalityType === "playful" ? 0.95 : 0.75
      })
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }

    const aiResponseData = await openAIResponse.json();
    const aiResponseContent = aiResponseData.choices[0].message.content;

    // Generate a unique ID for the new message
    const messageId = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    // Check if this message requires payment
    // Get the count of messages in the conversation
    const { count: messageCount, error: countError } = await supabaseAdmin
      .from("ai_messages")
      .select("*", { count: "exact", head: true })
      .eq("conversation_id", conversation_id);

    if (countError) {
      throw new Error(`Failed to count messages: ${countError.message}`);
    }

    const FREE_MESSAGE_LIMIT = 3;
    const requiresPayment = (messageCount || 0) >= FREE_MESSAGE_LIMIT;
    const messagePrice = aiProfile.lucoin_chat_price || 5;

    // Create the AI response message object
    const aiMessage = {
      id: messageId,
      conversation_id: conversation_id,
      sender_id: ai_profile_id,
      content: aiResponseContent,
      created_at: timestamp,
      is_ai: true,
      requires_payment: requiresPayment,
      price: requiresPayment ? messagePrice : 0,
      payment_status: requiresPayment ? "pending" : undefined,
      personality_type: personalityType,
      generated_by: model === "gpt-4o" ? "premium" : "basic",
      has_read: false
    };

    // Return the response
    return new Response(
      JSON.stringify({
        message: aiMessage,
        requiresPayment,
        price: requiresPayment ? messagePrice : 0
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-ai-message function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
