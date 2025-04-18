import React, { useEffect, useState } from 'react';
import { useCreators } from '@/hooks/useCreators';
import { CreatorCard } from '@/components/creators/CreatorCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, SlidersHorizontal, Star } from 'lucide-react';
import { creatorsNeuralService } from '@/services/neural/modules/CreatorsNeuralService';

const Creators = () => {
  const { creators, loading, error } = useCreators();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    if (creatorsNeuralService) {
      console.log('Creators Neural Service is available');
    }
  }, []);

  const filteredCreators = creators
    ? creators.filter(creator =>
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterCategory === 'all' || creator.category === filterCategory)
      )
    : [];

  const sortedCreators = [...filteredCreators].sort((a, b) => {
    if (sortBy === 'relevance') {
      return 0;
    } else if (sortBy === 'rating') {
      const ratingA = a.rating || 0;
      const ratingB = b.rating || 0;
      return ratingB - ratingA;
    } else {
      return 0;
    }
  });

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Content Creators</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute top-2.5 right-3 h-5 w-5 text-gray-500" />
          </div>
          <Button variant="outline">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p>Loading creators...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : sortedCreators.length > 0 ? (
          sortedCreators.map(creator => (
            <CreatorCard key={creator.id} creator={creator} />
          ))
        ) : (
          <p>No creators found.</p>
        )}
      </div>
    </div>
  );
};

export default Creators;
