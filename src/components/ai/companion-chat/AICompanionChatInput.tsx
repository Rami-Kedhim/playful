
import React, { useState } from 'react';
import { SendHorizontal, Image, Brain, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface AICompanionChatInputProps {
  onSendMessage: (message: string) => void;
  onGenerateImage: () => void;
  isLoading: boolean;
  companionName: string;
  disabled?: boolean;
  disabledMessage?: string;
  emotionalState?: string;
  brainHubEnhanced?: boolean;
  oxumLearningEnhanced?: boolean;
}

const AICompanionChatInput: React.FC<AICompanionChatInputProps> = ({
  onSendMessage,
  onGenerateImage,
  isLoading,
  companionName,
  disabled = false,
  disabledMessage,
  emotionalState,
  brainHubEnhanced = false,
  oxumLearningEnhanced = false
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!message.trim() || isLoading || disabled) return;
    
    onSendMessage(message);
    setMessage('');
  };

  const placeholder = isLoading
    ? `${companionName} is typing...`
    : `Message ${companionName}...`;

  return (
    <div className="p-3 border-t bg-background">
      {disabled && disabledMessage && (
        <div className="bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 text-xs p-2 mb-2 rounded-md">
          {disabledMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder}
            className="resize-none pr-12 py-3"
            rows={2}
            disabled={isLoading || disabled}
          />
          <div className="absolute right-12 bottom-3 flex space-x-1">
            {brainHubEnhanced && (
              <div className="text-blue-500 opacity-70" title="Brain Hub Enhanced">
                <Brain className="h-4 w-4" />
              </div>
            )}
            {oxumLearningEnhanced && (
              <div className="text-green-500 opacity-70" title="Oxum Learning Enhanced">
                <BookOpen className="h-4 w-4" />
              </div>
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="absolute bottom-1 right-1"
            disabled={!message.trim() || isLoading || disabled}
            type="submit"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={onGenerateImage}
            disabled={isLoading || disabled}
          >
            <Image className="h-3 w-3 mr-1" />
            Generate Image
          </Button>
          
          {(brainHubEnhanced || oxumLearningEnhanced) && emotionalState && (
            <div className="text-xs text-muted-foreground italic">
              AI mood: {emotionalState}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AICompanionChatInput;
