
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Sliders, Zap, Map, Clock, UserCheck, Star, Save } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const OxumParametersPanel = () => {
  const [parameters, setParameters] = useState({
    weights: {
      profileCompleteness: 35,
      verificationStatus: 20,
      rating: 15,
      timeSlot: 15,
      geography: 10,
      role: 5
    },
    timeSlots: {
      peakHourStart: 17, // 5 PM
      peakHourEnd: 20,   // 8 PM
      peakHourSurcharge: 25,
      offPeakDiscount: 10
    },
    geography: {
      tier1Countries: ["US", "Germany", "UK", "Australia", "Canada"],
      tier2Countries: ["Japan", "France", "Italy", "Spain", "Netherlands"],
      tier1Surcharge: 20,
      tier2Surcharge: 15
    },
    qualityFactors: {
      incompletePenalty: 50,
      lowQualityPenalty: 15,
      highQualityBonus: 10
    }
  });

  const handleWeightChange = (factor: string, value: number) => {
    setParameters(prev => ({
      ...prev,
      weights: {
        ...prev.weights,
        [factor]: value
      }
    }));
  };

  const handleTimeSlotChange = (factor: string, value: number) => {
    setParameters(prev => ({
      ...prev,
      timeSlots: {
        ...prev.timeSlots,
        [factor]: value
      }
    }));
  };

  const handleSaveParameters = () => {
    // In a real implementation, this would make an API call to save the parameters
    toast({
      title: "Oxum parameters saved",
      description: "The algorithm parameters have been updated successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              <div className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                Oxum Algorithm Parameters
              </div>
            </CardTitle>
            <CardDescription>
              Configure the Oxum boost pricing and ranking algorithm
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weights">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="weights">
              <Sliders className="h-4 w-4 mr-2" />
              Factor Weights
            </TabsTrigger>
            <TabsTrigger value="timeSlots">
              <Clock className="h-4 w-4 mr-2" />
              Time Slots
            </TabsTrigger>
            <TabsTrigger value="geography">
              <Map className="h-4 w-4 mr-2" />
              Geography
            </TabsTrigger>
            <TabsTrigger value="quality">
              <Star className="h-4 w-4 mr-2" />
              Quality Factors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weights" className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Adjust how much each factor contributes to the final boost price calculation.
              Total weight should equal 100%.
            </p>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Profile Completeness</Label>
                  <span>{parameters.weights.profileCompleteness}%</span>
                </div>
                <Slider 
                  value={[parameters.weights.profileCompleteness]} 
                  max={100}
                  step={5}
                  onValueChange={(value) => handleWeightChange('profileCompleteness', value[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Verification Status</Label>
                  <span>{parameters.weights.verificationStatus}%</span>
                </div>
                <Slider 
                  value={[parameters.weights.verificationStatus]} 
                  max={100}
                  step={5}
                  onValueChange={(value) => handleWeightChange('verificationStatus', value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Rating</Label>
                  <span>{parameters.weights.rating}%</span>
                </div>
                <Slider 
                  value={[parameters.weights.rating]} 
                  max={100}
                  step={5}
                  onValueChange={(value) => handleWeightChange('rating', value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Time Slot</Label>
                  <span>{parameters.weights.timeSlot}%</span>
                </div>
                <Slider 
                  value={[parameters.weights.timeSlot]} 
                  max={100}
                  step={5}
                  onValueChange={(value) => handleWeightChange('timeSlot', value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Geography</Label>
                  <span>{parameters.weights.geography}%</span>
                </div>
                <Slider 
                  value={[parameters.weights.geography]} 
                  max={100}
                  step={5}
                  onValueChange={(value) => handleWeightChange('geography', value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Role Type</Label>
                  <span>{parameters.weights.role}%</span>
                </div>
                <Slider 
                  value={[parameters.weights.role]} 
                  max={100}
                  step={5}
                  onValueChange={(value) => handleWeightChange('role', value[0])}
                />
              </div>
            </div>

            <div className="mt-4 p-3 bg-muted rounded-md">
              <div className="flex justify-between font-medium">
                <span>Total Weight</span>
                <span className={
                  Object.values(parameters.weights).reduce((a, b) => a + b, 0) === 100 
                    ? "text-green-500" 
                    : "text-red-500"
                }>
                  {Object.values(parameters.weights).reduce((a, b) => a + b, 0)}%
                </span>
              </div>
              {Object.values(parameters.weights).reduce((a, b) => a + b, 0) !== 100 && (
                <p className="text-xs text-red-500 mt-1">Total weight must equal 100%</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="timeSlots" className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Configure peak hours and pricing adjustments for different times of day.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Peak Hour Start (24h)</Label>
                <Input 
                  type="number" 
                  min={0} 
                  max={23} 
                  value={parameters.timeSlots.peakHourStart}
                  onChange={(e) => handleTimeSlotChange('peakHourStart', parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Peak Hour End (24h)</Label>
                <Input 
                  type="number" 
                  min={0} 
                  max={23} 
                  value={parameters.timeSlots.peakHourEnd}
                  onChange={(e) => handleTimeSlotChange('peakHourEnd', parseInt(e.target.value))}
                />
              </div>
            </div>
            
            <div className="space-y-2 mt-2">
              <div className="flex justify-between">
                <Label>Peak Hour Surcharge (LC)</Label>
                <span>{parameters.timeSlots.peakHourSurcharge} LC</span>
              </div>
              <Slider 
                value={[parameters.timeSlots.peakHourSurcharge]} 
                max={50}
                step={5}
                onValueChange={(value) => handleTimeSlotChange('peakHourSurcharge', value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Off-Peak Discount (LC)</Label>
                <span>{parameters.timeSlots.offPeakDiscount} LC</span>
              </div>
              <Slider 
                value={[parameters.timeSlots.offPeakDiscount]} 
                max={25}
                step={5}
                onValueChange={(value) => handleTimeSlotChange('offPeakDiscount', value[0])}
              />
            </div>
          </TabsContent>

          <TabsContent value="geography">
            <p className="text-sm text-muted-foreground mb-4">
              Configure geographic pricing tiers and adjustments.
            </p>
            
            {/* Geography settings would go here */}
          </TabsContent>

          <TabsContent value="quality">
            <p className="text-sm text-muted-foreground mb-4">
              Configure how profile quality affects pricing.
            </p>
            
            {/* Quality factor settings would go here */}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button 
          className="ml-auto" 
          onClick={handleSaveParameters}
          disabled={Object.values(parameters.weights).reduce((a, b) => a + b, 0) !== 100}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Parameters
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OxumParametersPanel;
