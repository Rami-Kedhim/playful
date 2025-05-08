
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UnifiedLayout } from '@/layouts';
import { UnifiedRoutes } from '@/routes/unifiedRoutes';
import { uberCore } from '@/core/UberCore';
import { orus } from '@/core/Orus';

const AppPage: React.FC = () => {
  useEffect(() => {
    // Initialize core systems
    const initSystemCheck = async () => {
      // Check system integrity via Orus
      const integrityResult = await orus.checkIntegrity();
      console.info('System integrity check:', integrityResult.valid ? 'Passed' : 'Failed');
      
      // Check core systems status
      const systemStatus = await uberCore.getSystemStatus();
      console.info('UberCore system status:', systemStatus.operational ? 'Operational' : 'Degraded');
    };
    
    initSystemCheck();
  }, []);

  return (
    <UnifiedLayout title="UberEscorts App" showBreadcrumbs>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">UberEscorts App</h1>
        
        <div className="space-y-6">
          <div className="bg-card rounded-lg p-6 border">
            <h2 className="text-xl font-semibold mb-4">Welcome to UberEscorts</h2>
            <p className="text-muted-foreground">
              This is the main application page. Navigate to specific sections using the menu.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* System Status Card */}
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-medium mb-2">Core Systems</h3>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>UberCore</span>
                  <span className="text-green-500 text-sm">Online</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Hermes</span>
                  <span className="text-green-500 text-sm">Online</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Oxum</span>
                  <span className="text-green-500 text-sm">Online</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Lucie</span>
                  <span className="text-green-500 text-sm">Online</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Orus</span>
                  <span className="text-green-500 text-sm">Online</span>
                </li>
              </ul>
            </div>
            
            {/* Quick Links Card */}
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-medium mb-2">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href={UnifiedRoutes.escorts.base} className="text-blue-500 hover:underline">
                    Browse Escorts
                  </a>
                </li>
                <li>
                  <a href={UnifiedRoutes.creators.base} className="text-blue-500 hover:underline">
                    View Creators
                  </a>
                </li>
                <li>
                  <a href={UnifiedRoutes.livecams.base} className="text-blue-500 hover:underline">
                    Watch Live Cams
                  </a>
                </li>
                <li>
                  <a href={UnifiedRoutes.wallet.base} className="text-blue-500 hover:underline">
                    Manage Wallet
                  </a>
                </li>
              </ul>
            </div>
            
            {/* User Activity Card */}
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-medium mb-2">Recent Activity</h3>
              <p className="text-muted-foreground text-sm">
                No recent activity to display
              </p>
            </div>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default AppPage;
