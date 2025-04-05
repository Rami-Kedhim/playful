
import React from "react";
import { ChatMessage } from "./types";
import { SystemMessage } from "./";
import { TipMessage } from "./";
import { JoinLeaveMessage } from "./";
import { ChatMessage as ChatMessageComponent } from "./";

interface ChatMessageListProps {
  messages: ChatMessage[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, messagesEndRef }) => {
  const renderMessage = (message: ChatMessage) => {
    switch (message.type) {
      case "normal":
        return <ChatMessageComponent key={message.id} message={message} />;
      case "tip":
        return <TipMessage key={message.id} message={message} />;
      case "system":
        return <SystemMessage key={message.id} message={message} />;
      case "join":
      case "leave":
        return <JoinLeaveMessage key={message.id} message={message} />;
      default:
        return null;
    }
  };

  return (
    <>
      {messages.map(message => renderMessage(message))}
      <div ref={messagesEndRef} />
    </>
  );
};

export default ChatMessageList;
