
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import Alert from '@/components/common/Alert';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
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
  ResponsiveContainer,
  ScatterChart,
  Scatter
} from 'recharts';
import {
  BarChart2,
  Target,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  FileText,
  Network,
  CheckCircle,
  Clock,
  Milestone,
  GitBranch,
  GitMerge,
  GitPullRequest,
  Settings,
  AlertTriangle,
  Compass,
  Flag,
  MoreHorizontal,
  Plus,
  Save,
  Trash2,
  ChevronRight,
  CornerDownRight
} from 'lucide-react';

interface GoalType {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'at-risk';
  timeline: string;
  owner: string;
  kpi: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface ScenarioType {
  id: string;
  name: string;
  description: string;
  probability: number;
  impact: number;
  strategy: string;
  variables: Record<string, any>;
}

interface RiskType {
  id: string;
  name: string;
  description: string;
  likelihood: number;
  impact: number;
  mitigation: string;
  status: 'monitoring' | 'addressing' | 'mitigated';
}

const StrategicPlanningPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("goals");
  const [strategicGoals, setStrategicGoals] = useState<GoalType[]>([]);
  const [scenarios, setScenarios] = useState<ScenarioType[]>([]);
  const [risks, setRisks] = useState<RiskType[]>([]);
  const [modelingMode, setModelingMode] = useState('deterministic');
  const [confidenceLevel, setConfidenceLevel] = useState(85);
  const [planningHorizon, setPlanningHorizon] = useState('1-year');
  const [optimalPath, setOptimalPath] = useState<any[]>([]);
  const [uncertaintyData, setUncertaintyData] = useState<any[]>([]);
  const [kpiForecasts, setKpiForecasts] = useState<any[]>([]);

