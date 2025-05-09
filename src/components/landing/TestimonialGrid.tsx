
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Testimonial {
  content: string;
  author: string;
  role: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    content: "UberEscorts has completely changed the way I connect with clients. The AI boost system has doubled my bookings.",
    author: "Alexandra K.",
    role: "Verified Escort",
    avatar: "/assets/testimonials/avatar1.jpg"
  },
  {
    content: "The security features give me peace of mind. Verification process is thorough but worth it.",
    author: "Michael T.",
    role: "Premium Client",
    avatar: "/assets/testimonials/avatar2.jpg"
  },
  {
    content: "As a content creator, the platform helps me reach the right audience with unparalleled efficiency.",
    author: "Sophia L.",
    role: "Content Creator",
    avatar: "/assets/testimonials/avatar3.jpg"
  }
];

export const TestimonialGrid: React.FC = () => {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-card border">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="italic text-muted-foreground">"{testimonial.content}"</p>
                
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    {testimonial.avatar ? (
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    ) : null}
                    <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
