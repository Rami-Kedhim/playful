
import { useState } from 'react';
import { useAICompanionConversation } from '@/hooks/ai-companion';
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
    companion,
    sendMessage,
    handleSuggestedActionClick
  } = useAICompanionConversation({ companionId });
  
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  
  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    sendMessage(content);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
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
      />

      <AICompanionMessageList 
        messages={messages}
        isLoading={isLoading}
        isTyping={isTyping}
        onActionClick={handleSuggestedActionClick}
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
