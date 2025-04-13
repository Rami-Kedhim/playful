
import React from 'react';
import BaseTypingIndicator from '../AICompanionTypingIndicator';

interface AICompanionTypingIndicatorProps {
  className?: string;
}

/**
 * A component that displays a typing indicator specifically for AI companions in chat
 * This is a wrapper around the base typing indicator with companion-specific styles
 */
const AICompanionTypingIndicator: React.FC<AICompanionTypingIndicatorProps> = ({ 
  className = ""
}) => {
  return <BaseTypingIndicator className={className} />;
};

export default AICompanionTypingIndicator;
