
import React, { useState, useEffect } from 'react';
import { oxum } from '@/core';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const performSearch = async () => {
      if (!searchTerm) return;
      
      setLoading(true);
      try {
        // Mock search results
        const mockResults = [
          { id: '1', name: 'Result 1', relevance: 0.95 },
          { id: '2', name: 'Result 2', relevance: 0.85 },
          { id: '3', name: 'Result 3', relevance: 0.75 }
        ];
        
        // Apply boost calculation to results
        const boostedResults = await Promise.all(mockResults.map(async (result) => {
          // Create a numeric array from the result's relevance for scoring
          const scoreInput = [result.relevance * 100]; // Convert to range 0-100
          const boostScore = await oxum.calculateScore(scoreInput);
          
          return {
            ...result,
            boostScore
          };
        }));
        
        // Sort by combined score (relevance + boost)
        boostedResults.sort((a, b) => {
          const aScore = a.relevance + (a.boostScore / 100);
          const bScore = b.relevance + (b.boostScore / 100);
          return bScore - aScore;
        });
        
        setResults(boostedResults);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    performSearch();
  }, [searchTerm]);
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Search Page</h1>
      
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="px-4 py-2 border rounded w-full mb-6"
      />
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-4">
          {results.map(result => (
            <li key={result.id} className="border p-4 rounded">
              <h2 className="text-lg font-semibold">{result.name}</h2>
              <div className="text-sm text-gray-500">
                Relevance: {Math.round(result.relevance * 100)}% | 
                Boost: {result.boostScore}
              </div>
            </li>
          ))}
          {results.length === 0 && searchTerm && (
            <div>No results found for "{searchTerm}"</div>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
