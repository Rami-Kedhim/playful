
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CompanionMessage } from '@/hooks/ai-companion/types';
import { getEmotionClass } from './utils/emotionUtils';
import { speakMessage, stopSpeaking, isSpeaking } from './utils/speechUtils';
import { Volume2, VolumeX, VolumeOff, Loader } from 'lucide-react';
import { AIVisualElement } from './AICompanionVisualElements';
import { cn } from '@/lib/utils';

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
  const [loading, setLoading] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  // Handle speech playback
  const handleSpeakMessage = async () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      setSpeechError(null);
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await speakMessage(message.content, voiceType);
      if (success) {
        setSpeaking(true);
        setSpeechError(null);
      } else {
        setSpeechError("Couldn't start speech");
        setTimeout(() => setSpeechError(null), 3000);
      }
    } catch (error) {
      console.error("Speech synthesis error:", error);
      setSpeechError("Couldn't start speech");
      setTimeout(() => setSpeechError(null), 3000);
    } finally {
      setLoading(false);
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

  // Determine emotion classes for styling
  const emotionClass = isAI ? getEmotionClass(message.emotion) : 'bg-primary text-primary-foreground';

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-3`}>
      <div
        className={cn(
          'p-3 rounded-lg max-w-[80%]',
          emotionClass
        )}
      >
        <div className="flex flex-col">
          <p className="whitespace-pre-wrap">{message.content}</p>

          {/* Visual elements */}
          {isAI && message.visualElements && message.visualElements.length > 0 && (
            <div className="mt-3 space-y-3">
              {message.visualElements.map((element, index) => (
                <AIVisualElement
                  key={index}
                  element={element.data}
                  onActionClick={onActionClick}
                />
              ))}
            </div>
          )}

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
                disabled={!!speechError || loading}
              >
                {loading ? (
                  <Loader className="h-3 w-3 animate-spin" />
                ) : speaking ? (
                  <VolumeX className="h-3 w-3" />
                ) : speechError ? (
                  <VolumeOff className="h-3 w-3" />
                ) : (
                  <Volume2 className="h-3 w-3" />
                )}
                <span>{speaking ? 'Stop' : loading ? 'Loading...' : 'Speak'}</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AICompanionMessage;
