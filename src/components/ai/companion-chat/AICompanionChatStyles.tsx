
import React from 'react';

const AICompanionChatStyles = () => {
  return (
    <style>
      {`
      .typing-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: white;
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
      `}
    </style>
  );
};

export default AICompanionChatStyles;
