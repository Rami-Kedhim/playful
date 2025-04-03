
import { Globe, ThreeDCubeSphere } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MetaverseSection = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4">COMING SOON</Badge>
        <h2 className="text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Premium VR Experiences
          </span>
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          The future of UberEscorts extends to our private metaverse. Connect with escorts and creators in breathtaking virtual environments with lifelike avatars.
        </p>
      </div>
      
      <div className="relative h-[400px] rounded-xl overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/metaverse-preview.jpg')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
          <ThreeDCubeSphere className="h-16 w-16 text-primary mb-6 animate-float" />
          
          <div className="max-w-xl text-center mb-8">
            <h3 className="text-2xl font-bold mb-3">Virtual Escort Experiences</h3>
            <p className="text-gray-300">
              From private virtual meetings to exclusive content rooms, our metaverse 
              brings new dimensions to adult entertainment with next-level privacy.
            </p>
          </div>
          
          <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
            <Globe className="h-5 w-5" />
            Join the Waitlist
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MetaverseSection;
