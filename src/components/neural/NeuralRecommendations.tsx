
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ChevronDown, ChevronUp, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'optimization' | 'security' | 'stability' | 'performance';
  implemented: boolean;
}

interface NeuralRecommendationsProps {
  className?: string;
}

// Example recommendations data - in a real app, this would come from the API
const initialRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Optimize neural processing pathways',
    description: 'Current neural processing paths contain redundancies that could be optimized. Implementing stream processing could improve efficiency by up to 15%.',
    impact: 'high',
    category: 'optimization',
    implemented: false
  },
  {
    id: '2',
    title: 'Increase error logging detail',
    description: 'Current error logs lack detailed context, making troubleshooting difficult. Adding additional context parameters would improve diagnostic capabilities.',
    impact: 'medium',
    category: 'stability',
    implemented: false
  },
  {
    id: '3',
    title: 'Implement neural caching mechanism',
    description: 'Frequently accessed neural patterns could be cached to improve response times for common operations. This could reduce load on primary neural processors.',
    impact: 'high',
    category: 'performance',
    implemented: false
  },
  {
    id: '4',
    title: 'Update error threshold parameters',
    description: 'Current error thresholds may be too permissive. Adjusting to industry-standard levels would improve overall system reliability.',
    impact: 'medium',
    category: 'stability',
    implemented: false
  },
  {
    id: '5',
    title: 'Enhance input validation',
    description: 'Adding additional validation layers to neural inputs would prevent malformed data from entering the processing pipeline.',
    impact: 'medium',
    category: 'security',
    implemented: true
  }
];

const NeuralRecommendations: React.FC<NeuralRecommendationsProps> = ({ className = '' }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  const handleImplement = (id: string) => {
    setRecommendations(prev => 
      prev.map(rec => 
        rec.id === id ? { ...rec, implemented: true } : rec
      )
    );
    toast.success('Recommendation marked as implemented');
  };
  
  const handleDismiss = (id: string) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id));
    toast.info('Recommendation dismissed');
  };
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'optimization': return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case 'security': return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      case 'stability': return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      case 'performance': return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      default: return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
    }
  };
  
  const filteredRecommendations = recommendations.filter(rec => {
    if (filter === 'all') return true;
    if (filter === 'implemented') return rec.implemented;
    if (filter === 'pending') return !rec.implemented;
    return rec.category === filter;
  });
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 text-yellow-500" />
            Neural System Recommendations
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={filter === 'all' ? 'bg-primary/10' : ''}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={filter === 'pending' ? 'bg-primary/10' : ''}
              onClick={() => setFilter('pending')}
            >
              Pending
            </Button>
            <Button
              variant="ghost"
              size="sm" 
              className={filter === 'implemented' ? 'bg-primary/10' : ''}
              onClick={() => setFilter('implemented')}
            >
              Implemented
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {filteredRecommendations.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <p className="text-lg">No recommendations match the current filter</p>
            <p className="text-sm">Try adjusting your filter criteria</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRecommendations.map((rec) => (
              <div 
                key={rec.id}
                className={`border rounded-md overflow-hidden transition-all ${rec.implemented ? 'border-green-200 bg-green-50/10' : ''}`}
              >
                <div 
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50"
                  onClick={() => toggleExpanded(rec.id)}
                >
                  <div className="flex items-center space-x-3">
                    {rec.implemented ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    ) : (
                      <div className={`h-2 w-2 rounded-full ${getImpactColor(rec.impact)} shrink-0`}></div>
                    )}
                    <span className={rec.implemented ? 'text-muted-foreground' : ''}>
                      {rec.title}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getCategoryColor(rec.category)}>
                      {rec.category}
                    </Badge>
                    {expandedId === rec.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
                
                {expandedId === rec.id && (
                  <div className="p-3 pt-0 border-t">
                    <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                    
                    <div className="flex flex-wrap gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDismiss(rec.id)}
                      >
                        <XCircle className="mr-1 h-4 w-4" />
                        Dismiss
                      </Button>
                      
                      {!rec.implemented && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleImplement(rec.id)}
                        >
                          <CheckCircle2 className="mr-1 h-4 w-4" />
                          Mark Implemented
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NeuralRecommendations;
