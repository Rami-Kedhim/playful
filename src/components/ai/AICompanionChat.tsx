
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import AICompanionChatList from './companion-chat/AICompanionChatList';
import AICompanionChatControls from './companion-chat/AICompanionChatControls';
import AICompanionChatHeader from './companion-chat/AICompanionChatHeader';
import { useCompanionChat } from '@/hooks/ai-companion/useCompanionChat';
import { toast } from 'sonner';

export interface AICompanionChatProps {
  aiName?: string;
  aiAvatar?: string;
  initialMessage?: string;
  onSendMessage?: (message: string) => Promise<string>;
  onClose?: () => void;
  companionId?: string;
  initiallyOpen?: boolean;
  userId?: string;
  personalityType?: string;
  name?: string;
  avatarUrl?: string;
  userCredits?: number;
}

const AICompanionChat: React.FC<AICompanionChatProps> = ({
  aiName = "Assistant",
  aiAvatar,
  initialMessage = "Hello! How can I assist you today?",
  onSendMessage,
  onClose,
  companionId,
  name,
  avatarUrl,
  personalityType,
}) => {
  const {
    messages,
    isTyping,
    isPlaying,
    isMuted,
    toggleMute,
    stopSpeaking,
    handleSendMessage,
    handleSpeakMessage
  } = useCompanionChat({
    initialMessage,
    onSendMessage,
    companionId,
    name: name || aiName,
    personaType: personalityType
  });

  // Use name from props if provided
  const displayName = name || aiName;
  const displayAvatar = avatarUrl || aiAvatar;

  return (
    <Card className="flex flex-col h-[600px] w-full max-w-lg mx-auto">
      <AICompanionChatHeader
        displayName={displayName}
        displayAvatar={displayAvatar}
        onClose={onClose}
        isMuted={isMuted}
        toggleMute={toggleMute}
      />

      <AICompanionChatList
        messages={messages}
        isTyping={isTyping}
        aiName={displayName}
        aiAvatar={displayAvatar}
        onSpeakMessage={handleSpeakMessage}
        onUnlockContent={() => toast.info("Premium content unlocking not implemented")}
      />

      <CardContent>
        <AICompanionChatControls
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          isSpeaking={isPlaying}
          onStopSpeaking={stopSpeaking}
          companion={{ name: displayName }}
        />
      </CardContent>
    </Card>
  );
};

export default AICompanionChat;
