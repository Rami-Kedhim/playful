
import React from 'react';

const AICompanionChatStyles: React.FC = () => {
  return (
    <style>
      {`
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
      
      /* Improve scrollbar appearance */
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
      `}
    </style>
  );
};

export default AICompanionChatStyles;
