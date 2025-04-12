
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CheckCircle } from 'lucide-react';

interface OxumBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
  className?: string;
  showTooltip?: boolean;
}

/**
 * OxumBadge component to display Oxum compliance status
 */
const OxumBadge: React.FC<OxumBadgeProps> = ({
  size = 'sm',
  variant = 'default',
  className = '',
  showTooltip = false
}) => {
  // Calculate size classes
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-2.5 py-1'
  };
  
  const badge = (
    <Badge 
      variant={variant}
      className={`bg-green-600 hover:bg-green-700 flex items-center gap-1 ${sizeClasses[size]} ${className}`}
    >
      <CheckCircle className={size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'} />
      <span>Oxum</span>
    </Badge>
  );
  
  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent>
            <p>Oxum Protected - Guaranteed fair pricing and zero platform fees</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return badge;
};

export default OxumBadge;
