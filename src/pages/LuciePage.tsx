
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { lucie } from '@/core/Lucie';
import { hermes } from '@/core/Hermes';

const LuciePage: React.FC = () => {
  React.useEffect(() => {
    // Initialize Lucie
    lucie.initialize();
    
    // Log page view with Hermes
    hermes.connect({
      system: 'LuciePage',
      connectionId: `lucie-${Date.now()}`,
      metadata: {
        page: 'lucie',
        timestamp: new Date().toISOString()
      }
    });
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Lucie AI Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Lucie is an advanced AI assistant integrated with the UberCore ecosystem.
          </p>
          
          <div className="p-4 border rounded-md bg-background">
            <h3 className="text-lg font-medium mb-2">Lucie Status</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Active and Ready</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Natural language interactions</li>
              <li>Content moderation</li>
              <li>Personalized responses</li>
              <li>Integration with Hermes, Oxum and Orus</li>
              <li>Multi-modal capabilities</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Lucie is seamlessly integrated with the UberCore ecosystem:</p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Hermes Communication</span>
                <span className="text-green-500">Connected</span>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[95%]"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Oxum Monetization</span>
                <span className="text-green-500">Active</span>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[88%]"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Orus Security</span>
                <span className="text-green-500">Protected</span>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[92%]"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LuciePage;
