
import React, { useState } from 'react';
import { 
  Grid3x3, 
  Layers, 
  Filter, 
  MoreVertical,
  Lock,
  Eye,
  Heart,
  Coins,
  Check,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

// Mock content data
const generateMockContent = (count: number) => {
  return Array(count).fill(0).map((_, idx) => ({
    id: `content-${idx}`,
    title: `My Content ${idx + 1}`,
    type: idx % 3 === 0 ? 'video' : 'image',
    url: `https://picsum.photos/id/${(idx * 10) % 100}/400/300`,
    thumbnail: `https://picsum.photos/id/${(idx * 10) % 100}/400/300`,
    status: idx % 10 === 0 ? 'pending' : 'published',
    isPremium: idx % 3 === 0,
    price: idx % 3 === 0 ? Math.floor(Math.random() * 10) + 5 : 0,
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(Date.now() - idx * 86400000).toISOString()
  }));
};

// Once connected to the backend, this content would come from an API
const mockContent = generateMockContent(12);

const ContentGallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Filtered and sorted content
  const filteredContent = React.useMemo(() => {
    let result = [...mockContent];
    
    // Filter by status
    if (filter !== 'all') {
      result = result.filter(item => item.status === filter);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query)
      );
    }
    
    // Sort content
    switch (sortBy) {
      case 'recent':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        result.sort((a, b) => b.views - a.views);
        break;
      case 'likes':
        result.sort((a, b) => b.likes - a.likes);
        break;
    }
    
    return result;
  }, [filter, sortBy, searchQuery]);
  
  // Status options for tabs
  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'published', label: 'Published' },
    { value: 'pending', label: 'Pending' },
  ];
  
  return (
    <div className="space-y-4">
      {/* Filter and control bar */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="flex-1">
          <Input
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2 items-center">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Viewed</SelectItem>
              <SelectItem value="likes">Most Liked</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex bg-muted/60 rounded-md p-0.5">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setViewMode('grid')}
            >
              <Grid3x3 className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setViewMode('list')}
            >
              <Layers className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Status tabs */}
      <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
        <TabsList className="mb-4">
          {statusOptions.map(option => (
            <TabsTrigger key={option.value} value={option.value}>
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {statusOptions.map(option => (
          <TabsContent key={option.value} value={option.value}>
            {loading ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
                {Array(6).fill(0).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : filteredContent.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No content found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
                {filteredContent.map(content => (
                  <ContentCard 
                    key={content.id} 
                    content={content} 
                    viewMode={viewMode} 
                  />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

interface ContentCardProps {
  content: {
    id: string;
    title: string;
    type: string;
    url: string;
    thumbnail: string;
    status: string;
    isPremium: boolean;
    price: number;
    views: number;
    likes: number;
    createdAt: string;
  };
  viewMode: 'grid' | 'list';
}

const ContentCard: React.FC<ContentCardProps> = ({ content, viewMode }) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(content.createdAt));
  
  if (viewMode === 'list') {
    return (
      <div className="flex items-center border rounded-md overflow-hidden">
        <div className="w-24 h-24 bg-muted flex-shrink-0 relative">
          <img 
            src={content.thumbnail} 
            alt={content.title} 
            className="w-full h-full object-cover"
          />
          {content.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <div className="w-0 h-0 border-y-4 border-y-transparent border-l-8 border-l-black ml-1" />
              </div>
            </div>
          )}
          {content.isPremium && (
            <div className="absolute top-1 right-1">
              <Badge variant="default" className="bg-amber-500">
                <Coins className="h-3 w-3 mr-1" /> {content.price}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-sm line-clamp-1">{content.title}</h3>
              <p className="text-xs text-muted-foreground">{formattedDate}</p>
            </div>
            
            <div className="flex items-center gap-2">
              {content.status === 'pending' ? (
                <Badge variant="outline" className="border-amber-500 text-amber-500">
                  <Clock className="h-3 w-3 mr-1" />
                  Pending
                </Badge>
              ) : (
                <Badge variant="outline" className="border-green-500 text-green-500">
                  <Check className="h-3 w-3 mr-1" />
                  Published
                </Badge>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>View Stats</DropdownMenuItem>
                  <DropdownMenuItem>Copy Link</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="flex gap-3 mt-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <Eye className="h-3 w-3 mr-1" />
              {content.views}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Heart className="h-3 w-3 mr-1" />
              {content.likes}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img 
          src={content.thumbnail} 
          alt={content.title} 
          className="w-full h-full object-cover"
        />
        
        {content.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-black ml-1" />
            </div>
          </div>
        )}
        
        <div className="absolute top-2 left-2">
          {content.status === 'pending' ? (
            <Badge variant="default" className="bg-amber-500/70 backdrop-blur-sm">
              <Clock className="h-3 w-3 mr-1" />
              Pending Review
            </Badge>
          ) : (
            <Badge variant="default" className="bg-green-500/70 backdrop-blur-sm">
              <Check className="h-3 w-3 mr-1" />
              Published
            </Badge>
          )}
        </div>
        
        {content.isPremium && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-amber-500/70 backdrop-blur-sm">
              <Lock className="h-3 w-3 mr-1" /> {content.price}
            </Badge>
          </div>
        )}
      </div>
      
      <CardFooter className="p-3 flex justify-between">
        <div className="overflow-hidden">
          <h3 className="font-medium text-sm truncate">{content.title}</h3>
          <div className="flex gap-3 mt-1">
            <div className="flex items-center text-xs text-muted-foreground">
              <Eye className="h-3 w-3 mr-1" />
              {content.views}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Heart className="h-3 w-3 mr-1" />
              {content.likes}
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>View Stats</DropdownMenuItem>
            <DropdownMenuItem>Copy Link</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default ContentGallery;
