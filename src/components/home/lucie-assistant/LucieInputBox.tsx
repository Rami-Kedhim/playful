
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Sparkles, Volume2, VolumeX, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useLucieSpeech } from '@/hooks/lucie/useLucieSpeech';
import { useToast } from '@/hooks/use-toast';

interface LucieInputBoxProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onToggleSpeech?: () => void;
  isSpeechEnabled?: boolean;
}

const LucieInputBox: React.FC<LucieInputBoxProps> = ({ 
  onSendMessage, 
  placeholder = "Type your message...",
  disabled = false,
  onToggleSpeech,
  isSpeechEnabled = false
}) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  
  // Initialize Lucie speech engine
  const { 
    isEnabled: speechEnabled,
    toggleSpeech,
    speak,
    stopSpeech,
    supported: speechSupported,
    currentlySpeaking
  } = useLucieSpeech({
    autoSpeak: false,
    voiceType: localStorage.getItem('lucie_voice_type') as any || 'feminine'
  });

  // We maintain our own state since we might receive props from parent
  useEffect(() => {
    if (onToggleSpeech) {
      // External toggle control
    } else {
      // Internal toggle - just pass the current state when requested
      if (typeof isSpeechEnabled !== 'undefined') {
        // No-op, we're using the provided state
      }
    }
  }, [isSpeechEnabled, onToggleSpeech]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      
      // Refocus the textarea
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  // Handle Shift+Enter vs Enter for submission
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleVoiceSettings = () => {
    setIsVoiceSettingsOpen(!isVoiceSettingsOpen);
  };

  const changeVoiceType = (type: string) => {
    localStorage.setItem('lucie_voice_type', type);
    window.location.reload(); // Hard refresh to apply new voice settings
  };

  const handleSpeechToggle = () => {
    if (onToggleSpeech) {
      onToggleSpeech();
    } else if (speechSupported) {
      toggleSpeech();
      
      toast({
        title: speechEnabled ? "Speech disabled" : "Speech enabled",
        description: speechEnabled ? "Lucie will no longer speak responses" : "Lucie will now speak responses",
      });
    } else {
      toast({
        title: "Speech not supported",
        description: "Your browser does not support speech synthesis",
        variant: "destructive"
      });
    }
  };

  const renderQuickActions = () => {
    const quickActions = [
      { text: "Tell me about Pulse Boost", icon: <Zap className="h-3 w-3" /> },
      { text: "How do I earn UBX?", icon: <Sparkles className="h-3 w-3" /> },
      { text: "What's my boost status?", icon: <Zap className="h-3 w-3" /> },
    ];

    return (
      <div className="flex flex-wrap gap-2 mb-2">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs py-1 h-auto"
            onClick={() => {
              onSendMessage(action.text);
            }}
          >
            {action.icon}
            <span className="ml-1">{action.text}</span>
          </Button>
        ))}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`border-t p-3 transition-all duration-200 ${
        isFocused ? 'bg-muted/50' : 'bg-background'
      }`}
    >
      {/* Quick action buttons for common Pulse Boost queries */}
      {renderQuickActions()}

      <div className={`flex items-end rounded-lg border overflow-hidden transition-shadow ${
        isFocused ? 'shadow-md border-primary/50' : 'shadow-sm'
      }`}>
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className="min-h-[40px] max-h-[120px] flex-1 resize-none bg-transparent py-3 px-4 focus:outline-none"
          rows={1}
        />
        
        <div className="flex items-center gap-2 pr-2 pb-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={handleSpeechToggle}
                  className="rounded-full h-8 w-8 p-0"
                >
                  {(onToggleSpeech ? isSpeechEnabled : speechEnabled) ? (
                    <Volume2 className={`h-4 w-4 text-primary ${currentlySpeaking ? 'animate-pulse' : ''}`} />
                  ) : (
                    <VolumeX className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{(onToggleSpeech ? isSpeechEnabled : speechEnabled) ? 'Disable voice' : 'Enable voice'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {(onToggleSpeech ? isSpeechEnabled : speechEnabled) && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={toggleVoiceSettings}
                    className="rounded-full h-8 w-8 p-0 text-xs"
                  >
                    🎤
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Voice settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          <Button
            type="submit"
            size="sm"
            disabled={!message.trim() || disabled}
            className={`rounded-full h-8 w-8 p-0 transition-transform ${
              message.trim() ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
            }`}
          >
            {message.trim().toLowerCase().includes('thank') || 
             message.trim().toLowerCase().includes('congratulation') || 
             message.trim().toLowerCase().includes('amazing') ? (
              <Sparkles className="h-4 w-4" />
            ) : (
              <SendHorizontal className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Voice settings dropdown */}
      {isVoiceSettingsOpen && (
        <div className="mt-2 p-2 border rounded-md bg-background shadow-md">
          <Label htmlFor="voice-type" className="text-xs mb-1 block">Voice Type</Label>
          <Select
            value={localStorage.getItem('lucie_voice_type') || 'feminine'}
            onValueChange={changeVoiceType}
          >
            <SelectTrigger id="voice-type" className="w-full">
              <SelectValue placeholder="Select voice type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="feminine">Feminine</SelectItem>
              <SelectItem value="masculine">Masculine</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className="mt-1.5 text-xs text-muted-foreground text-center">
        Press Enter to send, Shift+Enter for new line
      </div>
    </form>
  );
};

export default LucieInputBox;
