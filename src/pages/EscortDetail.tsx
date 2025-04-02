
import { useParams, useNavigate } from "react-router-dom";
import { escorts } from "@/data/escortData";
import { getEscortById } from "@/utils/escortUtils";
import MainLayout from "@/components/layout/MainLayout";
import EscortProfile from "@/components/escorts/detail/EscortProfile";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const EscortDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const escort = id ? getEscortById(escorts, id) : undefined;
  
  if (!escort) {
    return (
      <MainLayout containerClass="text-center">
        <h1 className="text-2xl font-bold mb-4">Escort Not Found</h1>
        <p className="mb-6">The escort you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/escorts')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Escorts
        </Button>
      </MainLayout>
    );
  }
  
  const handleBookNow = () => {
    toast({
      title: "Booking Request Sent",
      description: `Your booking request for ${escort.name} has been sent.`,
    });
  };
  
  return (
    <MainLayout showHeader={false}>
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
    </MainLayout>
  );
};

export default EscortDetail;
