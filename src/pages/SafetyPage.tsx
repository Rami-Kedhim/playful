
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import { Shield, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AppPaths } from '@/routes/routeConfig';

const SafetyPage: React.FC = () => {
  return (
    <UnifiedLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Safety Center</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your safety is our top priority. Learn about our safety features and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Identity Verification</CardTitle>
              <CardDescription>
                Our multi-level verification system ensures authenticity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Every user undergoes our rigorous verification process to validate their identity and ensure the safety of our community.
              </p>
              <Button variant="link" className="mt-4 p-0">Learn more about verification</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Route Sharing</CardTitle>
              <CardDescription>
                Share your location with trusted contacts for additional security.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Our route sharing feature allows you to automatically share your location with trusted contacts during appointments.
              </p>
              <Button asChild variant="link" className="mt-4 p-0">
                <Link to={AppPaths.ROUTE_SHARE}>Setup route sharing</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Safety Guidelines</CardTitle>
              <CardDescription>
                Best practices and tips for safe interactions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Learn about best practices, warning signs, and what to do in case of emergency.
              </p>
              <Button variant="link" className="mt-4 p-0">View safety guidelines</Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted rounded-lg p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Emergency Resources</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            If you're in an emergency situation, please contact local emergency services immediately.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="destructive" size="lg">Emergency Contact</Button>
            <Button variant="outline" size="lg">Report Suspicious Activity</Button>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default SafetyPage;
