
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, ThumbsUp, Calendar } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  thumbnail_url: string;
  views_count: number;
  likes_count: number;
  created_at: string;
}

interface TopContentProps {
  content: ContentItem[];
  loading: boolean;
}

const TopContent = ({ content, loading }: TopContentProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[180px]" />
          <Skeleton className="h-4 w-[250px]" />
        </CardHeader>
        <CardContent>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 mb-4">
              <Skeleton className="h-16 w-24 rounded" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Content</CardTitle>
        <CardDescription>Your most popular content based on views</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {content.length > 0 ? (
            content.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-24 h-16 rounded overflow-hidden bg-muted">
                  <img 
                    src={item.thumbnail_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Content';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm truncate">{item.title}</h4>
                  <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye size={12} /> {item.views_count.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={12} /> {item.likes_count.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {formatDate(item.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No content data available yet.</p>
              <p className="text-sm mt-1">Start creating content to see analytics.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopContent;
