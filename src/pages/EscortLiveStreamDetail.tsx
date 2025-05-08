
import React from 'react';
import LivecamDetailLayout from '@/components/livecams/detail/LivecamDetailLayout';
import { useParams } from 'react-router-dom';
import { useLivecamDetail } from '@/hooks/useLivecamDetail';

const EscortLiveStreamDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { livecam, isLoading, error } = useLivecamDetail(id || '');
  
  if (isLoading) {
    return <div className="p-8 text-center">Loading livecam details...</div>;
  }
  
  if (error || !livecam) {
    return <div className="p-8 text-center">Error loading livecam: {error || 'Livecam not found'}</div>;
  }
  
  // Create the title component
  const TitleComponent = (
    <div className="p-4 bg-background">
      <h1 className="text-xl font-semibold">{livecam.username}'s Livestream</h1>
      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
        <div className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${livecam.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span>{livecam.isOnline ? 'Live Now' : 'Offline'}</span>
        </div>
        <div>
          {livecam.viewerCount} viewers
        </div>
      </div>
    </div>
  );
  
  // Create the main content component
  const MainContent = (
    <div className="rounded-lg overflow-hidden">
      <div className="bg-black aspect-video w-full relative">
        {livecam.isOnline ? (
          // Placeholder for actual video player - would be replaced with a real video component
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <div className="mb-2 text-lg font-medium">Live Video Stream</div>
              <div className="text-sm text-white/70">Streaming in HD quality</div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white bg-gray-900">
            <div className="text-center">
              <div className="mb-2 text-lg font-medium">Stream Offline</div>
              <div className="text-sm text-white/70">Check back later or subscribe for notifications</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-card">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-3 bg-muted rounded-lg text-center">
            <div className="text-sm font-medium">Category</div>
            <div className="text-xs text-muted-foreground mt-1">{livecam.category || 'General'}</div>
          </div>
          <div className="p-3 bg-muted rounded-lg text-center">
            <div className="text-sm font-medium">Duration</div>
            <div className="text-xs text-muted-foreground mt-1">45:23</div>
          </div>
          <div className="p-3 bg-muted rounded-lg text-center">
            <div className="text-sm font-medium">Quality</div>
            <div className="text-xs text-muted-foreground mt-1">1080p HD</div>
          </div>
        </div>
        
        <h2 className="text-lg font-medium mb-2">About This Stream</h2>
        <p className="text-muted-foreground text-sm">
          Join {livecam.username} for an exciting livestream session. Interact, chat, and enjoy a personalized experience.
        </p>
      </div>
    </div>
  );
  
  // Create the sidebar component
  const Sidebar = (
    <div className="bg-card rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-medium">Streamer Info</h3>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
            {livecam.imageUrl && <img src={livecam.imageUrl} alt={livecam.username} className="w-full h-full object-cover" />}
          </div>
          <div>
            <div className="font-medium">{livecam.username}</div>
            <div className="text-xs text-muted-foreground">Streaming since 2022</div>
          </div>
        </div>
        
        <div className="space-y-3 text-sm">
          <div>
            <div className="text-muted-foreground">Tags</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {livecam.tags && livecam.tags.map((tag: string) => (
                <div key={tag} className="px-2 py-1 bg-muted text-xs rounded-full">{tag}</div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="text-muted-foreground">Schedule</div>
            <div className="mt-1">
              Mon-Fri: 8PM-11PM<br />
              Weekends: 2PM-6PM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Create the chat component
  const ChatContent = (
    <div className="bg-card h-full rounded-lg overflow-hidden flex flex-col">
      <div className="p-3 border-b">
        <h3 className="font-medium">Live Chat</h3>
      </div>
      
      <div className="flex-grow overflow-y-auto p-3 min-h-[300px]">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium">J</div>
            <div>
              <div><span className="font-medium text-sm">John:</span> <span className="text-sm">Hey everyone! The stream looks great today</span></div>
              <div className="text-xs text-muted-foreground">2:45 PM</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-xs font-medium">M</div>
            <div>
              <div><span className="font-medium text-sm">Maria:</span> <span className="text-sm">I love your setup! What camera are you using?</span></div>
              <div className="text-xs text-muted-foreground">2:47 PM</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs font-medium">A</div>
            <div>
              <div><span className="font-medium text-sm">Admin:</span> <span className="text-sm">Welcome to today's stream everyone!</span></div>
              <div className="text-xs text-muted-foreground">2:50 PM</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-3 border-t">
        <div className="flex gap-2">
          <input type="text" className="flex-grow px-3 py-1 text-sm border rounded-md" placeholder="Send a message..." />
          <button className="px-3 py-1 bg-primary text-white text-sm rounded-md">Send</button>
        </div>
      </div>
    </div>
  );
  
  return (
    <LivecamDetailLayout
      username={livecam.username}
      isOnline={livecam.isOnline}
      viewerCount={livecam.viewerCount}
      title={TitleComponent}
      mainContent={MainContent}
      sidebar={Sidebar}
      chatContent={ChatContent}
    >
      <div className="mt-6 p-4">
        {/* Additional content can go here */}
      </div>
    </LivecamDetailLayout>
  );
};

export default EscortLiveStreamDetail;
