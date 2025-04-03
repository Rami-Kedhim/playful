
import { 
  Shield, 
  User, 
  MessageCircle,
  CreditCard,
  Tv,
  MapPin
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HowItWorksSection = () => {
  const escortSteps = [
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Verify Your Identity",
      description: "Complete our secure ID and selfie verification to unlock all platform features."
    },
    {
      icon: <User className="h-6 w-6 text-primary" />,
      title: "Create Your Profile",
      description: "Build your professional profile with photos, services, and availability."
    },
    {
      icon: <Tv className="h-6 w-6 text-primary" />,
      title: "Optional: Create Content",
      description: "Upload videos or start livestreams to earn additional Lucoin revenue."
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Share Secure Routes",
      description: "Use our encrypted GPS sharing to safely connect with verified clients."
    }
  ];

  const clientSteps = [
    {
      icon: <User className="h-6 w-6 text-accent" />,
      title: "Register & Browse",
      description: "Create an account and browse real, verified escorts in your area."
    },
    {
      icon: <Shield className="h-6 w-6 text-accent" />,
      title: "Optional: Get Verified",
      description: "Verify your identity to unlock messaging and route sharing features."
    },
    {
      icon: <CreditCard className="h-6 w-6 text-accent" />,
      title: "Add Lucoin",
      description: "Purchase Lucoin tokens for tipping, content access, and more."
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-accent" />,
      title: "Connect Safely",
      description: "Message, share secure routes, and enjoy premium content."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">HOW IT WORKS</Badge>
          <h2 className="text-3xl font-bold mb-6">A Platform Designed for Both Sides</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            UberEscorts creates a secure environment where verified escorts and clients can connect with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">For Escorts & Creators</h3>
            </div>
            
            <div className="space-y-8">
              {escortSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">{step.title}</h4>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                <User className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">For Clients</h3>
            </div>
            
            <div className="space-y-8">
              {clientSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">{step.title}</h4>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
