
import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getEmotionClass } from './utils/emotionUtils';

interface AICompanionChatHeaderProps {
  isLoading: boolean;
  companion: {
    name?: string;
    avatarUrl?: string;
    emotion?: string | null;
  } | null;
  onClose: () => void;
}

const AICompanionChatHeader = ({ isLoading, companion, onClose }: AICompanionChatHeaderProps) => {
  return (
    <div className="p-3 border-b border-white/10 bg-background/90 backdrop-blur-sm flex items-center gap-3">
      {isLoading ? (
        <>
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32 mt-1" />
          </div>
        </>
      ) : (
        <>
          <Avatar className={`${companion?.emotion ? getEmotionClass(companion.emotion) : ''} transition-all duration-500`}>
            <AvatarImage src={companion?.avatarUrl || "/ai-avatar.png"} />
            <AvatarFallback className="bg-primary/20 text-primary">
              {companion?.name?.[0] || 'AI'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-medium flex items-center gap-1">
              {companion?.name || 'AI Companion'} <Sparkles className="h-3 w-3 text-primary" />
            </h3>
            <p className="text-xs text-gray-400">AI Companion</p>
          </div>
        </>
      )}
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AICompanionChatHeader;
