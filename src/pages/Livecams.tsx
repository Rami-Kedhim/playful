
// Fix missing import of MainLayout and prop name for LivecamCard
import React, { useState, useEffect, useCallback } from 'react';
import { useLivecamContext } from '@/modules/livecams/providers/LivecamProvider';
import LivecamCard from '@/components/livecams/LivecamCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, SlidersHorizontal } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const Livecams = () => {
  const { livecams, loading, error, featuredLivecams, liveLivecams } = useLivecamContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  const filteredLivecams = livecams
    ? livecams.filter(livecam =>
        livecam.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterCategory === 'all' || livecam.category === filterCategory)
      )
    : [];

  const sortedLivecams = [...filteredLivecams].sort((a, b) => {
    if (sortBy === 'relevance') {
      return 0;
    } else if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    } else if (sortBy === 'price') {
      return (a.price || 0) - (b.price || 0);
    } else {
      return 0;
    }
  });

  const handleFilterChange = (category: string) => {
    setFilterCategory(category);
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterCategory('all');
    setSortBy('relevance');
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Livecams Directory</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search livecams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute top-2.5 right-3 h-5 w-5 text-gray-500" />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-6 p-4 border rounded-md">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <Select value={filterCategory} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Casual">Casual</SelectItem>
                  <SelectItem value="Music">Music</SelectItem>
                  <SelectItem value="Art">Art</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="ghost" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        )}

        <Tabs defaultValue="all" className="mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <p>Loading livecams...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : sortedLivecams.length > 0 ? (
            sortedLivecams.map(livecam => (
              <LivecamCard key={livecam.id} livecam={livecam} />
            ))
          ) : (
            <p>No livecams found.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Livecams;

