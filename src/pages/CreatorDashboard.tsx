
import { useState } from "react";
import { useCreatorAuth } from "@/hooks/useCreatorAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Upload, AlertCircle, ChevronRight, Zap } from "lucide-react";
import CreatorAnalytics from "@/components/creators/dashboard/CreatorAnalytics";
import CreatorContent from "@/components/creators/dashboard/CreatorContent";
import CreatorPayouts from "@/components/creators/dashboard/CreatorPayouts";
import CreatorSettings from "@/components/creators/dashboard/CreatorSettings";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/hooks/useAuth";

const CreatorDashboard = () => {
  const { isCreator, creatorProfile, loading, canCreate, creatorId } = useCreatorAuth();
  const [activeTab, setActiveTab] = useState("analytics");
  const { user } = useAuth();

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 space-y-6">
          <Skeleton className="h-12 w-1/3" />
          <Skeleton className="h-64 w-full" />
        </div>
      </MainLayout>
    );
  }

  if (!isCreator) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You don't have access to the creator dashboard. Please apply to become a creator first.
            </AlertDescription>
            <Button className="mt-4" variant="outline">Apply Now</Button>
          </Alert>
        </div>
      </MainLayout>
    );
  }

  if (!creatorProfile?.isVerified) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Verification Required</AlertTitle>
            <AlertDescription>
              Your creator account needs to be verified before you can access the dashboard.
              Please complete your profile and submit verification documents.
            </AlertDescription>
            <div className="flex gap-4 mt-4">
              <Button>Complete Profile</Button>
              <Button variant="outline">Submit Verification</Button>
            </div>
          </Alert>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Creator Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your content, track earnings, and grow your audience
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Content
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Account Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{creatorProfile?.level || "Standard"}</div>
              <Button variant="link" className="p-0 h-auto text-xs flex items-center">
                Upgrade <ChevronRight className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Payout Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {creatorProfile?.payoutDetails?.hasSetupPayout ? "Ready" : "Not Set Up"}
              </div>
              {!creatorProfile?.payoutDetails?.hasSetupPayout && (
                <Button variant="link" className="p-0 h-auto text-xs flex items-center">
                  Set up now <ChevronRight className="h-3 w-3" />
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Next Payout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 days</div>
              <div className="text-xs text-muted-foreground">
                Estimated: Jul 15, 2023
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Content Count
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <div className="text-xs text-muted-foreground">
                8 premium, 16 free
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="payouts">Earnings & Payouts</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <Tabs.Content value="analytics" className="space-y-4">
            <CreatorAnalytics creatorId={creatorId || ''} />
          </Tabs.Content>

          <Tabs.Content value="content" className="space-y-4">
            <CreatorContent creatorId={creatorId || ''} />
          </Tabs.Content>

          <Tabs.Content value="payouts" className="space-y-4">
            <CreatorPayouts creatorId={creatorId || ''} />
          </Tabs.Content>

          <Tabs.Content value="settings" className="space-y-4">
            <CreatorSettings profile={creatorProfile} />
          </Tabs.Content>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CreatorDashboard;
