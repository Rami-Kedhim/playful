
import { useState } from 'react';
import { useAssessment } from '@/hooks/useAssessment';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  AlertCircle, 
  BarChart, 
  Brain, 
  CheckCircle2, 
  Clock, 
  Heart, 
  Lightbulb, 
  LineChart, 
  PieChart, 
  Target, 
  TrendingUp, 
  XCircle 
} from 'lucide-react';
import { AssessmentInsight, AssessmentSeverityLevel } from '@/types/assessment';

const AssessmentPanel = () => {
  const { 
    assessment, 
    isGenerating, 
    generateAssessment, 
    getPriorityInsights,
    filterInsightsByCategory 
  } = useAssessment();
  
  const [activeTab, setActiveTab] = useState('overview');
  
  // Get severity badge color
  const getSeverityColor = (severity: AssessmentSeverityLevel) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-amber-500';
      case 'opportunity': return 'bg-blue-500';
      case 'positive': return 'bg-green-500';
      default: return 'bg-slate-500';
    }
  };
  
  // Get severity icon
  const getSeverityIcon = (severity: AssessmentSeverityLevel) => {
    switch (severity) {
      case 'critical': return <XCircle className="h-4 w-4" />;
      case 'warning': return <AlertCircle className="h-4 w-4" />;
      case 'opportunity': return <Lightbulb className="h-4 w-4" />;
      case 'positive': return <CheckCircle2 className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };
  
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'engagement': return <Heart className="h-4 w-4" />;
      case 'conversion': return <TrendingUp className="h-4 w-4" />;
      case 'retention': return <Target className="h-4 w-4" />;
      case 'monetization': return <PieChart className="h-4 w-4" />;
      case 'trust': return <CheckCircle2 className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };
  
  // Render insight card
  const renderInsight = (insight: AssessmentInsight) => {
    return (
      <Card key={insight.id} className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className={`p-1 rounded-full mr-2 ${getSeverityColor(insight.severityLevel)}`}>
                {getSeverityIcon(insight.severityLevel)}
              </div>
              <CardTitle className="text-lg">{insight.title}</CardTitle>
            </div>
            <Badge className="flex items-center gap-1">
              {getCategoryIcon(insight.category)}
              <span className="capitalize">{insight.category}</span>
            </Badge>
          </div>
          <CardDescription>{insight.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Impact</div>
              <Progress value={insight.impact} className="h-2" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Confidence</div>
              <Progress value={insight.confidenceScore} className="h-2" />
            </div>
          </div>
          
          <div className="space-y-1 mt-4">
            <h4 className="text-sm font-semibold">Recommended Actions:</h4>
            <ul className="text-sm space-y-1 list-disc pl-5">
              {insight.recommendedActions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2" />
          Behavioral Assessment
        </CardTitle>
        <CardDescription>
          In-depth analysis based on Hughes-Chernev-Keller framework
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isGenerating ? (
          <div className="text-center py-4">
            <Brain className="h-8 w-8 mx-auto animate-pulse mb-2" />
            <p className="text-sm text-muted-foreground">Generating assessment...</p>
          </div>
        ) : !assessment ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground mb-4">No assessment data available yet</p>
            <Button onClick={generateAssessment} size="sm">
              <LineChart className="h-4 w-4 mr-2" />
              Generate Assessment
            </Button>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="scores">Score Details</TabsTrigger>
              <TabsTrigger value="actions">Action Plan</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="bg-muted rounded-md p-3">
                <h3 className="font-medium mb-2">Assessment Summary</h3>
                <p className="text-sm">{assessment.summary}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted rounded-md p-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">Overall Score</div>
                  <div className="text-3xl font-bold">{assessment.overallScore}</div>
                  <Progress 
                    value={assessment.overallScore} 
                    className="h-1.5 mt-2"
                    style={{ 
                      background: 'rgba(100, 100, 100, 0.2)',
                      color: assessment.overallScore > 70 ? '#22c55e' : 
                            assessment.overallScore > 40 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </div>
                
                <div className="bg-muted rounded-md p-3">
                  <div className="text-xs text-muted-foreground mb-2">Key Strengths</div>
                  <ul className="text-sm space-y-1">
                    {assessment.strengthAreas.slice(0, 3).map((strength, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle2 className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-muted rounded-md p-3">
                  <div className="text-xs text-muted-foreground mb-2">Improvement Areas</div>
                  <ul className="text-sm space-y-1">
                    {assessment.improvementAreas.slice(0, 3).map((area, i) => (
                      <li key={i} className="flex items-center">
                        <AlertCircle className="h-3 w-3 text-amber-500 mr-1 flex-shrink-0" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-muted rounded-md p-3">
                <h3 className="font-medium mb-2">Priority Insights</h3>
                <div className="space-y-3">
                  {getPriorityInsights().map((insight, i) => (
                    <Alert 
                      key={i}
                      variant={insight.severityLevel === 'critical' ? 'destructive' : 'default'}
                      className="mb-2"
                    >
                      <div className="flex items-start">
                        {getSeverityIcon(insight.severityLevel)}
                        <div className="ml-2">
                          <AlertTitle className="text-sm font-medium">{insight.title}</AlertTitle>
                          <AlertDescription className="text-xs mt-1">
                            {insight.description}
                          </AlertDescription>
                        </div>
                      </div>
                    </Alert>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Insights Tab */}
            <TabsContent value="insights" className="space-y-4">
              <Tabs defaultValue="all">
                <TabsList className="grid grid-cols-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="engagement">Engagement</TabsTrigger>
                  <TabsTrigger value="conversion">Conversion</TabsTrigger>
                  <TabsTrigger value="retention">Retention</TabsTrigger>
                  <TabsTrigger value="monetization">Monetization</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="pt-4">
                  {assessment.insights.map(renderInsight)}
                </TabsContent>
                
                <TabsContent value="engagement" className="pt-4">
                  {filterInsightsByCategory('engagement').map(renderInsight)}
                </TabsContent>
                
                <TabsContent value="conversion" className="pt-4">
                  {filterInsightsByCategory('conversion').map(renderInsight)}
                </TabsContent>
                
                <TabsContent value="retention" className="pt-4">
                  {filterInsightsByCategory('retention').map(renderInsight)}
                </TabsContent>
                
                <TabsContent value="monetization" className="pt-4">
                  {filterInsightsByCategory('monetization').map(renderInsight)}
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            {/* Scores Tab */}
            <TabsContent value="scores" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      Engagement Health
                    </div>
                    <div className="text-lg font-semibold">{assessment.engagementHealthScore}</div>
                  </div>
                  <Progress 
                    value={assessment.engagementHealthScore} 
                    className="h-1.5" 
                  />
                  <div className="text-xs text-muted-foreground mt-2">
                    Based on behavioral loop stage and brand resonance
                  </div>
                </div>
                
                <div className="bg-muted rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Conversion Potential
                    </div>
                    <div className="text-lg font-semibold">{assessment.conversionPotentialScore}</div>
                  </div>
                  <Progress 
                    value={assessment.conversionPotentialScore} 
                    className="h-1.5" 
                  />
                  <div className="text-xs text-muted-foreground mt-2">
                    Based on decision stage and interest signals
                  </div>
                </div>
                
                <div className="bg-muted rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Retention Risk
                    </div>
                    <div className="text-lg font-semibold">{assessment.retentionRiskScore}%</div>
                  </div>
                  <Progress 
                    value={assessment.retentionRiskScore} 
                    className="h-1.5" 
                    style={{ 
                      background: 'rgba(100, 100, 100, 0.2)',
                      color: assessment.retentionRiskScore > 70 ? '#ef4444' : 
                            assessment.retentionRiskScore > 40 ? '#f59e0b' : '#22c55e'
                    }}
                  />
                  <div className="text-xs text-muted-foreground mt-2">
                    Based on trust level and behavioral signals
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <h3 className="font-medium">Score Breakdown</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Behavioral Stage</div>
                    <div className="text-xs text-muted-foreground">
                      Current stage in Hughes' behavioral loop
                    </div>
                    <div className="flex space-x-1">
                      {['discovery', 'engagement', 'investment', 'identity', 'advocacy'].map((stage) => (
                        <Badge 
                          key={stage} 
                          variant="outline"
                          className={assessment.timestamp ? 'capitalize' : ''}
                          style={{
                            backgroundColor: stage === assessment.timestamp ? 'var(--primary)' : 'transparent',
                            color: stage === assessment.timestamp ? 'white' : 'inherit'
                          }}
                        >
                          {stage}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Brand Resonance</div>
                    <div className="text-xs text-muted-foreground">
                      Current stage in Keller's brand resonance pyramid
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {['awareness', 'performance', 'imagery', 'judgments', 'feelings', 'resonance'].map((stage) => (
                        <Badge 
                          key={stage} 
                          variant="outline"
                          className="capitalize"
                          style={{
                            backgroundColor: stage === assessment.timestamp ? 'var(--primary)' : 'transparent',
                            color: stage === assessment.timestamp ? 'white' : 'inherit'
                          }}
                        >
                          {stage}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Actions Tab */}
            <TabsContent value="actions" className="space-y-4">
              <div className="bg-muted rounded-md p-3">
                <h3 className="font-medium mb-2">Recommended Action Plan</h3>
                <p className="text-sm mb-4">Based on assessment insights, prioritize these actions:</p>
                
                <div className="space-y-4">
                  {getPriorityInsights().map((insight, i) => (
                    <div key={i} className="bg-background rounded p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium flex items-center">
                          {getSeverityIcon(insight.severityLevel)}
                          <span className="ml-2">{insight.title}</span>
                        </h4>
                        <Badge>{insight.category}</Badge>
                      </div>
                      <ul className="text-sm space-y-2 list-disc pl-5">
                        {insight.recommendedActions.map((action, j) => (
                          <li key={j} className="text-muted-foreground">{action}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-muted rounded-md p-3">
                <h3 className="font-medium mb-2">Timeline Recommendations</h3>
                
                <div className="space-y-3">
                  <div className="bg-background rounded p-3">
                    <div className="flex items-center mb-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <h4 className="text-sm font-medium">Immediate (Next 7 Days)</h4>
                    </div>
                    <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                      {filterInsightsByCategory('trust')
                        .filter(i => i.severityLevel === 'critical')
                        .slice(0, 1)
                        .flatMap(i => i.recommendedActions)
                        .slice(0, 2)
                        .map((action, i) => <li key={i}>{action}</li>)
                      }
                      {filterInsightsByCategory('retention')
                        .filter(i => i.severityLevel === 'critical')
                        .slice(0, 1)
                        .flatMap(i => i.recommendedActions)
                        .slice(0, 1)
                        .map((action, i) => <li key={i}>{action}</li>)
                      }
                    </ul>
                  </div>
                  
                  <div className="bg-background rounded p-3">
                    <div className="flex items-center mb-1">
                      <BarChart className="h-4 w-4 mr-1" />
                      <h4 className="text-sm font-medium">Short Term (30 Days)</h4>
                    </div>
                    <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                      {filterInsightsByCategory('engagement')
                        .filter(i => i.severityLevel === 'opportunity')
                        .slice(0, 1)
                        .flatMap(i => i.recommendedActions)
                        .slice(0, 2)
                        .map((action, i) => <li key={i}>{action}</li>)
                      }
                      {filterInsightsByCategory('conversion')
                        .slice(0, 1)
                        .flatMap(i => i.recommendedActions)
                        .slice(0, 1)
                        .map((action, i) => <li key={i}>{action}</li>)
                      }
                    </ul>
                  </div>
                  
                  <div className="bg-background rounded p-3">
                    <div className="flex items-center mb-1">
                      <Target className="h-4 w-4 mr-1" />
                      <h4 className="text-sm font-medium">Long Term (90 Days)</h4>
                    </div>
                    <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                      {filterInsightsByCategory('monetization')
                        .filter(i => i.severityLevel === 'opportunity')
                        .slice(0, 1)
                        .flatMap(i => i.recommendedActions)
                        .slice(0, 1)
                        .map((action, i) => <li key={i}>{action}</li>)
                      }
                      {assessment.insights
                        .filter(i => i.severityLevel === 'positive')
                        .slice(0, 1)
                        .flatMap(i => i.recommendedActions)
                        .slice(0, 1)
                        .map((action, i) => <li key={i}>{action}</li>)
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={generateAssessment} disabled={isGenerating}>
          <Brain className="h-4 w-4 mr-2" />
          Refresh Assessment
        </Button>
        {assessment && (
          <div className="text-xs text-muted-foreground">
            Generated: {assessment.timestamp.toLocaleString()}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default AssessmentPanel;
