
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  AlertCircle,
  ArrowRight,
  Brain,
  CheckCircle2,
  Lightbulb,
  RefreshCw,
  Settings,
  Sparkles,
  ThumbsUp,
  Zap
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const recommendations = [
  {
    id: 'rec-001',
    title: 'Optimize memory allocation',
    description: 'Increase cache size to improve response times during peak hours',
    impact: 'high',
    category: 'performance',
    difficulty: 'medium',
    estimatedImprovement: '23%',
    implemented: false,
    tags: ['memory', 'optimization', 'cache']
  },
  {
    id: 'rec-002',
    title: 'Adjust neural retrain frequency',
    description: 'Schedule model retraining during off-peak hours to prevent performance degradation',
    impact: 'medium',
    category: 'training',
    difficulty: 'low',
    estimatedImprovement: '15%',
    implemented: true,
    tags: ['training', 'scheduling']
  },
  {
    id: 'rec-003',
    title: 'Implement adaptive error handling',
    description: 'Add contextual error recovery mechanisms to reduce manual intervention needs',
    impact: 'high',
    category: 'reliability',
    difficulty: 'high',
    estimatedImprovement: '35%',
    implemented: false,
    tags: ['error-handling', 'automation']
  },
  {
    id: 'rec-004',
    title: 'Update response time objectives',
    description: 'Adjust SLAs based on current system capabilities and user expectations',
    impact: 'low',
    category: 'operations',
    difficulty: 'low',
    estimatedImprovement: '8%',
    implemented: false,
    tags: ['sla', 'metrics']
  },
  {
    id: 'rec-005',
    title: 'Load balance neural operations',
    description: 'Distribute processing more evenly across available nodes',
    impact: 'medium',
    category: 'performance',
    difficulty: 'medium',
    estimatedImprovement: '18%',
    implemented: false,
    tags: ['load-balancing', 'distribution']
  }
];

