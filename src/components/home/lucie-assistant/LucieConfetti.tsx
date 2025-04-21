
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
  shape: 'circle' | 'square' | 'rectangle';
}

const LucieConfetti: React.FC<LucieConfettiProps> = ({ show, onComplete }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  
  useEffect(() => {
    if (show) {
      // Generate confetti pieces with more variety
      const colors = ['#9b87f5', '#6366f1', '#f43f5e', '#22c55e', '#f59e0b', '#06b6d4', '#ec4899'];
      const shapes = ['circle', 'square', 'rectangle'] as const;
      
      const newPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        size: 5 + Math.random() * 7, // Random size between 5-12px
        rotation: Math.random() * 360, // Random rotation angle
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      }));
      
      setPieces(newPieces);
      
      // Clean up after animation completes
      const timer = setTimeout(() => {
        setPieces([]);
        if (onComplete) onComplete();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show && pieces.length === 0) return null;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`confetti-piece absolute top-0 ${piece.shape === 'circle' ? 'rounded-full' : piece.shape === 'rectangle' ? 'rounded-sm' : ''}`}
          style={{ 
            left: `${piece.left}%`, 
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: piece.shape === 'rectangle' ? `${piece.size * 1.5}px` : `${piece.size}px`,
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${1.5 + Math.random()}s`
          }}
        />
      ))}
    </div>
  );
};

export default LucieConfetti;
