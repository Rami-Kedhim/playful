import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { AreaChart, Area } from 'recharts';
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ArrowUp, ArrowDown, Zap, TrendingUp, History, RefreshCw, DollarSign, Settings, Save, BarChart2, PieChart as PieChartIcon, ArrowRight } from "lucide-react";
import { useBrainHub } from '@/hooks/useBrainHub';

// Types
interface PricePoint {
  id: string;
  name: string;
  itemType: 'message' | 'voice_message' | 'video_call' | 'encounter' | 'content';
  basePrice: number;
  currentPrice: number;
  minPrice: number;
  maxPrice: number;
  recommendedPrice?: number;
  conversionRate: number;
  elasticity: number;
  history: Array<{
    date: Date;
    price: number;
    conversionRate: number;
  }>;
}

interface PricingRule {
  id: string;
  name: string;
  description: string;
  active: boolean;
  modifier: number;
  applicableTypes: Array<'message' | 'voice_message' | 'video_call' | 'encounter' | 'content'>;
  conditions: {
    time?: {
      timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
      dayOfWeek?: 'weekday' | 'weekend';
    };
    user?: {
      newUser?: boolean;
      returningUser?: boolean;
      highSpender?: boolean;
    };
    demand?: 'high' | 'medium' | 'low';
  };
}

