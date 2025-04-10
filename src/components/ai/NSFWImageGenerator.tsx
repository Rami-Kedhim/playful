import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Image, Plus, X, Download } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNSFWImageGenerator, NSFWImageGenerationParams } from '@/hooks/ai/useNSFWImageGenerator';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';

const DEFAULT_VALUES = {
  model: 'stablediffusionapi/realistic-vision-v5',
  name: 'Lucia',
  age: '25',
  ethnicity: 'Latina',
  style: 'Glamour',
  skinTone: 'Light',
  clothing: 'Elegant dress',
  background: 'Luxury hotel suite',
  pose: 'Seductive',
  tags: []
};

const AVAILABLE_MODELS = [
  { id: 'stablediffusionapi/realistic-vision-v5', name: 'Realistic Vision v5' },
  { id: 'stabilityai/stable-diffusion-xl-base-1.0', name: 'Stable Diffusion XL' },
  { id: 'playgroundai/playground-v2.5', name: 'Playground v2.5' },
  { id: 'black-forest-labs/FLUX.1-schnell', name: 'FLUX.1 Schnell (Fast)' },
];

const STYLE_OPTIONS = [
  'Glamour', 'Natural', 'Artistic', 'Fashion', 'Casual', 'Professional'
];

const ETHNICITY_OPTIONS = [
  'Latina', 'Caucasian', 'Asian', 'Black', 'Indian', 'Middle Eastern', 'Mixed'
];

const SKIN_TONE_OPTIONS = [
  'Light', 'Medium', 'Olive', 'Tan', 'Brown', 'Dark'
];

const CLOTHING_OPTIONS = [
  'Elegant dress', 'Business attire', 'Casual wear', 'Swimwear', 'Lingerie', 'Evening gown'
];

const BACKGROUND_OPTIONS = [
  'Luxury hotel suite', 'Beach resort', 'Urban cityscape', 'Cozy home', 'Studio setting', 'Natural outdoors'
];

const POSE_OPTIONS = [
  'Seductive', 'Professional', 'Casual', 'Elegant', 'Playful', 'Serious'
];

interface FormValues extends NSFWImageGenerationParams {
  tagInput?: string;
}

const NSFWImageGenerator: React.FC = () => {
  const { generateImage, resetImage, loading, imageUrl, error } = useNSFWImageGenerator();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  const form = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES
  });
  
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      form.setValue('tags', newTags);
      setTagInput('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    form.setValue('tags', newTags);
  };
  
  const onSubmit = async (values: FormValues) => {
    try {
      const generationParams = {
        ...values,
        tags
      };
      
      // Log the request through BrainHub
      brainHub.logDecision('image_generation', `Generating NSFW image with model ${values.model}`);
      
      await generateImage(generationParams);
    } catch (err) {
      console.error('Error in form submission:', err);
    }
  };

  const downloadImage = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `nsfw-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>NSFW Image Generator</CardTitle>
        <CardDescription>
          Generate NSFW images using AI models through Hugging Face API
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AI Model</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {AVAILABLE_MODELS.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the AI model to use for image generation
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input placeholder="Age" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ethnicity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ethnicity</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select ethnicity" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ETHNICITY_OPTIONS.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="skinTone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skin Tone</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select skin tone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SKIN_TONE_OPTIONS.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Style</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {STYLE_OPTIONS.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pose</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pose" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {POSE_OPTIONS.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="clothing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Clothing</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select clothing" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CLOTHING_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="background"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Background</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select background" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {BACKGROUND_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className="flex space-x-2">
                    <Input 
                      value={tagInput} 
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Enter tag" 
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} size="icon" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormDescription>
                    Add additional tags to enhance the image
                  </FormDescription>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <button 
                          type="button" 
                          onClick={() => removeTag(tag)}
                          className="ml-1 rounded-full hover:bg-muted p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </FormItem>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Image className="mr-2 h-4 w-4" />
                      Generate Image
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Image Preview Section */}
          <div className="flex flex-col">
            <div className="text-lg font-medium mb-2">Image Preview</div>
            
            <div className="border rounded-lg flex items-center justify-center h-[400px] bg-muted/20 overflow-hidden">
              {loading ? (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin mb-2" />
                  <span>Generating image...</span>
                </div>
              ) : imageUrl ? (
                <div className="relative w-full h-full">
                  <img 
                    src={imageUrl} 
                    alt="Generated NSFW" 
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Image className="h-10 w-10 mb-2 opacity-20" />
                  <span>No image generated yet</span>
                  {error && (
                    <p className="text-sm text-destructive mt-2">{error}</p>
                  )}
                </div>
              )}
            </div>
            
            {imageUrl && (
              <div className="flex justify-end space-x-2 mt-4">
                <Button 
                  variant="outline" 
                  onClick={resetImage}
                >
                  Reset
                </Button>
                <Button
                  onClick={downloadImage}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NSFWImageGenerator;
