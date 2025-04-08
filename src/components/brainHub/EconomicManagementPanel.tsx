
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  BarChart2,
  PieChart as PieChartIcon,
  Settings,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import Alert from '@/components/common/Alert';

const EconomicManagementPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [marketData, setMarketData] = useState<any[]>([]);
  const [financialMetrics, setFinancialMetrics] = useState({
    revenue: 0,
    expenses: 0,
    profit: 0,
    forecastAccuracy: 0,
    marketShare: 0,
    growthRate: 0
  });
  const [economicSettings, setEconomicSettings] = useState({
    dynamicPricing: true,
    demandForecasting: true,
    marketSimulation: false,
    transactionAnalysis: true,
    autoOptimize: false,
    riskManagement: false
  });
  const [predictionConfidence, setPredictionConfidence] = useState(75);
  
  useEffect(() => {
    // Fetch from brainHub in a real implementation
    generateMockData();
    simulateFinancialMetrics();
  }, []);
  
  const generateMockData = () => {
    const mockMarketData = Array.from({ length: 12 }, (_, i) => ({
      name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      revenue: Math.floor(Math.random() * 100000) + 50000,
      predicted: Math.floor(Math.random() * 100000) + 50000,
      expenses: Math.floor(Math.random() * 50000) + 20000,
      profit: Math.floor(Math.random() * 40000) + 10000
    }));
    
    setMarketData(mockMarketData);
  };
  
  const simulateFinancialMetrics = () => {
    setFinancialMetrics({
      revenue: Math.floor(Math.random() * 1000000) + 500000,
      expenses: Math.floor(Math.random() * 500000) + 200000,
      profit: Math.floor(Math.random() * 400000) + 100000,
      forecastAccuracy: Math.floor(Math.random() * 20) + 75,
      marketShare: Math.floor(Math.random() * 30) + 10,
      growthRate: Math.floor(Math.random() * 15) + 2
    });
  };
  
  const handleSettingChange = (setting: string, value: boolean) => {
    setEconomicSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: `${value ? 'Enabled' : 'Disabled'} ${setting}`,
      description: `Economic model setting has been updated`,
      variant: value ? "success" : "default",
    });
    
    // In a real implementation, we would update brainHub settings:
    // brainHub.updateConfig({
    //   economics: {
    //     ...brainHub.getConfig().economics,
    //     [setting]: value
    //   }
    // });
  };
  
  const runMarketSimulation = () => {
    toast({
      title: "Market Simulation Started",
      description: "The economic engine is running simulations based on current market data",
      variant: "default",
    });
    
    // In a real implementation, we would call brainHub API
    setTimeout(() => {
      generateMockData();
      simulateFinancialMetrics();
      
      toast({
        title: "Market Simulation Complete",
        description: "Economic predictions have been updated with new model data",
        variant: "success",
      });
    }, 2000);
  };
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const pieData = [
    { name: 'Revenue', value: financialMetrics.revenue },
    { name: 'Expenses', value: financialMetrics.expenses },
    { name: 'Profit', value: financialMetrics.profit }
  ];
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="dashboard">
            <BarChart2 className="h-4 w-4 mr-2" />
            Economic Dashboard
          </TabsTrigger>
          <TabsTrigger value="forecasting">
            <TrendingUp className="h-4 w-4 mr-2" />
            Forecasting
          </TabsTrigger>
          <TabsTrigger value="pricing">
            <DollarSign className="h-4 w-4 mr-2" />
            Dynamic Pricing
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Economics Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${financialMetrics.revenue.toLocaleString()}</div>
                <div className="flex items-center text-sm mt-1">
                  <ChevronUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">+{financialMetrics.growthRate}%</span>
                  <span className="text-muted-foreground ml-1">vs last period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Profit Margin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{Math.round((financialMetrics.profit / financialMetrics.revenue) * 100)}%</div>
                <div className="flex items-center text-sm mt-1">
                  {financialMetrics.profit > financialMetrics.expenses ? (
                    <>
                      <ChevronUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">Healthy</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-red-500 font-medium">Needs Attention</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Forecast Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{financialMetrics.forecastAccuracy}%</div>
                <div className="w-full bg-gray-200 h-2 mt-2 rounded-full">
                  <div 
                    className={`h-full rounded-full ${financialMetrics.forecastAccuracy > 90 ? 'bg-green-500' : financialMetrics.forecastAccuracy > 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{width: `${financialMetrics.forecastAccuracy}%`}}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Revenue, expenses, and profit trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={marketData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="predicted" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="expenses" stroke="#ff7300" strokeWidth={2} />
                  <Line type="monotone" dataKey="profit" stroke="#0088FE" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Share</CardTitle>
                <CardDescription>Current position in the market</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Your Company', value: financialMetrics.marketShare },
                        { name: 'Competitors', value: 100 - financialMetrics.marketShare }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: 'Your Company', value: financialMetrics.marketShare },
                        { name: 'Competitors', value: 100 - financialMetrics.marketShare }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Financial metrics distribution</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={pieData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="forecasting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Economic Forecasting</CardTitle>
              <CardDescription>Predictive analysis for future economic trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert
                variant="info"
                title="AI-Powered Forecasting"
                message="The Brain Hub is using historical data and market trends to predict future economic performance."
                showIcon
              />
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <Label>Prediction Confidence</Label>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-lg">{predictionConfidence}%</span>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Slider 
                    value={[predictionConfidence]} 
                    max={100} 
                    min={50} 
                    step={5}
                    onValueChange={(values) => setPredictionConfidence(values[0])} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Forecast Period</Label>
                  <Select defaultValue="quarterly">
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                      <SelectItem value="5year">5 Year Plan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Economic Model</Label>
                  <Select defaultValue="adaptive">
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                      <SelectItem value="adaptive">Adaptive AI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={runMarketSimulation}>
                  Generate Forecast
                </Button>
              </div>
              
              <Card className="mt-4 border-dashed">
                <CardHeader className="pb-2">
                  <CardTitle>Forecast Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                      data={marketData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Historical Revenue" strokeWidth={2} />
                      <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="Forecasted Revenue" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-muted-foreground">
                    Forecast based on {predictionConfidence}% confidence interval and current economic conditions.
                  </div>
                </CardFooter>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dynamic Pricing Engine</CardTitle>
              <CardDescription>AI-driven pricing optimization for maximum revenue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Price Elasticity Model</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select elasticity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Elasticity (Luxury)</SelectItem>
                        <SelectItem value="medium">Medium Elasticity (Standard)</SelectItem>
                        <SelectItem value="high">High Elasticity (Competitive)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Pricing Strategy</Label>
                    <Select defaultValue="value">
                      <SelectTrigger>
                        <SelectValue placeholder="Select strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="premium">Premium Pricing</SelectItem>
                        <SelectItem value="value">Value-Based Pricing</SelectItem>
                        <SelectItem value="competitive">Competitive Pricing</SelectItem>
                        <SelectItem value="penetration">Penetration Pricing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Auto-Adjust Prices</Label>
                      <Switch checked={economicSettings.dynamicPricing} onCheckedChange={(checked) => handleSettingChange('dynamicPricing', checked)} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Allow the AI to automatically adjust prices based on market conditions.
                    </p>
                  </div>
                  
                  <Button className="w-full">Apply Pricing Model</Button>
                </div>
                
                <div>
                  <Card className="border-dashed h-full">
                    <CardHeader className="pb-2">
                      <CardTitle>Price Optimization</CardTitle>
                      <CardDescription>Estimated impact on revenue</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart
                          data={[
                            { price: 80, revenue: 60, profit: 20 },
                            { price: 90, revenue: 75, profit: 30 },
                            { price: 100, revenue: 90, profit: 40 },
                            { price: 110, revenue: 100, profit: 50 },
                            { price: 120, revenue: 105, profit: 55 },
                            { price: 130, revenue: 95, profit: 45 },
                            { price: 140, revenue: 80, profit: 30 },
                            { price: 150, revenue: 60, profit: 10 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="price" label={{ value: 'Price Point', position: 'insideBottom', offset: -5 }} />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
                        </LineChart>
                      </ResponsiveContainer>
                      
                      <div className="mt-4">
                        <div className="text-sm font-medium">Optimal Price Point: $120.00</div>
                        <div className="text-sm text-muted-foreground">Expected Revenue Increase: +15%</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Economic Engine Configuration</CardTitle>
              <CardDescription>Configure the economic modeling capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Dynamic Pricing</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically adjust prices based on demand, competition, and market conditions.
                    </p>
                  </div>
                  <Switch 
                    checked={economicSettings.dynamicPricing} 
                    onCheckedChange={(checked) => handleSettingChange('dynamicPricing', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Demand Forecasting</Label>
                    <p className="text-sm text-muted-foreground">
                      Predict future customer demand using historical data and current trends.
                    </p>
                  </div>
                  <Switch 
                    checked={economicSettings.demandForecasting} 
                    onCheckedChange={(checked) => handleSettingChange('demandForecasting', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Market Simulation</Label>
                    <p className="text-sm text-muted-foreground">
                      Run complex economic simulations to model market behavior.
                    </p>
                  </div>
                  <Switch 
                    checked={economicSettings.marketSimulation} 
                    onCheckedChange={(checked) => handleSettingChange('marketSimulation', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Transaction Analysis</Label>
                    <p className="text-sm text-muted-foreground">
                      Analyze transaction patterns to identify economic opportunities.
                    </p>
                  </div>
                  <Switch 
                    checked={economicSettings.transactionAnalysis} 
                    onCheckedChange={(checked) => handleSettingChange('transactionAnalysis', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Automated Optimization</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow the system to make autonomous economic decisions for optimization.
                    </p>
                  </div>
                  <Switch 
                    checked={economicSettings.autoOptimize} 
                    onCheckedChange={(checked) => handleSettingChange('autoOptimize', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Risk Management</Label>
                    <p className="text-sm text-muted-foreground">
                      Implement AI-driven risk assessment and mitigation strategies.
                    </p>
                  </div>
                  <Switch 
                    checked={economicSettings.riskManagement} 
                    onCheckedChange={(checked) => handleSettingChange('riskManagement', checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Configuration</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EconomicManagementPanel;
