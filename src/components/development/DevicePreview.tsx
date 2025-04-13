
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, Tablet, Monitor, RotateCcw } from 'lucide-react';

interface DevicePreviewProps {
  children: React.ReactNode;
}

export function DevicePreview({ children }: DevicePreviewProps) {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  
  const getDeviceSize = () => {
    switch (deviceType) {
      case 'mobile':
        return orientation === 'portrait' 
          ? { width: 375, height: 667 } 
          : { width: 667, height: 375 };
      case 'tablet':
        return orientation === 'portrait' 
          ? { width: 768, height: 1024 } 
          : { width: 1024, height: 768 };
      case 'desktop':
      default:
        return { width: '100%', height: 800 };
    }
  };
  
  const size = getDeviceSize();
  
  const toggleOrientation = () => {
    setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait');
  };
  
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex items-center gap-4">
        <Tabs value={deviceType} onValueChange={(value: string) => setDeviceType(value as any)}>
          <TabsList>
            <TabsTrigger value="mobile" className="flex items-center gap-1">
              <Smartphone className="h-4 w-4" />
              <span className="hidden sm:inline">Mobile</span>
            </TabsTrigger>
            <TabsTrigger value="tablet" className="flex items-center gap-1">
              <Tablet className="h-4 w-4" />
              <span className="hidden sm:inline">Tablet</span>
            </TabsTrigger>
            <TabsTrigger value="desktop" className="flex items-center gap-1">
              <Monitor className="h-4 w-4" />
              <span className="hidden sm:inline">Desktop</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {deviceType !== 'desktop' && (
          <Button variant="outline" size="sm" onClick={toggleOrientation}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Rotate
          </Button>
        )}
      </div>
      
      <div
        className={`border rounded-lg overflow-hidden transition-all duration-300 bg-background shadow-lg ${
          deviceType !== 'desktop' ? 'shadow-lg' : ''
        }`}
        style={{
          width: typeof size.width === 'number' ? `${size.width}px` : size.width,
          height: typeof size.height === 'number' ? `${size.height}px` : size.height,
          maxWidth: '100%',
          maxHeight: 'calc(100vh - 220px)',
        }}
      >
        <div className="w-full h-full overflow-auto">
          {children}
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground text-center">
        Preview Size: {typeof size.width === 'number' ? size.width : '100%'} × {typeof size.height === 'number' ? size.height : 'auto'}
        {deviceType !== 'desktop' && ` (${orientation})`}
      </div>
    </div>
  );
}
