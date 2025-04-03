import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import CreatorAnalytics from "@/components/creators/dashboard/CreatorAnalytics";
import CreatorContent from "@/components/creators/dashboard/CreatorContent";
import CreatorPayouts from "@/components/creators/dashboard/CreatorPayouts";
import CreatorSettings from "@/components/creators/dashboard/CreatorSettings";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const CreatorDashboard = () => {
  const { user, profile, checkRole, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("analytics");
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/auth");
        return;
      }

      const isCreator = checkRole("creator");
      setVerifying(false);

      if (!isCreator) {
        navigate("/");
      }
    }
  }, [isLoading, user, checkRole, navigate]);

  if (isLoading || verifying) {
    return (
      <MainLayout title="Creator Dashboard">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Creator Dashboard</h1>
          <Button onClick={() => navigate("/creators/" + profile?.username)}>View Public Profile</Button>
        </div>

        {profile?.is_verified ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="payouts">Earnings & Payouts</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analytics" className="space-y-4">
              <CreatorAnalytics creatorId={user?.id} />
            </TabsContent>
            
            <TabsContent value="content" className="space-y-4">
              <CreatorContent creatorId={user?.id} />
            </TabsContent>
            
            <TabsContent value="payouts" className="space-y-4">
              <CreatorPayouts creatorId={user?.id} />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <CreatorSettings profile={profile} />
            </TabsContent>
          </Tabs>
        ) : (
          <Alert variant="warning">
            <AlertTitle>Verification Required</AlertTitle>
            <AlertDescription>
              You need to verify your account before you can start creating content.
              Please update your profile with all required information and submit it for verification.
            </AlertDescription>
            <Button 
              className="mt-4" 
              onClick={() => navigate("/profile")}
            >
              Complete Profile
            </Button>
          </Alert>
        )}
      </div>
    </MainLayout>
  );
};

export default CreatorDashboard;
