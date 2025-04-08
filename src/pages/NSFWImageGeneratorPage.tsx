
import React from 'react';
import NSFWImageGenerator from '@/components/ai/NSFWImageGenerator';
import { Button } from '@/components/ui/button';
import { Image, InfoIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const NSFWImageGeneratorPage: React.FC = () => {
  return (
    <div className="container py-8 max-w-7xl">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Image className="h-6 w-6" />
              NSFW Image Generator
            </h1>
            <p className="text-muted-foreground mt-1">
              Create custom NSFW AI-generated images using Hugging Face models
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to="/brain-hub">
                <InfoIcon className="h-4 w-4 mr-1" />
                View Neural Analytics
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="bg-amber-100 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 px-4 py-3 rounded-lg flex items-start gap-3">
          <InfoIcon className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-800 dark:text-amber-400">Important Note</h3>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              This feature requires setting up a Hugging Face API key in your Supabase project secrets.
              Generated images are processed through the Hugging Face API and may be subject to their content policies.
            </p>
          </div>
        </div>
        
        <NSFWImageGenerator />
      </div>
    </div>
  );
};

export default NSFWImageGeneratorPage;
