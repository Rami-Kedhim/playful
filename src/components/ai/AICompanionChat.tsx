import React, { useState, useEffect } from 'react';
import { useAICompanionWithMemory } from '@/hooks/ai-companion/useAICompanionWithMemory';
import AICompanionChatHeader from './companion-chat/AICompanionChatHeader';
import AICompanionMessageList from './companion-chat/AICompanionMessageList';
import AICompanionChatInput from './companion-chat/AICompanionChatInput';
import AICompanionChatStyles from './companion-chat/AICompanionChatStyles';
import MinimizedChatButton from './companion-chat/MinimizedChatButton';
import { initSpeechSynthesis } from './companion-chat/utils/speechUtils';

interface AICompanionChatProps {
  companionId: string;
  initiallyOpen?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  userCredits?: number;
  userId?: string;
  personalityType?: string;
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
    personalityType: personalityType as any,
    name,
    avatarUrl,
    lucoinBalance: userCredits
  });
  
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [localIsTyping, setLocalIsTyping] = useState(false);
  
  useEffect(() => {
    // Initialize speech synthesis would be implemented in a real app
    // initSpeechSynthesis();
  }, []);
  
  useEffect(() => {
    if (isTyping) {
      setLocalIsTyping(true);
    } else {
      const timer = setTimeout(() => {
        setLocalIsTyping(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isTyping]);
  
  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    sendMessage(content);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };
  
  const handleMinimize = () => {
    setIsOpen(false);
    if (onMinimize) onMinimize();
  };
  
  const handleMaximize = () => {
    setIsOpen(true);
  };
  
  const handleUnlockContent = () => {
    processPremiumContent();
  };

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
  
  // Determine dominant emotion for UI customization
  const dominantEmotion = emotionalState?.dominantEmotion || 'neutral';

  return (
    <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[550px] bg-background border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col">
      <AICompanionChatHeader 
        isLoading={false} 
        companion={{ 
          name, 
          avatar_url: avatarUrl, 
          id: companionId,
          description: `AI Companion with ${personalityType} personality`
        } as any} 
        onClose={handleClose}
        onMinimize={handleMinimize}
        credits={userCredits}
        creditCost={0}
        emotionalState={emotionalState}
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
      />

      <AICompanionChatStyles />
    </div>
  );
};

export default AICompanionChat;
