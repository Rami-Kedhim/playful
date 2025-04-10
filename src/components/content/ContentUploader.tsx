
import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Video, 
  Clock, 
  AlertTriangle,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ContentUploaderProps {
  onSuccess: (media: {id: string, type: string}) => void;
}

const ContentUploader: React.FC<ContentUploaderProps> = ({ onSuccess }) => {
  const [selectedTab, setSelectedTab] = useState<'image' | 'video'>('image');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [price, setPrice] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setError(null);
    
    // Create a preview URL for the file
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };
  
  const handleTabChange = (tab: 'image' | 'video') => {
    setSelectedTab(tab);
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const validateForm = () => {
    if (!file) {
      setError('Please select a file to upload');
      return false;
    }
    if (!title.trim()) {
      setError('Please provide a title');
      return false;
    }
    if (isPremium && (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0)) {
      setError('Please provide a valid price for premium content');
      return false;
    }
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 200);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear the interval and set progress to 100%
      clearInterval(interval);
      setUploadProgress(100);
      
      // Simulate success and return mockId
      setTimeout(() => {
        const mockId = 'content_' + Math.random().toString(36).substring(2, 9);
        onSuccess({ id: mockId, type: selectedTab });
        
        // Reset form
        setTitle('');
        setDescription('');
        setTags('');
        setCategory('');
        setIsPremium(false);
        setPrice('');
        setFile(null);
        setPreviewUrl(null);
        setUploading(false);
        setUploadProgress(0);
      }, 500);
      
    } catch (error) {
      clearInterval(interval);
      setError('Upload failed. Please try again.');
      setUploading(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Content</CardTitle>
        <CardDescription>
          Share your premium content with subscribers. All uploads are reviewed for compliance.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={selectedTab} onValueChange={(v) => handleTabChange(v as 'image' | 'video')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="image">
              <ImageIcon className="h-4 w-4 mr-2" />
              Image
            </TabsTrigger>
            <TabsTrigger value="video">
              <Video className="h-4 w-4 mr-2" />
              Video
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="image">
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}>
                {previewUrl ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-h-72 max-w-full mb-4 rounded-md object-cover" 
                    />
                    <p className="text-sm text-muted-foreground">Click to change image</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-lg font-medium">Click to upload an image</p>
                    <p className="text-sm text-muted-foreground mt-1">JPG, PNG or GIF (max 10MB)</p>
                  </div>
                )}
                <input 
                  ref={fileInputRef}
                  type="file" 
                  className="hidden" 
                  accept="image/jpeg,image/png,image/gif" 
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="video">
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}>
                {previewUrl ? (
                  <div className="flex flex-col items-center">
                    <video 
                      src={previewUrl} 
                      className="max-h-72 max-w-full mb-4 rounded-md" 
                      controls
                    />
                    <p className="text-sm text-muted-foreground">Click to change video</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-lg font-medium">Click to upload a video</p>
                    <p className="text-sm text-muted-foreground mt-1">MP4 or WebM (max 200MB)</p>
                  </div>
                )}
                <input 
                  ref={fileInputRef}
                  type="file" 
                  className="hidden" 
                  accept="video/mp4,video/webm" 
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Give your content a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={uploading}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Add a description for your content..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={uploading}
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select 
                value={category} 
                onValueChange={setCategory} 
                disabled={uploading}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photoshoot">Photoshoot</SelectItem>
                  <SelectItem value="selfie">Selfie</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="artwork">Artwork</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="behind_scenes">Behind the Scenes</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                placeholder="fun, outdoor, summer..."
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                disabled={uploading}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-muted/30 p-4 rounded-md">
            <Switch
              id="premium"
              checked={isPremium}
              onCheckedChange={setIsPremium}
              disabled={uploading}
            />
            <div className="flex-1">
              <Label htmlFor="premium" className="font-medium">Premium Content</Label>
              <p className="text-sm text-muted-foreground">Require Lucoins for users to access this content</p>
            </div>
          </div>
          
          {isPremium && (
            <div>
              <Label htmlFor="price">Price (Lucoins)</Label>
              <Input
                id="price"
                type="number"
                min="1"
                step="1"
                placeholder="5"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={uploading}
              />
            </div>
          )}
          
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
          
          <div className="bg-muted/30 p-4 rounded-md flex items-start space-x-2">
            <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              All uploaded content will be reviewed before publishing to ensure it complies with our community guidelines.
              This usually takes less than 24 hours.
            </p>
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" disabled={uploading} onClick={() => setSelectedTab('image')}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          onClick={handleSubmit} 
          disabled={!file || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Content'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentUploader;
