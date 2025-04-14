
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, X } from 'lucide-react';

interface AICompanionChatHeaderProps {
  displayName: string;
  displayAvatar?: string;
  onClose?: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const AICompanionChatHeader: React.FC<AICompanionChatHeaderProps> = ({
  displayName,
  displayAvatar,
  onClose,
  isMuted,
  toggleMute
}) => {
  return (
    <div className="p-4 border-b flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={displayAvatar} alt={displayName} />
          <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{displayName}</h3>
          <p className="text-xs text-muted-foreground">AI Companion</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMute} 
          title={isMuted ? "Enable voice" : "Disable voice"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </Button>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <span className="sr-only">Close</span>
            <X size={18} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AICompanionChatHeader;
