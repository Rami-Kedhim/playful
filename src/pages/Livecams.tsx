import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { LivecamModel } from '@/types/livecams';
import LivecamCard from '@/components/livecams/LivecamCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { useBoostDialog } from '@/hooks/boost/useBoostDialog';

interface FilterState {
  search: string;
  category: string;
  ageRange: [number, number];
  sortBy: string;
}

const Livecams: React.FC = () => {
  const [models, setModels] = useState<LivecamModel[]>([
    {
      id: "1",
      displayName: "Alice",
      thumbnailUrl: "https://images.pexels.com/photos/1576917/pexels-photo-1576917.jpeg?auto=compress&cs=tinysrgb&w=600",
      isLive: true,
      viewerCount: 123,
      age: 22,
      country: "USA",
      categories: ["tattoo", "brunette"],
      rating: 4.5,
      price: 2.99,
      language: "English",
      streamUrl: "/livecam/1"
    },
    {
      id: "2",
      displayName: "Bob",
      thumbnailUrl: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
      isLive: false,
      viewerCount: 0,
      age: 28,
      country: "Canada",
      categories: ["piercing", "blonde"],
      rating: 4.2,
      price: 3.49,
      language: "French",
      streamUrl: "/livecam/2"
    },
    {
      id: "3",
      displayName: "Charlie",
      thumbnailUrl: "https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=600",
      isLive: true,
      viewerCount: 456,
      age: 32,
      country: "UK",
      categories: ["redhead", "glasses"],
      rating: 4.8,
      price: 3.99,
      language: "English",
      streamUrl: "/livecam/3"
    },
    {
      id: "4",
      displayName: "David",
      thumbnailUrl: "https://images.pexels.com/photos/1066886/pexels-photo-1066886.jpeg?auto=compress&cs=tinysrgb&w=600",
      isLive: false,
      viewerCount: 0,
      age: 24,
      country: "Australia",
      categories: ["tattoo", "brunette"],
      rating: 4.0,
      price: 2.49,
      language: "English",
      streamUrl: "/livecam/4"
    },
    {
      id: "5",
      displayName: "Eve",
      thumbnailUrl: "https://images.pexels.com/photos/1856664/pexels-photo-1856664.jpeg?auto=compress&cs=tinysrgb&w=600",
      isLive: true,
      viewerCount: 789,
      age: 30,
      country: "Germany",
      categories: ["piercing", "blonde"],
      rating: 4.6,
      price: 4.49,
      language: "German",
      streamUrl: "/livecam/5"
    },
    {
      id: "6",
      displayName: "Frank",
      thumbnailUrl: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600",
      isLive: false,
      viewerCount: 0,
      age: 26,
      country: "France",
      categories: ["redhead", "glasses"],
      rating: 4.3,
      price: 3.49,
      language: "French",
      streamUrl: "/livecam/6"
    },
    {
      id: "7",
      displayName: "Grace",
      thumbnailUrl: "https://images.pexels.com/photos/1856670/pexels-photo-1856670.jpeg?auto=compress&cs=tinysrgb&w=600",
      isLive: true,
      viewerCount: 1011,
      age: 29,
      country: "Spain",
      categories: ["tattoo", "brunette"],
      rating: 4.7,
      price: 4.99,
      language: "Spanish",
      streamUrl: "/livecam/7"
    },
    {
      id: "8",
      displayName: "Henry",
      thumbnailUrl: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600",
      isLive: false,
      viewerCount: 0,
      age: 31,
      country: "Italy",
      categories: ["piercing", "blonde"],
      rating: 4.1,
      price: 2.99,
      language: "Italian",
      streamUrl: "/livecam/8"
    }
  ]);
  const [filter, setFilter] = useState<FilterState>({
    search: "",
    category: "All",
    ageRange: [18, 40],
    sortBy: "Rating"
  });
  const [showFilters, setShowFilters] = useState(false);
  const [boostedModelIds, setBoostedModelIds] = useState<string[]>([]);
  const { openBoostDialog } = useBoostDialog();

  useEffect(() => {
    // Simulate fetching boosted models from an API
    const boosted = ["1", "3", "5"];
    setBoostedModelIds(boosted);
  }, []);

  const handleBoostModel = (modelId: string) => {
    openBoostDialog({
      modelId,
      onSuccess: () => {
        setBoostedModelIds([...boostedModelIds, modelId]);
      }
    });
  };

  const handleCancelBoost = (modelId: string) => {
    setBoostedModelIds(boostedModelIds.filter((id) => id !== modelId));
  };

  const filteredModels = models.filter((model) => {
    const searchRegex = new RegExp(filter.search, "i");
    const categoryMatch = filter.category === "All" || model.categories?.includes(filter.category);
    const ageMatch = model.age && model.age >= filter.ageRange[0] && model.age <= filter.ageRange[1];

    return searchRegex.test(model.displayName) && categoryMatch && ageMatch;
  }).sort((a, b) => {
    if (filter.sortBy === "Rating") {
      return (b.rating || 0) - (a.rating || 0);
    }
    return 0;
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold">Livecam Models</h1>
            <p className="text-muted-foreground">
              Explore our diverse collection of livecam models.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Search models..."
              className="md:w-64"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            />
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {showFilters && (
          <Card className="mb-6">
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-medium mb-2">Category</h3>
                <Select
                  value={filter.category}
                  onValueChange={(value) => setFilter({ ...filter, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="tattoo">Tattoo</SelectItem>
                    <SelectItem value="piercing">Piercing</SelectItem>
                    <SelectItem value="brunette">Brunette</SelectItem>
                    <SelectItem value="blonde">Blonde</SelectItem>
                    <SelectItem value="redhead">Redhead</SelectItem>
                    <SelectItem value="glasses">Glasses</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Age Range</h3>
                <div className="flex items-center space-x-2">
                  <p className="text-sm">{filter.ageRange[0]}</p>
                  <Slider
                    defaultValue={filter.ageRange}
                    max={40}
                    min={18}
                    step={1}
                    onValueChange={(value) => setFilter({ ...filter, ageRange: [value[0], value[1]] as [number, number] })}
                  />
                  <p className="text-sm">{filter.ageRange[1]}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Sort By</h3>
                <Select
                  value={filter.sortBy}
                  onValueChange={(value) => setFilter({ ...filter, sortBy: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {filteredModels.map((model) => (
            <LivecamCard 
              key={model.id}
              model={model}
              isBoosted={boostedModelIds.includes(model.id)}
              onBoost={() => handleBoostModel(model.id)}
              onCancelBoost={() => handleCancelBoost(model.id)}
              showBoostControls={true}
            />
          ))}
        </div>

        {filteredModels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No models found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Livecams;
