
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { User } from 'lucide-react';

interface Testimonial {
  content: string;
  author: string;
  role?: string;
  avatarUrl?: string;
}

interface TestimonialGridProps {
  testimonials?: Testimonial[];
  title?: string;
}

export const TestimonialGrid: React.FC<TestimonialGridProps> = ({
  title = "What Our Users Say",
  testimonials = defaultTestimonials
}) => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="relative">
                <div className="absolute -top-8 left-0 text-4xl text-primary opacity-30">"</div>
                <p className="italic text-muted-foreground z-10 relative">{testimonial.content}</p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center gap-4 pt-4 border-t">
              {testimonial.avatarUrl ? (
                <img 
                  src={testimonial.avatarUrl} 
                  alt={testimonial.author} 
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User size={18} className="text-primary" />
                </div>
              )}
              <div>
                <p className="font-medium">{testimonial.author}</p>
                {testimonial.role && <p className="text-xs text-muted-foreground">{testimonial.role}</p>}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

const defaultTestimonials: Testimonial[] = [
  {
    content: "UberEscorts has completely transformed my experience as an escort. The AI boost feature ensures I'm visible to the right clients at the right time.",
    author: "Alexandra",
    role: "Verified Escort"
  },
  {
    content: "The verification system gives me peace of mind. I know I'm connecting with real, vetted professionals.",
    author: "Michael",
    role: "Premium Client"
  },
  {
    content: "As a content creator, the UBX wallet system makes monetization seamless. The zero-commission model is a game-changer.",
    author: "Sophia",
    role: "Content Creator"
  }
];
