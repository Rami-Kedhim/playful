
import React, { useState, useEffect } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { calculateExpiryDate, calculateDaysRemaining, determineContentStatus, calculateRenewalCost } from '@/utils/dateUtils';
import ContentSearch from './ContentSearch';
import ContentFilters from './ContentFilters';
import ContentGrid from './ContentGrid';
import { useContentBrainHub } from '@/hooks/useContentBrainHub';

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
  },
  {
    id: '4',
    title: 'Summer Photoshoot',
    type: 'image',
    createdAt: new Date(Date.now() - 175 * 24 * 60 * 60 * 1000), // 175 days ago (expiring soon)
    url: 'https://picsum.photos/seed/image2/300/200',
    status: 'expiring'
  },
  {
    id: '5',
    title: 'New Profile Draft',
    type: 'image',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    url: 'https://picsum.photos/seed/image3/300/200',
    status: 'draft'
  }
];

const ContentGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [content, setContent] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();
  const { processContent, getIntelligentRenewalCost, recordInteraction } = useContentBrainHub();

  useEffect(() => {
    // Process mock content to calculate real status based on dates
    const initialProcessContent = async () => {
      const processedContent = mockContent.map(item => {
        const expiryDate = calculateExpiryDate(item.createdAt);
        const daysRemaining = calculateDaysRemaining(expiryDate);
        const status = item.status === 'draft' ? 'draft' : determineContentStatus(item.createdAt);
        
        return {
          ...item,
          status,
          daysRemaining
        };
      });
      
      // Process content through Brain Hub for additional intelligence
      try {
        const brainHubEnhancedContent = await processContent(processedContent);
        setContent(brainHubEnhancedContent);
      } catch (error) {
        console.error("Failed to process content with Brain Hub, using standard content:", error);
        setContent(processedContent);
      }
    };
    
    initialProcessContent();
  }, [processContent]);

  const filteredContent = content.filter(item => {
    // First apply search filter if any
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Then apply tab filter (content type)
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    
    // Then apply status filter if not "all"
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesTab && matchesStatus;
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
    
    // Find the content item
    const contentItem = content.find(item => item.id === contentId);
    
    // Use Brain Hub for intelligent renewal cost calculation
    const renewalCost = contentItem ? 
      getIntelligentRenewalCost(contentItem.status, contentItem.type) : 
      1;
    
    // Record interaction with Brain Hub
    recordInteraction(contentId, 'renew');
    
    toast({
      title: "Content Renewed",
      description: `Your content has been renewed for 180 days for ${renewalCost} LC`,
    });
  };

  // Count content by status
  const statusCounts = {
    all: content.length,
    active: content.filter(item => item.status === 'active').length,
    expiring: content.filter(item => item.status === 'expiring').length,
    expired: content.filter(item => item.status === 'expired').length,
    draft: content.filter(item => item.status === 'draft').length,
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Content</h2>
        <ContentSearch 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
      </div>
      
      <ContentFilters 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        statusCounts={statusCounts}
      />
      
      <TabsContent value={activeTab} className="mt-4">
        <ContentGrid 
          content={filteredContent}
          onRenew={handleRenewContent}
        />
      </TabsContent>
    </div>
  );
};

export default ContentGallery;
