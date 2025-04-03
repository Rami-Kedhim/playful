
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLucoins } from "@/hooks/useLucoins";

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
  const { toast } = useToast();
  const { processLucoinTransaction } = useLucoins();
  
  // In a real application, we'd fetch this from the server
  useEffect(() => {
    const storedUnlockedContent = localStorage.getItem('unlockedContent');
    if (storedUnlockedContent) {
      try {
        setUnlockedContent(JSON.parse(storedUnlockedContent));
      } catch (error) {
        console.error("Failed to parse unlocked content from localStorage", error);
      }
    }
  }, []);
  
  const saveUnlockedContent = (contentIds: string[]) => {
    localStorage.setItem('unlockedContent', JSON.stringify(contentIds));
    setUnlockedContent(contentIds);
  };
  
  const isContentUnlocked = (contentId: string): boolean => {
    return unlockedContent.includes(contentId);
  };
  
  const unlockContent = async (options: UnlockContentOptions) => {
    const { creatorId, contentId, contentType, price } = options;
    
    if (isContentUnlocked(contentId)) {
      toast({
        title: "Already Unlocked",
        description: "You already have access to this content",
      });
      return;
    }
    
    setUnlockingContentId(contentId);
    
    try {
      // Process payment
      const result = await processLucoinTransaction({
        amount: price,
        transactionType: 'purchase',
        description: `Unlock ${contentType} content`,
        metadata: {
          contentId,
          contentType,
          creatorId
        }
      });
      
      if (result) {
        // Add to unlocked content
        const updatedUnlockedContent = [...unlockedContent, contentId];
        saveUnlockedContent(updatedUnlockedContent);
        
        toast({
          title: "Content Unlocked",
          description: `You now have access to this ${contentType}`,
        });
      } else {
        toast({
          title: "Transaction Failed",
          description: "Could not complete the transaction",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error unlocking content:", error);
      toast({
        title: "Error",
        description: "Failed to unlock content. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setUnlockingContentId(null);
    }
  };
  
  return {
    isUnlocking: !!unlockingContentId,
    isContentUnlocked,
    unlockContent
  };
};

export default useVirtualContent;
