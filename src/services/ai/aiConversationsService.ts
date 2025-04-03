
import { supabase } from "@/integrations/supabase/client";
import { AIConversation, AIMessage } from "@/types/ai-profile";
import { v4 as uuidv4 } from 'uuid';
import { mockAIProfiles } from "./aiProfilesService";

/**
 * Start or continue a conversation with an AI profile
 */
export const startAIConversation = async (
  userId: string,
  aiProfileId: string
): Promise<AIConversation> => {
  try {
    // Check if conversation already exists
    const { data: existingConversation, error: queryError } = await (supabase
      .from('ai_conversations')
      .select('*')
      .eq('user_id', userId)
      .eq('ai_profile_id', aiProfileId)
      .single() as any);
    
    if (queryError && queryError.code !== 'PGRST116') { // PGRST116 means no rows returned
      throw queryError;
    }
    
    if (existingConversation) {
      return existingConversation as AIConversation;
    }
    
    // Create new conversation
    const { data: newConversation, error: insertError } = await (supabase
      .from('ai_conversations')
      .insert({
        user_id: userId,
        ai_profile_id: aiProfileId,
        status: 'active'
      })
      .select()
      .single() as any);
    
    if (insertError) {
      throw insertError;
    }
    
    return {
      ...newConversation,
      messages: []
    } as AIConversation;
  } catch (error: any) {
    console.error("Error starting AI conversation:", error);
    
    // For development, return a mock conversation
    const mockConversationId = uuidv4();
    return {
      id: mockConversationId,
      user_id: userId,
      ai_profile_id: aiProfileId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active',
      messages: [],
      ai_profile: mockAIProfiles.find(p => p.id === aiProfileId) || undefined
    };
  }
};

/**
 * Get messages for an AI conversation
 */
export const getAIConversationMessages = async (
  conversationId: string
): Promise<AIMessage[]> => {
  try {
    const { data, error } = await (supabase
      .from('ai_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true }) as any);
    
    if (error) {
      throw error;
    }
    
    return data as AIMessage[];
  } catch (error: any) {
    console.error("Error fetching AI messages:", error);
    return [];
  }
};

/**
 * Get a conversation with all its messages
 */
export const getAIConversationWithMessages = async (
  conversationId: string
): Promise<AIConversation | null> => {
  try {
    // Get the conversation
    const { data: conversation, error: convError } = await (supabase
      .from('ai_conversations')
      .select(`
        *,
        ai_profile:ai_profiles(*)
      `)
      .eq('id', conversationId)
      .single() as any);
    
    if (convError) {
      throw convError;
    }
    
    // Get the messages
    const { data: messages, error: msgError } = await (supabase
      .from('ai_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true }) as any);
    
    if (msgError) {
      throw msgError;
    }
    
    return {
      ...conversation,
      messages: messages
    } as AIConversation;
  } catch (error: any) {
    console.error("Error fetching AI conversation:", error);
    return null;
  }
};
