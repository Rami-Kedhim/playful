
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHermesFlow } from '@/hooks/useHermesFlow';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Compass, Search, MessageSquare, Globe, Zap } from 'lucide-react';

interface RecommendedActionProps {
  className?: string;
  onActionSelected?: (action: string) => void;
}

export const RecommendedActions = ({ className, onActionSelected }: RecommendedActionProps) => {
  const { getRecommendedAction } = useHermesFlow();
  const [recommendedAction, setRecommendedAction] = useState<string>('explore');
  const navigate = useNavigate();

  useEffect(() => {
    // Get recommendation from Hermes
    const action = getRecommendedAction();
    setRecommendedAction(action);
  }, [getRecommendedAction]);

  const handleActionClick = (action: string, path: string) => {
    if (onActionSelected) {
      onActionSelected(action);
    }
    navigate(path);
  };

  const getActionDetails = () => {
    switch (recommendedAction) {
      case 'search':
        return {
          title: 'Discover Escorts',
          description: 'Find the perfect companion based on your preferences',
          icon: <Search className="h-5 w-5" />,
          path: '/search'
        };
      case 'escorts':
        return {
          title: 'Browse Escorts',
          description: 'Explore our selection of high-quality escorts',
          icon: <Compass className="h-5 w-5" />,
          path: '/escorts'
        };
      case 'messages':
        return {
          title: 'Check Messages',
          description: 'Review and respond to your conversations',
          icon: <MessageSquare className="h-5 w-5" />,
          path: '/messages'
        };
      case 'metaverse':
        return {
          title: 'Enter Metaverse',
          description: 'Experience our immersive virtual environment',
          icon: <Globe className="h-5 w-5" />,
          path: '/metaverse'
        };
      case 'pulse-boost':
      default:
        return {
          title: 'Boost Your Profile',
          description: 'Increase your visibility with PulseBoost',
          icon: <Zap className="h-5 w-5" />,
          path: '/pulse-boost'
        };
    }
  };

  const actionDetails = getActionDetails();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {actionDetails.icon}
          <span>Recommended for You</span>
        </CardTitle>
        <CardDescription>Based on your activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            {actionDetails.icon}
          </div>
          <div>
            <h3 className="font-medium">{actionDetails.title}</h3>
            <p className="text-sm text-muted-foreground">{actionDetails.description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => handleActionClick(recommendedAction, actionDetails.path)}
        >
          {`Go to ${actionDetails.title}`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendedActions;
