
import { useState } from 'react';
import { useAICompanionConversation } from '@/hooks/ai-companion';
import { voiceService } from '@/services/voiceService';
import AICompanionChatHeader from './companion-chat/AICompanionChatHeader';
import AICompanionMessageList from './companion-chat/AICompanionMessageList';
import AICompanionChatInput from './companion-chat/AICompanionChatInput';
import AICompanionChatStyles from './companion-chat/AICompanionChatStyles';
import MinimizedChatButton from './companion-chat/MinimizedChatButton';

interface AICompanionChatProps {
  companionId: string;
  initiallyOpen?: boolean;
  onClose?: () => void;
}

const AICompanionChat = ({ companionId, initiallyOpen = true, onClose }: AICompanionChatProps) => {
  const {
    messages,
    isTyping,
    isLoading,
    isSpeaking,
    companion,
    sendMessage,
    stopSpeaking,
    handleSuggestedActionClick
  } = useAICompanionConversation({ companionId });
  
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  
  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    sendMessage(content);
  };

  const handleClose = () => {
    // Stop any ongoing speech before closing
    if (isSpeaking) {
      stopSpeaking();
    }
    
    setIsOpen(false);
    if (onClose) onClose();
  };
  
  const handleToggleSpeaking = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      // If the companion is not currently speaking,
      // we could potentially speak the last message
      const lastAssistantMessage = [...messages]
        .reverse()
        .find(msg => msg.role === 'assistant');
        
      if (lastAssistantMessage && companion?.speechStyle) {
        voiceService.speak(lastAssistantMessage.content, { 
          voice: companion.speechStyle 
        });
      }
    }
  };

  if (!isOpen) {
    return <MinimizedChatButton onClick={() => setIsOpen(true)} />;
  }

  return (
    <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[550px] bg-background border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col">
      <AICompanionChatHeader 
        isLoading={isLoading} 
        companion={companion} 
        onClose={handleClose}
        isSpeaking={isSpeaking}
        onToggleSpeaking={handleToggleSpeaking}
      />

      <AICompanionMessageList 
        messages={messages}
        isLoading={isLoading}
        isTyping={isTyping}
        onActionClick={handleSuggestedActionClick}
        voiceType={companion?.speechStyle}
      />

      <AICompanionChatInput 
        isLoading={isLoading}
        onSendMessage={handleSendMessage}
        companionName={companion?.name}
      />

      <AICompanionChatStyles />
    </div>
  );
};

export default AICompanionChat;
