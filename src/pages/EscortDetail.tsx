
import { useParams, useNavigate } from "react-router-dom";
import { escorts } from "@/data/escortData";
import { getEscortById } from "@/utils/escortUtils";
import AppLayout from "@/components/layout/AppLayout";
import EscortProfile from "@/components/escorts/detail/EscortProfile";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EscortDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const escort = id ? getEscortById(escorts, id) : undefined;
  
  if (!escort) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Escort Not Found</h1>
          <p className="mb-6">The escort you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/escorts')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Escorts
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  const handleBookNow = () => {
    toast({
      title: "Booking Request Sent",
      description: `Your booking request for ${escort.name} has been sent.`,
    });
  };
  
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate('/escorts')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Escorts
        </Button>
        
        <EscortProfile 
          escort={escort} 
          onBookNow={handleBookNow} 
        />
      </div>
    </AppLayout>
  );
};

export default EscortDetail;
