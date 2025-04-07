
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
  fullPage?: boolean;
  fullHeight?: boolean;
  centered?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'md',
  className,
  text,
  fullPage = false,
  fullHeight = false,
  centered = true,
}) => {
  // Size variants
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-10 w-10',
  };

  const containerClasses = cn(
    'flex flex-col items-center justify-center gap-2',
    fullPage && 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50',
    fullHeight && 'h-full',
    centered && 'mx-auto',
    className
  );

  const spinnerClasses = cn(
    'animate-spin text-primary',
    sizeClasses[size]
  );

  return (
    <div className={containerClasses}>
      <Loader2 className={spinnerClasses} />
      {text && (
        <p className={cn(
          'text-muted-foreground',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          size === 'lg' && 'text-base'
        )}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingIndicator;
