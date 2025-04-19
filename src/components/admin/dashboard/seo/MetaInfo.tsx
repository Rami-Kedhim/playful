
import React from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

interface MetaInfoProps {
  metaDescription?: string;
  metaTags?: string[];
}

const MetaInfo: React.FC<MetaInfoProps> = ({ metaDescription, metaTags }) => (
  <AccordionItem value="meta">
    <AccordionTrigger>Meta Information</AccordionTrigger>
    <AccordionContent>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Meta Description</h4>
        <p className="text-sm">{metaDescription}</p>

        {metaTags && metaTags.length > 0 && (
          <>
            <h4 className="text-sm font-medium mt-4">Meta Tags</h4>
            <div className="flex flex-wrap gap-1">
              {metaTags.map((tag, i) => (
                <Badge key={i} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </>
        )}
      </div>
    </AccordionContent>
  </AccordionItem>
);

export default MetaInfo;
