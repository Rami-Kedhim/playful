
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, X } from 'lucide-react';
import { useAIVoice } from './AIVoiceProvider';
import { useAI } from '@/contexts/AIContext';
import { useUserAIContext } from '@/hooks/useUserAIContext';
import { toast } from 'sonner';
import { AIAnalyticsService } from '@/services/ai/aiAnalyticsService';
import AICompanionChatList from './companion-chat/AICompanionChatList';
import AICompanionChatControls from './companion-chat/AICompanionChatControls';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  requiresPayment?: boolean;
}

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
  // New props to support other files
  companionId,
  name,
  avatarUrl,
  userCredits,
  personalityType,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { isAuthenticated, user } = useUserAIContext();
  const { speak, stopSpeaking, isPlaying, isMuted, toggleMute } = useAIVoice();
  const { trackInteraction, setCurrentCompanion } = useAI();

  // Initialize with the assistant's greeting
  useEffect(() => {
    if (initialMessage) {
      setMessages([{
        id: '0',
        role: 'assistant',
        content: initialMessage,
        timestamp: new Date()
      }]);
      
      // Optionally speak the initial message
      if (!isMuted) {
        speak(initialMessage);
      }
    }

    // Set current companion in context if provided
    if (companionId && name) {
      setCurrentCompanion({
        id: companionId,
        name: name,
        avatarUrl: avatarUrl,
        personalityType: personalityType
      });
      
      // Track this companion view
      if (user?.id) {
        AIAnalyticsService.trackEvent(
          user.id,
          'ai_companion_open',
          { companionId, name, personalityType }
        );
      }
    }
  }, [initialMessage, isMuted, speak, companionId, name, avatarUrl, personalityType, setCurrentCompanion, user?.id]);

  // Use name from props if provided
  const displayName = name || aiName;
  const displayAvatar = avatarUrl || aiAvatar;

  const handleSendMessage = async (input: string) => {
    if (!input.trim()) return;
    
    if (!isAuthenticated) {
      toast.error("Authentication required", {
        description: "Please log in to chat with AI companions",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      let response: string;
      
      if (onSendMessage) {
        // Use provided message handler
        response = await onSendMessage(input);
      } else {
        // Mock response for demo
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = `I'm ${displayName}, and this is a demo response. In a real implementation, I would provide a helpful answer about "${input}".`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Speak the response if voice is not muted
      if (!isMuted) {
        speak(response);
      }
      
      // Track interaction with this companion
      if (companionId && user?.id) {
        trackInteraction(companionId);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Communication error", {
        description: "Failed to get a response from the AI",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleSpeakMessage = (content: string) => {
    if (!isMuted) {
      speak(content);
    }
  };

  return (
    <Card className="flex flex-col h-[600px] w-full max-w-lg mx-auto">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={displayAvatar} alt={displayName} />
            <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{displayName}</h3>
            <p className="text-xs text-muted-foreground">AI Companion</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMute} 
            title={isMuted ? "Enable voice" : "Disable voice"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <span className="sr-only">Close</span>
              <X size={18} />
            </Button>
          )}
        </div>
      </div>

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
