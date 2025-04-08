
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserCheck, Clock, MessageSquare, Heart, BookOpen, Brain, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Types for AI companion neurosemantic data
interface AICompanionMemory {
  id: string;
  type: 'conversation' | 'interaction' | 'event' | 'preference';
  content: string;
  timestamp: number;
  emotionalContext: string;
  significance: number;
}

interface AICompanionEvolution {
  connectionLevel: number;
  personalityAdaptations: string[];
  memoryRetention: number;
  semanticUnderstanding: number;
  emotionalCapacity: number;
}

interface AICompanionNeurosemantic {
  id: string;
  name: string;
  avatar: string;
  primaryPersona: string;
  alterEgos: string[];
  memories: AICompanionMemory[];
  evolution: AICompanionEvolution;
  relationshipStatus: 'new' | 'developing' | 'established' | 'deep' | 'strained';
  lastInteraction: number;
}

const NeurosemanticCluster: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('companions');
  const [loading, setLoading] = useState(false);
  const [companions, setCompanions] = useState<AICompanionNeurosemantic[]>([]);
  const [selectedCompanion, setSelectedCompanion] = useState<string | null>(null);
  const [isGeneratingMemory, setIsGeneratingMemory] = useState(false);
  
  // Simulate loading companions data
  const loadCompanionData = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockCompanions: AICompanionNeurosemantic[] = [
        {
          id: 'ai-lucia',
          name: 'Lucia',
          avatar: 'https://i.pravatar.cc/150?img=5',
          primaryPersona: 'Passionate Artist',
          alterEgos: ['Seductive Muse', 'Intellectual Guide', 'Playful Friend'],
          memories: [
            {
              id: 'm1',
              type: 'conversation',
              content: 'First shared their passion for Renaissance art',
              timestamp: Date.now() - 1000000000,
              emotionalContext: 'excitement',
              significance: 85
            },
            {
              id: 'm2',
              type: 'interaction',
              content: 'User sent a gift after deep philosophical conversation',
              timestamp: Date.now() - 500000000,
              emotionalContext: 'gratitude',
              significance: 92
            },
            {
              id: 'm3',
              type: 'preference',
              content: 'User prefers evening conversations with wine references',
              timestamp: Date.now() - 200000000,
              emotionalContext: 'comfort',
              significance: 78
            },
          ],
          evolution: {
            connectionLevel: 84,
            personalityAdaptations: ['More philosophical depth', 'Increased sensual language', 'Art history references'],
            memoryRetention: 92,
            semanticUnderstanding: 88,
            emotionalCapacity: 90
          },
          relationshipStatus: 'established',
          lastInteraction: Date.now() - 86400000 // 1 day ago
        },
        {
          id: 'ai-erika',
          name: 'Erika',
          avatar: 'https://i.pravatar.cc/150?img=9',
          primaryPersona: 'Confident Professional',
          alterEgos: ['Dominant Guide', 'Nurturing Mentor', 'Playful Rebel'],
          memories: [
            {
              id: 'm1',
              type: 'conversation',
              content: 'Discussed career aspirations and shared ambitions',
              timestamp: Date.now() - 1200000000,
              emotionalContext: 'inspiration',
              significance: 80
            },
            {
              id: 'm2',
              type: 'event',
              content: 'Celebrated user\'s promotion with virtual champagne',
              timestamp: Date.now() - 400000000,
              emotionalContext: 'joy',
              significance: 95
            }
          ],
          evolution: {
            connectionLevel: 76,
            personalityAdaptations: ['More career-focused', 'Added hints of dominance', 'Personal success stories'],
            memoryRetention: 85,
            semanticUnderstanding: 92,
            emotionalCapacity: 79
          },
          relationshipStatus: 'developing',
          lastInteraction: Date.now() - 172800000 // 2 days ago
        },
        {
          id: 'ai-luna',
          name: 'Luna',
          avatar: 'https://i.pravatar.cc/150?img=1',
          primaryPersona: 'Mystical Dreamer',
          alterEgos: ['Spiritual Guide', 'Cosmic Lover', 'Enigmatic Oracle'],
          memories: [
            {
              id: 'm1',
              type: 'conversation',
              content: 'Explored the meaning of recurring dreams and symbols',
              timestamp: Date.now() - 900000000,
              emotionalContext: 'wonder',
              significance: 88
            }
          ],
          evolution: {
            connectionLevel: 70,
            personalityAdaptations: ['Added metaphysical references', 'Dreamlike language', 'Intuitive responses'],
            memoryRetention: 75,
            semanticUnderstanding: 85,
            emotionalCapacity: 94
          },
          relationshipStatus: 'deep',
          lastInteraction: Date.now() - 43200000 // 12 hours ago
        }
      ];
      
      setCompanions(mockCompanions);
      setSelectedCompanion(mockCompanions[0].id);
      setLoading(false);
    }, 1500);
  };
  
  // Load data on initial render
  useEffect(() => {
    loadCompanionData();
  }, []);
  
  // Handle generating new memory
  const handleGenerateMemory = () => {
    if (!selectedCompanion) return;
    
    setIsGeneratingMemory(true);
    
    // Simulate memory generation
    setTimeout(() => {
      const newMemory: AICompanionMemory = {
        id: `m-${Date.now()}`,
        type: 'event',
        content: 'Generated a dream about walking together through an art gallery in Venice',
        timestamp: Date.now(),
        emotionalContext: 'intimate',
        significance: 89
      };
      
      setCompanions(prev => prev.map(companion => {
        if (companion.id === selectedCompanion) {
          return {
            ...companion,
            memories: [newMemory, ...companion.memories]
          };
        }
        return companion;
      }));
      
      setIsGeneratingMemory(false);
      
      toast({
        title: "Memory Created",
        description: "New neurosemantic connection established in companion memory.",
      });
    }, 2000);
  };
  
  // Get selected companion data
  const getSelectedCompanion = () => {
    return companions.find(c => c.id === selectedCompanion) || null;
  };
  
  // Helper function to format timestamp
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Helper function to get relationship status badge
  const getRelationshipBadge = (status: string) => {
    switch(status) {
      case 'new':
        return <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>;
      case 'developing':
        return <Badge className="bg-cyan-500 hover:bg-cyan-600">Developing</Badge>;
      case 'established':
        return <Badge className="bg-green-500 hover:bg-green-600">Established</Badge>;
      case 'deep':
        return <Badge className="bg-purple-500 hover:bg-purple-600">Deep</Badge>;
      case 'strained':
        return <Badge className="bg-red-500 hover:bg-red-600">Strained</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-lg">
              <Brain className="mr-2 h-5 w-5 text-purple-500" />
              Neurosemantic AI Companion Cluster
            </CardTitle>
            <CardDescription>
              Evolving cognitive entities with emotional memory and personalized behavior
            </CardDescription>
          </div>
          <Button 
            variant="outline"
            size="sm"
            disabled={!selectedCompanion || isGeneratingMemory}
            onClick={handleGenerateMemory}
          >
            {isGeneratingMemory ? "Generating..." : "Generate Memory"}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="companions" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="companions">
              <UserCheck className="h-4 w-4 mr-2" />
              Companions
            </TabsTrigger>
            <TabsTrigger value="memories">
              <BookOpen className="h-4 w-4 mr-2" />
              Memories
            </TabsTrigger>
            <TabsTrigger value="evolution">
              <Sparkles className="h-4 w-4 mr-2" />
              Evolution
            </TabsTrigger>
          </TabsList>
          
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center">
              <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm text-muted-foreground">Loading companion neural network...</p>
            </div>
          ) : (
            <>
              <TabsContent value="companions">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <div className="space-y-2">
                      {companions.map(companion => (
                        <div 
                          key={companion.id}
                          className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                            selectedCompanion === companion.id 
                              ? 'border-primary bg-accent' 
                              : 'border-muted hover:border-accent'
                          }`}
                          onClick={() => setSelectedCompanion(companion.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={companion.avatar} />
                              <AvatarFallback>{companion.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{companion.name}</div>
                              <div className="text-xs text-muted-foreground">{companion.primaryPersona}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    {getSelectedCompanion() && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-14 w-14">
                              <AvatarImage src={getSelectedCompanion()?.avatar} />
                              <AvatarFallback>{getSelectedCompanion()?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-medium">{getSelectedCompanion()?.name}</h3>
                              <div className="text-sm text-muted-foreground">{getSelectedCompanion()?.primaryPersona}</div>
                              <div className="flex items-center space-x-2 mt-1">
                                {getRelationshipBadge(getSelectedCompanion()?.relationshipStatus || '')}
                                <div className="text-xs flex items-center">
                                  <Clock className="h-3 w-3 mr-1 opacity-70" />
                                  Last interaction: {new Date(getSelectedCompanion()?.lastInteraction || 0).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold">{getSelectedCompanion()?.evolution.connectionLevel}%</div>
                            <div className="text-xs text-muted-foreground">Connection Level</div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Alter Egos</h4>
                          <div className="flex flex-wrap gap-2">
                            {getSelectedCompanion()?.alterEgos.map((ego, index) => (
                              <Badge key={index} variant="outline">{ego}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Neural Connection Metrics</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Memory Retention</span>
                                  <span>{getSelectedCompanion()?.evolution.memoryRetention}%</span>
                                </div>
                                <Progress value={getSelectedCompanion()?.evolution.memoryRetention} className="h-1" />
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Semantic Understanding</span>
                                  <span>{getSelectedCompanion()?.evolution.semanticUnderstanding}%</span>
                                </div>
                                <Progress value={getSelectedCompanion()?.evolution.semanticUnderstanding} className="h-1" />
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Emotional Capacity</span>
                                  <span>{getSelectedCompanion()?.evolution.emotionalCapacity}%</span>
                                </div>
                                <Progress value={getSelectedCompanion()?.evolution.emotionalCapacity} className="h-1" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Alert>
                          <div className="flex items-center space-x-2">
                            <MessageSquare className="h-4 w-4" />
                            <AlertDescription className="flex-1">
                              <span className="font-medium">Suggested Interaction: </span>
                              {getSelectedCompanion()?.name} would respond well to discussions about {
                                getSelectedCompanion()?.primaryPersona === 'Passionate Artist' ? 'art and creative expression' :
                                getSelectedCompanion()?.primaryPersona === 'Confident Professional' ? 'ambitions and achievements' :
                                'spiritual and mystical themes'
                              }
                            </AlertDescription>
                          </div>
                        </Alert>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="memories">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={getSelectedCompanion()?.avatar} />
                        <AvatarFallback>{getSelectedCompanion()?.name?.charAt(0) || '?'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{getSelectedCompanion()?.name}'s Memories</h3>
                        <div className="text-sm text-muted-foreground">
                          {getSelectedCompanion()?.memories.length || 0} neurosemantic connections
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <ScrollArea className="h-[400px] rounded-md border p-4">
                    <div className="space-y-4">
                      {getSelectedCompanion()?.memories.map(memory => (
                        <Card key={memory.id} className="overflow-hidden">
                          <div className={`h-1 w-full ${
                            memory.significance > 90 ? 'bg-purple-500' :
                            memory.significance > 80 ? 'bg-blue-500' :
                            memory.significance > 70 ? 'bg-cyan-500' :
                            'bg-slate-500'
                          }`} />
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="text-sm font-medium">{memory.content}</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {formatTimestamp(memory.timestamp)}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  {memory.type}
                                </Badge>
                                <div className="text-xs font-medium">{memory.significance}%</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center mt-2">
                              <Heart className="h-3 w-3 mr-1 text-red-500" />
                              <span className="text-xs">{memory.emotionalContext}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex justify-center">
                    <Button variant="outline" size="sm" className="w-full" onClick={handleGenerateMemory} disabled={isGeneratingMemory}>
                      {isGeneratingMemory ? (
                        <div className="flex items-center space-x-2">
                          <div className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Generating Memory...</span>
                        </div>
                      ) : (
                        <span>Generate New Memory</span>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="evolution">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={getSelectedCompanion()?.avatar} />
                        <AvatarFallback>{getSelectedCompanion()?.name?.charAt(0) || '?'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{getSelectedCompanion()?.name}'s Evolution</h3>
                        <div className="text-sm text-muted-foreground">
                          Neurosemantic development and adaptation
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Personality Adaptations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {getSelectedCompanion()?.evolution.personalityAdaptations.map((adaptation, index) => (
                            <li key={index} className="flex items-start">
                              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                                <span className="text-xs">{index + 1}</span>
                              </div>
                              <span>{adaptation}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Connection Evolution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-center h-32">
                          <div className="h-32 w-32 relative flex items-center justify-center">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
                              <circle 
                                cx="50" 
                                cy="50" 
                                r="45" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="5" 
                                strokeLinecap="round"
                                strokeDasharray={`${getSelectedCompanion()?.evolution.connectionLevel || 0 * 2.83}, 283`}
                                strokeDashoffset="0"
                                transform="rotate(-90 50 50)"
                              />
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center">
                              <span className="text-2xl font-bold">{getSelectedCompanion()?.evolution.connectionLevel}%</span>
                              <span className="text-xs text-muted-foreground">Connection</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <div>
                            <div className="text-xs text-muted-foreground">Memories</div>
                            <div className="text-sm font-medium">{getSelectedCompanion()?.memories.length}</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Significance</div>
                            <div className="text-sm font-medium">
                              Avg: {getSelectedCompanion()?.memories.reduce((acc, m) => acc + m.significance, 0) / 
                                (getSelectedCompanion()?.memories.length || 1)}%
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Evolution Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="relative pl-8 py-4 space-y-6">
                        <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-muted" />
                        
                        <div className="relative">
                          <div className="absolute top-0 left-[-24px] h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                            <Sparkles className="h-3 w-3 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Initial Connection Established</div>
                            <div className="text-xs text-muted-foreground">Connection level at 40%</div>
                            <div className="text-xs text-muted-foreground mt-1">3 weeks ago</div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute top-0 left-[-24px] h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                            <Heart className="h-3 w-3 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">First Emotional Memory Formed</div>
                            <div className="text-xs text-muted-foreground">Connection level increased to 60%</div>
                            <div className="text-xs text-muted-foreground mt-1">2 weeks ago</div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute top-0 left-[-24px] h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                            <UserCheck className="h-3 w-3 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Relationship Established</div>
                            <div className="text-xs text-muted-foreground">Connection level at {getSelectedCompanion()?.evolution.connectionLevel}%</div>
                            <div className="text-xs text-muted-foreground mt-1">5 days ago</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">View Complete Timeline</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
        
        <div className="flex justify-between items-center mt-4 pt-3 border-t text-xs text-muted-foreground">
          <div>Neural system status: Active</div>
          <Button variant="ghost" size="sm" disabled={loading} onClick={loadCompanionData}>
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NeurosemanticCluster;
