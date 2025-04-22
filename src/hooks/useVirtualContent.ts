
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUbx } from "@/hooks/useUbx";
import { logContentAction, logContentError, logContentFlow } from "@/utils/debugUtils";

export type ContentType = "photo" | "video" | "message";

interface UnlockContentOptions {
  creatorId: string;
  contentId: string;
  contentType: ContentType;
  price: number;
}

export const useVirtualContent = () => {
  const [unlockingContentId, setUnlockingContentId] = useState<string | null>(null);
  const [unlockedContent, setUnlockedContent] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { processUbxTransaction } = useUbx();
  
  useEffect(() => {
    setError(null);
    const storedUnlockedContent = localStorage.getItem('unlockedContent');
    if (storedUnlockedContent) {
      try {
        const parsed = JSON.parse(storedUnlockedContent);
        setUnlockedContent(parsed);
        logContentAction('Loaded unlocked content', { count: parsed.length });
      } catch (error) {
        console.error("Failed to parse unlocked content from localStorage", error);
        logContentError('Loading unlocked content', error);
        setError("Failed to load your unlocked content");
      }
    }
  }, []);
  
  const saveUnlockedContent = (contentIds: string[]) => {
    try {
      localStorage.setItem('unlockedContent', JSON.stringify(contentIds));
      setUnlockedContent(contentIds);
      logContentAction('Saved unlocked content', { count: contentIds.length });
    } catch (error) {
      console.error("Failed to save unlocked content to localStorage", error);
      logContentError('Saving unlocked content', error);
      setError("Failed to save your unlocked content");
    }
  };
  
  const isContentUnlocked = (contentId: string): boolean => {
    return unlockedContent.includes(contentId);
  };
  
  const unlockContent = async (options: UnlockContentOptions) => {
    const { creatorId, contentId, contentType, price } = options;
    
    logContentFlow('Starting unlock process', contentId, { creatorId, contentType, price });
    
    if (isContentUnlocked(contentId)) {
      logContentFlow('Content already unlocked', contentId);
      toast({
        title: "Already Unlocked",
        description: "You already have access to this content",
      });
      return true;
    }
    
    setUnlockingContentId(contentId);
    setError(null);
    
    try {
      logContentFlow('Processing payment', contentId, { price });
      const transactionResult = await processUbxTransaction({
        amount: price,
        transactionType: 'purchase',
        description: `Unlock ${contentType} content`,
        metadata: {
          contentId,
          contentType,
          creatorId
        }
      });
      
      if (transactionResult) {
        logContentFlow('Payment successful', contentId);
        const updatedUnlockedContent = [...unlockedContent, contentId];
        saveUnlockedContent(updatedUnlockedContent);
        
        toast({
          title: "Content Unlocked",
          description: `You now have access to this ${contentType}`,
        });
        return true;
      } else {
        logContentFlow('Payment failed', contentId);
        toast({
          title: "Transaction Failed",
          description: "Could not complete the transaction",
          variant: "destructive",
        });
        return false;
      }
    } catch (error: any) {
      logContentError('Unlocking content', error);
      console.error("Error unlocking content:", error);
      setError(error.message || "Failed to unlock content");
      toast({
        title: "Error",
        description: "Failed to unlock content. Please try again later.",
        variant: "destructive",
      });
      return false;
    } finally {
      setUnlockingContentId(null);
    }
  };
  
  return {
    isUnlocking: !!unlockingContentId,
    unlockingContentId,
    isContentUnlocked,
    unlockContent,
    error,
    unlockedContent
  };
};

export default useVirtualContent;