const NeuralRecommendations: React.FC = () => {
  const [filteredRecommendations, setFilteredRecommendations] = useState(recommendations);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showImplemented, setShowImplemented] = useState(true);
  
  // Filter recommendations by category
  const filterByCategory = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'all') {
      setFilteredRecommendations(
        showImplemented 
          ? recommendations 
          : recommendations.filter(rec => !rec.implemented)
      );
    } else {
      setFilteredRecommendations(
        recommendations.filter(rec => 
          rec.category === category && (showImplemented || !rec.implemented)
        )
      );
    }
  };
  
  // Toggle showing implemented recommendations
  const toggleShowImplemented = (value: boolean) => {
    setShowImplemented(value);
    
    if (activeCategory === 'all') {
      setFilteredRecommendations(
        value ? recommendations : recommendations.filter(rec => !rec.implemented)
      );
    } else {
      setFilteredRecommendations(
        recommendations.filter(rec => 
          rec.category === activeCategory && (value || !rec.implemented)
        )
      );
    }
  };
  
  // Generate new recommendations
  const generateRecommendations = () => {
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      filterByCategory(activeCategory);
      
      toast({
        title: "Recommendations updated",
        description: "New neural system recommendations have been generated based on current system state.",
      });
    }, 1500);
  };
  
  // Handle implementing a recommendation
  const implementRecommendation = (id: string) => {
    // In a real application, this would call an API to implement the recommendation
    toast({
      title: "Implementation in progress",
      description: "The system is applying the recommended changes.",
    });
    
    // Update the local state to mark as implemented
    const updatedRecs = recommendations.map(rec => 
      rec.id === id ? { ...rec, implemented: true } : rec
    );
    
    // Update state
    setTimeout(() => {
      // In a real app, this would be set after the API confirms successful implementation
      setFilteredRecommendations(
        filteredRecommendations.map(rec => 
          rec.id === id ? { ...rec, implemented: true } : rec
        )
      );
      
      toast({
        title: "Implementation successful",
        description: "The recommendation has been successfully applied.",
        variant: "default",
      });
    }, 2000);
  };
  
  // Get impact color class
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };
  
  // Get difficulty color class
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'low':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-primary/10">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Neural System Recommendations</CardTitle>
                <CardDescription>AI-powered suggestions to optimize system performance</CardDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-implemented"
                  checked={showImplemented}
                  onCheckedChange={toggleShowImplemented}
                />
                <Label htmlFor="show-implemented">Show implemented</Label>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={generateRecommendations}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              size="sm" 
              variant={activeCategory === 'all' ? "default" : "outline"}
              onClick={() => filterByCategory('all')}
            >
              All
            </Button>
            <Button 
              size="sm" 
              variant={activeCategory === 'performance' ? "default" : "outline"}
              onClick={() => filterByCategory('performance')}
            >
              Performance
            </Button>
            <Button 
              size="sm" 
              variant={activeCategory === 'reliability' ? "default" : "outline"}
              onClick={() => filterByCategory('reliability')}
            >
              Reliability
            </Button>
            <Button 
              size="sm" 
              variant={activeCategory === 'training' ? "default" : "outline"}
              onClick={() => filterByCategory('training')}
            >
              Training
            </Button>
            <Button 
              size="sm" 
              variant={activeCategory === 'operations' ? "default" : "outline"}
              onClick={() => filterByCategory('operations')}
            >
              Operations
            </Button>
          </div>
          
          <div className="space-y-4">
            {filteredRecommendations.length > 0 ? (
              filteredRecommendations.map((recommendation) => (
                <Card key={recommendation.id} className={`border ${recommendation.implemented ? 'border-green-200 bg-green-50/20 dark:bg-green-950/10 dark:border-green-900/30' : ''}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {recommendation.implemented && (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                        <CardTitle className={`text-lg ${recommendation.implemented ? 'text-green-800 dark:text-green-400' : ''}`}>
                          {recommendation.title}
                        </CardTitle>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Badge className={getImpactColor(recommendation.impact)}>
                          Impact: {recommendation.impact}
                        </Badge>
                        <Badge className={getDifficultyColor(recommendation.difficulty)}>
                          Difficulty: {recommendation.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>{recommendation.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Estimated improvement</span>
                          <span className="font-medium text-green-600 dark:text-green-400">
                            {recommendation.estimatedImprovement}
                          </span>
                        </div>
                        <Progress 
                          className="h-2 mt-1" 
                          value={parseInt(recommendation.estimatedImprovement)} 
                        />
                      </div>
                      
                      <div className="flex flex-wrap gap-1 pt-1">
                        {recommendation.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${recommendation.implemented ? 'opacity-50 cursor-not-allowed' : ''}`}
                      size="sm"
                      onClick={() => !recommendation.implemented && implementRecommendation(recommendation.id)}
                      disabled={recommendation.implemented}
                    >
                      {recommendation.implemented ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Implemented
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Implement
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card className="border-dashed border-2">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg">No recommendations found</h3>
                  <p className="text-muted-foreground mb-4">
                    There are no recommendations available for the selected filters.
                  </p>
                  <Button onClick={() => filterByCategory('all')}>
                    Show all recommendations
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/50 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="h-4 w-4" />
            <span>Recommendations powered by Neural System Optimization Engine</span>
          </div>
          <Button variant="link" className="p-0 h-auto flex items-center" size="sm">
            <span>Advanced options</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">System Improvement Potential</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42%</div>
            <p className="text-sm text-muted-foreground mb-2">Overall system improvement potential</p>
            <Progress value={42} className="h-1 mb-2" />
            <div className="text-xs text-muted-foreground">Based on current recommendations</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Implementation Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1/5</div>
            <p className="text-sm text-muted-foreground mb-2">Recommendations implemented</p>
            <Progress value={20} className="h-1 mb-2" />
            <div className="text-xs text-muted-foreground">20% complete</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Priority Focus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Performance</div>
            <p className="text-sm text-muted-foreground mb-2">Current recommended focus area</p>
            <div className="flex items-center mt-2">
              <ThumbsUp className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-xs text-muted-foreground">Based on system analysis</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>Urgent Attention Required</span>
            </CardTitle>
            <Badge variant="destructive">High Priority</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            The system has identified the following issues that require immediate attention:
          </p>
          
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
              <span>Memory usage surges during peak hours affecting response times</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
              <span>Error handling mechanisms failing to recover from specific edge cases</span>
            </li>
          </ul>
          
          <p className="text-sm text-muted-foreground mb-4">
            Implementing the "Optimize memory allocation" and "Implement adaptive error handling" recommendations 
            will address these issues and significantly improve system stability.
          </p>
          
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NeuralRecommendations;
