
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from "@/components/ui/use-toast";
import { AlertCircle, TrendingUp, DollarSign } from 'lucide-react';

interface PricePoint {
  id: string;
  itemType: string;
  basePrice: number;
  currentPrice: number;
  history: {
    date: Date;
    price: number;
    revenue: number;
    conversions: number;
  }[];
  elasticity: number;
  maxDiscount: number;
  maxSurge: number;
  region: string;
  lastUpdated: Date;
}

interface PricingRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  multiplier: number;
  active: boolean;
  priority: number;
}

interface PriceOptimization {
  id: string;
  itemType: string;
  suggestedPrice: number;
  currentPrice: number;
  projectedIncrease: number;
  confidence: number;
  reasoning: string;
}

const AdvancedPricingEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dynamic-pricing");
  const [pricePoints, setPricePoints] = useState<PricePoint[]>([]);
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([]);
  const [optimizations, setOptimizations] = useState<PriceOptimization[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("global");
  const [selectedItemType, setSelectedItemType] = useState<string>("all");
  const [elasticityFactor, setElasticityFactor] = useState<number>(50);
  const [demandForecastEnabled, setDemandForecastEnabled] = useState<boolean>(true);
  const [competitiveAnalysisEnabled, setCompetitiveAnalysisEnabled] = useState<boolean>(true);
  const [seasonalAdjustmentsEnabled, setSeasonalAdjustmentsEnabled] = useState<boolean>(true);
  
  // Load initial data
  useEffect(() => {
    // Simulate API call to load data
    const loadPricePoints = async () => {
      // In a real app, this would be fetched from a backend API
      const mockPricePoints: PricePoint[] = [
        {
          id: 'chat-1',
          itemType: 'ai_chat',
          basePrice: 0.99,
          currentPrice: 1.29,
          history: Array.from({ length: 14 }, (_, i) => ({
            date: new Date(Date.now() - (13 - i) * 86400000),
            price: 0.99 + (Math.random() * 0.5),
            revenue: 100 + (Math.random() * 100),
            conversions: 80 + (Math.random() * 40)
          })),
          elasticity: 0.7,
          maxDiscount: 0.3,
          maxSurge: 0.5,
          region: 'global',
          lastUpdated: new Date(Date.now() - 5400000)
        },
        {
          id: 'premium-1',
          itemType: 'premium_content',
          basePrice: 4.99,
          currentPrice: 5.49,
          history: Array.from({ length: 14 }, (_, i) => ({
            date: new Date(Date.now() - (13 - i) * 86400000),
            price: 4.99 + (Math.random() * 1),
            revenue: 300 + (Math.random() * 200),
            conversions: 50 + (Math.random() * 30)
          })),
          elasticity: 0.5,
          maxDiscount: 0.2,
          maxSurge: 0.4,
          region: 'global',
          lastUpdated: new Date(Date.now() - 86400000)
        },
        {
          id: 'boost-1',
          itemType: 'profile_boost',
          basePrice: 3.99,
          currentPrice: 3.99,
          history: Array.from({ length: 14 }, (_, i) => ({
            date: new Date(Date.now() - (13 - i) * 86400000),
            price: 3.99,
            revenue: 200 + (Math.random() * 150),
            conversions: 40 + (Math.random() * 25)
          })),
          elasticity: 0.4,
          maxDiscount: 0.15,
          maxSurge: 0.3,
          region: 'global',
          lastUpdated: new Date(Date.now() - 43200000)
        },
        {
          id: 'voice-1',
          itemType: 'voice_message',
          basePrice: 2.49,
          currentPrice: 2.99,
          history: Array.from({ length: 14 }, (_, i) => ({
            date: new Date(Date.now() - (13 - i) * 86400000),
            price: 2.49 + (Math.random() * 0.5),
            revenue: 150 + (Math.random() * 100),
            conversions: 60 + (Math.random() * 35)
          })),
          elasticity: 0.6,
          maxDiscount: 0.25,
          maxSurge: 0.45,
          region: 'global',
          lastUpdated: new Date(Date.now() - 10800000)
        },
      ];
      
      setPricePoints(mockPricePoints);

      // Load pricing rules
      const mockPricingRules: PricingRule[] = [
        {
          id: 'rule-1',
          name: 'Weekend Surge',
          condition: 'day_of_week in [5, 6]',
          action: 'increase_price',
          multiplier: 1.15,
          active: true,
          priority: 10
        },
        {
          id: 'rule-2',
          name: 'Low Activity Hours',
          condition: 'hour_of_day in [1, 2, 3, 4, 5]',
          action: 'decrease_price',
          multiplier: 0.9,
          active: true,
          priority: 20
        },
        {
          id: 'rule-3',
          name: 'New User Discount',
          condition: 'user.days_since_signup < 7',
          action: 'decrease_price',
          multiplier: 0.85,
          active: true,
          priority: 30
        },
        {
          id: 'rule-4',
          name: 'High Demand Adjustment',
          condition: 'hourly_transactions > 100',
          action: 'increase_price',
          multiplier: 1.1,
          active: false,
          priority: 15
        },
      ];
      
      setPricingRules(mockPricingRules);

      // Load optimizations
      const mockOptimizations: PriceOptimization[] = [
        {
          id: 'opt-1',
          itemType: 'ai_chat',
          suggestedPrice: 1.49,
          currentPrice: 1.29,
          projectedIncrease: 12.5,
          confidence: 85,
          reasoning: 'High demand pattern detected in evening hours. Current conversion rate stable at higher price points.'
        },
        {
          id: 'opt-2',
          itemType: 'premium_content',
          suggestedPrice: 4.99,
          currentPrice: 5.49,
          projectedIncrease: 8.2,
          confidence: 73,
          reasoning: 'Price elasticity analysis shows potential for increased conversions at slightly lower price point.'
        },
        {
          id: 'opt-3',
          itemType: 'profile_boost',
          suggestedPrice: 4.49,
          currentPrice: 3.99,
          projectedIncrease: 15.3,
          confidence: 91,
          reasoning: 'Competitor analysis and user value perception indicates room for price increase while maintaining conversion rate.'
        },
      ];
      
      setOptimizations(mockOptimizations);
    };
    
    loadPricePoints();
  }, []);
  
  // Handle price change
  const handlePriceChange = (pricePointId: string, newPrice: number) => {
    setPricePoints(pricePoints.map(point => 
      point.id === pricePointId 
        ? { ...point, currentPrice: newPrice } 
        : point
    ));
    
    toast({
      title: "Price Updated",
      description: `The price has been updated to $${newPrice.toFixed(2)}`,
    });
  };
  
  // Handle rule toggle
  const handleRuleToggle = (ruleId: string, active: boolean) => {
    setPricingRules(pricingRules.map(rule => 
      rule.id === ruleId 
        ? { ...rule, active } 
        : rule
    ));
    
    toast({
      title: active ? "Rule Activated" : "Rule Deactivated",
      description: `The pricing rule has been ${active ? 'activated' : 'deactivated'}`,
    });
  };
  
  // Apply optimization
  const applyOptimization = (optimizationId: string) => {
    const optimization = optimizations.find(opt => opt.id === optimizationId);
    if (!optimization) return;
    
    // Find the related price point and update its price
    setPricePoints(pricePoints.map(point => 
      point.itemType === optimization.itemType 
        ? { ...point, currentPrice: optimization.suggestedPrice } 
        : point
    ));
    
    // Remove the applied optimization
    setOptimizations(optimizations.filter(opt => opt.id !== optimizationId));
    
    toast({
      title: "Optimization Applied",
      description: `The price for ${optimization.itemType} has been updated to $${optimization.suggestedPrice.toFixed(2)}`,
      variant: "success",
    });
  };

  // Get chart data for pricing history
  const getPricingHistoryData = () => {
    const filteredPoints = pricePoints
      .filter(point => selectedItemType === 'all' || point.itemType === selectedItemType)
      .filter(point => selectedRegion === 'global' || point.region === selectedRegion);
    
    if (filteredPoints.length === 0) return [];

    // Aggregate data by date
    const formattedData = filteredPoints[0].history.map((historyPoint, index) => {
      const date = historyPoint.date.toLocaleDateString();
      const entry: any = { date };
      
      filteredPoints.forEach(point => {
        const typeFormatted = point.itemType
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
          
        entry[typeFormatted] = point.history[index].price;
        entry[`${typeFormatted} Revenue`] = point.history[index].revenue;
      });
      
      return entry;
    });
    
    return formattedData;
  };
  
  // Run price optimization simulation
  const runOptimization = () => {
    toast({
      title: "Optimization Running",
      description: "The pricing optimization engine is analyzing market data...",
    });
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate a new optimization
      const newOptimization: PriceOptimization = {
        id: `opt-${Date.now()}`,
        itemType: 'voice_message',
        suggestedPrice: 3.29,
        currentPrice: 2.99,
        projectedIncrease: 18.7,
        confidence: 88,
        reasoning: 'Analysis of user engagement patterns and competitor pricing indicates strong potential for price increase without affecting conversion rates.'
      };
      
      setOptimizations([...optimizations, newOptimization]);
      
      toast({
        title: "Optimization Complete",
        description: "New price optimization recommendations are available.",
        variant: "success",
      });
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Advanced Dynamic Pricing Engine</CardTitle>
            <CardDescription>
              AI-driven pricing optimization for maximum revenue
            </CardDescription>
          </div>
          <Button 
            onClick={runOptimization}
            disabled={!demandForecastEnabled}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Run Optimization
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="dynamic-pricing">Dynamic Pricing</TabsTrigger>
            <TabsTrigger value="rules">Pricing Rules</TabsTrigger>
            <TabsTrigger value="optimizations">Optimizations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dynamic-pricing" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-md">Pricing History</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="global">Global</SelectItem>
                            <SelectItem value="na">North America</SelectItem>
                            <SelectItem value="eu">Europe</SelectItem>
                            <SelectItem value="asia">Asia</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Select value={selectedItemType} onValueChange={setSelectedItemType}>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Item Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="ai_chat">AI Chat</SelectItem>
                            <SelectItem value="premium_content">Premium Content</SelectItem>
                            <SelectItem value="profile_boost">Profile Boost</SelectItem>
                            <SelectItem value="voice_message">Voice Message</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={getPricingHistoryData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {selectedItemType === 'all' ? (
                          pricePoints.map(point => {
                            const typeFormatted = point.itemType
                              .split('_')
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ');
                            return (
                              <Line 
                                key={point.id} 
                                type="monotone" 
                                dataKey={typeFormatted} 
                                stroke={
                                  point.itemType === 'ai_chat' ? '#8884d8' :
                                  point.itemType === 'premium_content' ? '#82ca9d' :
                                  point.itemType === 'profile_boost' ? '#ffc658' : '#ff7300'
                                } 
                                strokeWidth={2}
                                activeDot={{ r: 8 }}
                              />
                            );
                          })
                        ) : (
                          <Line 
                            type="monotone" 
                            dataKey={selectedItemType
                              .split('_')
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')} 
                            stroke="#8884d8" 
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                          />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Pricing Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="elasticity">Elasticity Factor</Label>
                        <span className="text-sm font-medium">{elasticityFactor}%</span>
                      </div>
                      <Slider
                        id="elasticity"
                        min={0}
                        max={100}
                        step={1}
                        value={[elasticityFactor]}
                        onValueChange={(value) => setElasticityFactor(value[0])}
                      />
                      <p className="text-xs text-muted-foreground">
                        Controls how aggressively prices respond to demand changes
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <Label htmlFor="demand-forecast">Demand Forecasting</Label>
                          <span className="text-xs text-muted-foreground">Use historical data to predict demand</span>
                        </div>
                        <Switch
                          id="demand-forecast"
                          checked={demandForecastEnabled}
                          onCheckedChange={setDemandForecastEnabled}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <Label htmlFor="competitive-analysis">Competitive Analysis</Label>
                          <span className="text-xs text-muted-foreground">Adjust based on competitor pricing</span>
                        </div>
                        <Switch
                          id="competitive-analysis"
                          checked={competitiveAnalysisEnabled}
                          onCheckedChange={setCompetitiveAnalysisEnabled}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <Label htmlFor="seasonal-adjustments">Seasonal Adjustments</Label>
                          <span className="text-xs text-muted-foreground">Apply seasonal price variations</span>
                        </div>
                        <Switch
                          id="seasonal-adjustments"
                          checked={seasonalAdjustmentsEnabled}
                          onCheckedChange={setSeasonalAdjustmentsEnabled}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Revenue Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={[
                          { name: 'Current', value: 100 },
                          { name: 'Projected', value: 100 + (elasticityFactor * 0.3) }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="text-center mt-2">
                      <p className="text-sm font-medium">Estimated Revenue Impact</p>
                      <p className="text-2xl font-bold text-green-500">+{(elasticityFactor * 0.3).toFixed(1)}%</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-md">Current Price Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Item Type</th>
                        <th className="text-right py-3 px-4">Base Price</th>
                        <th className="text-right py-3 px-4">Current Price</th>
                        <th className="text-left py-3 px-4">Region</th>
                        <th className="text-left py-3 px-4">Last Updated</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricePoints.map((point) => (
                        <tr key={point.id} className="border-b">
                          <td className="py-3 px-4">
                            {point.itemType
                              .split('_')
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')}
                          </td>
                          <td className="text-right py-3 px-4">${point.basePrice.toFixed(2)}</td>
                          <td className="text-right py-3 px-4">
                            <span className={
                              point.currentPrice > point.basePrice 
                                ? "text-green-500 font-medium" 
                                : point.currentPrice < point.basePrice 
                                  ? "text-amber-500 font-medium"
                                  : ""
                            }>
                              ${point.currentPrice.toFixed(2)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {point.region.charAt(0).toUpperCase() + point.region.slice(1)}
                          </td>
                          <td className="py-3 px-4">
                            {(new Date(point.lastUpdated)).toLocaleString()}
                          </td>
                          <td className="text-right py-3 px-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // Reset price to base price
                                handlePriceChange(point.id, point.basePrice);
                              }}
                            >
                              Reset
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rules" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Dynamic Pricing Rules</CardTitle>
                  <Button variant="outline" size="sm">
                    Add Rule
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Rule Name</th>
                        <th className="text-left py-3 px-4">Condition</th>
                        <th className="text-left py-3 px-4">Action</th>
                        <th className="text-right py-3 px-4">Multiplier</th>
                        <th className="text-right py-3 px-4">Priority</th>
                        <th className="text-center py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingRules.map((rule) => (
                        <tr key={rule.id} className="border-b">
                          <td className="py-3 px-4">{rule.name}</td>
                          <td className="py-3 px-4">
                            <code className="bg-muted px-1 py-0.5 rounded text-xs">
                              {rule.condition}
                            </code>
                          </td>
                          <td className="py-3 px-4">
                            {rule.action
                              .split('_')
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ')}
                          </td>
                          <td className="text-right py-3 px-4">
                            <span className={
                              rule.multiplier > 1 
                                ? "text-green-500 font-medium" 
                                : "text-amber-500 font-medium"
                            }>
                              {rule.multiplier > 1 ? '+' : ''}{((rule.multiplier - 1) * 100).toFixed(0)}%
                            </span>
                          </td>
                          <td className="text-right py-3 px-4">{rule.priority}</td>
                          <td className="text-center py-3 px-4">
                            <Switch
                              checked={rule.active}
                              onCheckedChange={(active) => handleRuleToggle(rule.id, active)}
                            />
                          </td>
                          <td className="text-right py-3 px-4">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Rule Editor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="rule-name">Rule Name</Label>
                    <input
                      id="rule-name"
                      className="w-full p-2 mt-1 border rounded-md"
                      placeholder="Enter rule name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="rule-condition">Condition</Label>
                    <textarea
                      id="rule-condition"
                      className="w-full p-2 mt-1 border rounded-md h-20"
                      placeholder="Enter condition expression"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Example: hour_of_day > 18 and day_of_week not in [6, 0]
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rule-action">Action</Label>
                      <Select defaultValue="increase_price">
                        <SelectTrigger>
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="increase_price">Increase Price</SelectItem>
                          <SelectItem value="decrease_price">Decrease Price</SelectItem>
                          <SelectItem value="set_price">Set Fixed Price</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="rule-multiplier">Multiplier (%)</Label>
                      <input
                        id="rule-multiplier"
                        type="number"
                        className="w-full p-2 mt-1 border rounded-md"
                        placeholder="10"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rule-priority">Priority</Label>
                      <input
                        id="rule-priority"
                        type="number"
                        className="w-full p-2 mt-1 border rounded-md"
                        placeholder="10"
                      />
                    </div>
                    
                    <div className="flex items-end">
                      <div className="flex items-center space-x-2">
                        <Switch id="rule-active" defaultChecked />
                        <Label htmlFor="rule-active">Active</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Rule</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Rule Testing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="test-scenario">Test Scenario</Label>
                    <textarea
                      id="test-scenario"
                      className="w-full p-2 mt-1 border rounded-md h-20"
                      placeholder="hour_of_day=20,day_of_week=3,user.region='us'"
                    />
                  </div>
                  
                  <div>
                    <Label>Selected Item</Label>
                    <Select defaultValue="ai_chat">
                      <SelectTrigger>
                        <SelectValue placeholder="Select item" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai_chat">AI Chat</SelectItem>
                        <SelectItem value="premium_content">Premium Content</SelectItem>
                        <SelectItem value="profile_boost">Profile Boost</SelectItem>
                        <SelectItem value="voice_message">Voice Message</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full">
                      Test Rules
                    </Button>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">Results</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Base Price:</span>
                        <span>$1.29</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Applied Rules:</span>
                        <span>2</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Final Price:</span>
                        <span>$1.67</span>
                      </div>
                      <div className="text-sm text-muted-foreground pt-2">
                        <div>Weekend Surge: +15%</div>
                        <div>High Demand: +10%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="optimizations" className="space-y-4">
            {optimizations.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Pricing Optimizations</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    There are currently no pricing optimizations available. Run the price optimizer to generate new recommendations.
                  </p>
                  <Button onClick={runOptimization}>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Run Price Optimizer
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {optimizations.map(opt => (
                  <Card key={opt.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>
                          {opt.itemType
                            .split('_')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')} 
                          {' '}
                          Optimization
                        </CardTitle>
                        <Badge variant={opt.confidence > 80 ? 'default' : 'secondary'}>
                          {opt.confidence}% Confidence
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Price</p>
                          <p className="text-xl font-semibold">${opt.currentPrice.toFixed(2)}</p>
                        </div>
                        <div className="text-center">
                          <AlertCircle className="h-5 w-5 text-muted-foreground mx-auto" />
                          <p className="text-xs text-muted-foreground mt-1">Recommended Change</p>
                          <div className={`text-lg font-semibold ${
                            opt.suggestedPrice > opt.currentPrice ? 'text-green-500' : 'text-amber-500'
                          }`}>
                            {opt.suggestedPrice > opt.currentPrice ? '↑' : '↓'} {
                              Math.abs(((opt.suggestedPrice - opt.currentPrice) / opt.currentPrice) * 100).toFixed(1)
                            }%
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Suggested Price</p>
                          <p className="text-xl font-semibold text-primary">${opt.suggestedPrice.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">Reasoning</h4>
                        <p className="text-sm text-muted-foreground">{opt.reasoning}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">Projected Revenue Impact</h4>
                        <div className="flex items-center">
                          <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${opt.projectedIncrease > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                              style={{ width: `${Math.min(100, Math.abs(opt.projectedIncrease))}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-green-500">+{opt.projectedIncrease}%</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 pt-2">
                        <Button variant="outline" onClick={() => {
                          setOptimizations(optimizations.filter(o => o.id !== opt.id));
                        }}>
                          Dismiss
                        </Button>
                        <Button onClick={() => applyOptimization(opt.id)}>
                          Apply Optimization
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedPricingEngine;
