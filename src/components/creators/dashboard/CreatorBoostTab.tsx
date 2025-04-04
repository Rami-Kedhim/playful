
import { useState } from "react";
import BoostManager from "./boost/BoostManager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, TrendingUp, BarChart } from "lucide-react";

interface CreatorBoostTabProps {
  creatorId: string;
  profile: any;
}

const CreatorBoostTab = ({ creatorId, profile }: CreatorBoostTabProps) => {
  const [activeTab, setActiveTab] = useState("boost");
  
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
          <Card>
            <CardHeader>
              <CardTitle>Boost Analytics</CardTitle>
              <CardDescription>
                Track the performance of your profile boosts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Boost analytics will appear here once you have active or past boosts.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Boost History</CardTitle>
              <CardDescription>
                View your past profile boost purchases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Your boost history will appear here once you have purchased boosts.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorBoostTab;
