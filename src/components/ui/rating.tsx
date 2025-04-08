
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string; // Added className for more flexibility
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  onChange,
  readOnly = false,
  size = 'md',
  color = 'text-yellow-400',
  className
}) => {
  const sizeMap = {
    sm: 'h-3 w-3',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };
  
  const starSize = sizeMap[size];
  
  const handleClick = (newValue: number) => {
    if (readOnly) return;
    onChange?.(newValue);
  };

  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(max)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            className={cn(
              starSize,
              'cursor-pointer transition-all',
              starValue <= value ? color : 'text-muted-foreground/30',
              !readOnly && 'hover:scale-110'
            )}
            fill={starValue <= value ? 'currentColor' : 'none'}
            onClick={() => handleClick(starValue)}
          />
        );
      })}
    </div>
  );
};
