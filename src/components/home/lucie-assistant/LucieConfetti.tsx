
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
}

const LucieConfetti: React.FC<LucieConfettiProps> = ({ show, onComplete }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  
  useEffect(() => {
    if (show) {
      // Generate confetti pieces with more variety
      const colors = [
        '#9b87f5', '#6366f1', '#f43f5e', '#22c55e', '#f59e0b', 
        '#06b6d4', '#ec4899', '#facc15', '#3b82f6', '#a855f7'
      ];
      const shapes = ['circle', 'square', 'rectangle', 'triangle'] as const;
      
      const newPieces = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        size: 4 + Math.random() * 8, // Random size between 4-12px
        rotation: Math.random() * 360, // Random rotation angle
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        swayFactor: Math.random() * 20 - 10 // Random sway between -10 and 10
      }));
      
      setPieces(newPieces);
      
      // Clean up after animation completes
      const timer = setTimeout(() => {
        setPieces([]);
        if (onComplete) onComplete();
      }, 4000); // Increased to allow for longer animation durations
      
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
            animationDuration: `${1.5 + Math.random() * 1.5}s`, // More variable duration
            // Add random horizontal movement for more realistic physics
            '--sway-factor': `${piece.swayFactor}px`,
            clipPath: piece.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'visible'
          } as React.CSSProperties}
        />
      ))}
      
      <style jsx>{`
        @keyframes triangleFall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(50px) rotate(360deg); opacity: 0; }
        }
        .clip-path-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>
    </div>
  );
};

export default LucieConfetti;
