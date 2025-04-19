
import React from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface RecommendationsProps {
  recommendations: string[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => (
  <AccordionItem value="recommendations">
    <AccordionTrigger>Recommendations</AccordionTrigger>
    <AccordionContent>
      <ul className="list-disc pl-4 space-y-2">
        {recommendations.map((rec, i) => (
          <li key={i} className="text-sm">{rec}</li>
        ))}
      </ul>
    </AccordionContent>
  </AccordionItem>
);

export default Recommendations;
