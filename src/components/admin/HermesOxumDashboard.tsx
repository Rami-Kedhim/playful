
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  BarChart, 
  Sliders, 
  Settings, 
  Users, 
  TrendingUp,
  LayoutGrid,
  Save,
  RefreshCw
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface HermesParameters {
  decayConstant: number;
  maxBoostEffect: number;
  aggressionFactor: number;
}

interface OxumParameters {
  weights: {
    boostScore: number;
    engagementScore: number;
    timeSinceLastTop: number;
    repetitionPenalty: number;
  };
  refreshInterval: number;
  rotationFactor: number;
}

const HermesOxumDashboard = () => {
  // Hermes parameters
  const [hermesParams, setHermesParams] = useState<HermesParameters>({
    decayConstant: 0.2,
    maxBoostEffect: 100,
    aggressionFactor: 0.5
  });

  // Oxum parameters
  const [oxumParams, setOxumParams] = useState<OxumParameters>({
    weights: {
      boostScore: 40,
      engagementScore: 30,
      timeSinceLastTop: 20,
      repetitionPenalty: 10
    },
    refreshInterval: 60,
    rotationFactor: 0.8
  });

  // Mock data for active boosts
  const [activeBoosts, setActiveBoosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock function to fetch active boosts
  const fetchActiveBoosts = async () => {
    setLoading(true);
    // In a real implementation, this would fetch from the database
    setTimeout(() => {
      setActiveBoosts([
        { id: 1, profileName: "Profile 1", position: 1, score: 87.2, timeRemaining: 105 },
        { id: 2, profileName: "Profile 2", position: 2, score: 74.5, timeRemaining: 62 },
        { id: 3, profileName: "Profile 3", position: 3, score: 68.1, timeRemaining: 149 },
        { id: 4, profileName: "Profile 4", position: 4, score: 65.9, timeRemaining: 28 },
        { id: 5, profileName: "Profile 5", position: 5, score: 59.3, timeRemaining: 86 },
      ]);
      setLoading(false);
    }, 500);
  };

  // Fetch active boosts on component mount
  useEffect(() => {
    fetchActiveBoosts();
  }, []);

  // Handle Hermes parameter change
  const handleHermesParamChange = (param: keyof HermesParameters, value: number) => {
    setHermesParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  // Handle Oxum weight change
  const handleOxumWeightChange = (param: keyof typeof oxumParams.weights, value: number) => {
    setOxumParams(prev => ({
      ...prev,
      weights: {
        ...prev.weights,
        [param]: value
      }
    }));
  };

  // Handle other Oxum parameter change
  const handleOxumParamChange = (param: 'refreshInterval' | 'rotationFactor', value: number) => {
    setOxumParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  // Save parameters
  const handleSaveParameters = () => {
    // In a real implementation, this would save to the database
    toast({
      title: "Parameters saved",
      description: "Hermes + Oxum parameters have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hermes + Oxum Dashboard</h2>
        <Button variant="outline" size="sm" onClick={fetchActiveBoosts} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="queue">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="queue">
            <LayoutGrid className="h-4 w-4 mr-2" />
            Active Queue
          </TabsTrigger>
          <TabsTrigger value="hermes">
            <TrendingUp className="h-4 w-4 mr-2" />
            Hermes Parameters
          </TabsTrigger>
          <TabsTrigger value="oxum">
            <Sliders className="h-4 w-4 mr-2" />
            Oxum Parameters
          </TabsTrigger>
        </TabsList>

        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <CardTitle>Active Boost Queue</CardTitle>
              <CardDescription>
                Live view of profiles currently in the boost queue, ordered by Oxum algorithm
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 mx-auto animate-spin text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Loading boost queue...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4 font-medium text-sm">Position</th>
                        <th className="text-left py-2 px-4 font-medium text-sm">Profile</th>
                        <th className="text-left py-2 px-4 font-medium text-sm">Score</th>
                        <th className="text-left py-2 px-4 font-medium text-sm">Time Left</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeBoosts.map((boost: any) => (
                        <tr key={boost.id} className="border-b hover:bg-muted/20">
                          <td className="py-2 px-4">{boost.position}</td>
                          <td className="py-2 px-4">{boost.profileName}</td>
                          <td className="py-2 px-4">{boost.score.toFixed(1)}</td>
                          <td className="py-2 px-4">
                            {Math.floor(boost.timeRemaining / 60)}h {boost.timeRemaining % 60}m
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hermes">
          <Card>
            <CardHeader>
              <CardTitle>Hermes Mathematical Parameters</CardTitle>
              <CardDescription>
                Configure the mathematical model for visibility decay and boost impact
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Decay Constant (k)</Label>
                  <span>{hermesParams.decayConstant.toFixed(2)}</span>
                </div>
                <Slider 
                  value={[hermesParams.decayConstant * 100]} 
                  max={100}
                  step={1}
                  onValueChange={(value) => handleHermesParamChange('decayConstant', value[0] / 100)}
                />
                <p className="text-xs text-muted-foreground">
                  Controls how quickly visibility decays over time. Higher values mean faster decay.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Maximum Boost Effect (α)</Label>
                  <span>{hermesParams.maxBoostEffect}</span>
                </div>
                <Slider 
                  value={[hermesParams.maxBoostEffect]} 
                  max={200}
                  step={5}
                  onValueChange={(value) => handleHermesParamChange('maxBoostEffect', value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  The maximum impact a boost can have on visibility. Higher values mean stronger boosts.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Aggression Factor (β)</Label>
                  <span>{hermesParams.aggressionFactor.toFixed(2)}</span>
                </div>
                <Slider 
                  value={[hermesParams.aggressionFactor * 100]} 
                  max={100}
                  step={1}
                  onValueChange={(value) => handleHermesParamChange('aggressionFactor', value[0] / 100)}
                />
                <p className="text-xs text-muted-foreground">
                  Controls how quickly boost impact reaches its peak. Higher values mean faster ramp-up.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveParameters} className="ml-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Parameters
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="oxum">
          <Card>
            <CardHeader>
              <CardTitle>Oxum Rotation Parameters</CardTitle>
              <CardDescription>
                Configure the queue rotation algorithm and fairness engine
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Scoring Weights</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Boost Score Weight</Label>
                    <span>{oxumParams.weights.boostScore}%</span>
                  </div>
                  <Slider 
                    value={[oxumParams.weights.boostScore]} 
                    max={100}
                    step={5}
                    onValueChange={(value) => handleOxumWeightChange('boostScore', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Engagement Score Weight</Label>
                    <span>{oxumParams.weights.engagementScore}%</span>
                  </div>
                  <Slider 
                    value={[oxumParams.weights.engagementScore]} 
                    max={100}
                    step={5}
                    onValueChange={(value) => handleOxumWeightChange('engagementScore', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Time Since Last Top Weight</Label>
                    <span>{oxumParams.weights.timeSinceLastTop}%</span>
                  </div>
                  <Slider 
                    value={[oxumParams.weights.timeSinceLastTop]} 
                    max={100}
                    step={5}
                    onValueChange={(value) => handleOxumWeightChange('timeSinceLastTop', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Repetition Penalty Weight</Label>
                    <span>{oxumParams.weights.repetitionPenalty}%</span>
                  </div>
                  <Slider 
                    value={[oxumParams.weights.repetitionPenalty]} 
                    max={100}
                    step={5}
                    onValueChange={(value) => handleOxumWeightChange('repetitionPenalty', value[0])}
                  />
                </div>
                
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <div className="flex justify-between font-medium">
                    <span>Total Weight</span>
                    <span className={
                      Object.values(oxumParams.weights).reduce((a, b) => a + b, 0) === 100 
                        ? "text-green-500" 
                        : "text-red-500"
                    }>
                      {Object.values(oxumParams.weights).reduce((a, b) => a + b, 0)}%
                    </span>
                  </div>
                  {Object.values(oxumParams.weights).reduce((a, b) => a + b, 0) !== 100 && (
                    <p className="text-xs text-red-500 mt-1">Total weight must equal 100%</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <Label>Refresh Interval (seconds)</Label>
                  <Input 
                    type="number" 
                    min={10} 
                    max={300} 
                    value={oxumParams.refreshInterval}
                    onChange={(e) => handleOxumParamChange('refreshInterval', parseInt(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Rotation Factor</Label>
                  <Input 
                    type="number" 
                    min={0} 
                    max={1} 
                    step={0.1}
                    value={oxumParams.rotationFactor}
                    onChange={(e) => handleOxumParamChange('rotationFactor', parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSaveParameters} 
                className="ml-auto"
                disabled={Object.values(oxumParams.weights).reduce((a, b) => a + b, 0) !== 100}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Parameters
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HermesOxumDashboard;
