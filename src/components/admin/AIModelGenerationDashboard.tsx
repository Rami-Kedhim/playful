
import React, { useState } from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useForm } from 'react-hook-form';
import { 
  Brain, 
  Sparkles, 
  Loader2, 
  UserPlus, 
  BarChart, 
  Check,
  ChevronRight 
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAIModelGenerator } from '@/hooks/ai/useAIModelGenerator';
import { AIProfile, ProcessingStatus } from '@/types/ai-profile';

const AIModelGenerationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("generate");
  const form = useForm({
    defaultValues: {
      count: 5,
      personalities: "mixed",
      ageMin: 21,
      ageMax: 45,
      regions: "global",
    },
  });

  // Extract the correct hook properties with proper typing
  const {
    generateModels,
    processModelsWithHermesOxum,
    generatedModels,
    processingStatus,
    isGenerating,
    isProcessing
  } = useAIModelGenerator();

  const [personalityRange, setPersonalityRange] = useState<[number, number]>([30, 70]);

  const handleGenerate = async (formData: any) => {
    // Use the options parameter from the form data
    await generateModels({
      count: formData.count,
      personalityTypes: formData.personalities === 'mixed' ? undefined : [formData.personalities],
      ageRange: {
        min: formData.ageMin,
        max: formData.ageMax
      },
      regions: formData.regions === 'global' ? undefined : [formData.regions]
    });
  };

  const renderProcessingStatus = () => {
    if (!processingStatus) return null;
    
    return (
      <div className="mt-4 bg-secondary/30 p-4 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold flex items-center">
            <Loader2 className={`h-4 w-4 mr-2 ${isProcessing ? 'animate-spin' : ''}`} />
            Processing Status
          </h4>
          <Badge variant={processingStatus.status === 'completed' ? 'success' : 'outline'}>
            {processingStatus.status === 'completed' ? 'Complete' : 'In Progress'}
          </Badge>
        </div>
        <div className="w-full bg-background rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${(processingStatus.completedCount / processingStatus.totalCount) * 100}%` }}
          ></div>
        </div>
        <div className="text-xs text-muted-foreground mt-2 flex justify-between">
          <span>
            {processingStatus.completedCount} of {processingStatus.totalCount} models processed
          </span>
          {processingStatus.status === 'processing' && (
            <span className="text-primary animate-pulse">{processingStatus.message}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">AI Model Generation Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Create and process AI personality models with Hermes and Oxum neural engines.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="process">Process & Deploy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generate" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-primary" />
                    Generate AI Models
                  </CardTitle>
                  <CardDescription>
                    Configure and generate AI personality models with diverse traits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleGenerate)} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="count"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Models</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min={1} 
                                  max={50} 
                                  {...field} 
                                  onChange={e => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="personalities"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Personality Types</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select personality type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="mixed">Mixed Variety</SelectItem>
                                  <SelectItem value="friendly">Friendly</SelectItem>
                                  <SelectItem value="flirty">Flirty</SelectItem>
                                  <SelectItem value="dominant">Dominant</SelectItem>
                                  <SelectItem value="submissive">Submissive</SelectItem>
                                  <SelectItem value="adventurous">Adventurous</SelectItem>
                                  <SelectItem value="intellectual">Intellectual</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        name="personalityBalance"
                        render={() => (
                          <FormItem>
                            <FormLabel>
                              Reserved vs. Outgoing Balance
                            </FormLabel>
                            <FormControl>
                              <div className="pt-4">
                                <Slider
                                  defaultValue={[30, 70]}
                                  max={100}
                                  step={1}
                                  value={personalityRange}
                                  onValueChange={(values) => {
                                    if (Array.isArray(values) && values.length === 2) {
                                      setPersonalityRange([values[0], values[1]]);
                                    }
                                  }}
                                />
                                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                                  <span>Reserved ({personalityRange[0]}%)</span>
                                  <span>Outgoing ({100 - personalityRange[1]}%)</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="ageMin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimum Age</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min={18} 
                                  max={50} 
                                  {...field} 
                                  onChange={e => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="ageMax"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum Age</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min={18} 
                                  max={80} 
                                  {...field} 
                                  onChange={e => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="regions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Regions</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select regions" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="global">Global Mix</SelectItem>
                                <SelectItem value="north_america">North America</SelectItem>
                                <SelectItem value="europe">Europe</SelectItem>
                                <SelectItem value="asia">Asia</SelectItem>
                                <SelectItem value="latin_america">Latin America</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-4 w-4 mr-2" />
                              Generate AI Models
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="process" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-primary" />
                    Process with Hermes + Oxum
                  </CardTitle>
                  <CardDescription>
                    Process generated models through neural enhancement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Generated Models</h4>
                        <p className="text-sm text-muted-foreground">
                          {generatedModels.length} models ready for processing
                        </p>
                      </div>
                      <Badge variant="outline">
                        {generatedModels.length} Ready
                      </Badge>
                    </div>
                    
                    <Button 
                      onClick={() => processModelsWithHermesOxum()} 
                      disabled={isProcessing || generatedModels.length === 0}
                      className="w-full"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing with Neural Engines...
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4 mr-2" />
                          Process with Hermes + Oxum
                        </>
                      )}
                    </Button>
                    
                    {renderProcessingStatus()}
                    
                    {generatedModels.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Generated Models Preview</h4>
                        <div className="bg-muted/50 rounded-md p-2">
                          <div className="text-xs text-muted-foreground mb-2">
                            First 3 of {generatedModels.length} models shown
                          </div>
                          {generatedModels.slice(0, 3).map((model) => (
                            <div 
                              key={model.id}
                              className="flex items-center gap-2 p-2 bg-background rounded-md mb-2"
                            >
                              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                {model.name[0]}
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <p className="font-medium truncate">{model.name}</p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {model.age} • {model.country || model.location}
                                </p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-primary" />
              Neural API Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Hermes Engine Status</h4>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Operational</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Oxum Neural Status</h4>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Operational</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">API Quota Remaining</h4>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div className="bg-primary h-2 rounded-full w-[75%]"></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  150,000 / 200,000 tokens
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
                <ScrollArea className="h-[120px]">
                  <ul className="space-y-2">
                    <li className="text-xs flex items-start gap-2">
                      <Check className="h-3 w-3 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-muted-foreground">10 models processed successfully</p>
                        <p className="text-xs text-muted-foreground">10 minutes ago</p>
                      </div>
                    </li>
                    <li className="text-xs flex items-start gap-2">
                      <Check className="h-3 w-3 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-muted-foreground">Neural weight optimization completed</p>
                        <p className="text-xs text-muted-foreground">25 minutes ago</p>
                      </div>
                    </li>
                    <li className="text-xs flex items-start gap-2">
                      <Check className="h-3 w-3 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-muted-foreground">Oxum metadata federation completed</p>
                        <p className="text-xs text-muted-foreground">42 minutes ago</p>
                      </div>
                    </li>
                  </ul>
                </ScrollArea>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIModelGenerationDashboard;
