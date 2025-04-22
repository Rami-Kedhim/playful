
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, Check, ImageIcon, FileText, Download } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { AIMessage } from '@/types/ai-profile';

interface AIMessageComponentProps {
  message: AIMessage;
  onUnlock?: (messageId: string) => Promise<void>;
}

const AIMessageComponent: React.FC<AIMessageComponentProps> = ({ message, onUnlock }) => {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const { id, content, isAI, timestamp, attachments, status } = message;
  
  // Check if message requires payment
  const requiresPayment = message.metadata?.requires_payment === true;
  const paymentStatus = message.metadata?.payment_status;
  
  // Handle unlock button click
  const handleUnlock = async () => {
    if (!onUnlock) return;
    
    setIsUnlocking(true);
    try {
      await onUnlock(id);
    } catch (error) {
      console.error('Error unlocking message:', error);
    } finally {
      setIsUnlocking(false);
    }
  };
  
  // Render attachments if they exist
  const renderAttachments = () => {
    if (!attachments || attachments.length === 0) return null;
    
    return (
      <div className="mt-2 flex flex-wrap gap-2">
        {attachments.map((attachment, index) => {
          const isImage = attachment.type.startsWith('image/');
          
          return (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-md bg-muted/30"
              style={{ width: isImage ? '100px' : 'auto', height: isImage ? '100px' : 'auto' }}
            >
              {isImage ? (
                <img 
                  src={attachment.url} 
                  alt={`Attachment ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center gap-2 p-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-xs truncate">File attachment</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                  <a href={attachment.url} download target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[80%] ${isAI ? 'order-last ml-2' : 'order-first mr-2'}`}>
        <Card className={`overflow-hidden border-0 ${isAI ? 'bg-muted/30' : 'bg-primary/10'}`}>
          <CardContent className="p-3">
            {requiresPayment && paymentStatus !== 'completed' ? (
              <div className="flex flex-col items-center py-2">
                <Lock className="h-5 w-5 mb-2 text-muted-foreground" />
                <p className="text-sm text-center mb-2">
                  This message requires payment to unlock.
                </p>
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  <span className="text-sm font-medium">{message.metadata?.price || 5} UBX</span>
                </div>
                <Button 
                  size="sm" 
                  onClick={handleUnlock}
                  disabled={isUnlocking}
                >
                  {isUnlocking ? 'Processing...' : 'Unlock Message'}
                </Button>
              </div>
            ) : (
              <>
                <p className="text-sm whitespace-pre-wrap">{content}</p>
                {renderAttachments()}
              </>
            )}
            
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>
                {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
              </span>
              {status === 'delivered' && !isAI && (
                <span className="flex items-center">
                  <Check className="h-3 w-3 mr-1" />
                  Delivered
                </span>
              )}
              {status === 'read' && !isAI && (
                <span className="flex items-center text-primary">
                  <Check className="h-3 w-3 mr-1" />
                  Read
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIMessageComponent;
