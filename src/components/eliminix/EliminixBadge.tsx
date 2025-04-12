
import React from 'react';
import { Shield, User, Check, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface EliminixBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'secondary' | 'destructive';
  showTooltip?: boolean;
  isCompliant?: boolean;
  className?: string;
}

/**
 * Eliminix Badge Component
 * Displays a badge indicating compliance with the Eliminix Rule:
 * No artificial entities simulating emotional or sexual companionship
 */
const EliminixBadge: React.FC<EliminixBadgeProps> = ({ 
  size = 'md', 
  variant = 'default',
  showTooltip = true,
  isCompliant = true,
  className = ''
}) => {
  const badgeContent = (
    <Badge 
      variant={isCompliant ? variant : 'destructive'}
      className={`
        flex items-center gap-1
        ${size === 'sm' ? 'text-xs py-0' : size === 'lg' ? 'text-sm py-1' : 'text-xs py-0.5'}
        ${variant === 'default' && isCompliant ? 'bg-green-600 hover:bg-green-700' : ''}
        ${className}
      `}
    >
      {isCompliant ? (
        <>
          <Shield className={size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
          <span>Eliminix Compliant</span>
          <User className={size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
        </>
      ) : (
        <>
          <AlertTriangle className={size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
          <span>Non-Compliant</span>
        </>
      )}
    </Badge>
  );

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badgeContent}
          </TooltipTrigger>
          <TooltipContent>
            <div className="max-w-xs">
              <p className="font-medium">
                {isCompliant ? 'Eliminix Rule Compliant' : 'Eliminix Rule Violation'}
              </p>
              <p className="text-xs mt-1">
                {isCompliant ? (
                  "This platform guarantees 100% real human profiles with no AI-generated companions or simulated emotional relationships."
                ) : (
                  "This profile may violate the Eliminix Rule which prohibits AI-generated companions or simulated emotional relationships."
                )}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badgeContent;
};

export default EliminixBadge;
