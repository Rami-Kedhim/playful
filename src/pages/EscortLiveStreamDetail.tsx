
import React from 'react';
import { useParams } from 'react-router-dom';
import { useLivecamDetail } from '@/hooks/useLivecamDetail';

// Replace the placeholder code with proper code
const EscortLiveStreamDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { livecam, loading, error } = useLivecamDetail(id || '');

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          <h2 className="text-xl font-semibold">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading || !livecam) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            {livecam.isLive ? (
              <div className="relative h-full w-full">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={livecam.streamUrl}
                  poster={livecam.thumbnailUrl || livecam.imageUrl || 'https://example.com/placeholder.jpg'}
                  controls
                  autoPlay
                ></video>
                <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
                  LIVE
                </div>
                <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                  {livecam.viewerCount} viewers
                </div>
              </div>
            ) : (
              <img
                src={livecam.thumbnailUrl || livecam.imageUrl || 'https://example.com/placeholder.jpg'}
                alt={livecam.displayName}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold">{livecam.displayName}</h1>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className="text-muted-foreground">{livecam.username}</span>
              {livecam.country && (
                <span className="text-muted-foreground">• {livecam.country}</span>
              )}
            </div>
            <p className="mt-4">{livecam.description}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Stream Info</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className={livecam.isLive ? "text-green-500 font-medium" : "text-gray-500"}>
                  {livecam.isLive ? "Live" : "Offline"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Viewers:</span>
                <span>{livecam.viewerCount}</span>
              </div>
              {livecam.rating && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating:</span>
                  <span>{livecam.rating}/5</span>
                </div>
              )}
              {livecam.category && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span>{livecam.category}</span>
                </div>
              )}
              {livecam.language && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language:</span>
                  <span>{livecam.language}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscortLiveStreamDetail;
