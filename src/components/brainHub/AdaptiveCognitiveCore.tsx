
import React, { useState, useEffect } from 'react';
// Import an instance or default export of NeuralService to fix use errors
import { NeuralService } from '@/services/neural/NeuralService';

// Create an instance of NeuralService for usage in the component
const neuralServiceInstance = new NeuralService(
  'adaptive-cognitive-core',
  'adaptive-cognitive-core',
  'Adaptive Cognitive Core',
  'Processes cognitive input adaptively',
  'core',
  '1.0',
  {
    enabled: true,
    version: '1.0',
  }
);

const AdaptiveCognitiveCore = () => {
  const [state, setState] = useState(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cognitiveLoad, setCognitiveLoad] = useState(0);

  // Initialize neural service instance
  useEffect(() => {
    const initializeCore = async () => {
      try {
        await neuralServiceInstance.initialize();
        setState({ initialized: true });
      } catch (err) {
        setError('Failed to initialize neural service');
        console.error(err);
      }
    };

    initializeCore();

    return () => {
      // No cleanup method on instance - if exists, call it, else skip
      if (typeof neuralServiceInstance.cleanup === 'function') {
        neuralServiceInstance.cleanup();
      }
    };
  }, []);

  const processInput = async (userInput: string) => {
    if (!userInput.trim()) return;

    setIsProcessing(true);
    setCognitiveLoad(prev => Math.min(prev + 0.2, 1));

    try {
      // The process method doesn't exist on NeuralService directly, likely processText
      const result = await neuralServiceInstance.processText(userInput, 'TextGenerator', {
        temperature: 0.7,
        topP: 0.9,
        frequencyPenalty: 0,
        presencePenalty: 0,
        maxTokens: 150,
        stopSequences: [],
        modelName: 'default',
        decayConstant: 0.1,
        growthFactor: 1.1,
        cyclePeriod: 30,
        harmonicCount: 5,
      });
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
