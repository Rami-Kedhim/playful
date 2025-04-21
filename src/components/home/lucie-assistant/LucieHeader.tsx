
import React, { useState, useEffect } from 'react';
import { X, Minus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LucieHeaderProps {
  onClose?: () => void;
  onMinimize?: () => void;
  showAnimation?: boolean;
}

const LucieHeader: React.FC<LucieHeaderProps> = ({ 
  onClose, 
  onMinimize,
  showAnimation = false
}) => {
  const [sparkleActive, setSparkleActive] = useState(false);

  // Periodically show sparkle animation
  useEffect(() => {
    if (showAnimation) {
      const interval = setInterval(() => {
        setSparkleActive(true);
        
        const timeout = setTimeout(() => {
          setSparkleActive(false);
        }, 2000);
        
        return () => clearTimeout(timeout);
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [showAnimation]);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-primary text-primary-foreground relative overflow-hidden">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
          {sparkleActive ? (
            <Sparkles className="h-4 w-4 text-white animate-pulse" />
          ) : (
            <span className="text-white font-medium">L</span>
          )}
        </div>
        <h3 className="font-semibold">Lucie Assistant</h3>
      </div>
      
      <div className="flex items-center space-x-1">
        {onMinimize && (
          <Button
            onClick={onMinimize}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/20"
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Minimize</span>
          </Button>
        )}
        {onClose && (
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>
      
      {sparkleActive && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="sparkle-burst"></div>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sparkle-burst {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .sparkle-burst {
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          animation: sparkle-burst 2s ease-out forwards;
        }
      ` }} />
    </div>
  );
};

export default LucieHeader;
