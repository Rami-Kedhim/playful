
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Share2, Settings, MessageSquare, Activity, User } from 'lucide-react';

const PersonaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <span className="text-muted-foreground">|</span>
        <h4 className="text-sm font-medium">Persona Details</h4>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle>Persona #{id?.slice(0, 8) || '12345'}</CardTitle>
                <Badge variant="outline">AI Character</Badge>
              </div>
              <CardDescription>Created with UberCore AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-primary/10 w-32 h-32 rounded-full flex items-center justify-center">
                  <User className="h-16 w-16 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Emma Watson</h2>
                <div className="flex gap-2">
                  <Badge variant="secondary">Friendly</Badge>
                  <Badge variant="secondary">Intelligent</Badge>
                  <Badge variant="secondary">Creative</Badge>
                </div>
                <div className="w-full flex gap-2 mt-4">
                  <Button className="flex-1" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" /> Chat
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="profile">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Persona Profile</CardTitle>
                  <CardDescription>Comprehensive details about this persona</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Biography</h3>
                      <p className="text-muted-foreground mt-1">
                        This is an AI-generated persona that embodies specific personality traits
                        and interaction patterns. The character was designed to provide engaging
                        conversations and realistic responses in various scenarios.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Personality Traits</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Extroversion</span>
                          <span className="text-sm font-medium">75%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Creativity</span>
                          <span className="text-sm font-medium">88%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Analytical</span>
                          <span className="text-sm font-medium">62%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Empathy</span>
                          <span className="text-sm font-medium">91%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Response Patterns</h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Communication Style:</span> Warm and friendly
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Knowledge Areas:</span> Science, Arts, Literature
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Response Time:</span> Quick, spontaneous
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Statistics</CardTitle>
                  <CardDescription>Performance metrics for this persona</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">User Engagement</h4>
                        <p className="text-sm text-muted-foreground">Overall user satisfaction</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-green-500" />
                        <span className="font-bold text-xl">94%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Total Interactions</p>
                          <p className="text-2xl font-bold">2,487</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Active Users</p>
                          <p className="text-2xl font-bold">346</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Avg. Session Length</p>
                          <p className="text-2xl font-bold">12m 24s</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Response Rate</p>
                          <p className="text-2xl font-bold">99.8%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Persona Settings</CardTitle>
                  <CardDescription>Configure this persona's behavior and parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Settings className="h-4 w-4" />
                      Persona Configuration
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Advanced settings for persona configuration are available to administrators.
                      These settings control response patterns, knowledge base access, and
                      personality traits.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PersonaDetailPage;