interface PriceOptimization {
  id: string;
  itemType: 'message' | 'voice_message' | 'video_call' | 'encounter' | 'content';
  currentPrice: number;
  suggestedPrice: number;
  projectedIncrease: number;
  confidence: number;
  reasoning: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdvancedPricingEngine: React.FC = () => {
  const { syncWith } = useBrainHub('pricing-engine', { lastSync: Date.now() });
  const [pricePoints, setPricePoints] = useState<PricePoint[]>([]);
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([]);
  const [optimizations, setOptimizations] = useState<PriceOptimization[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedItemType, setSelectedItemType] = useState<'all' | 'message' | 'voice_message' | 'video_call' | 'encounter' | 'content'>('all');
  const [elasticityFactor, setElasticityFactor] = useState<number>(0.6);
  const [aiAssistanceEnabled, setAiAssistanceEnabled] = useState<boolean>(true);
  const [demandBasedPricingEnabled, setDemandBasedPricingEnabled] = useState<boolean>(true);
  const [competitiveAnalysisEnabled, setCompetitiveAnalysisEnabled] = useState<boolean>(true);
  const [seasonalAdjustmentsEnabled, setSeasonalAdjustmentsEnabled] = useState<boolean>(true);
  
  useEffect(() => {
    const loadPricePoints = async () => {
      const mockPricePoints: PricePoint[] = [
        {
          id: 'chat-1',
          name: 'Standard Message',
          itemType: 'message',
          basePrice: 5,
          currentPrice: 5,
          minPrice: 3,
          maxPrice: 10,
          conversionRate: 0.12,
          elasticity: 0.7,
          history: [
            { date: new Date('2023-01-01'), price: 4, conversionRate: 0.11 },
            { date: new Date('2023-02-01'), price: 4.5, conversionRate: 0.10 },
            { date: new Date('2023-03-01'), price: 5, conversionRate: 0.12 },
            { date: new Date('2023-04-01'), price: 5, conversionRate: 0.12 },
            { date: new Date('2023-05-01'), price: 5, conversionRate: 0.13 }
          ]
        },
        {
          id: 'voice-1',
          name: 'Voice Message',
          itemType: 'voice_message',
          basePrice: 10,
          currentPrice: 12,
          minPrice: 8,
          maxPrice: 15,
          conversionRate: 0.08,
          elasticity: 0.5,
          history: [
            { date: new Date('2023-01-01'), price: 9, conversionRate: 0.09 },
            { date: new Date('2023-02-01'), price: 10, conversionRate: 0.08 },
            { date: new Date('2023-03-01'), price: 10, conversionRate: 0.08 },
            { date: new Date('2023-04-01'), price: 11, conversionRate: 0.07 },
            { date: new Date('2023-05-01'), price: 12, conversionRate: 0.08 }
          ]
        },
        {
          id: 'video-1',
          name: 'Video Call',
          itemType: 'video_call',
          basePrice: 30,
          currentPrice: 28,
          minPrice: 20,
          maxPrice: 40,
          conversionRate: 0.05,
          elasticity: 0.4,
          history: [
            { date: new Date('2023-01-01'), price: 30, conversionRate: 0.04 },
            { date: new Date('2023-02-01'), price: 30, conversionRate: 0.05 },
            { date: new Date('2023-03-01'), price: 30, conversionRate: 0.05 },
            { date: new Date('2023-04-01'), price: 29, conversionRate: 0.05 },
            { date: new Date('2023-05-01'), price: 28, conversionRate: 0.05 }
          ]
        },
        {
          id: 'enc-1',
          name: 'Premium Encounter',
          itemType: 'encounter',
          basePrice: 100,
          currentPrice: 110,
          minPrice: 80,
          maxPrice: 150,
          conversionRate: 0.02,
          elasticity: 0.3,
          history: [
            { date: new Date('2023-01-01'), price: 95, conversionRate: 0.025 },
            { date: new Date('2023-02-01'), price: 100, conversionRate: 0.022 },
            { date: new Date('2023-03-01'), price: 100, conversionRate: 0.02 },
            { date: new Date('2023-04-01'), price: 105, conversionRate: 0.02 },
            { date: new Date('2023-05-01'), price: 110, conversionRate: 0.021 }
          ]
        }
      ];
      
      setPricePoints(mockPricePoints);

      const mockPricingRules: PricingRule[] = [
        {
          id: 'rule-1',
          name: 'Weekend Surge',
          description: 'Prices increase during weekend high-demand periods',
          active: true,
          modifier: 1.15, // 15% increase
          applicableTypes: ['message', 'voice_message', 'video_call'],
          conditions: {
            time: {
              dayOfWeek: 'weekend'
            },
            demand: 'high'
          }
        },
        {
          id: 'rule-2',
          name: 'New User Discount',
          description: 'Lower prices for first-time users',
          active: true,
          modifier: 0.9, // 10% discount
          applicableTypes: ['message', 'voice_message'],
          conditions: {
            user: {
              newUser: true
            }
          }
        },
        {
          id: 'rule-3',
          name: 'Premium Customer Loyalty',
          description: 'Special rates for high spenders',
          active: false,
          modifier: 0.95, // 5% discount
          applicableTypes: ['video_call', 'encounter'],
          conditions: {
            user: {
              highSpender: true
            }
          }
        }
      ];
      
      setPricingRules(mockPricingRules);

      const mockOptimizations: PriceOptimization[] = [
        {
          id: 'opt-1',
          itemType: 'voice_message',
          currentPrice: 12,
          suggestedPrice: 10.5,
          projectedIncrease: 8.3,
          confidence: 0.87,
          reasoning: 'Lowering price will increase volume significantly based on elasticity analysis'
        },
        {
          id: 'opt-2',
          itemType: 'encounter',
          currentPrice: 110,
          suggestedPrice: 125,
          projectedIncrease: 5.2,
          confidence: 0.76,
          reasoning: 'Premium services show low elasticity; price increase will enhance exclusivity and revenue'
        }
      ];
      
      setOptimizations(mockOptimizations);
      
      setIsLoading(false);
    };
    
    loadPricePoints();
  }, []);
  
  const handlePriceChange = (pricePointId: string, newPrice: number) => {
    setPricePoints(pricePoints.map(point => 
      point.id === pricePointId 
        ? { ...point, currentPrice: newPrice } 
        : point
    ));
    
    toast({
      title: "Price Updated",
      description: `The price has been updated to $${newPrice}`
    });
  };
  
  const handleRuleToggle = (ruleId: string, active: boolean) => {
    setPricingRules(pricingRules.map(rule => 
      rule.id === ruleId 
        ? { ...rule, active } 
        : rule
    ));
    
    toast({
      title: active ? "Rule Activated" : "Rule Deactivated",
      description: `The pricing rule has been ${active ? 'activated' : 'deactivated'}`
    });
  };
  
  const applyOptimization = (optimizationId: string) => {
    const optimization = optimizations.find(opt => opt.id === optimizationId);
    if (!optimization) return;
    
    setPricePoints(pricePoints.map(point => 
      point.itemType === optimization.itemType 
        ? { ...point, currentPrice: optimization.suggestedPrice } 
        : point
    ));
    
    setOptimizations(optimizations.filter(opt => opt.id !== optimizationId));
    
    toast({
      title: "Optimization Applied",
      description: `The suggested price of $${optimization.suggestedPrice} has been applied`
    });
  };

  const getPricingHistoryData = () => {
    const filteredPoints = pricePoints
      .filter(point => selectedItemType === 'all' || point.itemType === selectedItemType)
      .slice(0, 3); // Limit to 3 for readability
    
    if (filteredPoints.length === 0) return [];

    const formattedData = filteredPoints[0].history.map((historyPoint, index) => {
      const date = historyPoint.date.toLocaleDateString();
      const entry: any = { date };
      
      filteredPoints.forEach(point => {
        if (point.history[index]) {
          entry[`${point.name} Price`] = point.history[index].price;
          entry[`${point.name} Conv.`] = point.history[index].conversionRate;
        }
      });
      
      return entry;
    });
    
    return formattedData;
  };
  
  const runOptimization = () => {
    toast({
      title: "Optimization Running",
      description: "The pricing optimization engine is analyzing market data...",
    });
    
    setTimeout(() => {
      const newOptimization: PriceOptimization = {
        id: `opt-${Date.now()}`,
        itemType: 'voice_message',
        currentPrice: 12,
        suggestedPrice: 10.5,
        projectedIncrease: 8.3,
        confidence: 0.87,
        reasoning: 'Lowering price will increase volume significantly based on elasticity analysis'
      };
      
      setOptimizations([...optimizations, newOptimization]);
      
      toast({
        title: "Optimization Complete",
        description: "New pricing recommendations available",
      });
    }, 2000);
  };
  
  const syncWithBrainCore = () => {
    const pricingData = {
      prices: pricePoints,
      rules: pricingRules,
      optimizations: optimizations,
      lastUpdated: new Date().toISOString()
    };
    
    syncWith('brain-core', pricingData);
    
    toast({
      title: "Synced with Brain Core",
      description: "Pricing data has been shared with the central brain hub"
    });
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Advanced Pricing Engine</CardTitle>
            <CardDescription>
              AI-driven dynamic pricing optimization with real-time adjustments
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={runOptimization}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Run Optimization
            </Button>
            <Button 
              size="sm" 
              onClick={syncWithBrainCore}
            >
              <Zap className="h-4 w-4 mr-2" />
              Sync with Brain Core
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="price-points" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="price-points">Price Points</TabsTrigger>
            <TabsTrigger value="rules">Pricing Rules</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
          </TabsList>
          
          <TabsContent value="price-points">
            <div className="mb-4 flex items-center space-x-4">
              <Select
                value={selectedItemType}
                onValueChange={(value) => setSelectedItemType(value as any)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="message">Messages</SelectItem>
                  <SelectItem value="voice_message">Voice Messages</SelectItem>
                  <SelectItem value="video_call">Video Calls</SelectItem>
                  <SelectItem value="encounter">Encounters</SelectItem>
                  <SelectItem value="content">Premium Content</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4 mt-4">
              {pricePoints
                .filter(point => selectedItemType === 'all' || point.itemType === selectedItemType)
                .map(point => (
                  <Card key={point.id} className="overflow-hidden">
                    <div className="flex">
                      <div className={`w-1 ${
                        point.currentPrice < point.basePrice ? 'bg-green-500' : 
                        point.currentPrice > point.basePrice ? 'bg-amber-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="p-4 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{point.name}</h3>
                            <p className="text-sm text-muted-foreground">{point.itemType}</p>
                          </div>
                          <div className="flex items-center">
                            <Badge variant={
                              point.currentPrice < point.basePrice ? "outline" : 
                              point.currentPrice > point.basePrice ? "secondary" : "default"
                            }>
                              {point.currentPrice < point.basePrice ? (
                                <ArrowDown className="h-3 w-3 mr-1" />
                              ) : point.currentPrice > point.basePrice ? (
                                <ArrowUp className="h-3 w-3 mr-1" />
                              ) : null}
                              ${point.currentPrice.toFixed(2)}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Min: ${point.minPrice}</span>
                            <span>Base: ${point.basePrice}</span>
                            <span>Max: ${point.maxPrice}</span>
                          </div>
                          <Slider
                            value={[point.currentPrice]}
                            min={point.minPrice}
                            max={point.maxPrice}
                            step={0.5}
                            onValueChange={(values) => handlePriceChange(point.id, values[0])}
                          />
                        </div>
                        
                        <div className="flex justify-between mt-3 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Conversion: {(point.conversionRate * 100).toFixed(1)}%
                          </div>
                          <div className="flex items-center">
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                handlePriceChange(point.id, point.basePrice);
                              }}
                            >
                              Reset
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="rules">
            <div className="space-y-4">
              {pricingRules.map(rule => (
                <Card key={rule.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <h3 className="font-medium">{rule.name}</h3>
                        <Badge 
                          variant={rule.active ? "default" : "outline"} 
                          className="ml-2"
                        >
                          {rule.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <Switch 
                          checked={rule.active} 
                          onCheckedChange={(checked) => handleRuleToggle(rule.id, checked)}
                        />
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{rule.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="secondary">
                        {rule.modifier > 1 
                          ? `+${((rule.modifier - 1) * 100).toFixed(0)}%` 
                          : `-${((1 - rule.modifier) * 100).toFixed(0)}%`
                        }
                      </Badge>
                      
                      {rule.applicableTypes.map(type => (
                        <Badge key={type} variant="outline">
                          {type}
                        </Badge>
                      ))}
                      
                      {rule.conditions.time?.dayOfWeek && (
                        <Badge variant="outline" className="bg-blue-50">
                          {rule.conditions.time.dayOfWeek}
                        </Badge>
                      )}
                      
                      {rule.conditions.user?.newUser && (
                        <Badge variant="outline" className="bg-green-50">
                          new users
                        </Badge>
                      )}
                      
                      {rule.conditions.user?.highSpender && (
                        <Badge variant="outline" className="bg-purple-50">
                          high spenders
                        </Badge>
                      )}
                      
                      {rule.conditions.demand && (
                        <Badge variant="outline" className="bg-amber-50">
                          {rule.conditions.demand} demand
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Global Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="elasticity-factor" className="text-base">Elasticity Factor: {elasticityFactor}</Label>
                    <p className="text-sm text-muted-foreground">Controls how aggressively prices respond to demand changes</p>
                  </div>
                  <div className="w-[200px]">
                    <Slider
                      id="elasticity-factor"
                      defaultValue={[elasticityFactor]}
                      max={1}
                      step={0.1}
                      onValueChange={(values) => setElasticityFactor(values[0])}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ai-assistance" className="text-base">AI-Driven Assistance</Label>
                    <p className="text-sm text-muted-foreground">Use neural networks to assist pricing decisions</p>
                  </div>
                  <Switch 
                    id="ai-assistance"
                    checked={aiAssistanceEnabled} 
                    onCheckedChange={setAiAssistanceEnabled} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="demand-pricing" className="text-base">Demand-Based Pricing</Label>
                    <p className="text-sm text-muted-foreground">Automatically adjust prices based on real-time demand</p>
                  </div>
                  <Switch 
                    id="demand-pricing"
                    checked={demandBasedPricingEnabled} 
                    onCheckedChange={setDemandBasedPricingEnabled} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="competitive-analysis" className="text-base">Competitive Analysis</Label>
                    <p className="text-sm text-muted-foreground">Factor in competitor prices from market analysis</p>
                  </div>
                  <Switch 
                    id="competitive-analysis"
                    checked={competitiveAnalysisEnabled} 
                    onCheckedChange={setCompetitiveAnalysisEnabled} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="seasonal-adjustments" className="text-base">Seasonal Adjustments</Label>
                    <p className="text-sm text-muted-foreground">Apply time-based modifiers for holidays and events</p>
                  </div>
                  <Switch 
                    id="seasonal-adjustments"
                    checked={seasonalAdjustmentsEnabled} 
                    onCheckedChange={setSeasonalAdjustmentsEnabled} 
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Global Settings
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Revenue by Service Type</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pricePoints.map(point => ({
                            name: point.name,
                            value: point.currentPrice * point.conversionRate * 1000
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pricePoints.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => [`$${value.toFixed(0)}`, 'Revenue']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Conversion Rate Analysis</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={pricePoints.map(point => ({
                          name: point.name,
                          "Conversion Rate": point.conversionRate * 100,
                          "Elasticity": point.elasticity * 100
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value: any) => [`${value.toFixed(1)}%`, '']} />
                        <Legend />
                        <Bar dataKey="Conversion Rate" fill="#0088FE" />
                        <Bar dataKey="Elasticity" fill="#00C49F" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-base">Price History & Conversion Trends</CardTitle>
                  <Select
                    value={selectedItemType}
                    onValueChange={(value) => setSelectedItemType(value as any)}
                  >
                    <SelectTrigger className="w-[150px] h-8">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="message">Messages</SelectItem>
                      <SelectItem value="voice_message">Voice Messages</SelectItem>
                      <SelectItem value="video_call">Video Calls</SelectItem>
                      <SelectItem value="encounter">Encounters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getPricingHistoryData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="price" orientation="left" />
                      <YAxis yAxisId="conversion" orientation="right" />
                      <Tooltip />
                      <Legend />
                      {pricePoints
                        .filter(point => selectedItemType === 'all' || point.itemType === selectedItemType)
                        .slice(0, 3)
                        .map((point, index) => (
                          <Line
                            key={`${point.id}-price`}
                            yAxisId="price"
                            type="monotone"
                            dataKey={`${point.name} Price`}
                            stroke={COLORS[index % COLORS.length]}
                            activeDot={{ r: 8 }}
                          />
                        ))}
                      {pricePoints
                        .filter(point => selectedItemType === 'all' || point.itemType === selectedItemType)
                        .slice(0, 3)
                        .map((point, index) => (
                          <Line
                            key={`${point.id}-conv`}
                            yAxisId="conversion"
                            type="monotone"
                            dataKey={`${point.name} Conv.`}
                            stroke={COLORS[(index + 3) % COLORS.length]}
                            strokeDasharray="5 5"
                          />
                        ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <DollarSign className="h-8 w-8 text-green-500 mb-2" />
                    <h3 className="text-2xl font-bold">$23.4K</h3>
                    <p className="text-sm text-muted-foreground">Estimated Daily Revenue</p>
                    <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">
                      +8.3% vs. last week
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <BarChart2 className="h-8 w-8 text-blue-500 mb-2" />
                    <h3 className="text-2xl font-bold">7.2%</h3>
                    <p className="text-sm text-muted-foreground">Average Conversion Rate</p>
                    <Badge className="mt-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                      +1.2% vs. last week
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <PieChartIcon className="h-8 w-8 text-purple-500 mb-2" />
                    <h3 className="text-2xl font-bold">0.52</h3>
                    <p className="text-sm text-muted-foreground">Price Elasticity Index</p>
                    <Badge className="mt-2 bg-purple-100 text-purple-800 hover:bg-purple-100">
                      -0.05 vs. last week
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="optimization">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">AI-Generated Pricing Insights</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-blue-50 border-blue-100">
                  <CardContent className="pt-6">
                    <h4 className="font-medium text-blue-800">Market Trend Analysis</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Our AI analysis shows weekend demand for video calls is rising 14% week-over-week. Consider implementing more aggressive weekend pricing rules.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50 border-green-100">
                  <CardContent className="pt-6">
                    <h4 className="font-medium text-green-800">Cross-Service Optimization</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Users who purchase voice messages at {"<"}$11 have a 43% higher likelihood of upgrading to video calls within 7 days.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-amber-50 border-amber-100">
                  <CardContent className="pt-6">
                    <h4 className="font-medium text-amber-800">Competitive Intelligence</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      Main competitors have raised premium encounter pricing by 8-12% in the last 30 days, creating room for our own price adjustments.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50 border-purple-100">
                  <CardContent className="pt-6">
                    <h4 className="font-medium text-purple-800">New User Acquisition</h4>
                    <p className="text-sm text-purple-700 mt-1">
                      First-time message purchases convert 2.3x better at $4.50 vs $5.00 price point, with lifetime value remaining unchanged.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-3">Price Optimization Recommendations</h3>
            </div>
            
            <div className="space-y-4">
              {optimizations.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center text-center">
                    <Settings className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No Current Optimization Recommendations</h3>
                    <p className="text-muted-foreground mt-2 mb-4">
                      Run an optimization analysis to generate AI-powered price recommendations
                    </p>
                    <Button onClick={runOptimization}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Run Optimization
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                optimizations.map(opt => (
                  <Card key={opt.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">
                          {pricePoints.find(p => p.itemType === opt.itemType)?.name || opt.itemType}
                        </h3>
                        <Badge variant={opt.projectedIncrease > 5 ? "default" : "outline"}>
                          {opt.projectedIncrease > 0 ? "+" : ""}{opt.projectedIncrease.toFixed(1)}% revenue
                        </Badge>
                      </div>
                      
                      <div className="flex items-center my-3">
                        <div className="text-lg font-medium text-muted-foreground">${opt.currentPrice.toFixed(2)}</div>
                        <ArrowRight className="mx-3 h-4 w-4 text-muted-foreground" />
                        <div className="text-lg font-medium text-primary">${opt.suggestedPrice.toFixed(2)}</div>
                        <div className="ml-auto">
                          <Button
                            size="sm"
                            onClick={() => applyOptimization(opt.id)}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{opt.reasoning}</p>
                      
                      <div className="mt-2">
                        <div className="text-xs text-muted-foreground mb-1">
                          Confidence: {(opt.confidence * 100).toFixed(0)}%
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${opt.confidence * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedPricingEngine;
