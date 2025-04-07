
import React from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';

interface AICompanionChatHeaderProps {
  isLoading: boolean;
  companion: any;
  onClose: () => void;
  isSpeaking?: boolean;
  onToggleSpeaking?: () => void;
}

const AICompanionChatHeader = ({ 
  isLoading, 
  companion, 
  onClose,
  isSpeaking,
  onToggleSpeaking
}: AICompanionChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-3 border-b border-white/10">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-primary/20 overflow-hidden flex items-center justify-center">
          {companion?.avatar_url ? (
            <img 
              src={companion.avatar_url} 
              alt={companion?.name || 'AI Companion'} 
              className="h-8 w-8 object-cover"
            />
          ) : (
            <span className="text-sm font-semibold">
              {companion?.name?.charAt(0) || 'AI'}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium">
            {isLoading ? 'Loading...' : companion?.name || 'AI Companion'}
          </h3>
          {companion?.speechStyle && (
            <p className="text-xs text-gray-400">
              Voice: {companion.speechStyle}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {onToggleSpeaking && companion?.speechStyle && (
          <button 
            onClick={onToggleSpeaking} 
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            {isSpeaking ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
        )}
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AICompanionChatHeader;
