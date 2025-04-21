
import React, { useState, useRef, useEffect } from 'react';
import LucieHeader from './LucieHeader';
import LucieInputBox from './LucieInputBox';
import LucieTypingIndicator from './LucieTypingIndicator';
import { useLucieSpeech } from '@/hooks/lucie/useLucieSpeech';
import { LucieVoiceType } from '@/services/speechSynthesisService';

interface LucieAssistantProps {
  initialMessage?: string;
  onClose?: () => void;
  onMinimize?: () => void;
}

const LucieAssistant: React.FC<LucieAssistantProps> = ({
  initialMessage = "Hi there! I'm Lucie, your personal assistant. How can I help you today?",
  onClose,
  onMinimize
}) => {
  const [messages, setMessages] = useState<{ id: string; text: string; sender: 'user' | 'assistant' }[]>([
    { id: '0', text: initialMessage, sender: 'assistant' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [voiceType, setVoiceType] = useState<LucieVoiceType>('feminine');
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Initialize speech functionality
  const { 
    isEnabled: isSpeechEnabled, 
    toggleSpeech,
    speak,
    currentlySpeaking,
    supported: speechSupported
  } = useLucieSpeech({
    voiceType,
    autoSpeak: false,
    pitch: 1.1,
    rate: 1.0,
    volume: 1.0
  });

  // Handle sending a new message
  const handleSendMessage = (message: string) => {
    // Add user message
    const userMessageId = `user-${Date.now()}`;
    setMessages(prev => [...prev, { id: userMessageId, text: message, sender: 'user' }]);
    
    // Start typing indicator
    setIsTyping(true);
    
    // Simulate assistant response after a delay
    setTimeout(() => {
      let response = "I'm here to help! What would you like assistance with today?";
      
      // Simple keyword-based responses
      if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        response = "Hello there! How can I assist you today?";
      } else if (message.toLowerCase().includes('thank')) {
        response = "You're welcome! Is there anything else I can help you with?";
      } else if (message.toLowerCase().includes('pulse') || message.toLowerCase().includes('boost')) {
        response = "I see you're interested in the Pulse Boosting Engine! This is a monetization system using UBX tokens that provides visibility boosts and subscription plans for different user roles. How can I help you understand it better?";
      } else if (message.toLowerCase().includes('subscription')) {
        response = "There are various subscription plans available for both clients and escorts/creators, ranging from free to premium tiers with different features and UBX costs. Would you like more specific information about these plans?";
      } else if (message.toLowerCase().includes('voice') || message.toLowerCase().includes('speak')) {
        response = "I now have voice capabilities! You can toggle my voice on or off using the speaker button in the header, and even change my voice type. Would you like me to use a different voice?";
      }
      
      // Add assistant response
      const assistantMessageId = `assistant-${Date.now()}`;
      setMessages(prev => [...prev, { id: assistantMessageId, text: response, sender: 'assistant' }]);
      
      // Speak the response if speech is enabled
      if (isSpeechEnabled && !currentlySpeaking) {
        speak(response);
      }
      
      // Stop typing indicator
      setIsTyping(false);
    }, 1500);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Handle voice type change
  const handleVoiceChange = (newVoiceType: LucieVoiceType) => {
    setVoiceType(newVoiceType);
    localStorage.setItem('lucie_voice_type', newVoiceType);
    
    // When voice type changes, speak a confirmation using the new voice
    if (isSpeechEnabled) {
      const confirmationMessage = `Voice changed to ${newVoiceType} style. How does this sound?`;
      speak(confirmationMessage);
      
      // Add the confirmation as a message from Lucie
      const assistantMessageId = `assistant-${Date.now()}`;
      setMessages(prev => [...prev, { id: assistantMessageId, text: confirmationMessage, sender: 'assistant' }]);
    }
  };

  // Load voice type preference from localStorage on mount
  useEffect(() => {
    const savedVoiceType = localStorage.getItem('lucie_voice_type') as LucieVoiceType | null;
    if (savedVoiceType && ['feminine', 'masculine', 'neutral'].includes(savedVoiceType)) {
      setVoiceType(savedVoiceType);
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-background border rounded-lg shadow-lg overflow-hidden">
      <LucieHeader 
        onClose={onClose} 
        onMinimize={onMinimize} 
        showAnimation={true}
        isSpeechEnabled={isSpeechEnabled && speechSupported}
        onToggleSpeech={speechSupported ? toggleSpeech : undefined}
        onChangeVoice={handleVoiceChange}
        currentVoice={voiceType}
      />
      
      <div 
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3">
              <LucieTypingIndicator 
                size="medium" 
                showName={false} 
                animationStyle="wave" 
              />
            </div>
          </div>
        )}
      </div>
      
      <LucieInputBox 
        onSendMessage={handleSendMessage} 
        disabled={isTyping} 
        isSpeechEnabled={isSpeechEnabled && speechSupported}
        onToggleSpeech={speechSupported ? toggleSpeech : undefined}
      />
    </div>
  );
};

export default LucieAssistant;
