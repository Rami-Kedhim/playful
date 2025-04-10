
import React, { useState, useEffect, useCallback } from 'react';
import { useAICompanionWithMemory } from '@/hooks/ai-companion/useAICompanionWithMemory';
import AICompanionChatHeader from './companion-chat/AICompanionChatHeader';
import AICompanionMessageList from './companion-chat/AICompanionMessageList';
import AICompanionChatInput from './companion-chat/AICompanionChatInput';
import AICompanionChatStyles from './companion-chat/AICompanionChatStyles';
import MinimizedChatButton from './companion-chat/MinimizedChatButton';
import { PersonalityType } from '@/types/ai-personality';
import { toast } from '@/components/ui/use-toast';
import { useBrainHubAI } from '@/hooks/ai/useBrainHubAI';

interface AICompanionChatProps {
  companionId: string;
  initiallyOpen?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  userCredits?: number;
  userId?: string;
  personalityType?: PersonalityType;
  name?: string;
  avatarUrl?: string;
}

const AICompanionChat = ({ 
  companionId, 
  initiallyOpen = true, 
  onClose,
  onMinimize,
  userCredits = 0,
  userId = 'anonymous',
  personalityType = 'flirty',
  name = 'AI Companion',
  avatarUrl
}: AICompanionChatProps) => {
  const {
    messages,
    isTyping,
    error,
    emotionalState,
    sendMessage,
    handleSuggestedActionClick,
    processPremiumContent
  } = useAICompanionWithMemory({ 
    companionId, 
    userId,
    personalityType: personalityType as PersonalityType,
    name,
    avatarUrl,
    lucoinBalance: userCredits
  });
  
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [localIsTyping, setLocalIsTyping] = useState(false);
  
  // Integrate with Brain Hub
  const brainHubAI = useBrainHubAI({
    componentId: `ai-companion-${companionId}`,
    capabilities: [
      "personality_enhancement",
      "emotion_tracking",
      "message_personalization",
      "interaction_memory"
    ],
    userContext: {
      userId,
      preferences: {
        personalityType
      }
    }
  });
  
  // Log connection status
  useEffect(() => {
    if (brainHubAI.isConnected) {
      console.log(`AI Companion ${companionId} connected to Brain Hub`);
    }
  }, [brainHubAI.isConnected, companionId]);
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Connection Error",
        description: error,
        variant: "destructive"
      });
    }
  }, [error]);
  
  useEffect(() => {
    if (isTyping) {
      setLocalIsTyping(true);
      // Record the typing state in Brain Hub
      if (brainHubAI.isConnected) {
        brainHubAI.recordInteraction("typing_started");
      }
    } else {
      const timer = setTimeout(() => {
        setLocalIsTyping(false);
        // Record the typing ended state in Brain Hub
        if (brainHubAI.isConnected) {
          brainHubAI.recordInteraction("typing_ended");
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isTyping, brainHubAI]);
  
  const handleSendMessage = useCallback((content: string) => {
    if (!content.trim()) return;
    
    // Process message with Brain Hub if connected
    if (brainHubAI.isConnected) {
      // Try to enhance message with Brain Hub
      const result = brainHubAI.processRequest(
        "enhance_user_message",
        {
          message: content,
          companionId,
          personalityType,
          userId
        }
      );
      
      // Record the interaction
      brainHubAI.recordInteraction("message_sent", { messageLength: content.length });
      
      // Use enhanced message if available
      const processedContent = result.success && result.data?.enhancedMessage 
        ? result.data.enhancedMessage 
        : content;
      
      sendMessage(processedContent);
    } else {
      sendMessage(content);
    }
  }, [sendMessage, brainHubAI, companionId, personalityType, userId]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    
    // Record closing interaction in Brain Hub
    if (brainHubAI.isConnected) {
      brainHubAI.recordInteraction("chat_closed");
    }
    
    if (onClose) onClose();
  }, [onClose, brainHubAI]);
  
  const handleMinimize = useCallback(() => {
    setIsOpen(false);
    
    // Record minimizing interaction in Brain Hub
    if (brainHubAI.isConnected) {
      brainHubAI.recordInteraction("chat_minimized");
    }
    
    if (onMinimize) onMinimize();
  }, [onMinimize, brainHubAI]);
  
  const handleMaximize = useCallback(() => {
    setIsOpen(true);
    
    // Record maximizing interaction in Brain Hub
    if (brainHubAI.isConnected) {
      brainHubAI.recordInteraction("chat_maximized");
    }
  }, [brainHubAI]);
  
  const handleUnlockContent = useCallback(() => {
    // Record unlocking content interaction in Brain Hub
    if (brainHubAI.isConnected) {
      brainHubAI.recordInteraction("content_unlocked");
    }
    
    processPremiumContent();
  }, [processPremiumContent, brainHubAI]);

  if (!isOpen) {
    return (
      <MinimizedChatButton 
        onClick={handleMaximize} 
        companionName={name}
        avatarUrl={avatarUrl}
        hasUnread={messages.length > 0}
      />
    );
  }

  const hasSufficientCredits = userCredits === undefined || userCredits >= 0;

  return (
    <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[550px] bg-background border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col">
      <AICompanionChatHeader 
        isLoading={false} 
        companion={{ 
          name, 
          avatar_url: avatarUrl, 
          id: companionId,
          description: `AI Companion with ${personalityType} personality`,
          verification_status: 'verified',
          user_id: 'system',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          gallery: [],
          personality_traits: [],
          body_type: 'athletic',
          voice_type: 'sultry',
          relationship_level: {
            trust: 70,
            affection: 70,
            obedience: 70,
            intimacy: 70
          },
          engagement_stats: {
            chat_messages: 0,
            images_generated: 0,
            voice_messages: 0,
            last_interaction: null
          },
          is_preset: true
        }} 
        onClose={handleClose}
        onMinimize={handleMinimize}
        credits={userCredits}
        creditCost={0}
        emotionalState={emotionalState}
        brainHubConnected={brainHubAI.isConnected}
      />

      <AICompanionMessageList 
        messages={messages}
        isLoading={false}
        isTyping={localIsTyping}
        onActionClick={handleSuggestedActionClick}
        voiceType="feminine"
        onUnlockContent={handleUnlockContent}
      />

      <AICompanionChatInput 
        isLoading={isTyping}
        onSendMessage={handleSendMessage}
        onGenerateImage={() => {}}
        companionName={name}
        disabled={!hasSufficientCredits}
        disabledMessage={!hasSufficientCredits ? "Insufficient credits" : undefined}
        emotionalState={emotionalState}
        brainHubEnhanced={brainHubAI.isConnected}
      />

      <AICompanionChatStyles />
    </div>
  );
};

export default AICompanionChat;
