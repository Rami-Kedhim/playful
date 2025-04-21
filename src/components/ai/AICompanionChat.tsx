
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import AICompanionChatList from './companion-chat/AICompanionChatList';
import AICompanionChatControls from './companion-chat/AICompanionChatControls';
import AICompanionChatHeader from './companion-chat/AICompanionChatHeader';
import { lucieOrchestrator } from '@/core/Lucie';
import { useAuth } from '@/hooks/auth/useAuth';
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
  onClose,
  companionId,
  name,
  avatarUrl,
  personalityType,
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<{id: string; role: string; content: string; timestamp: Date;}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use name and avatar from props or defaults
  const displayName = name || aiName;
  const displayAvatar = avatarUrl || aiAvatar;

  // Session id for orchestration, use companionId or fallback to user ID timestamped
  const sessionId = companionId || (user?.id ? `${user.id}-session` : `anon-session-${Date.now()}`);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ id: 'welcome', role: 'assistant', content: initialMessage, timestamp: new Date() }]);
    }
  }, [initialMessage, messages.length]);

  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim()) return;

    if (!user) {
      toast.error('You must be logged in to send messages.');
      return;
    }

    const userMessage = { id: `user-${Date.now()}`, role: 'user', content: userInput, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);
    setError(null);

    try {
      const userContext = {
        userId: user.id,
        walletId: user.walletId,
        personalityType,
        characterId: companionId,
      };

      // Call Lucie AI routePrompt method with context that includes wallet for token deductions
      const response = await lucieOrchestrator.routePrompt(userInput, userContext);

      const assistantMessage = { id: `assistant-${Date.now()}`, role: 'assistant', content: response.responseText, timestamp: new Date() };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setError('Failed to get a response. Please try again.');
      console.error('Error sending message through Lucie:', err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px] w-full max-w-lg mx-auto">
      <AICompanionChatHeader
        displayName={displayName}
        displayAvatar={displayAvatar}
        onClose={onClose}
        isMuted={false}
        toggleMute={() => {}}
      />
      <AICompanionChatList
        messages={messages}
        isTyping={isTyping}
        aiName={displayName}
        aiAvatar={displayAvatar}
        onSpeakMessage={() => {}}
        onUnlockContent={() => toast.info("Premium content unlocking not implemented")}
      />
      <CardContent>
        <AICompanionChatControls
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          isSpeaking={false}
          onStopSpeaking={() => {}}
          companion={{ name: displayName }}
        />
        {error && <div className="mt-2 text-sm text-destructive">{error}</div>}
      </CardContent>
    </Card>
  );
};

export default AICompanionChat;

