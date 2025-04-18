
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, MessageSquare } from 'lucide-react';
import { useAIChat } from '@/hooks/ai/useAIChat';

interface AIControllerProps {
  onToggleChat: () => void;
  isChatOpen: boolean;
}

const AIController: React.FC<AIControllerProps> = ({ onToggleChat, isChatOpen }) => {
  const { isProcessing, currentPrompt } = useAIChat();
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3">
      {isProcessing && (
        <div className="bg-background border rounded-full px-4 py-2 flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-bottom-5">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm font-medium">Processing...</span>
        </div>
      )}
      
      <Button
        onClick={onToggleChat}
        size="lg"
        className="rounded-full h-12 w-12 p-0 shadow-lg"
        aria-label={isChatOpen ? "Close AI chat" : "Open AI chat"}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default AIController;
