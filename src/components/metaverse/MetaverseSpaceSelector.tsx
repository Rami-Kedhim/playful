
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import MetaverseSpaceCard from './MetaverseSpaceCard';

// Sample data for metaverse spaces - this would come from an API in a real app
const SAMPLE_SPACES = [
  {
    id: 'karnak-temple',
    title: 'Karnak Temple',
    description: 'An immersive recreation of the sacred Karnak Temple Complex',
    themeType: 'isis' as const,
    activeUsers: 24,
    imageUrl: 'https://picsum.photos/seed/karnak/800/600'
  },
  {
    id: 'hathor-sanctuary',
    title: 'Sanctuary of Hathor',
    description: 'Dedicated to the goddess of love, beauty and music',
    themeType: 'hathor' as const,
    activeUsers: 18,
    imageUrl: 'https://picsum.photos/seed/hathor/800/600'
  },
  {
    id: 'bastet-garden',
    title: 'Gardens of Bastet',
    description: 'A sensual oasis dedicated to pleasure and protection',
    themeType: 'bastet' as const,
    activeUsers: 12,
    imageUrl: 'https://picsum.photos/seed/bastet/800/600'
  },
  {
    id: 'royal-palace',
    title: 'Royal Palace of Nefertiti',
    description: 'Experience the elegance and mystery of ancient Egyptian royalty',
    themeType: 'nefertiti' as const,
    activeUsers: 31,
    imageUrl: 'https://picsum.photos/seed/nefertiti/800/600'
  },
  {
    id: 'anubis-chambers',
    title: 'Chambers of Anubis',
    description: 'Cross thresholds and experience rebirth in this transformative space',
    themeType: 'anubis' as const,
    activeUsers: 9,
    imageUrl: 'https://picsum.photos/seed/anubis/800/600'
  }
];

interface MetaverseSpaceSelectorProps {
  onSelectSpace?: (spaceId: string) => void;
  className?: string;
}

/**
 * Component for browsing and selecting metaverse spaces
 * Inspired by the Sacred Grid concept from the Sacred Engine
 */
const MetaverseSpaceSelector: React.FC<MetaverseSpaceSelectorProps> = ({ 
  onSelectSpace,
  className 
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('all');
  
  // Filter spaces based on search and active tab
  const filteredSpaces = SAMPLE_SPACES.filter(space => {
    const matchesSearch = !searchTerm || 
      space.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesTab = activeTab === 'all' || space.themeType === activeTab;
    
    return matchesSearch && matchesTab;
  });
  
  const handleSpaceSelect = (spaceId: string) => {
    onSelectSpace?.(spaceId);
  };
  
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-4">Sacred Spaces</h2>
      <p className="text-muted-foreground mb-6">
        Explore our virtual temples and sacred spaces for immersive experiences
      </p>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search spaces..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Spaces</TabsTrigger>
          <TabsTrigger value="isis">Isis</TabsTrigger>
          <TabsTrigger value="hathor">Hathor</TabsTrigger>
          <TabsTrigger value="bastet">Bastet</TabsTrigger>
          <TabsTrigger value="nefertiti">Nefertiti</TabsTrigger>
          <TabsTrigger value="anubis">Anubis</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpaces.map((space) => (
              <MetaverseSpaceCard
                key={space.id}
                id={space.id}
                title={space.title}
                description={space.description}
                themeType={space.themeType}
                activeUsers={space.activeUsers}
                imageUrl={space.imageUrl}
                onEnter={() => handleSpaceSelect(space.id)}
              />
            ))}
            
            {filteredSpaces.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No spaces match your search</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetaverseSpaceSelector;
