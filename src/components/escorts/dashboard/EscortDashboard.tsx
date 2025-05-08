import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/auth";
import MainLayout from "@/components/layout/MainLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const EscortDashboard = () => {
  const { user, profile, checkRole, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bookings");
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/auth");
        return;
      }

      const isEscort = checkRole("escort");
      setVerifying(false);

      if (!isEscort) {
        navigate("/");
      }
    }
  }, [isLoading, user, checkRole, navigate]);

  if (isLoading || verifying) {
    return (
      <MainLayout title="Escort Dashboard">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  // Update field access with optional chaining and fallbacks
  const displayName = profile?.username || profile?.name || 'User';
  const isVerified = profile?.verified || profile?.is_verified || false;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Escort Dashboard</h1>
          <Button onClick={() => navigate(`/escorts/${profile?.username}`)}>View Public Profile</Button>
        </div>

        {isVerified ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bookings" className="space-y-4">
              <p>Bookings will be implemented soon.</p>
            </TabsContent>
            
            <TabsContent value="messages" className="space-y-4">
              <p>Messages will be implemented soon.</p>
            </TabsContent>
            
            <TabsContent value="earnings" className="space-y-4">
              <p>Earnings will be implemented soon.</p>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <p>Settings will be implemented soon.</p>
            </TabsContent>
          </Tabs>
        ) : (
          <Alert variant="warning">
            <AlertTitle>Verification Required</AlertTitle>
            <AlertDescription>
              You need to verify your account before you can access the escort dashboard.
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

export default EscortDashboard;
