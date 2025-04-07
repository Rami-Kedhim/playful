
import { useState, useEffect } from 'react';
import { useAICompanionConversation } from '@/hooks/ai-companion';
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
}

const AICompanionChat = ({ 
  companionId, 
  initiallyOpen = true, 
  onClose,
  onMinimize,
  userCredits 
}: AICompanionChatProps) => {
  const {
    messages,
    isTyping,
    isLoading,
    companion,
    sendMessage,
    handleSuggestedActionClick,
    generateImage,
    generatingImage,
    creditCost = 0
  } = useAICompanionConversation({ companionId });
  
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

  if (!isOpen) {
    return (
      <MinimizedChatButton 
        onClick={handleMaximize} 
        companionName={companion?.name}
        avatarUrl={companion?.avatar_url}
        hasUnread={messages.length > 0}
      />
    );
  }

  const hasSufficientCredits = userCredits === undefined || userCredits >= creditCost;

  return (
    <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[550px] bg-background border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col">
      <AICompanionChatHeader 
        isLoading={isLoading} 
        companion={companion} 
        onClose={handleClose}
        onMinimize={handleMinimize}
        credits={userCredits}
        creditCost={creditCost}
      />

      <AICompanionMessageList 
        messages={messages}
        isLoading={isLoading}
        isTyping={localIsTyping}
        onActionClick={handleSuggestedActionClick}
        voiceType={companion?.voice_type}
      />

      <AICompanionChatInput 
        isLoading={isLoading || generatingImage}
        onSendMessage={handleSendMessage}
        onGenerateImage={generateImage}
        companionName={companion?.name}
        disabled={!hasSufficientCredits}
        disabledMessage={!hasSufficientCredits ? "Insufficient credits" : undefined}
      />

      <AICompanionChatStyles />
    </div>
  );
};

export default AICompanionChat;
