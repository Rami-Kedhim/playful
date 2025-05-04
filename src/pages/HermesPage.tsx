
import React, { useEffect, useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { hermes } from '@/core/Hermes';
import { ReloadIcon } from '@radix-ui/react-icons';
import { UserJourneyInsights } from '@/types/core-systems';

const HermesPage: React.FC = () => {
  const [userInsights, setUserInsights] = useState<UserJourneyInsights | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    loadUserInsights();
  }, []);
  
  const loadUserInsights = async () => {
    setLoading(true);
    try {
      // Assuming a demo user ID for demonstration
      const insights = hermes.getUserJourneyInsights('demo-user');
      setUserInsights(insights);
    } catch (error) {
      console.error("Failed to load user insights:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <MainLayout 
      title="Hermes Analytics System" 
      description="User journey insights and analytics"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">User Journey Insights</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadUserInsights}
            disabled={loading}
          >
            {loading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </>
            ) : (
              'Refresh Data'
            )}
          </Button>
        </div>
        
        {userInsights ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Data</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium">Total Sessions:</dt>
                    <dd>{userInsights.sessions}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Average Duration:</dt>
                    <dd>{Math.floor(userInsights.averageDuration / 60)}m {userInsights.averageDuration % 60}s</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {userInsights.topPages.map((page, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{page.page}</span>
                      <span className="font-medium">{page.views} views</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Conversion Points</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {userInsights.conversionPoints.map((point, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{point.action.replace('_', ' ')}</span>
                      <span className="font-medium">{point.count}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12">
            {loading ? (
              <div>
                <ReloadIcon className="animate-spin h-8 w-8 mx-auto mb-4" />
                <p>Loading analytics data...</p>
              </div>
            ) : (
              <p>No analytics data available.</p>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default HermesPage;
