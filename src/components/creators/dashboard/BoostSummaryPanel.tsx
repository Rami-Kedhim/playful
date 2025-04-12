
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Rocket, TrendingUp, ChevronRight, Zap } from 'lucide-react';
import { useBoostManager } from '@/hooks/boost';
import { BoostStatus } from '@/types/boost';  // Ensure this import is correct

ChartJS.register(ArcElement, Tooltip, Legend);

interface BoostSummaryPanelProps {
  profileId: string;
  onShowDetails: () => void;
}

const BoostSummaryPanel: React.FC<BoostSummaryPanelProps> = ({ 
  profileId,
  onShowDetails
}) => {
  const { boostStatus, fetchBoostPackages, getBoostAnalytics } = useBoostManager(profileId);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchBoostPackages();
      
      if (boostStatus.isActive) {
        const analytics = await getBoostAnalytics();
        setAnalyticsData(analytics);
      }
      
      setLoading(false);
    };
    
    loadData();
  }, [profileId, boostStatus.isActive, fetchBoostPackages, getBoostAnalytics]);

  // Safely handle progress with optional chaining and nullish coalescing
  const boostProgress = boostStatus.progress ?? 0;

  const chartData = {
    labels: ['Boosted Views', 'Organic Views'],
    datasets: [
      {
        data: analyticsData ? [
          analyticsData.views.withBoost - analyticsData.views.withoutBoost,
          analyticsData.views.withoutBoost
        ] : [25, 75],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/40 pb-2">
          <CardTitle className="text-lg flex items-center">
            <Rocket className="mr-2 h-5 w-5" />
            Boost Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className={`${boostStatus.isActive ? 'bg-primary/10' : 'bg-muted/40'} pb-2`}>
        <CardTitle className="text-lg flex items-center">
          {boostStatus.isActive ? (
            <>
              <Zap className="mr-2 h-5 w-5 text-primary" />
              Active Boost
            </>
          ) : (
            <>
              <Rocket className="mr-2 h-5 w-5" />
              Boost Performance
            </>
          )}
        </CardTitle>
        <CardDescription>
          {boostStatus.isActive 
            ? `Boost active • ${boostStatus.timeRemaining} remaining`
            : 'No active boost • Visibility at normal levels'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {boostStatus.isActive && analyticsData ? (
          <div className="space-y-4">
            <div className="flex">
              <div className="w-1/2">
                <div className="h-[140px] flex items-center justify-center">
                  <Doughnut 
                    data={chartData} 
                    options={{ 
                      plugins: { 
                        legend: { display: false },
                      },
                      cutout: '70%',
                    }} 
                  />
                </div>
              </div>
              <div className="w-1/2 pl-2 flex flex-col justify-center">
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-muted-foreground">Visibility Increase</div>
                    <div className="text-lg font-medium">
                      +{analyticsData.views.increase}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Ranking Position</div>
                    <div className="text-lg font-medium">
                      #{analyticsData.searchRanking.withBoost} 
                      <span className="text-xs text-green-500 ml-1">
                        (↑{analyticsData.searchRanking.improvement})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs">Boost Progress</span>
                <span className="text-xs">{Math.round(boostProgress)}%</span>
              </div>
              <Progress value={boostProgress} className="h-1" />
            </div>
          </div>
        ) : (
          <div className="py-4 text-center">
            <div className="rounded-full bg-muted inline-flex p-3 mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Boost your profile to increase visibility and engagement
            </p>
            <div className="bg-muted p-3 rounded-md mt-4">
              <div className="text-xs font-medium mb-1">Benefits of boosting:</div>
              <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                <li>Higher ranking in search results</li>
                <li>Featured in "Boosted" sections</li>
                <li>Priority in matching algorithms</li>
                <li>Detailed performance analytics</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-muted/20 pt-3 pb-3">
        <Button variant="ghost" size="sm" className="w-full text-xs" onClick={onShowDetails}>
          {boostStatus.isActive ? 'View Full Analytics' : 'Boost Now'} <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BoostSummaryPanel;
