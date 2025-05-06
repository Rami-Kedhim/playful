
import React from 'react';
import { Button } from '@/components/ui/button';
import { BadgePlus, ArrowUpRight, AlertCircle } from 'lucide-react';

const SeoRecommendationsList: React.FC = () => {
  // Mock recommendations data - in a real app, this would come from an API
  const recommendations = [
    {
      id: 1,
      title: "Improve keyword density for 'premium escorts'",
      description: "Your content has a low keyword density (0.8%) for a primary keyword. Increase usage to improve ranking.",
      priority: "high",
      impact: "+15% visibility",
      category: "content"
    },
    {
      id: 2,
      title: "Add meta descriptions to 8 profiles",
      description: "Several profiles are missing meta descriptions which reduces search visibility.",
      priority: "medium",
      impact: "+9% visibility",
      category: "profiles"
    },
    {
      id: 3,
      title: "Optimize image alt tags",
      description: "64 images across your site lack descriptive alt tags which hurts SEO and accessibility.",
      priority: "medium",
      impact: "+5% visibility",
      category: "content"
    },
    {
      id: 4,
      title: "Improve page loading speed",
      description: "Your average page load time is 4.2s. Improve to under 3s for better search ranking.",
      priority: "high",
      impact: "+12% visibility",
      category: "technical"
    }
  ];

  return (
    <div className="space-y-4">
      {recommendations.map((rec) => (
        <div key={rec.id} className="flex items-start gap-3 p-3 border rounded-lg">
          <div className={`p-1.5 rounded-full ${getPriorityColor(rec.priority)}`}>
            <AlertCircle className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <h4 className="font-medium">{rec.title}</h4>
              <span className="text-sm text-green-600 font-medium whitespace-nowrap ml-2">{rec.impact}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
            <div className="flex items-center mt-2 gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100">
                {rec.category}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100">
                {rec.priority}
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="shrink-0">
            <ArrowUpRight className="h-4 w-4 mr-1" /> Fix Now
          </Button>
        </div>
      ))}
      
      <Button variant="outline" className="w-full">
        <BadgePlus className="h-4 w-4 mr-2" /> View All Recommendations
      </Button>
    </div>
  );
};

// Helper function to get appropriate background color for priority
function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-amber-500';
    case 'low':
      return 'bg-blue-500';
    default:
      return 'bg-slate-500';
  }
}

export default SeoRecommendationsList;
