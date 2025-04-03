
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { ContentCreateInput, ContentUpdateInput } from "@/services/contentService";
import MediaUpload from "./MediaUpload";

interface ContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: ContentUpdateInput | null;
  onSave: (data: ContentCreateInput) => Promise<void>;
}

const ContentDialog = ({
  open,
  onOpenChange,
  initialData,
  onSave,
}: ContentDialogProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState<"image" | "video" | "text">("image");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [price, setPrice] = useState("");
  const [visibility, setVisibility] = useState<"public" | "subscribers" | "premium">("public");
  const [status, setStatus] = useState<"draft" | "published" | "scheduled">("published");
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when dialog opens/closes or initialData changes
  useEffect(() => {
    if (open && initialData) {
      setContentType(initialData.media_type);
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setMediaUrl(initialData.media_url || "");
      setThumbnailUrl(initialData.thumbnail_url || "");
      setIsPremium(initialData.is_premium || false);
      setPrice(initialData.price ? initialData.price.toString() : "");
      setVisibility(initialData.visibility || "public");
      setStatus(initialData.status || "published");
      setScheduledDate(initialData.scheduled_for ? new Date(initialData.scheduled_for) : undefined);
      setTags(initialData.tags || []);
    } else if (open) {
      // Default values for new content
      setContentType("image");
      setTitle("");
      setDescription("");
      setMediaUrl("");
      setThumbnailUrl("");
      setIsPremium(false);
      setPrice("");
      setVisibility("public");
      setStatus("published");
      setScheduledDate(undefined);
      setTags([]);
    }
    
    // Reset errors
    setErrors({});
    setTagInput("");
  }, [open, initialData]);

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!mediaUrl && contentType !== "text") {
      newErrors.mediaUrl = `${contentType === "image" ? "Image" : "Video"} URL is required`;
    }
    
    if (isPremium && (!price || isNaN(Number(price)) || Number(price) <= 0)) {
      newErrors.price = "Please enter a valid price for premium content";
    }
    
    if (status === "scheduled" && !scheduledDate) {
      newErrors.scheduledDate = "Please select a date for scheduled content";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const contentData: ContentCreateInput = {
        creator_id: user?.id || "",
        title,
        description,
        media_url: mediaUrl,
        media_type: contentType,
        thumbnail_url: thumbnailUrl,
        visibility,
        status,
        is_premium: isPremium,
        price: isPremium ? Number(price) : undefined,
        scheduled_for: status === "scheduled" && scheduledDate 
          ? scheduledDate.toISOString() 
          : undefined,
        tags: tags.length > 0 ? tags : undefined
      };
      
      if (initialData?.id) {
        contentData.id = initialData.id;
      }
      
      await onSave(contentData);
    } catch (error) {
      console.error("Error saving content:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a tag
  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput("");
    }
  };

  // Remove a tag
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  // Handle tag input keydown
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Content" : "Add New Content"}</DialogTitle>
          <DialogDescription>
            Fill in the details for your content. 
            {status === "draft" && " Content saved as draft won't be visible to users until published."}
            {status === "scheduled" && " Scheduled content will be published automatically on the selected date."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <Tabs value={contentType} onValueChange={(value) => setContentType(value as any)}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="text">Article</TabsTrigger>
            </TabsList>
            
            <TabsContent value="image" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-upload">Upload Image</Label>
                <MediaUpload
                  type="image"
                  value={mediaUrl}
                  onChange={setMediaUrl}
                  error={errors.mediaUrl}
                  maxSize={5}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail (Optional)</Label>
                <MediaUpload
                  type="image"
                  value={thumbnailUrl}
                  onChange={setThumbnailUrl}
                  maxSize={2}
                />
                <p className="text-xs text-muted-foreground">If not provided, the main image will be used as thumbnail</p>
              </div>
            </TabsContent>
            
            <TabsContent value="video" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="video-upload">Upload Video</Label>
                <MediaUpload
                  type="video"
                  value={mediaUrl}
                  onChange={setMediaUrl}
                  error={errors.mediaUrl}
                  maxSize={100}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail (Required)</Label>
                <MediaUpload
                  type="image"
                  value={thumbnailUrl}
                  onChange={setThumbnailUrl}
                  error={!thumbnailUrl ? "A thumbnail is required for videos" : undefined}
                  maxSize={2}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Cover Image (Optional)</Label>
                <MediaUpload
                  type="image"
                  value={thumbnailUrl}
                  onChange={setThumbnailUrl}
                  maxSize={2}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Basic content details */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={4}
            />
          </div>
          
          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-secondary px-2 py-1 rounded-full text-xs flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add tags (press Enter)"
                className="flex-1"
              />
              <Button type="button" onClick={addTag} variant="outline" size="sm">
                Add
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Tags help users find your content</p>
          </div>
          
          {/* Content settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="visibility">Visibility</Label>
              <Select
                value={visibility}
                onValueChange={(value) => setVisibility(value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="subscribers">Subscribers Only</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {status === "scheduled" && (
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="scheduled-date">Publishing Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !scheduledDate && "text-muted-foreground",
                        errors.scheduledDate && "border-destructive"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scheduledDate ? format(scheduledDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={scheduledDate}
                      onSelect={setScheduledDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                {errors.scheduledDate && (
                  <p className="text-xs text-destructive">{errors.scheduledDate}</p>
                )}
              </div>
            )}
          </div>
          
          {/* Premium settings */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="premium-toggle">Premium Content</Label>
                <p className="text-xs text-muted-foreground">
                  Premium content can be purchased individually
                </p>
              </div>
              <Switch
                id="premium-toggle"
                checked={isPremium}
                onCheckedChange={setIsPremium}
              />
            </div>
            
            {isPremium && (
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  min="0.99"
                  step="0.01"
                  className={errors.price ? "border-destructive" : ""}
                />
                {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Save Changes" : "Create Content"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContentDialog;
