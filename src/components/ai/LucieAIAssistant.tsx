
import React, { useState } from 'react';
import { lucieAI } from '@/core/Lucie';
import { ModerateContentParams } from '@/types/core-systems';

const LucieAIAssistant: React.FC = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isModerated, setIsModerated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    
    try {
      // Check content moderation
      const moderationParams: ModerateContentParams = {
        content: message,
        contentType: 'text'
      };
      
      const moderationResult = await lucieAI.moderateContent(moderationParams);
      
      // Update moderation state
      setIsModerated(moderationResult.safe);
      
      // If content is safe, generate response
      if (moderationResult.safe) {
        const aiResponse = await lucieAI.generateText(message);
        setResponse(aiResponse);
      } else {
        setResponse("I'm sorry, I cannot respond to that request.");
      }
    } catch (error) {
      console.error("Error in Lucie AI Assistant:", error);
      setResponse("Sorry, I encountered an error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-medium mb-4">Lucie AI Assistant</h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ask Lucie something..."
            disabled={isLoading}
          />
        </div>
        
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? "Processing..." : "Ask Lucie"}
        </button>
      </form>
      
      {response && (
        <div className={`p-3 rounded ${isModerated ? 'bg-green-50' : 'bg-red-50'}`}>
          <h3 className="font-medium mb-1">{isModerated ? "Response:" : "Content Moderated:"}</h3>
          <p className="text-gray-700">{response}</p>
        </div>
      )}
    </div>
  );
};

export default LucieAIAssistant;
