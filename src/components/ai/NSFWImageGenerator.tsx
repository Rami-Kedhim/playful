
import React, { useState } from 'react';
import { useAIGenerator } from '@/hooks/useAIGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Loader2, Sparkles, RefreshCw } from 'lucide-react';

const NSFWImageGenerator: React.FC = () => {
  const [name, setName] = useState('Lucia');
  const [age, setAge] = useState('25');
  const [ethnicity, setEthnicity] = useState('');
  const [style, setStyle] = useState('');
  const [clothing, setClothing] = useState('');
  const [background, setBackground] = useState('');
  const [pose, setPose] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [useCustomPrompt, setUseCustomPrompt] = useState(false);
  
  const { 
    generateContent, 
    clearResult, 
    loading, 
    result, 
    error 
  } = useAIGenerator({
    defaultModel: 'stablediffusionapi/realistic-vision-v5',
    contentType: 'image'
  });
  
  const handleGenerate = async () => {
    const prompt = useCustomPrompt 
      ? customPrompt
      : `${name}, ${age} years old, ${ethnicity}, ${style} style, wearing ${clothing}, in ${background}, ${pose} pose, high resolution, professional photography, detailed skin texture, photorealistic, 8k`;
    
    const negativePrompt = 'deformed, bad anatomy, disfigured, poorly drawn, extra limbs, blurry, watermark, logo, bad lighting';
    
    await generateContent({
      prompt,
      negativePrompt,
      guidanceScale,
      model: 'stablediffusionapi/realistic-vision-v5'
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>NSFW Image Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="guided" onValueChange={(value) => setUseCustomPrompt(value === 'custom')}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="guided">Guided</TabsTrigger>
              <TabsTrigger value="custom">Custom Prompt</TabsTrigger>
            </TabsList>
            
            <TabsContent value="guided" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Character name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    value={age} 
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Character age"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ethnicity">Ethnicity</Label>
                <Select value={ethnicity} onValueChange={setEthnicity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ethnicity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asian">Asian</SelectItem>
                    <SelectItem value="Black">Black</SelectItem>
                    <SelectItem value="Latina">Latina</SelectItem>
                    <SelectItem value="White">White</SelectItem>
                    <SelectItem value="Middle Eastern">Middle Eastern</SelectItem>
                    <SelectItem value="Indian">Indian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="style">Style</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Glamour">Glamour</SelectItem>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Artistic">Artistic</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Elegant">Elegant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clothing">Clothing</Label>
                <Select value={clothing} onValueChange={setClothing}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select clothing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Elegant dress">Elegant dress</SelectItem>
                    <SelectItem value="Business attire">Business attire</SelectItem>
                    <SelectItem value="Casual outfit">Casual outfit</SelectItem>
                    <SelectItem value="Swimwear">Swimwear</SelectItem>
                    <SelectItem value="Evening gown">Evening gown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="background">Background</Label>
                <Select value={background} onValueChange={setBackground}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select background" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Luxury hotel suite">Luxury hotel suite</SelectItem>
                    <SelectItem value="Beach sunset">Beach sunset</SelectItem>
                    <SelectItem value="City skyline">City skyline</SelectItem>
                    <SelectItem value="Studio backdrop">Studio backdrop</SelectItem>
                    <SelectItem value="Garden setting">Garden setting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pose">Pose</Label>
                <Select value={pose} onValueChange={setPose}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standing">Standing</SelectItem>
                    <SelectItem value="Sitting">Sitting</SelectItem>
                    <SelectItem value="Lying down">Lying down</SelectItem>
                    <SelectItem value="Walking">Walking</SelectItem>
                    <SelectItem value="Portrait">Portrait</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="custom-prompt">Custom Prompt</Label>
                <Textarea
                  id="custom-prompt"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Enter your detailed prompt for image generation..."
                  className="h-36 resize-none"
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="guidance-scale">Guidance Scale (creativity)</Label>
                <span className="text-muted-foreground">{guidanceScale}</span>
              </div>
              <Slider
                id="guidance-scale"
                min={1}
                max={20}
                step={0.1}
                value={[guidanceScale]}
                onValueChange={([value]) => setGuidanceScale(value)}
              />
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Image
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Generated Image
            {result && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={clearResult}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] flex items-center justify-center border rounded-md overflow-hidden bg-muted/30">
            {loading && (
              <div className="flex flex-col items-center">
                <Loader2 className="h-10 w-10 animate-spin mb-2" />
                <p className="text-muted-foreground">Generating image...</p>
              </div>
            )}
            
            {!loading && error && (
              <div className="text-center p-4 text-destructive">
                <p>Error: {error}</p>
              </div>
            )}
            
            {!loading && !error && !result && (
              <div className="text-center text-muted-foreground">
                <p>Your generated image will appear here</p>
              </div>
            )}
            
            {!loading && !error && result?.url && (
              <img 
                src={result.url} 
                alt="Generated NSFW image"
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NSFWImageGenerator;
