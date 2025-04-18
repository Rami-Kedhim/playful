import React from 'react';
import { UberCoreService } from '@/types/ubercore';

interface InteractionPanelProps {
  service: UberCoreService;
}

const InteractionPanel: React.FC<InteractionPanelProps> = ({ service }) => {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [processing, setProcessing] = React.useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    setProcessing(true);
    
    try {
      const response = await service.processUserInput(input);
      setOutput(response);
    } catch (error) {
      console.error('Error processing input:', error);
      setOutput('Error: Failed to process input');
    } finally {
      setProcessing(false);
    }
  };
  
  return (
    <div>
      <h2>Interaction Panel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Input:
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={processing}
              rows={3}
            />
          </label>
        </div>
        
        <button type="submit" disabled={processing}>
          {processing ? 'Processing...' : 'Submit'}
        </button>
      </form>
      
      {output && (
        <div>
          <h3>Output:</h3>
          <div>{output}</div>
        </div>
      )}
    </div>
  );
};

export default InteractionPanel;
