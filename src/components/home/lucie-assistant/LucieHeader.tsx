
import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface LucieHeaderProps {
  onClose?: () => void;
  children?: React.ReactNode; // Added children prop
}

const LucieHeader = ({ onClose, children }: LucieHeaderProps) => {
  return (
    <div className="p-3 border-b border-white/10 bg-background/90 backdrop-blur-sm flex items-center gap-3">
      <Avatar>
        <AvatarImage src="/lucie-avatar.png" />
        <AvatarFallback className="bg-primary/20 text-primary">L</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="font-medium flex items-center gap-1">
          Lucie <Sparkles className="h-3 w-3 text-primary" />
        </h3>
        <p className="text-xs text-gray-400">UberEscorts AI Assistant</p>
      </div>
      {children} {/* Render children here */}
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default LucieHeader;
