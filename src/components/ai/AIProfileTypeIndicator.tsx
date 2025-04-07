
import { Badge } from "@/components/ui/badge";
import { Bot, Crown } from "lucide-react";

export interface AIProfileTypeIndicatorProps {
  type: 'ai' | 'premium' | 'human';
  size?: string;
  showLabel?: boolean;
}

const AIProfileTypeIndicator: React.FC<AIProfileTypeIndicatorProps> = ({ 
  type, 
  size = 'default',
  showLabel = true
}) => {
  if (type === 'premium') {
    return (
      <Badge 
        variant="secondary" 
        className={`bg-amber-100 text-amber-800 hover:bg-amber-200 ${
          size === 'small' ? 'text-xs py-0 px-1.5' : ''
        }`}
      >
        <Crown className={`${size === 'small' ? 'h-2.5 w-2.5' : 'h-3 w-3'} mr-1`} />
        {showLabel && 'Premium'}
      </Badge>
    );
  } else if (type === 'ai') {
    return (
      <Badge 
        variant="outline" 
        className={`border-violet-300 bg-violet-100 text-violet-800 hover:bg-violet-200 ${
          size === 'small' ? 'text-xs py-0 px-1.5' : ''
        }`}
      >
        <Bot className={`${size === 'small' ? 'h-2.5 w-2.5' : 'h-3 w-3'} mr-1`} />
        {showLabel && 'AI'}
      </Badge>
    );
  }
  
  return null;
};

export default AIProfileTypeIndicator;