  useEffect(() => {
    // Initialize with mock data
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Mock strategic goals
    const mockGoals: GoalType[] = [
      {
        id: '1',
        title: 'Market Expansion',
        description: 'Expand into APAC markets with focus on Japan and Singapore',
        progress: 25,
        status: 'in-progress',
        timeline: 'Q4 2025',
        owner: 'Global Markets Team',
        kpi: 'Establish offices in 2 countries, $2M in new revenue',
        priority: 'high'
      },
      {
        id: '2',
        title: 'Product Innovation',
        description: 'Develop AI-powered predictive analytics feature',
        progress: 65,
        status: 'in-progress',
        timeline: 'Q1 2025',
        owner: 'R&D Team',
        kpi: '200 beta users, 80% retention rate',
        priority: 'critical'
      },
      {
        id: '3',
        title: 'Operational Efficiency',
        description: 'Reduce operational expenses by 15%',
        progress: 40,
        status: 'at-risk',
        timeline: 'Q2 2025',
        owner: 'Operations',
        kpi: '15% cost reduction vs. previous year',
        priority: 'medium'
      },
      {
        id: '4',
        title: 'Digital Transformation',
        description: 'Transition legacy systems to cloud-native architecture',
        progress: 80,
        status: 'in-progress',
        timeline: 'Q3 2025',
        owner: 'IT Department',
        kpi: '99.9% uptime, 30% reduction in maintenance costs',
        priority: 'high'
      },
      {
        id: '5',
        title: 'Talent Development',
        description: 'Implement leadership development program',
        progress: 100,
        status: 'completed',
        timeline: 'Q4 2024',
        owner: 'HR',
        kpi: '25 managers trained, 90% satisfaction rate',
        priority: 'medium'
      }
    ];

    // Mock scenarios
    const mockScenarios: ScenarioType[] = [
      {
        id: '1',
        name: 'Economic Downturn',
        description: 'Global recession lasting 12-18 months',
        probability: 25,
        impact: 80,
        strategy: 'Diversify revenue streams, build cash reserves, focus on retention',
        variables: {
          marketGrowth: -5,
          customerRetention: -10,
          operationalCosts: 8
        }
      },
      {
        id: '2',
        name: 'Rapid Technology Shift',
        description: 'Accelerated adoption of competing technology',
        probability: 40,
        impact: 70,
        strategy: 'Increase R&D investment, form strategic partnerships, acquire innovation',
        variables: {
          marketGrowth: 15,
          productDevelopment: 40,
          competitivePressure: 25
        }
      },
      {
        id: '3',
        name: 'Market Expansion Success',
        description: 'Faster than expected growth in new markets',
        probability: 35,
        impact: 65,
        strategy: 'Scale operations, localize offerings, strengthen supply chains',
        variables: {
          marketGrowth: 30,
          operationalCosts: 20,
          talentAcquisition: 15
        }
      }
    ];

    // Mock risks
    const mockRisks: RiskType[] = [
      {
        id: '1',
        name: 'Cybersecurity Breach',
        description: 'Data breach impacting customer information',
        likelihood: 35,
        impact: 90,
        mitigation: 'Enhance security protocols, regular audits, incident response planning',
        status: 'monitoring'
      },
      {
        id: '2',
        name: 'Supply Chain Disruption',
        description: 'Major disruption in key component availability',
        likelihood: 45,
        impact: 75,
        mitigation: 'Dual-sourcing strategy, increased inventory of critical components',
        status: 'addressing'
      },
      {
        id: '3',
        name: 'Regulatory Changes',
        description: 'New regulations impacting product compliance',
        likelihood: 60,
        impact: 70,
        mitigation: 'Regulatory monitoring team, compliance automation',
        status: 'monitoring'
      },
      {
        id: '4',
        name: 'Talent Shortage',
        description: 'Difficulty hiring key technical roles',
        likelihood: 80,
        impact: 65,
        mitigation: 'Remote work policy, enhanced benefits, internal training',
        status: 'mitigated'
      }
    ];

    setStrategicGoals(mockGoals);
    setScenarios(mockScenarios);
    setRisks(mockRisks);

    // Generate mock path optimization data
    generatePathData();
    generateUncertaintyData();
    generateKpiForecastData();
  };

  const generatePathData = () => {
    const paths = [
      { name: 'Q1 2025', baseline: 100, optimal: 100, actual: 100 },
      { name: 'Q2 2025', baseline: 105, optimal: 112, actual: 110 },
      { name: 'Q3 2025', baseline: 110, optimal: 125, actual: 118 },
      { name: 'Q4 2025', baseline: 115, optimal: 140, actual: 130 },
      { name: 'Q1 2026', baseline: 120, optimal: 155, actual: 145 },
      { name: 'Q2 2026', baseline: 125, optimal: 172, actual: 0 },
      { name: 'Q3 2026', baseline: 130, optimal: 190, actual: 0 },
      { name: 'Q4 2026', baseline: 135, optimal: 210, actual: 0 },
    ];
    
    setOptimalPath(paths);
  };

  const generateUncertaintyData = () => {
    const data = [
      { name: 'Q1 2025', best: 110, expected: 100, worst: 90, actual: 100 },
      { name: 'Q2 2025', best: 125, expected: 110, worst: 95, actual: 110 },
      { name: 'Q3 2025', best: 145, expected: 120, worst: 100, actual: 118 },
      { name: 'Q4 2025', best: 165, expected: 130, worst: 105, actual: 130 },
      { name: 'Q1 2026', best: 190, expected: 145, worst: 110, actual: 145 },
      { name: 'Q2 2026', best: 215, expected: 160, worst: 115, actual: 0 },
      { name: 'Q3 2026', best: 245, expected: 180, worst: 120, actual: 0 },
      { name: 'Q4 2026', best: 280, expected: 200, worst: 125, actual: 0 },
    ];
    
    setUncertaintyData(data);
  };

  const generateKpiForecastData = () => {
    const data = [
      { name: 'Revenue', current: 10.5, target: 15.0, forecast: 14.2, progress: 76 },
      { name: 'Profit Margin', current: 18, target: 25, forecast: 22, progress: 57 },
      { name: 'Market Share', current: 12, target: 18, forecast: 16.5, progress: 75 },
      { name: 'Customer Retention', current: 78, target: 90, forecast: 85, progress: 58 },
      { name: 'Product Innovation', current: 3, target: 10, forecast: 8, progress: 71 },
    ];
    
    setKpiForecasts(data);
  };

  const calculateRiskMatrix = () => {
    return risks.map(risk => ({
      x: risk.likelihood,
      y: risk.impact,
      name: risk.name,
      status: risk.status
    }));
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'at-risk': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'not-started': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'monitoring': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'addressing': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'mitigated': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'at-risk': return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case 'not-started': return <Clock className="h-4 w-4 text-gray-600" />;
      case 'monitoring': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'addressing': return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case 'mitigated': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-amber-100 text-amber-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const runStrategicSimulation = () => {
    toast({
      title: "Strategic Simulation Running",
      description: `Running simulation with ${confidenceLevel}% confidence level`,
      variant: "default",
    });

    // Simulate API call
    setTimeout(() => {
      // Update the data visualizations
      generatePathData();
      generateUncertaintyData();
      generateKpiForecastData();

      toast({
        title: "Simulation Complete",
        description: "Strategic planning model has been updated",
        variant: "success",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="goals">
            <Target className="h-4 w-4 mr-2" />
            Strategic Goals
          </TabsTrigger>
          <TabsTrigger value="scenarios">
            <GitBranch className="h-4 w-4 mr-2" />
            Scenario Planning
          </TabsTrigger>
          <TabsTrigger value="risks">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Risk Management
          </TabsTrigger>
          <TabsTrigger value="simulation">
            <TrendingUp className="h-4 w-4 mr-2" />
            Path Optimization
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Strategy Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="goals" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Strategic Goals</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </div>

          {strategicGoals.map((goal) => (
            <Card key={goal.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{goal.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(goal.priority)}`}>
                      {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(goal.status)}`}>
                      {getStatusIcon(goal.status)}
                      {goal.status === 'in-progress' ? 'In Progress' : 
                       goal.status === 'at-risk' ? 'At Risk' : 
                       goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                    </span>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{goal.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          goal.status === 'completed' ? 'bg-green-500' : 
                          goal.status === 'at-risk' ? 'bg-amber-500' : 
                          'bg-blue-500'
                        }`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Timeline</p>
                      <p className="font-medium flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {goal.timeline}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Owner</p>
                      <p className="font-medium flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {goal.owner}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">KPI</p>
                      <p className="font-medium">{goal.kpi}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Scenario Planning</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Scenario
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Scenario Comparison</CardTitle>
              <CardDescription>
                Comparing the potential impact of different future scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={scenarios.map(s => ({
                    name: s.name,
                    probability: s.probability,
                    impact: s.impact,
                    risk: s.probability * s.impact / 100
                  }))}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="probability" name="Probability (%)" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="impact" name="Impact (0-100)" fill="#82ca9d" />
                  <Bar yAxisId="right" dataKey="risk" name="Risk Score" fill="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {scenarios.map((scenario) => (
            <Card key={scenario.id} className="mb-4">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{scenario.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {scenario.probability}% Probability
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {scenario.impact}/100 Impact
                    </span>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{scenario.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Response Strategy</h4>
                    <p className="text-sm">{scenario.strategy}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Variables</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(scenario.variables).map(([key, value]) => (
                        <div key={key} className="bg-muted p-3 rounded-md">
                          <p className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                          <p className="text-sm font-medium flex items-center gap-1">
                            {value > 0 ? 
                              <ChevronRight className="h-3 w-3 text-green-600 rotate-90" /> : 
                              <ChevronRight className="h-3 w-3 text-red-600 -rotate-90" />
                            }
                            {value > 0 ? `+${value}%` : `${value}%`}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Risk Management</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Risk
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Risk Matrix</CardTitle>
              <CardDescription>
                Visualization of risks by likelihood and potential impact
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px] relative">
              <div className="absolute inset-0">
                <div className="h-full w-full bg-gradient-to-br from-green-100 via-amber-100 to-red-100 opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5/6 h-5/6">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="Likelihood" domain={[0, 100]} label={{ value: 'Likelihood (%)', position: 'bottom' }} />
                        <YAxis type="number" dataKey="y" name="Impact" domain={[0, 100]} label={{ value: 'Impact', angle: -90, position: 'left' }} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value) => `${value}%`} />
                        <Legend />
                        {calculateRiskMatrix().map((entry, index) => (
                          <Scatter 
                            key={index} 
                            name={entry.name} 
                            data={[entry]} 
                            fill={
                              entry.status === 'mitigated' ? '#22c55e' : 
                              entry.status === 'addressing' ? '#f59e0b' : 
                              '#3b82f6'
                            } 
                          />
                        ))}
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="absolute top-2 left-2 bg-white bg-opacity-75 p-2 rounded text-xs">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Low Risk Zone</span>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    <span>Medium Risk Zone</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <span>High Risk Zone</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {risks.map((risk) => (
            <Card key={risk.id} className="mb-4">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{risk.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {risk.likelihood}% Likelihood
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                      {risk.impact}/100 Impact
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(risk.status)}`}>
                      {getStatusIcon(risk.status)}
                      {risk.status.charAt(0).toUpperCase() + risk.status.slice(1)}
                    </span>
                  </div>
                </div>
                <CardDescription>{risk.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Mitigation Strategy</h4>
                  <p className="text-sm">{risk.mitigation}</p>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="text-sm text-muted-foreground">
                  Risk Score: <span className="font-medium">{Math.round(risk.likelihood * risk.impact / 100)}/100</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="simulation" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Strategic Path Optimization</h2>
            <div className="flex items-center gap-2">
              <Select value={planningHorizon} onValueChange={setPlanningHorizon}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select horizon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-year">1 Year</SelectItem>
                  <SelectItem value="2-year">2 Years</SelectItem>
                  <SelectItem value="5-year">5 Years</SelectItem>
                </SelectContent>
              </Select>
              <Select value={modelingMode} onValueChange={setModelingMode}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deterministic">Deterministic</SelectItem>
                  <SelectItem value="montecarlo">Monte Carlo</SelectItem>
                  <SelectItem value="bayesian">Bayesian</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="default" onClick={runStrategicSimulation}>
                <Play className="h-4 w-4 mr-2" />
                Run Simulation
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Optimal Path Analysis</CardTitle>
              <CardDescription>
                Comparing baseline, optimal, and actual strategic pathways
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={optimalPath}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="baseline" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      name="Baseline Path" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="optimal" 
                      stroke="#82ca9d" 
                      strokeWidth={2} 
                      name="Optimal Path"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#ff7300" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }} 
                      name="Actual Path"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Uncertainty Analysis</CardTitle>
                <CardDescription>
                  Range of possible outcomes with {confidenceLevel}% confidence level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <Label>Confidence Level: {confidenceLevel}%</Label>
                  <Slider
                    value={[confidenceLevel]}
                    min={50}
                    max={99}
                    step={1}
                    onValueChange={(values) => setConfidenceLevel(values[0])}
                  />
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={uncertaintyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="best"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.2}
                        name="Best Case"
                      />
                      <Area
                        type="monotone"
                        dataKey="expected"
                        stackId="2"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.2}
                        name="Expected Case"
                      />
                      <Area
                        type="monotone"
                        dataKey="worst"
                        stackId="3"
                        stroke="#ff7300"
                        fill="#ff7300"
                        fillOpacity={0.2}
                        name="Worst Case"
                      />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#000000"
                        strokeWidth={2}
                        name="Actual Performance"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>KPI Forecasts</CardTitle>
                <CardDescription>
                  Key performance indicators and projected achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {kpiForecasts.map((kpi, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{kpi.name}</span>
                        <span className="text-sm">
                          <span className="text-muted-foreground">Current:</span> {kpi.current}
                          <span className="text-muted-foreground ml-2">Target:</span> {kpi.target}
                          <span className="text-muted-foreground ml-2">Forecast:</span> {kpi.forecast}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${kpi.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0</span>
                        <span>Current: {kpi.current}</span>
                        <span>Forecast: {kpi.forecast}</span>
                        <span>Target: {kpi.target}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Strategic Planning Configuration</CardTitle>
              <CardDescription>
                Configure the strategic planning and simulation engine
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Simulation Settings</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Modeling Approach</Label>
                    <Select value={modelingMode} onValueChange={setModelingMode}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select approach" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deterministic">Deterministic</SelectItem>
                        <SelectItem value="montecarlo">Monte Carlo Simulation</SelectItem>
                        <SelectItem value="bayesian">Bayesian Networks</SelectItem>
                        <SelectItem value="agentbased">Agent-Based Modeling</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      The mathematical approach used for strategic simulations
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Planning Horizon</Label>
                    <Select value={planningHorizon} onValueChange={setPlanningHorizon}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select horizon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-year">1 Year</SelectItem>
                        <SelectItem value="2-year">2 Years</SelectItem>
                        <SelectItem value="5-year">5 Years</SelectItem>
                        <SelectItem value="10-year">10 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Confidence Level</Label>
                      <span className="text-sm">{confidenceLevel}%</span>
                    </div>
                    <Slider
                      value={[confidenceLevel]}
                      min={50}
                      max={99}
                      step={1}
                      onValueChange={(values) => setConfidenceLevel(values[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Statistical confidence used for uncertainty modeling
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="autoOptimize" />
                    <label
                      htmlFor="autoOptimize"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Enable automatic path optimization
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Integration Settings</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch id="integrateFin" defaultChecked />
                    <label
                      htmlFor="integrateFin"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Integrate with Financial Module
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="integrateProj" defaultChecked />
                    <label
                      htmlFor="integrateProj"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Connect to Project Management
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="enableML" />
                    <label
                      htmlFor="enableML"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Enable Machine Learning Predictions
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="realtime" />
                    <label
                      htmlFor="realtime"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Real-time Strategy Adjustment
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Visualization Preferences</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Default Chart Type</Label>
                    <Select defaultValue="line">
                      <SelectTrigger>
                        <SelectValue placeholder="Select chart type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="line">Line Charts</SelectItem>
                        <SelectItem value="bar">Bar Charts</SelectItem>
                        <SelectItem value="scatter">Scatter Plots</SelectItem>
                        <SelectItem value="radar">Radar Charts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Data Granularity</Label>
                    <Select defaultValue="quarterly">
                      <SelectTrigger>
                        <SelectValue placeholder="Select granularity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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

// Missing icon component
const Play: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

export default StrategicPlanningPanel;
