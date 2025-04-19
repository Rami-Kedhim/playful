
import React, { useState, useEffect } from 'react';
import { NeuralService } from '@/services/neural/NeuralService';

const AdaptiveCognitiveCore = () => {
  // Create instance of NeuralService
  const [neuralServiceInstance, setNeuralServiceInstance] = useState<NeuralService | null>(null);
  const [state, setState] = useState(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cognitiveLoad, setCognitiveLoad] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        const instance = new NeuralService(
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
        await instance.initialize();
        setNeuralServiceInstance(instance);
        setState({ initialized: true });
      } catch (err) {
        setError('Failed to initialize neural service');
        console.error(err);
      }
    };

    init();

    return () => {
      if (neuralServiceInstance && typeof neuralServiceInstance.cleanup === 'function') {
        neuralServiceInstance.cleanup();
      }
    };
  }, []);

  const processInput = async (userInput: string) => {
    if (!userInput.trim() || !neuralServiceInstance) return;

    setIsProcessing(true);
    setCognitiveLoad(prev => Math.min(prev + 0.2, 1));

    try {
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
