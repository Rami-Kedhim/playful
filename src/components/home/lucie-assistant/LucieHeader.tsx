
import React from 'react';
import { X, Minus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface LucieHeaderProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onSettings?: () => void;
  showAnimation?: boolean;
  title?: string;
  subtitle?: string;
}

const LucieHeader: React.FC<LucieHeaderProps> = ({ 
  onClose, 
  onMinimize,
  onSettings,
  showAnimation = true,
  title = "Lucie AI Assistant",
  subtitle = "Your UberEscorts guide"
}) => {
  const AnimatedDiv = showAnimation ? motion.div : 'div';
  
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-blue-600 to-violet-600 text-white">
      <div className="flex items-center">
        <AnimatedDiv 
          className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-2"
          initial={showAnimation ? { scale: 0.8, opacity: 0.5 } : {}}
          animate={showAnimation ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="text-lg font-semibold">L</span>
        </AnimatedDiv>
        <div>
          <AnimatedDiv
            initial={showAnimation ? { y: -10, opacity: 0 } : {}}
            animate={showAnimation ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <h3 className="font-medium text-sm">{title}</h3>
            <p className="text-xs text-white/70">{subtitle}</p>
          </AnimatedDiv>
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
