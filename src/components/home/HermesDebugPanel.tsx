
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActivitySquare, AlertCircle, BarChart3, Book, Brain, Check, Clock, Coffee, Eye, Heart, MessageSquare, Repeat, Shield, ShoppingCart } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface BehaviorTag {
  tag: string;
  description: string;
  risk: 'low' | 'medium' | 'high';
}

interface UserBehaviorData {
  id: string;
  userId: string;
  lastLogin: string;
  sessionCount: number;
  averageSessionDuration: number;
  behaviorTags: BehaviorTag[];
  interactionHistory: {
    messagesExchanged: number;
    voiceInteractions: number;
    contentViews: number;
    lastActiveAt: Date;
    totalSpent: number;
    conversionRate: number;
  };
  clickPatterns: {
    category: string;
    count: number;
  }[];
  trustScore: number;
  gouldianSettings: {
    hermesMode: string;
    oxumPriceMultiplier: number;
    toneFilter: string;
    responseDelayMs: number;
    trustScore: number;
  };
}

const mockUserBehaviorData: UserBehaviorData = {
  id: "user-behavior-001",
  userId: "user-123",
  lastLogin: "2 hours ago",
  sessionCount: 15,
  averageSessionDuration: 8.3,
  behaviorTags: [
    { tag: "content-focused", description: "User primarily engages with content", risk: "low" },
    { tag: "regular-spender", description: "User makes regular purchases", risk: "low" },
    { tag: "multi-account", description: "Potential multi-account detected", risk: "medium" }
  ],
  interactionHistory: {
    messagesExchanged: 152,
    voiceInteractions: 3,
    contentViews: 48,
    lastActiveAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    totalSpent: 175.50,
    conversionRate: 0.08
  },
  clickPatterns: [
    { category: "profile-views", count: 28 },
    { category: "content-previews", count: 42 },
    { category: "checkout-pages", count: 7 }
  ],
  trustScore: 78,
  gouldianSettings: {
    hermesMode: "emotional",
    oxumPriceMultiplier: 1.0,
    toneFilter: "authentic",
    responseDelayMs: 0,
    trustScore: 78
  }
};

