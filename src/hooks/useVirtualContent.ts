
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
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { processLucoinTransaction } = useLucoins();
  
  // In a real application, we'd fetch this from the server
  useEffect(() => {
    setError(null);
    const storedUnlockedContent = localStorage.getItem('unlockedContent');
    if (storedUnlockedContent) {
      try {
        setUnlockedContent(JSON.parse(storedUnlockedContent));
      } catch (error) {
        console.error("Failed to parse unlocked content from localStorage", error);
        setError("Failed to load your unlocked content");
      }
    }
  }, []);
  
  const saveUnlockedContent = (contentIds: string[]) => {
    try {
      localStorage.setItem('unlockedContent', JSON.stringify(contentIds));
      setUnlockedContent(contentIds);
    } catch (error) {
      console.error("Failed to save unlocked content to localStorage", error);
      setError("Failed to save your unlocked content");
    }
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
      return true;
    }
    
    setUnlockingContentId(contentId);
    setError(null);
    
    try {
      // Process payment with Lucoins
      const transactionResult = await processLucoinTransaction({
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
        // Add to unlocked content
        const updatedUnlockedContent = [...unlockedContent, contentId];
        saveUnlockedContent(updatedUnlockedContent);
        
        toast({
          title: "Content Unlocked",
          description: `You now have access to this ${contentType}`,
        });
        return true;
      } else {
        toast({
          title: "Transaction Failed",
          description: "Could not complete the transaction",
          variant: "destructive",
        });
        return false;
      }
    } catch (error: any) {
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
    error
  };
};

export default useVirtualContent;
