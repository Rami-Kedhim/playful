
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { getEscortById } from "@/data/escortData";
import StreamViewer from "@/components/stream/StreamViewer";
import ChatContainer from "@/components/stream/ChatContainer";
import StreamInfo from "@/components/stream/StreamInfo";

const EscortLiveStreamDetail = () => {
  const { id } = useParams<{ id: string }>();
  const escort = id ? getEscortById(id) : undefined;
  
  if (!escort) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stream Not Found</h2>
          <p className="mb-6">The live stream you're looking for does not exist or has been removed.</p>
          <Button onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  // Mock stream data
  const stream = {
    id: `stream-${escort.id}`,
    title: `${escort.name}'s Live Stream`,
    description: "Join me for some fun and excitement! Don't miss out on this exclusive live content.",
    viewerCount: 142 + Math.floor(Math.random() * 50),
    startedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    streamUrl: "https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StreamViewer streamUrl={stream.streamUrl} />
            
            <div className="mt-6">
              <StreamInfo 
                title={stream.title}
                escortName={escort.name}
                avatarUrl={escort.avatar_url}
                viewerCount={stream.viewerCount}
                startedAt={stream.startedAt}
                verified={escort.verified || false}
                description={stream.description || escort.bio}
              />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <ChatContainer 
              streamId={stream.id}
              escortId={escort.id}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EscortLiveStreamDetail;
