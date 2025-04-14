
import React from 'react';
import BaseTypingIndicator from '../AICompanionTypingIndicator';

interface AICompanionTypingIndicatorProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

/**
 * A component that displays a typing indicator specifically for AI companions in chat
 * This is a wrapper around the base typing indicator with companion-specific styles
 */
const AICompanionTypingIndicator: React.FC<AICompanionTypingIndicatorProps> = ({ 
  className = "",
  size = "medium"
}) => {
  return <BaseTypingIndicator className={className} size={size} />;
};

export default AICompanionTypingIndicator;
