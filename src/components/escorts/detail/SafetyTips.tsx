
import { AlertCircle, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SafetyTips = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Safety Information</h3>
      
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardHeader className="pb-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <CardTitle className="text-base">Safety First</CardTitle>
              <CardDescription>Important tips for a safe encounter</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Always meet in a public place first for initial encounters</li>
            <li>Let a trusted friend know your whereabouts</li>
            <li>Trust your instincts - if something feels wrong, leave</li>
            <li>Verify the identity of your companion before private meetings</li>
            <li>Discuss boundaries and expectations clearly beforehand</li>
            <li>Be aware of your drink at all times</li>
            <li>Have a safe word or check-in system in place</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader className="pb-2">
          <div className="flex items-start gap-2">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <CardTitle className="text-base">User Verification</CardTitle>
              <CardDescription>We recommend verification for safety</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-sm">
          <p>
            Our platform encourages both escorts and clients to complete identity verification.
            Verified users enjoy a safer experience and build trust within our community.
          </p>
          <div className="mt-4">
            <a href="#" className="text-primary hover:underline font-medium">Learn about our verification process</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyTips;
