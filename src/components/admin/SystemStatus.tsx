
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { uberCore } from '@/core/UberCore';

const SystemStatus: React.FC = () => {
  const systemHealth = uberCore.checkSubsystemHealth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>System status overview:</p>
          <ul className="space-y-2">
            {systemHealth.map((subsystem) => (
              <li key={subsystem.name} className="flex justify-between">
                <span>{subsystem.name}</span>
                <span className={subsystem.health > 90 ? "text-green-500" : "text-amber-500"}>
                  {subsystem.status} ({subsystem.health}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatus;
