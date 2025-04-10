
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Image, Film, FileText } from 'lucide-react';
import ContentStatusBadge from './ContentStatusBadge';
import ContentExpiryInfo from './ContentExpiryInfo';
import { calculateExpiryDate, calculateDaysRemaining, determineContentStatus, calculateRenewalCost } from '@/utils/dateUtils';
import { useToast } from '@/components/ui/use-toast';

// Mock content data, in a real app this would come from an API
const mockContent = [
  {
    id: '1',
    title: 'Profile Image 1',
    type: 'image',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    url: 'https://picsum.photos/seed/image1/300/200',
    status: 'active'
  },
  {
    id: '2',
    title: 'Introduction Video',
    type: 'video',
    createdAt: new Date(Date.now() - 160 * 24 * 60 * 60 * 1000), // 160 days ago (expiring soon)
    url: 'https://picsum.photos/seed/video1/300/200',
    status: 'expiring'
  },
  {
    id: '3',
    title: 'Bio Information',
    type: 'text',
    createdAt: new Date(Date.now() - 190 * 24 * 60 * 60 * 1000), // 190 days ago (expired)
    content: 'This is a sample biography text content.',
    status: 'expired'
  }
];

const ContentGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [content, setContent] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Process mock content to calculate real status based on dates
    const processedContent = mockContent.map(item => {
      const expiryDate = calculateExpiryDate(item.createdAt);
      const daysRemaining = calculateDaysRemaining(expiryDate);
      const status = determineContentStatus(item.createdAt);
      
      return {
        ...item,
        status,
        daysRemaining
      };
    });
    
    setContent(processedContent);
  }, []);

  const filteredContent = content.filter(item => {
    // First apply search filter if any
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Then apply tab filter
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const handleRenewContent = (contentId: string) => {
    setContent(prevContent => 
      prevContent.map(item => {
        if (item.id === contentId) {
          // Reset expiry by setting createdAt to now
          const newCreatedAt = new Date();
          const expiryDate = calculateExpiryDate(newCreatedAt);
          const daysRemaining = calculateDaysRemaining(expiryDate);
          const status = determineContentStatus(newCreatedAt);
          
          return {
            ...item,
            createdAt: newCreatedAt,
            status,
            daysRemaining
          };
        }
        return item;
      })
    );
    
    // Calculate the cost based on content type and status
    const contentItem = content.find(item => item.id === contentId);
    const renewalCost = contentItem ? calculateRenewalCost(contentItem.status, contentItem.type) : 1;
    
    toast({
      title: "Content Renewed",
      description: `Your content has been renewed for 180 days for ${renewalCost} LC`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Content</h2>
        <div className="flex space-x-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="image">
            <Image className="h-4 w-4 mr-1" />
            Images
          </TabsTrigger>
          <TabsTrigger value="video">
            <Film className="h-4 w-4 mr-1" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="text">
            <FileText className="h-4 w-4 mr-1" />
            Text
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-4">
          {filteredContent.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No content found. Upload some content to get started!
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContent.map((item) => {
                const expiresAt = calculateExpiryDate(item.createdAt);
                const lucoinCost = calculateRenewalCost(item.status, item.type);
                
                return (
                  <Card key={item.id} className="overflow-hidden">
                    {item.type !== 'text' && (
                      <div className="relative aspect-video bg-muted">
                        <img 
                          src={item.url} 
                          alt={item.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-2 right-2">
                          <ContentStatusBadge 
                            status={item.status as any}
                            daysRemaining={item.status === 'expiring' ? item.daysRemaining : undefined}  
                          />
                        </div>
                      </div>
                    )}
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{item.title}</h3>
                        {item.type === 'text' && (
                          <ContentStatusBadge 
                            status={item.status as any}
                            daysRemaining={item.status === 'expiring' ? item.daysRemaining : undefined} 
                          />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Type: {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </p>
                      {item.type === 'text' && (
                        <p className="text-sm border p-2 rounded-md bg-muted/30">
                          {item.content}
                        </p>
                      )}
                      <ContentExpiryInfo 
                        createdAt={item.createdAt} 
                        expiresAt={expiresAt} 
                        onRenew={() => handleRenewContent(item.id)}
                        lucoinCost={lucoinCost}
                      />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentGallery;
