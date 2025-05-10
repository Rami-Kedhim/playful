
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Clock, BarChart4 } from 'lucide-react';
import { BoostPackage, BoostStatus } from '@/types/pulse-boost';

interface PulseBoostManagerProps {
  profileId?: string;
  onSuccess?: () => void;
}

const PulseBoostManager: React.FC<PulseBoostManagerProps> = ({
  profileId,
  onSuccess
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activeBoost, setActiveBoost] = useState<BoostStatus | null>(null);
  const [boostPackages, setBoostPackages] = useState<BoostPackage[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    // Simulate loading boost data
    const loadBoostData = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockPackages: BoostPackage[] = [
          {
            id: 'basic',
            name: 'Basic Boost',
            description: 'Enhance your visibility for 24 hours',
            price: 29.99,
            price_ubx: 300,
            duration: '24:00:00',
            visibility: '50%',
            features: ['Top search positions', 'Featured section placement'],
            durationMinutes: 1440,
            visibility_increase: 50,
            isMostPopular: false
          },
          {
            id: 'premium',
            name: 'Premium Boost',
            description: 'Maximum visibility boost for 3 days',
            price: 69.99,
            price_ubx: 700,
            duration: '72:00:00',
            visibility: '100%',
            features: ['Top search positions', 'Featured section placement', 'Highlighted profile', 'Premium badge'],
            durationMinutes: 4320,
            visibility_increase: 100,
            isMostPopular: true
          }
        ];
        
        setBoostPackages(mockPackages);
        
        // Mock active boost (50% of the time)
        if (Math.random() > 0.5) {
          const mockBoost: BoostStatus = {
            isActive: true,
            packageId: 'basic',
            packageName: 'Basic Boost',
            startTime: new Date(Date.now() - 12 * 60 * 60 * 1000),
            endTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
            remainingTime: '12:00:00',
            timeRemaining: '12 hours',
            progress: 50,
            boostPackage: mockPackages[0]
          };
          
          setActiveBoost(mockBoost);
        }
      } catch (error) {
        console.error('Error loading boost data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadBoostData();
  }, [profileId]);
  
  const formatTimeRemaining = (date: Date): string => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    
    if (diff <= 0) return '0h 0m';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };
  
  const renderActiveBoost = () => {
    if (!activeBoost || !activeBoost.isActive) {
      return (
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-4">
              <p className="text-muted-foreground">No active boost</p>
              <Button 
                className="mt-4" 
                onClick={() => setDialogOpen(true)}
                size="sm"
              >
                <Zap className="mr-2 h-4 w-4" />
                Boost Now
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }
    
    const selectedBoost = boostPackages.find(pkg => pkg.id === activeBoost.packageId);
    
    return (
      <Card className="border-primary/20">
        <CardHeader className="bg-primary/5 pb-2">
          <CardTitle className="text-lg flex justify-between">
            <span className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-primary" />
              Active Boost
            </span>
            <Badge>{selectedBoost?.name}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Package</p>
              <p className="font-medium">{selectedBoost?.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expires</p>
              <p className="font-medium">{activeBoost.endTime ? formatTimeRemaining(new Date(activeBoost.endTime)) : 'Unknown'}</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{activeBoost.progress || 0}%</span>
            </div>
            <Progress value={activeBoost.progress || 0} />
          </div>
          
          <div className="pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => setDialogOpen(true)}
            >
              Manage Boost
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  // Adding the missing Badge component
  const Badge = ({ children }: { children?: React.ReactNode }) => {
    return (
      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
        {children}
      </span>
    );
  };
  
  // Adding the missing Progress component
  const Progress = ({ value = 0 }: { value?: number }) => {
    return (
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary" 
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        ></div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderActiveBoost()}
      
      <div className="grid gap-4 md:grid-cols-3">
        {boostPackages.map(pkg => (
          <Card key={pkg.id} className={pkg.isMostPopular ? "border-primary" : ""}>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-1">{pkg.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{pkg.description}</p>
              
              <div className="mb-2">
                <span className="text-2xl font-bold">${pkg.price}</span>
                <span className="text-muted-foreground text-sm ml-1">/ {pkg.duration.replace(/:\d\d:\d\d$/, 'h')}</span>
              </div>
              
              {pkg.features && pkg.features.length > 0 && (
                <ul className="text-sm space-y-1 mb-4">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              
              <Button 
                className="w-full mt-2" 
                variant={pkg.isMostPopular ? "default" : "outline"}
                size="sm"
                onClick={() => setDialogOpen(true)}
              >
                <Zap className="mr-2 h-4 w-4" /> 
                Get {pkg.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PulseBoostManager;
