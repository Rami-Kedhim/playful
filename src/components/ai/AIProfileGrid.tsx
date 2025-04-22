
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { AIProfile } from '@/types/ai-profile';
import AIProfileCard from './AIProfileCard';
import { Grid, List, Search } from 'lucide-react';

interface AIProfileGridProps {
  profiles: AIProfile[];
  onProfileAction?: (profile: AIProfile) => void;
  actionLabel?: string;
  showFilters?: boolean;
  loading?: boolean;
  emptyStateMessage?: string;
}

const AIProfileGrid: React.FC<AIProfileGridProps> = ({
  profiles,
  onProfileAction,
  actionLabel = 'Chat Now',
  showFilters = true,
  loading = false,
  emptyStateMessage = 'No AI profiles found'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter profiles based on search query and selected type
  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = 
      !searchQuery || 
      profile.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesType = 
      selectedType === 'all' || 
      (profile.type?.toLowerCase() === selectedType.toLowerCase());
      
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search AI profiles..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="companion">Companions</SelectItem>
                <SelectItem value="assistant">Assistants</SelectItem>
                <SelectItem value="roleplay">Roleplay</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-muted/40 rounded-lg h-80"></div>
          ))}
        </div>
      ) : filteredProfiles.length > 0 ? (
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' 
            : 'flex flex-col gap-4'}
        `}>
          {filteredProfiles.map(profile => (
            <div key={profile.id}>
              {viewMode === 'grid' ? (
                <AIProfileCard
                  profile={profile}
                  onAction={onProfileAction}
                  actionLabel={actionLabel}
                />
              ) : (
                <div className="flex gap-4 p-4 bg-muted/20 rounded-lg">
                  <div className="flex-shrink-0 w-24">
                    <img
                      src={profile.thumbnailUrl || profile.imageUrl}
                      alt={profile.name}
                      className="w-full aspect-square object-cover rounded-md"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-semibold">{profile.displayName || profile.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {profile.description}
                    </p>
                    <div className="mt-auto pt-2">
                      <Button 
                        size="sm" 
                        onClick={() => onProfileAction && onProfileAction(profile)}
                        variant="secondary"
                      >
                        {actionLabel}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{emptyStateMessage}</p>
        </div>
      )}
    </div>
  );
};

export default AIProfileGrid;
