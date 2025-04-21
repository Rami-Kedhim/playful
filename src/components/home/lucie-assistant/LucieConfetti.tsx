
import React, { useEffect, useState } from 'react';

interface LucieConfettiProps {
  show: boolean;
  onComplete?: () => void;
}

const LucieConfetti: React.FC<LucieConfettiProps> = ({ show, onComplete }) => {
  const [pieces, setPieces] = useState<Array<{ id: number; color: string; left: number; delay: number }>>([]);
  
  useEffect(() => {
    if (show) {
      // Generate confetti pieces
      const colors = ['#9b87f5', '#6366f1', '#f43f5e', '#22c55e', '#f59e0b'];
      const newPieces = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      setPieces(newPieces);
      
      // Clean up after animation completes
      const timer = setTimeout(() => {
        setPieces([]);
        if (onComplete) onComplete();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show && pieces.length === 0) return null;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece absolute top-0"
          style={{ 
            left: `${piece.left}%`, 
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default LucieConfetti;
