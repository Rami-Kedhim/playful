
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-20 container mx-auto px-4">
      <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-lucoin/20 rounded-xl p-10 border border-white/5 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Experience UberEscorts?
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Join thousands of escorts, clients, and content creators on the most secure and sophisticated adult platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/auth">Create Account</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/escorts">Browse Escorts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