const HermesDebugPanel: React.FC = () => {
  const [userData, setUserData] = useState<UserBehaviorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  
  useEffect(() => {
    const fetchUserData = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setUserData(mockUserBehaviorData);
      setLoading(false);
    };
    
    fetchUserData();
  }, []);
  
  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              <span>HERMES Debug Panel</span>
            </div>
          </CardTitle>
          <CardDescription>Loading behavioral data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-10">
            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  if (!userData) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              <span>HERMES Debug Panel</span>
            </div>
          </CardTitle>
          <CardDescription>Behavioral data unavailable</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p>Could not load user behavioral data. Please try again later.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                <span>HERMES Debug Panel</span>
              </div>
            </CardTitle>
            <CardDescription>Internal behavioral analysis system</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="advanced-settings"
              checked={showAdvancedSettings}
              onCheckedChange={setShowAdvancedSettings}
            />
            <label htmlFor="advanced-settings" className="text-sm">Advanced Settings</label>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="gould">Gould Filters</TabsTrigger>
            <TabsTrigger value="chase-hughes">Chase Hughes</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userData.trustScore}/100</div>
                  <Progress value={userData.trustScore} className="h-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Behavior Classification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {userData.behaviorTags.map((tag, i) => (
                      <Badge key={i} variant={
                        tag.risk === 'low' ? 'default' : 
                        tag.risk === 'medium' ? 'secondary' : 
                        'destructive'
                      }>
                        {tag.tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Interaction Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Messages</span>
                    </div>
                    <span className="text-xl font-bold">{userData.interactionHistory.messagesExchanged}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Coffee className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Voice Interactions</span>
                    </div>
                    <span className="text-xl font-bold">{userData.interactionHistory.voiceInteractions}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Content Views</span>
                    </div>
                    <span className="text-xl font-bold">{userData.interactionHistory.contentViews}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Total Spent</span>
                    </div>
                    <span className="text-xl font-bold">${userData.interactionHistory.totalSpent.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Repeat className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Conversion Rate</span>
                    </div>
                    <span className="text-xl font-bold">{(userData.interactionHistory.conversionRate * 100).toFixed(1)}%</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Session Duration</span>
                    </div>
                    <span className="text-xl font-bold">{userData.averageSessionDuration.toFixed(1)} min</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Click Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {userData.clickPatterns.map((pattern, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                      <span className="text-sm">{pattern.category}</span>
                      <Badge variant="outline">{pattern.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Gould Filters Tab */}
          <TabsContent value="gould" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Gouldian System Settings</CardTitle>
                <CardDescription>Current fraud prevention and protection settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Setting</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">HERMES Mode</TableCell>
                      <TableCell>
                        <Badge variant={userData.gouldianSettings.hermesMode === 'emotional' ? 'default' : 'outline'}>
                          {userData.gouldianSettings.hermesMode}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">Level of emotional engagement allowed</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">OXUM Price Multiplier</TableCell>
                      <TableCell>
                        {userData.gouldianSettings.oxumPriceMultiplier}x
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">Price adjustment factor based on risk</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tone Filter</TableCell>
                      <TableCell>
                        <Badge variant={userData.gouldianSettings.toneFilter === 'authentic' ? 'default' : 'outline'}>
                          {userData.gouldianSettings.toneFilter}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">Controls emotional expression in responses</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Response Delay</TableCell>
                      <TableCell>
                        {userData.gouldianSettings.responseDelayMs}ms
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">Artificial delay for suspicious accounts</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {showAdvancedSettings && (
              <Card className="border-dashed border-yellow-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-yellow-500" />
                    <CardTitle className="text-sm font-medium text-yellow-500">Advanced Gouldian Controls</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Force Protective Mode</div>
                        <div className="text-sm text-muted-foreground">Override emotional engagement limits</div>
                      </div>
                      <Button variant="outline" size="sm">Activate</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Reset Trust Score</div>
                        <div className="text-sm text-muted-foreground">Clear historical risk factors</div>
                      </div>
                      <Button variant="outline" size="sm">Reset</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Export Behavioral Data</div>
                        <div className="text-sm text-muted-foreground">Download complete HERMES analysis</div>
                      </div>
                      <Button variant="outline" size="sm">Export</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {/* Chase Hughes Tab */}
          <TabsContent value="chase-hughes" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Influence Analysis</CardTitle>
                <CardDescription>Chase Hughes Behavioral Analysis Framework</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium mb-1">Primary Influence Framework</div>
                    <div className="grid grid-cols-3 gap-2">
                      <Badge variant="outline" className="justify-center py-1">Reciprocity</Badge>
                      <Badge variant="secondary" className="justify-center py-1">Social Proof</Badge>
                      <Badge variant="outline" className="justify-center py-1">Authority</Badge>
                      <Badge variant="outline" className="justify-center py-1">Consistency</Badge>
                      <Badge variant="outline" className="justify-center py-1">Liking</Badge>
                      <Badge variant="primary" className="justify-center py-1">Scarcity</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium mb-1">Identified Micro-Expressions</div>
                    <div className="flex flex-wrap gap-1">
                      <Badge>Interest</Badge>
                      <Badge>Consideration</Badge>
                      <Badge variant="outline">Objection</Badge>
                      <Badge variant="outline">Conviction</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium mb-1">Behavioral Signals</div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Signal</TableHead>
                          <TableHead>Interpretation</TableHead>
                          <TableHead>Confidence</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Repeated content views</TableCell>
                          <TableCell className="text-sm">High interest in specific items</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>High</span>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Session abandonment patterns</TableCell>
                          <TableCell className="text-sm">Price sensitivity trigger</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>High</span>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Engagement with limited offers</TableCell>
                          <TableCell className="text-sm">Responds to scarcity framing</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <ActivitySquare className="h-4 w-4 text-amber-500" />
                              <span>Medium</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  {showAdvancedSettings && (
                    <>
                      <div className="font-medium mt-6 mb-1">Recommended Techniques</div>
                      <div className="grid grid-cols-1 gap-2">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Scarcity Framing</div>
                                <div className="text-sm text-muted-foreground">Emphasize limited availability and time constraints</div>
                              </div>
                              <Button size="sm">Apply</Button>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Social Proof Amplification</div>
                                <div className="text-sm text-muted-foreground">Highlight popularity metrics and testimonials</div>
                              </div>
                              <Button size="sm">Apply</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">HERMES System Settings</CardTitle>
                <CardDescription>Configure behavioral analysis system parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="activate-hermes" defaultChecked />
                      <label htmlFor="activate-hermes" className="text-sm font-medium">
                        Active Behavioral Analysis
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-adjust" defaultChecked />
                      <label htmlFor="auto-adjust" className="text-sm font-medium">
                        Automatic Parameter Adjustment
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label htmlFor="trust-threshold" className="text-sm font-medium">
                        Trust Threshold
                      </label>
                      <span className="text-sm">60%</span>
                    </div>
                    <input
                      id="trust-threshold"
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="60"
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum trust score for standard engagement
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label htmlFor="sensitivity" className="text-sm font-medium">
                        Detection Sensitivity
                      </label>
                      <span className="text-sm">70%</span>
                    </div>
                    <input
                      id="sensitivity"
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="70"
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Sensitivity of fraud and abuse detection
                    </p>
                  </div>
                  
                  <Button variant="outline">Reset to Defaults</Button>
                </div>
              </CardContent>
            </Card>
            
            {showAdvancedSettings && (
              <Card className="border-dashed border-yellow-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-yellow-500" />
                    <CardTitle className="text-sm font-medium text-yellow-500">Behavioral Logging Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="detailed-logging" />
                        <label htmlFor="detailed-logging" className="text-sm font-medium">
                          Enable Detailed Behavioral Logging
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="transaction-logging" />
                        <label htmlFor="transaction-logging" className="text-sm font-medium">
                          Log Transaction Patterns
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="emotional-logging" />
                        <label htmlFor="emotional-logging" className="text-sm font-medium">
                          Track Emotional Response Patterns
                        </label>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">Apply Log Settings</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HermesDebugPanel;
