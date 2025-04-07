
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MinimizedChatButtonProps {
  onClick: () => void;
}

const MinimizedChatButton = ({ onClick }: MinimizedChatButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed right-6 bottom-6 p-3 w-14 h-14 flex items-center justify-center rounded-full shadow-lg z-50 bg-primary"
    >
      <Sparkles size={24} />
    </Button>
  );
};

export default MinimizedChatButton;
