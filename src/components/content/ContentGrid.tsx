
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ContentItem {
  id: string;
  title: string;
  type: string;
  createdAt: Date;
  url?: string;
  content?: string;
  status: string;
  daysRemaining?: number;
}

interface ContentGridProps {
  content: ContentItem[];
  onRenew: (id: string) => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({ content, onRenew }) => {
  if (content.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No content found. Upload some content to get started!
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {content.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          {item.url && (
            <div className="aspect-video overflow-hidden">
              <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
            </div>
          )}
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{item.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                item.status === 'active' ? 'bg-green-100 text-green-800' : 
                item.status === 'expiring' ? 'bg-yellow-100 text-yellow-800' : 
                item.status === 'expired' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {item.status}
              </span>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              {item.type} • {item.createdAt.toLocaleDateString()}
              {item.daysRemaining !== undefined && (
                <span> • {item.daysRemaining} days remaining</span>
              )}
            </div>
            {(item.status === 'expired' || item.status === 'expiring') && (
              <button 
                onClick={() => onRenew(item.id)}
                className="text-sm bg-primary/90 text-white px-3 py-1 rounded hover:bg-primary transition-colors"
              >
                Renew with UBX
              </button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContentGrid;
