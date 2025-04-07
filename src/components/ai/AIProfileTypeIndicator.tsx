
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Bot, User, ExternalLink, Shield, Star } from 'lucide-react';

export type ProfileType = 'ai' | 'verified' | 'external' | 'premium';

interface AIProfileTypeIndicatorProps {
  type: ProfileType;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Component that visually indicates the type of profile (AI, verified human, external, etc.)
 */
const AIProfileTypeIndicator: React.FC<AIProfileTypeIndicatorProps> = ({
  type,
  className = '',
  showLabel = true,
  size = 'md'
}) => {
  const getTypeConfig = () => {
    switch(type) {
      case 'ai':
        return {
          icon: <Bot className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} mr-1`} />,
          label: 'AI Companion',
          variant: 'secondary',
          tooltip: 'This is an AI-generated virtual companion',
          className: 'bg-purple-100 text-purple-800 hover:bg-purple-200'
        };
      case 'verified':
        return {
          icon: <Shield className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} mr-1`} />,
          label: 'Verified',
          variant: 'default',
          tooltip: 'Identity verified by our team',
          className: 'bg-green-100 text-green-800 hover:bg-green-200'
        };
      case 'external':
        return {
          icon: <ExternalLink className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} mr-1`} />,
          label: 'External',
          variant: 'outline',
          tooltip: 'This profile is sourced from external directories',
          className: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        };
      case 'premium':
        return {
          icon: <Star className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} mr-1 fill-yellow-400 text-yellow-400`} />,
          label: 'Premium',
          variant: 'outline',
          tooltip: 'Premium profile with exclusive content',
          className: 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200'
        };
      default:
        return {
          icon: <User className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} mr-1`} />,
          label: 'User',
          variant: 'outline',
          tooltip: 'Regular user profile',
          className: 'bg-blue-100 text-blue-800 hover:bg-blue-200'
        };
    }
  };

  const config = getTypeConfig();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="outline"
            className={`${config.className} ${className} ${size === 'sm' ? 'text-xs px-1' : size === 'lg' ? 'text-sm px-3 py-1' : 'text-xs px-2'}`}
          >
            {config.icon}
            {showLabel && config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{config.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AIProfileTypeIndicator;
