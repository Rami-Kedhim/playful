
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  LineChart, 
  FileText, 
  Settings, 
  Sparkles, 
  ArrowUpRight,
  Search,
  TrendingUp,
  History
} from 'lucide-react';

const HermesSeoHome: React.FC = () => {
  const navigate = useNavigate();
  
  const seoTools = [
    {
      title: "Content Optimization",
      description: "Optimize your content for better search visibility",
      icon: <FileText className="h-6 w-6 text-primary" />,
      path: "/seo/optimize-content"
    },
    {
      title: "Profile Optimization",
      description: "Enhance your profile's SEO performance",
      icon: <Search className="h-6 w-6 text-primary" />,
      path: "/seo/optimize-profile"
    },
    {
      title: "Live Optimization",
      description: "Real-time SEO improvements for your content",
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      path: "/seo/optimize-live"
    },
    {
      title: "SEO Analytics",
      description: "View detailed performance metrics and insights",
      icon: <LineChart className="h-6 w-6 text-primary" />,
      path: "/seo/analytics"
    },
    {
      title: "Optimization History",
      description: "Review your past SEO improvements",
      icon: <History className="h-6 w-6 text-primary" />,
      path: "/seo/history"
    },
    {
      title: "SEO Tools",
      description: "Advanced tools for SEO management",
      icon: <Settings className="h-6 w-6 text-primary" />,
      path: "/seo/tools"
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Brain className="mr-2 h-8 w-8 text-primary" />
            HERMES SEO Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-powered optimization tools to enhance your content visibility
          </p>
        </div>
        
        <Button onClick={() => navigate('/seo/new-optimization')} className="flex items-center">
          <Sparkles className="mr-2 h-4 w-4" />
          New Optimization
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seoTools.map((tool) => (
          <Card key={tool.path} className="group hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  {tool.icon}
                  <span className="ml-2">{tool.title}</span>
                </div>
                <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to={tool.path}>
                <Button variant="ghost" className="w-full justify-start">
                  Go to {tool.title}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-6 w-6 text-primary" />
            HERMES Intelligence Integration
          </CardTitle>
          <CardDescription>
            HERMES AI is powering your SEO performance through advanced neural models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-medium">+32% Visibility Improvement</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Average improvement in content visibility with HERMES optimization
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/seo/analytics')}>
              View Detailed Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HermesSeoHome;
