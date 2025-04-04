import { useState, useEffect } from "react";
import BoostManager from "./boost/BoostManager";
import BoostAnalyticsCard from "./boost/BoostAnalyticsCard";
import BoostHistoryTable from "./boost/BoostHistoryTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, TrendingUp, BarChart } from "lucide-react";
import { useBoostManager } from "@/hooks/boost";

interface CreatorBoostTabProps {
  creatorId: string;
  profile: any;
}

const CreatorBoostTab = ({ creatorId, profile }: CreatorBoostTabProps) => {
  const [activeTab, setActiveTab] = useState("boost");
  const [boostHistory, setBoostHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  
  const {
    boostStatus,
    getBoostAnalytics
  } = useBoostManager(creatorId);
  
  useEffect(() => {
    // Mock fetch boost history data
    const timer = setTimeout(() => {
      setBoostHistory([
        {
          id: "history-1",
          startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          boostPackage: {
            id: "boost-1",
            name: "Weekend Boost",
            duration: "72:00:00",
            price_lucoin: 120
          },
          price: 120
        },
        {
          id: "history-2",
          startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
          boostPackage: {
            id: "boost-2",
            name: "24 Hour Boost",
            duration: "24:00:00",
            price_lucoin: 50
          },
          price: 50
        }
      ]);
      setHistoryLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="boost" className="flex items-center">
            <Zap className="h-4 w-4 mr-2" />
            Boost Profile
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <BarChart className="h-4 w-4 mr-2" />
            Boost Analytics
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Boost History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="boost" className="mt-6">
          <BoostManager 
            creatorId={creatorId}
            profileCompleteness={profile?.profile_completeness || 0}
            isVerified={profile?.isVerified || false}
            rating={profile?.rating || 0}
            profileCreatedDate={profile?.created_at ? new Date(profile.created_at) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
            country={profile?.country || "US"}
            role={profile?.isVerified ? 'verified' : 'regular'}
            lucoinBalance={profile?.lucoin_balance || 0}
          />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BoostAnalyticsCard 
              isActive={boostStatus.isActive} 
              getAnalytics={getBoostAnalytics}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Engagement Statistics</CardTitle>
                <CardDescription>
                  Track how boosts affect profile engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>More detailed analytics will appear here as you use profile boosts.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <BoostHistoryTable 
            history={boostHistory}
            loading={historyLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorBoostTab;
