
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UnifiedLayout } from '@/layouts';
import { 
  Image, 
  MessageSquare, 
  Film, 
  Brain, 
  Sparkles 
} from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <UnifiedLayout title="AI Content Creation" showFooter={true}>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Content Creation Suite</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate professional content using our advanced AI tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          <FeatureCard
            title="AI Image Generator"
            description="Create stunning AI-generated images using Hugging Face models"
            icon={<Image className="h-5 w-5" />}
            linkTo="/media-generation"
            buttonText="Generate Images"
          />

          <FeatureCard
            title="NSFW Image Generator"
            description="Create NSFW content with specialized AI models"
            icon={<Image className="h-5 w-5" />}
            linkTo="/nsfw-image-generator"
            buttonText="Generate NSFW"
          />

          <FeatureCard
            title="Enhanced AI Studio"
            description="Advanced generation with DeepSeek and other high-quality models"
            icon={<Sparkles className="h-5 w-5" />}
            linkTo="/enhanced-ai"
            buttonText="Advanced Studio"
            highlight={true}
          />

          <FeatureCard
            title="Talk with Lucie"
            description="Chat with our AI assistant for personalized help"
            icon={<MessageSquare className="h-5 w-5" />}
            linkTo="/lucie-talk"
            buttonText="Chat Now"
          />

          <FeatureCard
            title="Video Generation"
            description="Create short video clips using AI"
            icon={<Film className="h-5 w-5" />}
            linkTo="/media-generation"
            buttonText="Generate Videos"
          />

          <FeatureCard
            title="Neural Analytics"
            description="Advanced insights using AI brain hub"
            icon={<Brain className="h-5 w-5" />}
            linkTo="/brain-hub"
            buttonText="View Analytics"
          />
        </div>
      </div>
    </UnifiedLayout>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
  buttonText: string;
  highlight?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  linkTo, 
  buttonText,
  highlight = false 
}) => {
  return (
    <div className={`border rounded-lg p-6 ${
      highlight 
        ? 'border-primary/50 bg-primary/5 shadow-lg shadow-primary/10' 
        : 'border-border'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h2 className="text-lg font-medium">{title}</h2>
        {highlight && (
          <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
            New
          </span>
        )}
      </div>
      <p className="text-muted-foreground mb-6 text-sm">{description}</p>
      <Button asChild variant={highlight ? "default" : "outline"} className="w-full">
        <Link to={linkTo}>
          {buttonText}
        </Link>
      </Button>
    </div>
  );
};

export default HomePage;
