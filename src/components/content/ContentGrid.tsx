
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ContentCard from './ContentCard';

interface ContentGridProps {
  content: any[];
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
        <ContentCard key={item.id} item={item} onRenew={onRenew} />
      ))}
    </div>
  );
};

export default ContentGrid;
