
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MetaverseSection = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4">COMING SOON</Badge>
        <h2 className="text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Enter the Adult Metaverse
          </span>
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Experience the future of adult entertainment in our immersive 3D virtual world. 
          Connect with escorts and creators in breathtaking environments with lifelike avatars.
        </p>
      </div>
      
      <div className="relative h-[400px] rounded-xl overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
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
