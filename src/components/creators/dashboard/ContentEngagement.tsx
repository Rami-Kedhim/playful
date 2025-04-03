
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { MessageSquare, Heart, Flag, MoreHorizontal, Search } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Mock data - in a real app, this would come from an API
const MOCK_COMMENTS = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'Jessica Brown',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80'
    },
    content: 'This content is amazing! Exactly what I was looking for. Keep up the great work!',
    contentId: 'content1',
    contentTitle: 'Beach Photoshoot Collection',
    createdAt: new Date(2023, 10, 5, 14, 32),
    likes: 12,
    isLiked: false,
    isFlagged: false
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=100&h=100&q=80'
    },
    content: 'Would love to see more content like this. When is your next release scheduled?',
    contentId: 'content2',
    contentTitle: 'Sunset Dress Collection',
    createdAt: new Date(2023, 10, 4, 9, 15),
    likes: 5,
    isLiked: true,
    isFlagged: false
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'Sophia Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80'
    },
    content: 'This is absolutely stunning! I can't believe how perfect the lighting is.',
    contentId: 'content1',
    contentTitle: 'Beach Photoshoot Collection',
    createdAt: new Date(2023, 10, 3, 18, 45),
    likes: 8,
    isLiked: false,
    isFlagged: false
  },
  {
    id: '4',
    user: {
      id: 'user4',
      name: 'James Wilson',
      avatar: ''
    },
    content: 'Looking forward to the tutorial you mentioned. Could you share some tips on how you achieved this look?',
    contentId: 'content3',
    contentTitle: 'Studio Lighting Masterclass',
    createdAt: new Date(2023, 10, 2, 11, 22),
    likes: 3,
    isLiked: false,
    isFlagged: true
  },
  {
    id: '5',
    user: {
      id: 'user5',
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80'
    },
    content: 'Just subscribed to your premium content. Can't wait to see what's available!',
    contentId: 'content4',
    contentTitle: 'Premium Content Bundle',
    createdAt: new Date(2023, 10, 1, 16, 10),
    likes: 15,
    isLiked: true,
    isFlagged: false
  }
];

const ContentEngagement = () => {
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter comments based on selected filter and search query
  const filteredComments = comments.filter(comment => {
    // Filter by type
    if (filter === 'flagged' && !comment.isFlagged) return false;
    if (filter === 'liked' && !comment.isLiked) return false;
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        comment.content.toLowerCase().includes(query) ||
        comment.user.name.toLowerCase().includes(query) ||
        comment.contentTitle.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Like/unlike comment
  const toggleLike = (commentId: string) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          };
        }
        return comment;
      })
    );
  };
  
  // Flag/unflag comment
  const toggleFlag = (commentId: string) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isFlagged: !comment.isFlagged
          };
        }
        return comment;
      })
    );
  };
  
  // Delete comment
  const deleteComment = (commentId: string) => {
    setComments(prevComments => 
      prevComments.filter(comment => comment.id !== commentId)
    );
  };
  
  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} min ago`;
    }
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
    if (diffInHours < 48) {
      return 'yesterday';
    }
    return format(date, 'MMM d');
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Content Engagement
            </CardTitle>
            <CardDescription>
              View and respond to comments on your content
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter comments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Comments</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="liked">Liked by You</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search comments..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {filteredComments.length === 0 ? (
          <div className="text-center py-6">
            <MessageSquare className="h-10 w-10 mx-auto text-gray-400" />
            <p className="mt-2 text-muted-foreground">No comments found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComments.map((comment) => (
              <div 
                key={comment.id} 
                className={`p-4 border rounded-lg ${comment.isFlagged ? 'bg-red-50 dark:bg-red-950/10' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                    <AvatarFallback>{comment.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium truncate">{comment.user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          on <span className="font-medium">{comment.contentTitle}</span> • {formatRelativeTime(comment.createdAt)}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toggleFlag(comment.id)}>
                            {comment.isFlagged ? 'Remove flag' : 'Flag comment'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteComment(comment.id)} className="text-red-600">
                            Delete comment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="mt-2 text-sm">{comment.content}</p>
                    <div className="mt-3 flex items-center">
                      <Button 
                        variant={comment.isLiked ? "default" : "ghost"} 
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() => toggleLike(comment.id)}
                      >
                        <Heart className={`h-4 w-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 gap-1 ml-2">
                        Reply
                      </Button>
                      {comment.isFlagged && (
                        <span className="text-xs flex items-center ml-auto text-red-600">
                          <Flag className="h-3 w-3 mr-1" /> Flagged
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentEngagement;
