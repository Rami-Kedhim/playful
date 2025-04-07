
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CompanionMessage } from '@/hooks/ai-companion/types';
import { getEmotionClass } from './utils/emotionUtils';
import { speakMessage, stopSpeaking, isSpeaking } from './utils/speechUtils';
import { Volume2, VolumeX, VolumeOff } from 'lucide-react';

interface AICompanionMessageProps {
  message: CompanionMessage;
  onActionClick: (action: string) => void;
  voiceType?: string;
}

const AICompanionMessage = ({
  message,
  onActionClick,
  voiceType
}: AICompanionMessageProps) => {
  const isAI = message.role === 'assistant';
  const [speaking, setSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  // Handle speech playback
  const handleSpeakMessage = () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      setSpeechError(null);
    } else {
      try {
        speakMessage(message.content, voiceType);
        setSpeaking(true);
        setSpeechError(null);
      } catch (error) {
        console.error("Speech synthesis error:", error);
        setSpeechError("Couldn't start speech");
        setTimeout(() => setSpeechError(null), 3000);
      }
    }
  };

  // Update speaking state when speech ends
  useEffect(() => {
    const checkSpeakingInterval = setInterval(() => {
      if (speaking && !isSpeaking()) {
        setSpeaking(false);
      }
    }, 200);

    return () => clearInterval(checkSpeakingInterval);
  }, [speaking]);

  // Stop speaking when component unmounts
  useEffect(() => {
    return () => {
      if (speaking) {
        stopSpeaking();
      }
    };
  }, [speaking]);

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`p-3 rounded-lg max-w-[80%] ${
          isAI
            ? getEmotionClass(message.emotion)
            : 'bg-primary text-primary-foreground'
        }`}
      >
        <div className="flex flex-col">
          <p className="whitespace-pre-wrap">{message.content}</p>

          {/* Suggested actions */}
          {isAI && message.suggestedActions && message.suggestedActions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {message.suggestedActions.map((action, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="sm"
                  onClick={() => onActionClick(action)}
                  className="text-xs"
                >
                  {action}
                </Button>
              ))}
            </div>
          )}
          
          {/* Speech button - only for AI messages */}
          {isAI && (
            <div className="flex items-center justify-end mt-2 gap-2">
              {speechError && (
                <span className="text-xs text-red-500">{speechError}</span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSpeakMessage}
                className="h-6 px-2 flex items-center gap-1"
                disabled={!!speechError}
              >
                {speaking ? (
                  <VolumeX className="h-3 w-3" />
                ) : speechError ? (
                  <VolumeOff className="h-3 w-3" />
                ) : (
                  <Volume2 className="h-3 w-3" />
                )}
                <span>{speaking ? 'Stop' : 'Speak'}</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AICompanionMessage;
