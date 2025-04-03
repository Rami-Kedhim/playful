
import { 
  ShieldCheck, 
  MapPin, 
  Wallet, 
  Video, 
  MessageSquare,
  Lock
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Verified Users Only",
      description: "Every escort and client is verified through our secure ID and selfie verification process."
    },
    {
      icon: <MapPin className="h-6 w-6 text-accent" />,
      title: "Privacy-First GPS",
      description: "E2E encrypted route sharing between verified users for maximum safety and discretion."
    },
    {
      icon: <Wallet className="h-6 w-6 text-lucoin" />,
      title: "Lucoin Economy",
      description: "Our native token system enables frictionless payments, tipping, and content access."
    },
    {
      icon: <Video className="h-6 w-6 text-primary" />,
      title: "Creator Platform",
      description: "Monetize with premium content, livestreams, and secure pay-per-view experiences."
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-accent" />,
      title: "Lucie AI Assistant",
      description: "Our elegant, intelligent AI persona to guide and enhance your UberEscorts experience."
    },
    {
      icon: <Lock className="h-6 w-6 text-lucoin" />,
      title: "Zero Trust Security",
      description: "Industry-leading encryption, privacy, and content moderation to protect all users."
    }
  ];

  return (
    <section className="py-20 container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          The Complete Web3 Adult Ecosystem
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          UberEscorts unifies verification, secure payments, content creation, and privacy in one powerful platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="p-6 glass-card rounded-xl border border-white/10 hover:border-primary/30 transition-all duration-300"
          >
            <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
