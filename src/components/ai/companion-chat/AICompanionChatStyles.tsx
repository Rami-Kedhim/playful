
import React from 'react';

const AICompanionChatStyles: React.FC = () => {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      .typing-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: currentColor;
        margin: 0 2px;
        animation: typing 1s infinite ease-in-out;
      }
      
      .typing-dot:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .typing-dot:nth-child(3) {
        animation-delay: 0.4s;
      }
      
      @keyframes typing {
        0%, 100% {
          transform: translateY(0);
          opacity: 0.5;
        }
        50% {
          transform: translateY(-5px);
          opacity: 1;
        }
      }
      
      .animate-bounce-subtle {
        animation: bounce-subtle 2s ease infinite;
      }
      
      @keyframes bounce-subtle {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-2px);
        }
      }
      
      .animate-shake-subtle {
        animation: shake-subtle 1s ease infinite;
      }
      
      @keyframes shake-subtle {
        0%, 100% {
          transform: translateX(0);
        }
        25% {
          transform: translateX(-1px);
        }
        75% {
          transform: translateX(1px);
        }
      }
      
      /* Improved scrollbar appearance */
      .scrollbar-thin::-webkit-scrollbar {
        width: 6px;
      }
      
      .scrollbar-thin::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .scrollbar-thin::-webkit-scrollbar-thumb {
        background-color: rgba(155, 155, 155, 0.5);
        border-radius: 20px;
      }
      
      .scrollbar-thin::-webkit-scrollbar-thumb:hover {
        background-color: rgba(155, 155, 155, 0.7);
      }
      
      /* Confetti animation styles */
      @keyframes confettiDrop {
        0% {
          transform: translateY(-15px) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        25% {
          transform: translateY(0) rotate(90deg) translateX(5px);
          opacity: 1;
        }
        50% {
          transform: translateY(20px) rotate(180deg) translateX(-5px);
          opacity: 0.9;
        }
        75% {
          transform: translateY(35px) rotate(270deg) translateX(8px);
          opacity: 0.7;
        }
        90% {
          opacity: 0.3;
        }
        100% {
          transform: translateY(50px) rotate(360deg) translateX(-8px);
          opacity: 0;
        }
      }
      
      /* Sparkle effect for celebration messages */
      @keyframes sparkle {
        0%, 100% {
          background-position: -50% 0;
          opacity: 0.5;
        }
        50% {
          background-position: 150% 0;
          opacity: 0.8;
        }
      }
      
      .sparkle-text {
        position: relative;
      }
      
      .sparkle-text::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        background-size: 200% 100%;
        animation: sparkle 2s infinite linear;
        pointer-events: none;
      }
    `}} />
  );
};

export default AICompanionChatStyles;
