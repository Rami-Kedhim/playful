
import { Badge } from "@/components/ui/badge";
import { Bot, Crown } from "lucide-react";

interface AIProfileTypeIndicatorProps {
  type: 'ai' | 'premium' | 'human';
}

const AIProfileTypeIndicator: React.FC<AIProfileTypeIndicatorProps> = ({ type }) => {
  if (type === 'premium') {
    return (
      <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
        <Crown className="h-3 w-3 mr-1" />
        Premium
      </Badge>
    );
  } else if (type === 'ai') {
    return (
      <Badge variant="outline" className="border-violet-300 bg-violet-100 text-violet-800 hover:bg-violet-200">
        <Bot className="h-3 w-3 mr-1" />
        AI
      </Badge>
    );
  }
  
  return null;
};

export default AIProfileTypeIndicator;
