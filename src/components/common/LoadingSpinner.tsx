
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = ''
}) => {
  const sizeClass = 
    size === 'sm' ? 'h-4 w-4' :
    size === 'lg' ? 'h-8 w-8' :
    'h-6 w-6';
  
  const colorClass = 
    color === 'primary' ? 'border-primary' :
    color === 'secondary' ? 'border-secondary' :
    `border-${color}`;
  
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div 
        className={`animate-spin rounded-full ${sizeClass} border-b-2 ${colorClass}`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default LoadingSpinner;
