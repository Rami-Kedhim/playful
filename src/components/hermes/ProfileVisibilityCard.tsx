
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Zap, TrendingUp, Eye } from 'lucide-react';
import { getProfileVisibilityScore, logInteraction } from '@/utils/uberCore';
import { useNavigate } from 'react-router-dom';

interface ProfileVisibilityCardProps {
  profileId: string;
  className?: string;
}

export const ProfileVisibilityCard = ({ profileId, className }: ProfileVisibilityCardProps) => {
  const [visibilityScore, setVisibilityScore] = useState(0);
  const [isLoadingScore, setIsLoadingScore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the visibility score from Hermes
    const score = getProfileVisibilityScore(profileId);
    setVisibilityScore(score);
    setIsLoadingScore(false);
    
    // Log this visibility check
    logInteraction('ProfileVisibility', 'check-score', { profileId, score });
  }, [profileId]);

  const getScoreColor = () => {
    if (visibilityScore >= 80) return 'text-green-500';
    if (visibilityScore >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreDescription = () => {
    if (visibilityScore >= 80) return 'Excellent visibility';
    if (visibilityScore >= 60) return 'Good visibility';
    if (visibilityScore >= 40) return 'Average visibility';
    return 'Low visibility';
  };

  const handleBoostProfile = () => {
    // Log the boost action
    logInteraction('ProfileVisibility', 'boost-click', { 
      profileId, 
      currentScore: visibilityScore 
    });
    
    // Navigate to the pulse boost page
    navigate('/pulse-boost');
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Profile Visibility
        </CardTitle>
        <CardDescription>
          How visible your profile is in searches and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingScore ? (
          <div className="h-20 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Current visibility:</span>
              <span className={`text-2xl font-bold ${getScoreColor()}`}>
                {visibilityScore}/100
              </span>
            </div>
            
            <Progress value={visibilityScore} className="h-2" />
            
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{getScoreDescription()}</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          disabled={isLoadingScore || visibilityScore >= 90}
          onClick={handleBoostProfile}
        >
          <Zap className="h-4 w-4 mr-2" />
          {visibilityScore >= 90 ? 'Maximum Visibility' : 'Boost Visibility'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileVisibilityCard;
