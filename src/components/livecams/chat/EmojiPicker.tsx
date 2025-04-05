
import React, { useEffect, useRef } from "react";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
}

// Common emojis that work across platforms
const commonEmojis = [
  "😀", "😂", "🥰", "😍", "😎", "🤔", "😅", "😊", 
  "👍", "👏", "🙌", "🔥", "❤️", "💯", "✨", "🎉",
  "😘", "😭", "🤣", "🥺", "😄", "😁", "🥳", "😆"
];

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect, onClose }) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  
  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  
  return (
    <div 
      ref={pickerRef}
      className="absolute bottom-14 left-0 z-50 p-2 bg-background border rounded-md shadow-lg grid grid-cols-8 gap-1 w-[240px]"
    >
      {commonEmojis.map((emoji, index) => (
        <button
          key={index}
          className="w-7 h-7 flex items-center justify-center hover:bg-muted rounded text-lg"
          onClick={() => onEmojiSelect(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};
