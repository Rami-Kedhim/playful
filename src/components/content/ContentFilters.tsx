
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Clock, Image, Film, FileText } from 'lucide-react';

interface ContentFiltersProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  statusCounts: {
    all: number;
    active: number;
    expiring: number;
    expired: number;
    draft: number;
  };
}

const ContentFilters: React.FC<ContentFiltersProps> = ({
  activeTab,
  setActiveTab,
  statusFilter,
  setStatusFilter,
  statusCounts
}) => {
  return (
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
      
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge 
          variant={statusFilter === 'all' ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setStatusFilter('all')}
        >
          All ({statusCounts.all})
        </Badge>
        <Badge 
          variant={statusFilter === 'active' ? "success" : "outline"}
          className="cursor-pointer"
          onClick={() => setStatusFilter('active')}
        >
          Active ({statusCounts.active})
        </Badge>
        <Badge 
          variant={statusFilter === 'expiring' ? "warning" : "outline"}
          className="cursor-pointer"
          onClick={() => setStatusFilter('expiring')}
        >
          <Clock className="h-3 w-3 mr-1" />
          Expiring ({statusCounts.expiring})
        </Badge>
        <Badge 
          variant={statusFilter === 'expired' ? "destructive" : "outline"}
          className="cursor-pointer"
          onClick={() => setStatusFilter('expired')}
        >
          Expired ({statusCounts.expired})
        </Badge>
        <Badge 
          variant={statusFilter === 'draft' ? "secondary" : "outline"}
          className="cursor-pointer"
          onClick={() => setStatusFilter('draft')}
        >
          Draft ({statusCounts.draft})
        </Badge>
      </div>
    </Tabs>
  );
};

export default ContentFilters;
