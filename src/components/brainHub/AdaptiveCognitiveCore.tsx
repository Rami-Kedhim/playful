import React, { useState, useEffect } from 'react';
import { NeuralService } from '@/services/neural/NeuralService';

const AdaptiveCognitiveCore = () => {
  const [state, setState] = useState(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cognitiveLoad, setCognitiveLoad] = useState(0);

  // Initialize neural service
  useEffect(() => {
    const initializeCore = async () => {
      try {
        await NeuralService.initialize();
        setState({ initialized: true });
      } catch (err) {
        setError('Failed to initialize neural service');
        console.error(err);
      }
    };
    
    initializeCore();
    
    return () => {
      // Cleanup neural service resources
      NeuralService.cleanup();
    };
  }, []);

  const processInput = async (userInput: string) => {
    if (!userInput.trim()) return;
    
    setIsProcessing(true);
    setCognitiveLoad(prev => Math.min(prev + 0.2, 1));
    
    try {
      const result = await NeuralService.process(userInput);
      setOutput(result);
      setInput('');
    } catch (err: any) {
      setError(err.message || 'Error processing input');
    } finally {
      setIsProcessing(false);
      setCognitiveLoad(prev => Math.max(prev - 0.1, 0));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processInput(input);
  };

  return (
    <div className="adaptive-cognitive-core">
      <div className="cognitive-status">
        <div className="status-indicator">
          <div 
            className={`indicator ${isProcessing ? 'active' : ''}`}
            style={{ opacity: cognitiveLoad * 0.8 + 0.2 }}
          />
          <span>Cognitive Load: {Math.round(cognitiveLoad * 100)}%</span>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
      
      <div className="output-display">
        {output && (
          <pre>{output}</pre>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter cognitive input..."
          disabled={isProcessing}
        />
        <button 
          type="submit" 
          disabled={isProcessing || !input.trim()}
        >
          Process
        </button>
      </form>
    </div>
  );
};

export default AdaptiveCognitiveCore;
