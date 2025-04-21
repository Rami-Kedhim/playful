
import React from 'react';
import { X, Minus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LucieHeaderProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onSettings?: () => void;
}

const LucieHeader: React.FC<LucieHeaderProps> = ({ 
  onClose, 
  onMinimize,
  onSettings
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-blue-600 to-violet-600 text-white">
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
          <span className="text-lg font-semibold">L</span>
        </div>
        <div>
          <h3 className="font-medium text-sm">Lucie AI Assistant</h3>
          <p className="text-xs text-white/70">Your UberEscorts guide</p>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        {onSettings && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettings}
            className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10"
          >
            <Settings className="h-4 w-4" />
          </Button>
        )}
        
        {onMinimize && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMinimize}
            className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10"
          >
            <Minus className="h-4 w-4" />
          </Button>
        )}
        
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default LucieHeader;
