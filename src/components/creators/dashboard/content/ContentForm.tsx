import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContentFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  initialValues?: {
    title: string;
    description: string;
    contentType: string;
    isPremium: boolean;
    price: number;
    url: string;
    thumbnailUrl: string;
  };
  isLoading?: boolean;
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  contentType: z.enum(['image', 'video', 'article']),
  isPremium: z.boolean().default(false),
  price: z.number().optional().default(0),
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  thumbnailUrl: z.string().url({
    message: "Please enter a valid URL for the thumbnail.",
  }).optional(),
});

const ContentForm: React.FC<ContentFormProps> = ({ onSubmit, initialValues, isLoading }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      contentType: initialValues?.contentType || 'image',
      isPremium: initialValues?.isPremium || false,
      price: initialValues?.price || 0,
      url: initialValues?.url || '',
      thumbnailUrl: initialValues?.thumbnailUrl || '',
    }
  });
  
  const isPremium = form.watch('isPremium');
  const contentType = form.watch('contentType');
  
  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter content title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a brief description about the content"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="contentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a content type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter content URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {contentType === 'video' && (
          <FormField
            control={form.control}
            name="thumbnailUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter thumbnail URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <div className="flex items-center justify-between rounded-md border p-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Premium Content</h4>
            <p className="text-sm text-muted-foreground">
              Make this content available only to subscribers
            </p>
          </div>
          <FormField
            control={form.control}
            name="isPremium"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {isPremium && (
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ContentForm;
