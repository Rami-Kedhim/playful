
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

interface MinimizedChatButtonProps {
  onClick: () => void;
  companionName?: string;
  avatarUrl?: string;
  hasUnread?: boolean;
}

const MinimizedChatButton: React.FC<MinimizedChatButtonProps> = ({
  onClick,
  companionName,
  avatarUrl,
  hasUnread = false
}) => {
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        onClick={onClick}
        size="lg"
        className="w-14 h-14 rounded-full p-0 shadow-lg relative"
      >
        {avatarUrl ? (
          <Avatar className="h-14 w-14 border-4 border-primary">
            <AvatarImage src={avatarUrl} alt={companionName || 'AI'} />
            <AvatarFallback>
              <MessageSquare className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
        
        {hasUnread && (
          <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 animate-pulse" />
        )}
      </Button>
    </motion.div>
  );
};

export default MinimizedChatButton;
