
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LucieGuidePage = () => {
  return (
    <UnifiedLayout
      title="Lucie Guide"
      description="Get guidance from Lucie on using the UberEscorts platform"
      showBreadcrumbs
    >
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Platform Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Welcome to the UberEscorts platform guide. Lucie is here to help you navigate through our services.
            </p>
            <div className="space-y-4">
              <section>
                <h3 className="text-lg font-medium mb-2">Getting Started</h3>
                <p>Learn how to set up your profile, verify your account, and start using our platform.</p>
              </section>
              <section>
                <h3 className="text-lg font-medium mb-2">Finding Escorts</h3>
                <p>Discover how to search for escorts, filter by preferences, and view profiles.</p>
              </section>
              <section>
                <h3 className="text-lg font-medium mb-2">Booking Services</h3>
                <p>Learn the booking process, payment options, and how to schedule meetings.</p>
              </section>
              <section>
                <h3 className="text-lg font-medium mb-2">Safety Features</h3>
                <p>Understand our safety features, route sharing, and verification processes.</p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  );
};

export default LucieGuidePage;
