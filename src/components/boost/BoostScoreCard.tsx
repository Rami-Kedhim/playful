
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, RefreshCw, Zap } from "lucide-react";
import { BoostProfileDialog } from "@/components/boost";

interface BoostScoreCardProps {
  profileId: string;
  isOwnProfile: boolean;
  boostScore: number | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => Promise<void>;
}

const BoostScoreCard = ({
  profileId,
  isOwnProfile,
  boostScore,
  loading,
  error,
  onRefresh
}: BoostScoreCardProps) => {
  const getScoreColor = (score: number | null) => {
    if (score === null) return 'bg-gray-500';
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    if (score >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score: number | null) => {
    if (score === null) return 'Not available';
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Great';
    if (score >= 50) return 'Good';
    if (score >= 30) return 'Fair';
    return 'Poor';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Profile Boost Score</span>
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        </CardTitle>
        <CardDescription>
          How visible your profile is in search results
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-sm text-red-500 mb-2">{error}</div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-1">
              <div className="text-sm font-medium">{getScoreLabel(boostScore)}</div>
              <div className="text-2xl font-bold">{boostScore !== null ? boostScore : '-'}</div>
            </div>
            <Progress
              value={boostScore || 0}
              className={`h-2 ${getScoreColor(boostScore)}`}
            />
            <p className="text-xs text-muted-foreground mt-2">
              A higher score means more visibility in search results and browsing.
            </p>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCw className="h-3 w-3 mr-2" />
          Refresh
        </Button>
        
        {isOwnProfile && (
          <BoostProfileDialog profileId={profileId} />
        )}
      </CardFooter>
    </Card>
  );
};

export default BoostScoreCard;
