
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const LucieBoostPage = () => {
  return (
    <UnifiedLayout
      title="Lucie Boost"
      description="Boost your visibility with Lucie's AI-powered recommendations"
      showBreadcrumbs
    >
      <div className="max-w-3xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI-Powered Profile Boost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Lucie's AI algorithms can analyze your profile and suggest improvements to increase visibility and engagement.
            </p>
            <Button className="w-full sm:w-auto">Generate Boost Recommendations</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Visibility Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Connect your profile to see AI-powered visibility analytics and recommendations.
            </p>
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  );
};

export default LucieBoostPage;
