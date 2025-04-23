
import { useAuth } from "@/hooks/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import VerificationSubmitTab from "@/components/verification/tabs/VerificationSubmitTab";
import VerificationStatusTab from "@/components/verification/tabs/VerificationStatusTab";
import VerificationUpgradeTab from "@/components/verification/tabs/VerificationUpgradeTab";
import { useVerificationStatus } from "@/hooks/verification/useVerificationStatus";
import { VerificationLevel } from "@/types/verification";

export default function VerificationPage() {
  const { user } = useAuth();
  const { status, loading } = useVerificationStatus();

  if (!user) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Please log in to access verification features
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Account Verification</CardTitle>
          <CardDescription>
            Verify your account to unlock additional features and build trust with other users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="submit" className="space-y-4">
            <TabsList>
              <TabsTrigger value="submit">Submit Verification</TabsTrigger>
              <TabsTrigger value="status">Verification Status</TabsTrigger>
              <TabsTrigger value="upgrade">Upgrade Level</TabsTrigger>
            </TabsList>

            <TabsContent value="submit">
              <VerificationSubmitTab onComplete={() => {}} />
            </TabsContent>

            <TabsContent value="status">
              <VerificationStatusTab />
            </TabsContent>

            <TabsContent value="upgrade">
              <VerificationUpgradeTab
                userId={user.id}
                currentLevel={user.user_metadata?.verification_level || VerificationLevel.NONE}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
