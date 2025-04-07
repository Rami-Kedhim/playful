
import { Badge } from "@/components/ui/badge";
import { Bot, Crown } from "lucide-react";

export interface AIProfileTypeIndicatorProps {
  type: 'ai' | 'premium' | 'human';
  showLabel?: boolean;
}

const AIProfileTypeIndicator: React.FC<AIProfileTypeIndicatorProps> = ({ 
  type, 
  showLabel = true
}) => {
  if (type === 'premium') {
    return (
      <Badge 
        variant="secondary" 
        className="bg-amber-100 text-amber-800 hover:bg-amber-200"
      >
        <Crown className="h-3 w-3 mr-1" />
        {showLabel && 'Premium'}
      </Badge>
    );
  } else if (type === 'ai') {
    return (
      <Badge 
        variant="outline" 
        className="border-violet-300 bg-violet-100 text-violet-800 hover:bg-violet-200"
      >
        <Bot className="h-3 w-3 mr-1" />
        {showLabel && 'AI'}
      </Badge>
    );
  }
  
  return null;
};

export default AIProfileTypeIndicator;
