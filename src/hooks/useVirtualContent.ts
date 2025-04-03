
import { useState } from "react";
import { useLucoins } from "@/hooks/useLucoins";
import { toast } from "@/components/ui/use-toast";

export type ContentType = "photo" | "video" | "message";

interface UnlockOptions {
  creatorId: string;
  contentId: string;
  contentType: ContentType;
  price: number;
}

export const useVirtualContent = () => {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockedContentIds, setUnlockedContentIds] = useState<string[]>([]);
  const { processLucoinTransaction } = useLucoins();

  const unlockContent = async ({ creatorId, contentId, contentType, price }: UnlockOptions): Promise<boolean> => {
    setIsUnlocking(true);
    
    try {
      // Process the transaction using Lucoins
      const result = await processLucoinTransaction({
        amount: -price, // Negative amount for spending
        transactionType: "content_unlock",
        description: `Unlocked ${contentType} from virtual creator`,
        metadata: {
          creatorId,
          contentId,
          contentType
        }
      });
      
      if (result) {
        // Add to unlocked content
        setUnlockedContentIds(prev => [...prev, contentId]);
        
        // Show success toast
        toast({
          title: "Content Unlocked",
          description: `You have successfully unlocked this ${contentType}`,
        });
        
        return true;
      } else {
        // Show error toast
        toast({
          title: "Unlock Failed",
          description: "There was an issue processing your payment",
          variant: "destructive",
        });
        
        return false;
      }
    } catch (error: any) {
      console.error("Error unlocking content:", error);
      
      toast({
        title: "Error",
        description: error.message || "Failed to unlock content",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsUnlocking(false);
    }
  };

  const isContentUnlocked = (contentId: string): boolean => {
    return unlockedContentIds.includes(contentId);
  };

  return {
    unlockContent,
    isContentUnlocked,
    isUnlocking,
    unlockedContentIds
  };
};
