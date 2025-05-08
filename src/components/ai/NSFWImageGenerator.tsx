
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Download, Image, RefreshCcw, Trash2 } from 'lucide-react';
import { useNSFWImageGenerator } from '@/hooks/ai/useNSFWImageGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const ethnicities = [
  'Asian', 'Black', 'Caucasian', 'Hispanic', 'Latina', 
  'Middle Eastern', 'Mixed'
];

const styles = [
  'Glamour', 'Artistic', 'Casual', 'Professional', 'Candid',
  'Fashion', 'Boudoir', 'Lifestyle'
];

const clothingTypes = [
  'Elegant dress', 'Casual outfit', 'Business attire', 'Swimwear',
  'Lingerie', 'Evening gown', 'Workout clothes', 'Minimalist'
];

const backgrounds = [
  'Luxury hotel suite', 'Beach sunset', 'Urban cityscape', 'Studio setting',
  'Modern apartment', 'Natural landscape', 'Nightclub', 'Poolside'
];

const poses = [
  'Standing', 'Sitting', 'Lying down', 'Leaning', 'Casual',
  'Professional', 'Seductive', 'Playful'
];

const NSFWImageGenerator: React.FC = () => {
  const [name, setName] = useState('Lucia');
  const [age, setAge] = useState('25');
  const [ethnicity, setEthnicity] = useState('Latina');
  const [style, setStyle] = useState('Glamour');
  const [clothingType, setClothingType] = useState('Elegant dress');
  const [background, setBackground] = useState('Luxury hotel suite');
  const [pose, setPose] = useState('Seductive');
  const [prompt, setPrompt] = useState('');
  const [additionalTags, setAdditionalTags] = useState('');
  
  const { generateImage, resetImage, loading, imageUrl, error } = useNSFWImageGenerator();
  
  const handleGenerateClick = async () => {
    // Build the complete prompt
    const fullPrompt = prompt || `${name}, ${age} years old, ${ethnicity}, ${style} style, wearing ${clothingType}, in ${background}, ${pose} pose${additionalTags ? ', ' + additionalTags : ''}`;
    
    // Generate the image
    await generateImage({
      name,
      age,
      ethnicity,
      style,
      clothing: clothingType,
      background,
      pose,
      tags: additionalTags.split(',').map(tag => tag.trim()).filter(tag => tag)
    });
  };
  
  const handleDownloadClick = () => {
    if (imageUrl) {
      // Create a temporary link to download the image
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = `nsfw-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Image Generator</CardTitle>
          <CardDescription>
            Create custom AI-generated images using our free APIs
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="guided">
            <TabsList className="mb-4">
              <TabsTrigger value="guided">Guided</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
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
                    placeholder="25" 
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
                    {ethnicities.map((item) => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
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
                    {styles.map((item) => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clothing">Clothing</Label>
                <Select value={clothingType} onValueChange={setClothingType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select clothing" />
                  </SelectTrigger>
                  <SelectContent>
                    {clothingTypes.map((item) => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
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
                    {backgrounds.map((item) => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
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
                    {poses.map((item) => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Additional Tags (comma separated)</Label>
                <Input 
                  id="tags" 
                  value={additionalTags}
                  onChange={(e) => setAdditionalTags(e.target.value)}
                  placeholder="high quality, detailed, perfect lighting" 
                />
              </div>
            </TabsContent>
            
            <TabsContent value="advanced">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="custom-prompt">Custom Prompt</Label>
                  <Textarea 
                    id="custom-prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter a detailed prompt for your image generation"
                    rows={5}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-between flex-wrap gap-2">
          <div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={resetImage}
              disabled={loading || !imageUrl}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleDownloadClick}
              disabled={loading || !imageUrl}
              variant="outline"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button 
              onClick={handleGenerateClick} 
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Image className="h-4 w-4 mr-2" />
                  Generate Image
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <div className="lg:col-span-1">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              Generated image preview
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-grow flex items-center justify-center">
            {error ? (
              <div className="text-center p-4 text-red-500">
                <p>Error: {error}</p>
              </div>
            ) : imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Generated NSFW" 
                className="max-w-full max-h-[500px] rounded-md object-contain"
              />
            ) : (
              <div className="text-center p-8 text-muted-foreground bg-muted/30 rounded-md w-full h-full min-h-[300px] flex items-center justify-center">
                <div>
                  <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p>No image generated yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Complete the form and click Generate
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NSFWImageGenerator;
