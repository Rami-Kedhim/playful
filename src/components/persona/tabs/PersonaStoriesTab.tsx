
import React, { useState } from 'react';
import { UberPersona } from '@/types/uberPersona';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from 'lucide-react';

interface PersonaStoriesTabProps {
  persona: UberPersona;
}

const PersonaStoriesTab: React.FC<PersonaStoriesTabProps> = ({ persona }) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  
  // Mock stories data
  const stories = [
    { 
      id: 1, 
      thumbnail: "https://source.unsplash.com/300x600/?selfie,1", 
      timestamp: "3h ago",
      viewed: false
    },
    { 
      id: 2, 
      thumbnail: "https://source.unsplash.com/300x600/?travel,2", 
      timestamp: "6h ago",
      viewed: false
    },
    { 
      id: 3, 
      thumbnail: "https://source.unsplash.com/300x600/?portrait,3", 
      timestamp: "12h ago",
      viewed: true
    },
    { 
      id: 4, 
      thumbnail: "https://source.unsplash.com/300x600/?fashion,4", 
      timestamp: "1d ago",
      viewed: true
    }
  ];
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Stories</h2>
      
      {selectedStoryIndex !== null ? (
        <div className="relative">
          <div className="max-w-md mx-auto bg-black rounded-lg overflow-hidden">
            <div className="relative aspect-[9/16]">
              <img 
                src={stories[selectedStoryIndex].thumbnail} 
                alt="Story" 
                className="w-full h-full object-cover"
              />
              
              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 flex gap-1 p-2">
                {stories.map((_, index) => (
                  <div 
                    key={index} 
                    className={`h-1 rounded-full flex-1 ${index <= selectedStoryIndex ? 'bg-white' : 'bg-white/30'}`}
                  />
                ))}
              </div>
              
              {/* Header */}
              <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4">
                <div className="flex items-center">
                  <img 
                    src={persona.avatarUrl || "https://via.placeholder.com/40"} 
                    alt={persona.displayName} 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <div className="text-white font-medium">{persona.displayName}</div>
                    <div className="text-white/70 text-xs flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {stories[selectedStoryIndex].timestamp}
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white"
                  onClick={() => setSelectedStoryIndex(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </Button>
              </div>
              
              {/* Navigation */}
              <button 
                className="absolute top-0 bottom-0 left-0 w-1/2"
                onClick={() => {
                  if (selectedStoryIndex > 0) {
                    setSelectedStoryIndex(selectedStoryIndex - 1);
                  }
                }}
              />
              <button 
                className="absolute top-0 bottom-0 right-0 w-1/2"
                onClick={() => {
                  if (selectedStoryIndex < stories.length - 1) {
                    setSelectedStoryIndex(selectedStoryIndex + 1);
                  } else {
                    setSelectedStoryIndex(null);
                  }
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {stories.map((story, index) => (
            <div 
              key={story.id} 
              className="cursor-pointer"
              onClick={() => setSelectedStoryIndex(index)}
            >
              <div className={`rounded-lg overflow-hidden border-2 ${story.viewed ? 'border-gray-300' : 'border-primary'} aspect-[3/5]`}>
                <img 
                  src={story.thumbnail} 
                  alt="Story thumbnail" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {story.timestamp}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!selectedStoryIndex && (
        <div className="mt-6 text-center">
          <Button>View All Stories</Button>
        </div>
      )}
    </div>
  );
};

export default PersonaStoriesTab;
