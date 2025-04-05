
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smile, Send, Gift } from "lucide-react";
import { EmojiPicker } from "../../chat/EmojiPicker";

interface ChatInputAreaProps {
  messageText: string;
  setMessageText: (text: string) => void;
  isEmojiPickerOpen: boolean;
  setIsEmojiPickerOpen: (isOpen: boolean) => void;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleEmojiSelect: (emoji: string) => void;
  handleSendTip: () => void;
}

const ChatInputArea: React.FC<ChatInputAreaProps> = ({
  messageText,
  setMessageText,
  isEmojiPickerOpen,
  setIsEmojiPickerOpen,
  handleSendMessage,
  handleKeyDown,
  handleEmojiSelect,
  handleSendTip
}) => {
  return (
    <div className="p-3 border-t">
      <div className="flex items-center gap-2 relative">
        <Button 
          size="icon" 
          variant="ghost" 
          className="shrink-0" 
          onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
        >
          <Smile className="h-5 w-5" />
        </Button>
        
        <Input 
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        
        <Button 
          size="icon" 
          className="shrink-0 bg-green-600 hover:bg-green-700 text-white"
          onClick={handleSendTip}
        >
          <Gift className="h-5 w-5" />
        </Button>
        
        <Button 
          size="icon" 
          className="shrink-0"
          onClick={handleSendMessage}
          disabled={!messageText.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
        
        {isEmojiPickerOpen && (
          <EmojiPicker 
            onEmojiSelect={handleEmojiSelect} 
            onClose={() => setIsEmojiPickerOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ChatInputArea;
