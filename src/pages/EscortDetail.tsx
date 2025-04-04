
import { useParams, useNavigate } from "react-router-dom";
import { escorts } from "@/data/escortData";
import { getEscortById } from "@/data/escortData";
import MainLayout from "@/components/layout/MainLayout";
import EscortProfile from "@/components/escorts/detail/EscortProfile";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import VerificationBadge from "@/components/verification/VerificationBadge";

const EscortDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const escort = id ? getEscortById(id) : undefined;
  
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
  
  const pageTitle = `${escort.name}, ${escort.age} | Escort in ${escort.location}`;
  const pageDescription = `Book ${escort.name}, a ${escort.age} year old escort in ${escort.location}. View photos, services, and rates.`;
  
  // Convert verificationLevel to the expected type
  const verificationLevel = (escort.verificationLevel || "none") as "none" | "basic" | "enhanced" | "premium";
  
  return (
    <MainLayout showHeader={false}>
      <div>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/escorts')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Escorts
          </Button>
        </div>
        
        {escort.verified ? (
          <Alert className="mb-6 bg-primary/10 border-primary/20">
            <Shield className="h-4 w-4 text-primary" />
            <AlertTitle>Verified Escort</AlertTitle>
            <AlertDescription>
              This escort has been verified by our team. Their identity and photos are real.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="mb-6 bg-amber-500/10 border-amber-500/20">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertTitle>Verification Pending</AlertTitle>
            <AlertDescription>
              This escort has not been verified yet. Please exercise caution.
            </AlertDescription>
          </Alert>
        )}
        
        <EscortProfile 
          escort={escort} 
          onBookNow={handleBookNow} 
        />
      </div>
    </MainLayout>
  );
};

export default EscortDetail;
