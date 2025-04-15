
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const SuccessCard = () => {
  return (
    <Card className="border-green-500/30 bg-green-500/5">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-green-500/10">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <CardTitle>Verification Submitted</CardTitle>
            <CardDescription>Your documents are being processed</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We've received your verification documents and they are now being reviewed. This process typically takes 24-48 hours.
          </p>
          <div className="bg-background/50 p-4 rounded-md space-y-2">
            <h4 className="font-medium text-sm">What happens next?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Our team will review your submitted documents</li>
              <li>You'll receive an email once the review is complete</li>
              <li>Additional information may be requested if needed</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;

