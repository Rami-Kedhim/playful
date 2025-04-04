
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Zap, ZapOff, Info, Lock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import useBoostScore from '@/hooks/useBoostScore';
import { useAuth } from '@/hooks/auth/useAuth';

interface BoostScoreCardProps {
  escortId: string;
  isOwnProfile: boolean;
}

const BoostScoreCard = ({ escortId, isOwnProfile }: BoostScoreCardProps) => {
  const { user } = useAuth();
  const { boostScore, loading, error, fetchBoostScore, updateBoostScore, purchaseBoostCredits } = useBoostScore();

  useEffect(() => {
    if (escortId) {
      fetchBoostScore(escortId);
    }
  }, [escortId]);

  const handleUpdateScore = async () => {
    await updateBoostScore(escortId);
  };

  const handlePurchaseBoost = async () => {
    await purchaseBoostCredits(100); // Purchase 100 boost credits
    // After purchase, update the score to reflect new credits
    await updateBoostScore(escortId);
  };

  const getScoreCategory = (score: number | null) => {
    if (score === null) return 'Unknown';
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    if (score >= 20) return 'Fair';
    return 'Poor';
  };

  const getScoreColor = (score: number | null) => {
    if (score === null) return 'bg-gray-500';
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    if (score >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <Card className="overflow-hidden border-gray-700 bg-background">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-md">Boost Score</CardTitle>
            <CardDescription>Profile visibility ranking</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-sm">
                  Boost Score determines your visibility in search results. Higher scores appear first.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="h-6 w-24 bg-gray-700 animate-pulse rounded"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 text-sm">{error}</div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{getScoreCategory(boostScore)}</span>
                <span className="text-2xl font-bold">{boostScore}/100</span>
              </div>
              <Progress value={boostScore || 0} className={getScoreColor(boostScore)} />
              
              {isOwnProfile && boostScore !== null && (
                <div className="pt-2 text-xs text-muted-foreground">
                  <p>Factors that influence your score:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Verification status</li>
                    <li>Profile completeness</li>
                    <li>Recent activity</li>
                    <li>Content quality</li>
                    <li>Interactions</li>
                    <li>Boost credits</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      {isOwnProfile && (
        <CardFooter className="flex gap-2 pt-2 border-t border-gray-800">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleUpdateScore} 
            disabled={loading}
            className="w-1/2"
          >
            <ZapOff className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={handlePurchaseBoost} 
            disabled={loading || !user}
            className="w-1/2"
          >
            {user ? (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Boost
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Login
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BoostScoreCard;
