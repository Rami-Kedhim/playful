
import React from 'react';
import { X, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LucieHeaderProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

const LucieHeader: React.FC<LucieHeaderProps> = ({ 
  onClose,
  onMinimize
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="flex items-center space-x-2">
        <span className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold">
          L
        </span>
        <div>
          <h3 className="font-medium">Lucie</h3>
          <p className="text-xs text-white/70">Your UberEscorts assistant</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        {onMinimize && (
          <Button
            onClick={onMinimize}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-white hover:bg-white/10"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
        )}
        {onClose && (
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default LucieHeader;
