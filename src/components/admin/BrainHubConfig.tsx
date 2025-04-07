
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import { useToast } from '@/components/ui/use-toast';

const AcademicModelTab = ({ 
  model, 
  title, 
  description, 
  onToggle 
}: { 
  model: Record<string, boolean>,
  title: string,
  description: string,
  onToggle: (key: string, value: boolean) => void
}) => (
  <div className="space-y-4">
    <div className="mb-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>

    <div className="space-y-2">
      {Object.entries(model).map(([key, enabled]) => (
        <div key={key} className="flex items-center justify-between">
          <div>
            <Label htmlFor={`toggle-${key}`} className="capitalize">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </Label>
          </div>
          <Switch
            id={`toggle-${key}`}
            checked={enabled}
            onCheckedChange={(checked) => onToggle(key, checked)}
          />
        </div>
      ))}
    </div>
  </div>
);

interface RestrictedRegion {
  id: string;
  name: string;
}

const BrainHubConfig: React.FC = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState(brainHub.getConfig());
  const [restrictedRegions, setRestrictedRegions] = useState<RestrictedRegion[]>([
    { id: '1', name: 'restricted-region-1' },
    { id: '2', name: 'restricted-region-2' }
  ]);
  const [newRegion, setNewRegion] = useState('');
  
  const handleAcademicModelToggle = (model: keyof typeof config, key: string, value: boolean) => {
    setConfig(prev => ({
      ...prev,
      [model]: {
        ...prev[model],
        [key]: value
      }
    }));
  };
  
  const handleFeatureToggle = (key: keyof typeof config, value: boolean) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleAddRestrictedRegion = () => {
    if (!newRegion.trim()) return;
    
    const region = newRegion.trim().toLowerCase();
    if (restrictedRegions.some(r => r.name === region)) {
      toast({
        title: "Region already exists",
        description: `${region} is already in the restricted regions list`,
        variant: "destructive"
      });
      return;
    }
    
    const newId = `${restrictedRegions.length + 1}`;
    setRestrictedRegions([...restrictedRegions, { id: newId, name: region }]);
    setNewRegion('');
  };
  
  const handleRemoveRegion = (id: string) => {
    setRestrictedRegions(restrictedRegions.filter(region => region.id !== id));
  };
  
  const handleSaveConfig = () => {
    brainHub.updateConfig(config);
    
    toast({
      title: "Configuration updated",
      description: "Brain Hub configuration has been successfully updated",
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Brain Hub Configuration</CardTitle>
        <CardDescription>
          Configure the Hermes Oxum Brain Hub for content filtering and AI behavior
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="psychology" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="psychology">Psychology</TabsTrigger>
            <TabsTrigger value="physics">Physics</TabsTrigger>
            <TabsTrigger value="economics">Economics</TabsTrigger>
            <TabsTrigger value="robotics">Robotics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="psychology">
            <AcademicModelTab 
              model={config.psychology}
              title="Psychological Models"
              description="Configure the psychological models that drive AI personality and emotional responses"
              onToggle={(key, value) => handleAcademicModelToggle('psychology', key, value)}
            />
          </TabsContent>
          
          <TabsContent value="physics">
            <AcademicModelTab 
              model={config.physics}
              title="Physics Models"
              description="Configure simulation models for physical behavior in virtual environments"
              onToggle={(key, value) => handleAcademicModelToggle('physics', key, value)}
            />
          </TabsContent>
          
          <TabsContent value="economics">
            <AcademicModelTab 
              model={config.economics}
              title="Economic Models"
              description="Configure economic models that drive pricing, boosts, and monetization"
              onToggle={(key, value) => handleAcademicModelToggle('economics', key, value)}
            />
          </TabsContent>
          
          <TabsContent value="robotics">
            <AcademicModelTab 
              model={config.robotics}
              title="Robotics Models"
              description="Configure AI control interfaces and automation behavior"
              onToggle={(key, value) => handleAcademicModelToggle('robotics', key, value)}
            />
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="toggle-geo-legal">Geo-Legal Filtering</Label>
                <p className="text-sm text-muted-foreground">
                  Enable location-based content filtering for legal compliance
                </p>
              </div>
              <Switch
                id="toggle-geo-legal"
                checked={config.geoLegalFilteringEnabled}
                onCheckedChange={(checked) => handleFeatureToggle('geoLegalFilteringEnabled', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="toggle-neural-emotion">Neuro-Emotional Engine</Label>
                <p className="text-sm text-muted-foreground">
                  Enable advanced emotional intelligence in AI responses
                </p>
              </div>
              <Switch
                id="toggle-neural-emotion"
                checked={config.neuroEmotionEnabled}
                onCheckedChange={(checked) => handleFeatureToggle('neuroEmotionEnabled', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="toggle-predictive">Predictive Modulation</Label>
                <p className="text-sm text-muted-foreground">
                  Enable predictive behavior learning based on user interactions
                </p>
              </div>
              <Switch
                id="toggle-predictive"
                checked={config.predictiveModulationEnabled}
                onCheckedChange={(checked) => handleFeatureToggle('predictiveModulationEnabled', checked)}
              />
            </div>
          </div>
          
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-medium">Geo-Legal Restricted Regions</h3>
            <p className="text-sm text-muted-foreground">
              Manage regions where NSFW content is restricted
            </p>
            
            <div className="flex gap-2">
              <Input
                placeholder="Add restricted region code"
                value={newRegion}
                onChange={(e) => setNewRegion(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddRestrictedRegion}>Add</Button>
            </div>
            
            <div className="space-y-1 mt-2">
              {restrictedRegions.map(region => (
                <div key={region.id} className="flex items-center justify-between py-2 px-3 bg-secondary rounded-md">
                  <span className="font-mono">{region.name}</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleRemoveRegion(region.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSaveConfig}>Save Configuration</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrainHubConfig;
