
import React from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

type KeywordDensityType = Record<string, number>;

interface KeywordsAnalysisProps {
  keywordDensity: KeywordDensityType;
  priorityKeywords?: string[];
}

const KeywordsAnalysis: React.FC<KeywordsAnalysisProps> = ({ keywordDensity, priorityKeywords }) => (
  <AccordionItem value="keywords">
    <AccordionTrigger>Keywords Analysis</AccordionTrigger>
    <AccordionContent>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Keyword Density</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(keywordDensity).map(([keyword, density]) => (
            <div key={keyword} className="flex justify-between">
              <span className="text-sm">{keyword}</span>
              <span className="text-sm font-medium">{density.toFixed(2)}%</span>
            </div>
          ))}
        </div>

        {priorityKeywords && priorityKeywords.length > 0 && (
          <>
            <h4 className="text-sm font-medium mt-4">Priority Keywords</h4>
            <div className="flex flex-wrap gap-1">
              {priorityKeywords.map(keyword => (
                <Badge key={keyword} variant="outline">{keyword}</Badge>
              ))}
            </div>
          </>
        )}
      </div>
    </AccordionContent>
  </AccordionItem>
);

export default KeywordsAnalysis;
