
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import VerificationBadge from '../VerificationBadge';

const VerificationUpgradeTab: React.FC = () => {
  return (
    <Card className="bg-muted/30">
      <CardHeader>
        <CardTitle className="text-base flex items-center">
          <Info className="h-4 w-4 mr-2 text-blue-500" />
          Verification Levels
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          { level: 'basic', desc: 'ID Verification' },
          { level: 'enhanced', desc: 'ID + Contact Verification' },
          { level: 'premium', desc: 'ID + In-person Verification' }
        ].map(({ level, desc }) => (
          <div key={level} className="flex items-center justify-between">
            <div className="flex items-center">
              <VerificationBadge level={level as any} size="sm" showTooltip={false} />
              <span className="ml-2 text-sm">
                {level.charAt(0).toUpperCase() + level.slice(1)} Verification
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{desc}</span>
          </div>
        ))}
        
        <p className="text-xs text-muted-foreground border-t border-border pt-3 mt-3">
          Higher verification levels increase trust and visibility on the platform.
        </p>
      </CardContent>
    </Card>
  );
};

export default VerificationUpgradeTab;
