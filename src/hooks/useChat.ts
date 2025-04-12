
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { Conversation, Message, Profile } from '@/types/messaging';

export function useChat(conversationId?: string) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);

  // Fetch conversations for the current user
  const fetchConversations = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      
      // Get conversations where the user is a participant
      const { data: participantData, error: participantError } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', user.id);
        
      if (participantError) throw participantError;
      
      // Extract conversation IDs
      const conversationIds = participantData.map(p => p.conversation_id);
      
      if (conversationIds.length === 0) {
        setConversations([]);
        setIsLoading(false);
        return;
      }
      
      // Get the actual conversations
      const { data: conversationsData, error: conversationsError } = await supabase
        .from('conversations')
        .select(`
          *,
          participants:conversation_participants(user_id),
          messages:messages(*)
        `)
        .in('id', conversationIds)
        .order('updated_at', { ascending: false });
        
      if (conversationsError) throw conversationsError;
      
      // Get the other participants' profiles for each conversation
      const enrichedConversations = await Promise.all(conversationsData.map(async (conversation) => {
        // Extract the IDs of other participants
        const otherParticipantIds = conversation.participants
          .filter(p => p.user_id !== user.id)
          .map(p => p.user_id);
          
        if (otherParticipantIds.length > 0) {
          // Fetch profile of the first other participant
          const { data: profileData } = await supabase
            .from('profiles')
            .select('id, username, avatar_url, full_name')
            .eq('id', otherParticipantIds[0])
            .single();
            
          return {
            ...conversation,
            otherParticipant: profileData as Profile | null,
          };
        }
        
        return {
          ...conversation,
          otherParticipant: null,
        };
      }));
      
      setConversations(enrichedConversations);
      
      // If conversationId is provided, set the active conversation
      if (conversationId) {
        const active = enrichedConversations.find(c => c.id === conversationId);
        setActiveConversation(active || null);
        if (active) {
          fetchMessages(conversationId);
        }
      }
    } catch (err: any) {
      console.error('Error fetching conversations:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, conversationId]);

  // Fetch messages for a specific conversation
  const fetchMessages = useCallback(async (convId: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles(id, username, avatar_url)
        `)
        .eq('conversation_id', convId)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      
      setMessages(data);
      
      // Mark messages as read
      await Promise.all(
        data
          .filter(message => message.sender_id !== user?.id && !message.read_at)
          .map(message => 
            supabase
              .from('messages')
              .update({ read_at: new Date().toISOString() })
              .eq('id', message.id)
          )
      );
    } catch (err: any) {
      console.error('Error fetching messages:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  // Send a message in the active conversation
  const sendMessage = useCallback(async (content: string) => {
    if (!user?.id || !activeConversation?.id) {
      setError('No active conversation');
      return null;
    }
    
    try {
      // Insert the new message
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: activeConversation.id,
          sender_id: user.id,
          content
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Update conversation timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', activeConversation.id);
      
      return data;
    } catch (err: any) {
      console.error('Error sending message:', err);
      setError(err.message);
      return null;
    }
  }, [user?.id, activeConversation?.id]);

  // Create a new conversation
  const createConversation = useCallback(async (otherUserId: string) => {
    if (!user?.id) {
      setError('User not authenticated');
      return null;
    }
    
    if (user.id === otherUserId) {
      setError('Cannot create conversation with yourself');
      return null;
    }
    
    try {
      // First check if a conversation already exists between these users
      const { data: existingParticipants } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', user.id);
        
      if (existingParticipants && existingParticipants.length > 0) {
        const existingConversationIds = existingParticipants.map(p => p.conversation_id);
        
        const { data: otherParticipants } = await supabase
          .from('conversation_participants')
          .select('conversation_id')
          .eq('user_id', otherUserId)
          .in('conversation_id', existingConversationIds);
          
        if (otherParticipants && otherParticipants.length > 0) {
          // Conversation already exists, return it
          const existingConversationId = otherParticipants[0].conversation_id;
          
          const { data: conversation } = await supabase
            .from('conversations')
            .select('*')
            .eq('id', existingConversationId)
            .single();
            
          return conversation;
        }
      }
      
      // Create new conversation
      const { data: conversation, error: conversationError } = await supabase
        .from('conversations')
        .insert({})
        .select()
        .single();
        
      if (conversationError) throw conversationError;
      
      // Add participants
      const participants = [
        { conversation_id: conversation.id, user_id: user.id },
        { conversation_id: conversation.id, user_id: otherUserId }
      ];
      
      const { error: participantsError } = await supabase
        .from('conversation_participants')
        .insert(participants);
        
      if (participantsError) throw participantsError;
      
      // Refresh conversations
      await fetchConversations();
      
      return conversation;
    } catch (err: any) {
      console.error('Error creating conversation:', err);
      setError(err.message);
      return null;
    }
  }, [user?.id, fetchConversations]);

  // Set up real-time listeners
  useEffect(() => {
    if (!user?.id) return;
    
    // Listen for new messages in the active conversation
    let messageSubscription: any;
    
    if (activeConversation?.id) {
      messageSubscription = supabase
        .channel(`messages:${activeConversation.id}`)
        .on(
          'postgres_changes',
          { 
            event: '*', 
            schema: 'public', 
            table: 'messages',
            filter: `conversation_id=eq.${activeConversation.id}`
          },
          async (payload) => {
            if (payload.eventType === 'INSERT') {
              const newMessage = payload.new as Message;
              
              // Fetch sender info
              if (newMessage.sender_id) {
                const { data: senderData } = await supabase
                  .from('profiles')
                  .select('id, username, avatar_url')
                  .eq('id', newMessage.sender_id)
                  .single();
                  
                newMessage.sender = senderData;
              }
              
              // Mark as read if from someone else
              if (newMessage.sender_id !== user.id) {
                await supabase
                  .from('messages')
                  .update({ read_at: new Date().toISOString() })
                  .eq('id', newMessage.id);
              }
              
              setMessages(prev => [...prev, newMessage]);
            } else if (payload.eventType === 'UPDATE') {
              setMessages(prev => 
                prev.map(msg => msg.id === payload.new.id ? { ...msg, ...payload.new } : msg)
              );
            }
          }
        )
        .subscribe();
    }
    
    // Listen for conversation updates
    const conversationSubscription = supabase
      .channel('conversations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations'
        },
        () => {
          // Just refetch conversations when there's a change
          fetchConversations();
        }
      )
      .subscribe();
    
    // Clean up
    return () => {
      if (messageSubscription) messageSubscription.unsubscribe();
      conversationSubscription.unsubscribe();
    };
  }, [user?.id, activeConversation?.id, fetchConversations]);

  // Initial load
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return {
    messages,
    conversations,
    activeConversation,
    isLoading,
    error,
    setActiveConversation,
    sendMessage,
    createConversation,
    fetchMessages
  };
}
