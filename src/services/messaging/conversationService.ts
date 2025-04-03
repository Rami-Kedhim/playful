
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Conversation, Message, Profile } from "@/types/messaging";

/**
 * Get all conversations for the current user
 */
export const getConversations = async (): Promise<Conversation[]> => {
  try {
    const { user } = useAuth();
    if (!user) throw new Error("User not authenticated");

    // Get all conversations where the user is a participant
    const { data: participantData, error: participantError } = await supabase
      .from("conversation_participants")
      .select("conversation_id")
      .eq("user_id", user.id);

    if (participantError) throw participantError;
    if (!participantData || participantData.length === 0) return [];

    const conversationIds = participantData.map((p) => p.conversation_id);

    // Get conversation details
    const { data: conversationsData, error: conversationsError } = await supabase
      .from("conversations")
      .select(`
        *,
        participants:conversation_participants(user_id),
        messages:messages(*)
      `)
      .in("id", conversationIds)
      .order("updated_at", { ascending: false });

    if (conversationsError) throw conversationsError;
    if (!conversationsData) return [];

    // For each conversation, get the other participant's profile
    const conversationsWithProfiles = await Promise.all(
      conversationsData.map(async (conversation) => {
        // Extract the other participant ID
        const participants = conversation.participants || [];
        const otherParticipantId = participants
          .map((p) => p.user_id)
          .find((id) => id !== user.id);

        if (!otherParticipantId) return { ...conversation, otherParticipant: null };

        // Get the other participant's profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", otherParticipantId)
          .single();

        return {
          ...conversation,
          otherParticipant: profileData || null,
        };
      })
    );

    return conversationsWithProfiles;
  } catch (error) {
    console.error("Error getting conversations:", error);
    return [];
  }
};

/**
 * Get a conversation by ID
 */
export const getConversationById = async (conversationId: string): Promise<Conversation | null> => {
  try {
    const { user } = useAuth();
    if (!user) throw new Error("User not authenticated");

    // Get conversation details
    const { data, error } = await supabase
      .from("conversations")
      .select(`
        *,
        participants:conversation_participants(user_id)
      `)
      .eq("id", conversationId)
      .single();

    if (error) throw error;
    if (!data) return null;

    // Extract the other participant ID
    const participants = data.participants || [];
    const otherParticipantId = participants
      .map((p) => p.user_id)
      .find((id) => id !== user.id);

    if (!otherParticipantId) return { ...data, otherParticipant: null };

    // Get the other participant's profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", otherParticipantId)
      .single();

    return {
      ...data,
      otherParticipant: profileData || null,
    };
  } catch (error) {
    console.error("Error getting conversation:", error);
    return null;
  }
};

/**
 * Create a new conversation with another user
 */
export const createConversation = async (otherUserId: string): Promise<string | null> => {
  try {
    const { user } = useAuth();
    if (!user) throw new Error("User not authenticated");

    // Check if a conversation already exists
    const { data: existingParticipants } = await supabase
      .from("conversation_participants")
      .select("conversation_id")
      .eq("user_id", user.id);

    if (existingParticipants && existingParticipants.length > 0) {
      const existingConversationIds = existingParticipants.map(p => p.conversation_id);
      
      const { data: otherParticipants } = await supabase
        .from("conversation_participants")
        .select("conversation_id")
        .eq("user_id", otherUserId)
        .in("conversation_id", existingConversationIds);
      
      if (otherParticipants && otherParticipants.length > 0) {
        // Conversation already exists
        return otherParticipants[0].conversation_id;
      }
    }

    // Create a new conversation
    const { data: conversationData, error: conversationError } = await supabase
      .from("conversations")
      .insert({})
      .select()
      .single();

    if (conversationError) throw conversationError;
    if (!conversationData) throw new Error("Failed to create conversation");

    const conversationId = conversationData.id;

    // Add participants
    const participants = [
      { conversation_id: conversationId, user_id: user.id },
      { conversation_id: conversationId, user_id: otherUserId }
    ];

    const { error: participantsError } = await supabase
      .from("conversation_participants")
      .insert(participants);

    if (participantsError) throw participantsError;

    return conversationId;
  } catch (error) {
    console.error("Error creating conversation:", error);
    return null;
  }
};
