
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIProfile } from "@/types/ai-profile";
import { useAIModelGenerator } from "@/hooks/ai/useAIModelGenerator";
import { Badge } from "@/components/ui/badge";
import { User, Zap, Plus, Check, Loader2 } from "lucide-react";

const AIModelGenerationDashboard = () => {
  const [activeTab, setActiveTab] = useState("generate");
  const [modelCount, setModelCount] = useState(10);
  const [selectedPersonalities, setSelectedPersonalities] = useState<string[]>([
    "flirty", "playful", "dominant", "shy", "professional"
  ]);
  const [ageRange, setAgeRange] = useState<[number, number]>([21, 35]);
  const [targetRegions, setTargetRegions] = useState<string[]>([
    "United States", "United Kingdom", "Europe", "Asia", "Australia"
  ]);
  const [selectedModels, setSelectedModels] = useState<AIProfile[]>([]);
  
  const {
    generateModels,
    processModelsWithHermesOxum,
    generatedModels,
    processingStatus,
    isGenerating,
    isProcessing
  } = useAIModelGenerator();
  
  const handleGenerateModels = async () => {
    const models = await generateModels({
      count: modelCount,
      personalityTypes: selectedPersonalities as ('flirty' | 'shy' | 'dominant' | 'playful' | 'professional')[],
      ageRange: {
        min: ageRange[0],
        max: ageRange[1]
      },
      regions: targetRegions
    });
    
    setSelectedModels(models);
    if (models.length > 0) {
      setActiveTab("review");
    }
  };
  
  const handleProcessModels = async () => {
    if (selectedModels.length === 0) return;
    
    const success = await processModelsWithHermesOxum(selectedModels);
    if (success) {
      setActiveTab("processing");
    }
  };
  
  const handlePersonalityChange = (personality: string) => {
    setSelectedPersonalities(prev => 
      prev.includes(personality) 
        ? prev.filter(p => p !== personality)
        : [...prev, personality]
    );
  };
  
  const handleRegionChange = (region: string) => {
    setTargetRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Hermes+Oxum AI Model Generator</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="generate">1. Generate Models</TabsTrigger>
          <TabsTrigger value="review">2. Review & Deploy</TabsTrigger>
          <TabsTrigger value="processing">3. Processing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Model Generation Settings</CardTitle>
                <CardDescription>
                  Configure the AI models you want to generate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="model-count">Number of AI Models</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <Slider 
                        id="model-count"
                        min={1} 
                        max={100} 
                        step={1}
                        value={[modelCount]}
                        onValueChange={([value]) => setModelCount(value)}
                        className="flex-1"
                      />
                      <Input 
                        type="number" 
                        min={1}
                        max={100}
                        value={modelCount}
                        onChange={(e) => setModelCount(parseInt(e.target.value) || 10)}
                        className="w-20"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Age Range</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <Slider 
                        min={18} 
                        max={50} 
                        step={1}
                        value={ageRange}
                        onValueChange={(value) => setAgeRange([value[0], value[1]])}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-2">
                        <span>{ageRange[0]}</span>
                        <span>-</span>
                        <span>{ageRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="block mb-3">Personality Types</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["flirty", "shy", "dominant", "playful", "professional"].map((personality) => (
                      <div key={personality} className="flex items-center gap-2">
                        <Checkbox 
                          id={`personality-${personality}`}
                          checked={selectedPersonalities.includes(personality)}
                          onCheckedChange={() => handlePersonalityChange(personality)}
                        />
                        <Label htmlFor={`personality-${personality}`} className="capitalize">
                          {personality}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="block mb-3">Target Regions</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["United States", "United Kingdom", "Europe", "Asia", "Australia"].map((region) => (
                      <div key={region} className="flex items-center gap-2">
                        <Checkbox 
                          id={`region-${region}`}
                          checked={targetRegions.includes(region)}
                          onCheckedChange={() => handleRegionChange(region)}
                        />
                        <Label htmlFor={`region-${region}`}>
                          {region}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleGenerateModels} 
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Generate {modelCount} AI Models
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>
                  Configure advanced settings for Hermes+Oxum processing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="optimization-level">Optimization Level</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger id="optimization-level">
                      <SelectValue placeholder="Select optimization level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal - Faster Processing</SelectItem>
                      <SelectItem value="standard">Standard - Balanced</SelectItem>
                      <SelectItem value="aggressive">Aggressive - Better Results</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="content-generation">Content Generation</Label>
                  <Select defaultValue="basic">
                    <SelectTrigger id="content-generation">
                      <SelectValue placeholder="Select content level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Basic (3 photos)</SelectItem>
                      <SelectItem value="basic">Standard (10 photos, 2 videos)</SelectItem>
                      <SelectItem value="premium">Premium (20 photos, 5 videos)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="seo-optimization" checked={true} />
                  <Label htmlFor="seo-optimization">Enable SEO optimization</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="multi-language" />
                  <Label htmlFor="multi-language">Generate multi-language profiles</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="review">
          <Card>
            <CardHeader>
              <CardTitle>Review Generated Models</CardTitle>
              <CardDescription>
                Review and process the generated AI models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="font-medium mb-2">Generated Models ({generatedModels.length})</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Age</th>
                        <th className="p-2 text-left">Location</th>
                        <th className="p-2 text-left">Personality</th>
                        <th className="p-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generatedModels.slice(0, 5).map((model) => (
                        <tr key={model.id} className="border-t">
                          <td className="p-2">{model.name}</td>
                          <td className="p-2">{model.age}</td>
                          <td className="p-2">{model.location}</td>
                          <td className="p-2">
                            <Badge variant="outline" className="capitalize">
                              {model.personality.type}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <Badge className="bg-amber-500">Ready</Badge>
                          </td>
                        </tr>
                      ))}
                      {generatedModels.length > 5 && (
                        <tr className="border-t">
                          <td colSpan={5} className="p-2 text-center text-muted-foreground">
                            + {generatedModels.length - 5} more models
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button variant="outline" onClick={() => setActiveTab("generate")}>
                Back to Settings
              </Button>
              <Button 
                onClick={handleProcessModels}
                disabled={generatedModels.length === 0 || isProcessing}
                className="ml-auto"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Process with Hermes+Oxum
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="processing">
          <Card>
            <CardHeader>
              <CardTitle>Processing Models</CardTitle>
              <CardDescription>
                Hermes+Oxum is processing and deploying your AI models
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Processing Progress</span>
                  <span>
                    {processingStatus.completedCount} / {processingStatus.totalCount} models
                  </span>
                </div>
                <Progress 
                  value={(processingStatus.completedCount / processingStatus.totalCount) * 100} 
                  className="h-2"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Model Generation</p>
                    <p className="text-sm text-muted-foreground">
                      {processingStatus.totalCount} models generated
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {processingStatus.completedCount === processingStatus.totalCount ? (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-3">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-muted-foreground border-t-primary animate-spin mr-3" />
                  )}
                  <div>
                    <p className="font-medium">Content Generation</p>
                    <p className="text-sm text-muted-foreground">
                      {processingStatus.completedCount} of {processingStatus.totalCount} models processed
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {processingStatus.completedCount === processingStatus.totalCount ? (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-3">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-muted border-t-transparent mr-3" />
                  )}
                  <div>
                    <p className="font-medium">SEO Optimization</p>
                    <p className="text-sm text-muted-foreground">
                      {processingStatus.completedCount} of {processingStatus.totalCount} models optimized
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {processingStatus.completedCount === processingStatus.totalCount ? (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-3">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-muted border-t-transparent mr-3" />
                  )}
                  <div>
                    <p className="font-medium">Deployment</p>
                    <p className="text-sm text-muted-foreground">
                      {processingStatus.completedCount} of {processingStatus.totalCount} models deployed
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {processingStatus.completedCount === processingStatus.totalCount ? (
                <Button className="w-full">
                  <User className="mr-2 h-4 w-4" />
                  View Deployed Models
                </Button>
              ) : (
                <Button disabled className="w-full">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIModelGenerationDashboard;
