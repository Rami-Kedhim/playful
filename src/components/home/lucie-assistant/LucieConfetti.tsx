
import React, { useEffect, useState } from 'react';

interface LucieConfettiProps {
  show: boolean;
  onComplete?: () => void;
}

interface ConfettiPiece {
  id: number;
  color: string;
  left: number;
  delay: number;
  size: number;
  rotation: number;
  shape: 'circle' | 'square' | 'rectangle' | 'triangle';
  swayFactor: number;
  duration: number;
}

const LucieConfetti: React.FC<LucieConfettiProps> = ({ show, onComplete }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  
  useEffect(() => {
    if (show) {
      // Enhanced color palette with more vibrant options
      const colors = [
        '#9b87f5', '#6366f1', '#f43f5e', '#22c55e', '#f59e0b', 
        '#06b6d4', '#ec4899', '#facc15', '#3b82f6', '#a855f7',
        '#8b5cf6', '#10b981', '#ef4444', '#14b8a6', '#f97316'
      ];
      const shapes = ['circle', 'square', 'rectangle', 'triangle'] as const;
      
      const newPieces = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * 100, // Random horizontal position
        delay: Math.random() * 0.8, // Increased delay variance
        size: 4 + Math.random() * 10, // Random size between 4-14px
        rotation: Math.random() * 360, // Random rotation angle
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        swayFactor: Math.random() * 30 - 15, // Random sway between -15 and 15
        duration: 1.5 + Math.random() * 2 // Random duration between 1.5-3.5s
      }));
      
      setPieces(newPieces);
      
      // Clean up after animation completes
      const timer = setTimeout(() => {
        setPieces([]);
        if (onComplete) onComplete();
      }, 5000); // Increased duration for longer animations
      
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show && pieces.length === 0) return null;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`confetti-piece absolute top-0 ${
            piece.shape === 'circle' ? 'rounded-full' : 
            piece.shape === 'rectangle' ? 'rounded-sm' : 
            piece.shape === 'triangle' ? 'clip-path-triangle' : ''
          }`}
          style={{ 
            left: `${piece.left}%`, 
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: piece.shape === 'rectangle' ? `${piece.size * 1.5}px` : 
                   piece.shape === 'triangle' ? `${piece.size * 0.866}px` : `${piece.size}px`,
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            // Add custom property for sway factor
            '--sway-factor': `${piece.swayFactor}px`,
            clipPath: piece.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'visible'
          } as React.CSSProperties}
        />
      ))}
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes confettiDrop {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          25% { transform: translateY(0) rotate(90deg) translateX(var(--sway-factor, 5px)); opacity: 1; }
          50% { transform: translateY(20px) rotate(180deg) translateX(calc(var(--sway-factor, 5px) * -1)); opacity: 0.9; }
          75% { transform: translateY(35px) rotate(270deg) translateX(var(--sway-factor, 5px)); opacity: 0.7; }
          90% { opacity: 0.3; }
          100% { transform: translateY(50px) rotate(360deg) translateX(calc(var(--sway-factor, 5px) * -1)); opacity: 0; }
        }
        
        .clip-path-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        
        .confetti-piece {
          position: absolute;
          opacity: 0;
          animation: confettiDrop 2s ease-in-out forwards;
          will-change: transform, opacity;
          transform-origin: center center;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        }
      ` }} />
    </div>
  );
};

export default LucieConfetti;
