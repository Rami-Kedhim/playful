
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Creator } from '@/hooks/useCreators';

interface CreatorPostsProps {
  creator: Creator;
  isSubscribed: boolean;
}

const CreatorPosts: React.FC<CreatorPostsProps> = ({ creator, isSubscribed }) => {
  // Mock posts data - in production this would come from an API
  const posts = isSubscribed ? [
    {
      id: '1',
      title: 'Latest update',
      content: 'Just shot an amazing new set that I can\'t wait to share with you all!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 24,
      comments: 8
    },
    {
      id: '2',
      title: 'Weekend vibes',
      content: 'Spending the weekend at the beach. Check out my exclusive photos in the gallery 🏖️',
      timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000),
      likes: 56,
      comments: 14
    },
    {
      id: '3',
      title: 'New video coming soon',
      content: 'Just finished editing my latest video. Premium subscribers will get early access tomorrow!',
      timestamp: new Date(Date.now() - 50 * 60 * 60 * 1000),
      likes: 42,
      comments: 11
    }
  ] : [
    {
      id: '1',
      title: 'Latest update',
      content: 'Just shot an amazing new set that I can\'t wait to share with you all!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 24,
      comments: 8
    }
  ];

  if (posts.length === 0) {
    return (
      <Card className="border-border/40">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No posts available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {posts.map(post => (
          <Card key={post.id} className="border-border/40">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{post.title}</h3>
                <span className="text-xs text-muted-foreground">
                  {post.timestamp.toLocaleDateString()}
                </span>
              </div>
              
              <p className="text-sm mb-4">{post.content}</p>
              
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex gap-4">
                  <span>{post.likes} likes</span>
                  <span>{post.comments} comments</span>
                </div>
                
                {!isSubscribed && (
                  <div className="text-primary text-xs font-medium">
                    Subscribe to see more
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {!isSubscribed && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-2">
                Subscribe to see {creator.name}'s full content feed
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
};

export default CreatorPosts;
