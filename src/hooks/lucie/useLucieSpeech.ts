
import { useState, useCallback, useEffect, useRef } from 'react';
import { speakMessage, stopSpeaking, isSpeaking, initSpeechSynthesis, LucieVoiceType } from '@/services/speechSynthesisService';

interface LucieSpeechOptions {
  voiceType?: LucieVoiceType;
  autoSpeak?: boolean;
  pitch?: number;
  rate?: number;
  volume?: number;
}

export const useLucieSpeech = (options: LucieSpeechOptions = {}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentlySpeaking, setCurrentlySpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const speakQueueRef = useRef<string[]>([]);
  const isSpeakingRef = useRef(false);
  
  // Initialize speech synthesis and check support
  useEffect(() => {
    const isSupported = initSpeechSynthesis();
    setSupported(isSupported);
    
    // Load the user's preference from localStorage if available
    const savedPreference = localStorage.getItem('lucie_speech_enabled');
    if (savedPreference !== null) {
      setIsEnabled(savedPreference === 'true');
    } else if (options.autoSpeak) {
      setIsEnabled(true);
    }
    
    // Cleanup
    return () => {
      stopSpeaking();
    };
  }, [options.autoSpeak]);
  
  // Process the speak queue
  const processSpeakQueue = useCallback(async () => {
    if (isSpeakingRef.current || speakQueueRef.current.length === 0 || !isEnabled) {
      return;
    }
    
    const nextText = speakQueueRef.current.shift();
    if (!nextText) return;
    
    isSpeakingRef.current = true;
    setCurrentlySpeaking(true);
    
    await speakMessage(nextText, {
      voiceType: options.voiceType || 'feminine',
      pitch: options.pitch,
      rate: options.rate,
      volume: options.volume
    });
    
    isSpeakingRef.current = false;
    setCurrentlySpeaking(false);
    
    // Check if there are more items in the queue
    if (speakQueueRef.current.length > 0) {
      processSpeakQueue();
    }
  }, [isEnabled, options.voiceType, options.pitch, options.rate, options.volume]);
  
  // Add text to the speak queue
  const speak = useCallback((text: string) => {
    if (!supported || !isEnabled) return;
    
    // Clean up the text - remove markdown, URLs, etc.
    const cleanedText = text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
      .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
      .replace(/```[^`]*```/g, ' code block ') // Replace code blocks
      .replace(/`([^`]+)`/g, '$1') // Remove inline code formatting
      .replace(/https?:\/\/\S+/g, ' link ') // Replace URLs with "link"
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    speakQueueRef.current.push(cleanedText);
    processSpeakQueue();
  }, [supported, isEnabled, processSpeakQueue]);
  
  // Toggle speech on/off
  const toggleSpeech = useCallback(() => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    localStorage.setItem('lucie_speech_enabled', newValue.toString());
    
    if (!newValue) {
      // Stop any ongoing speech
      stopSpeaking();
      speakQueueRef.current = [];
      setCurrentlySpeaking(false);
    }
  }, [isEnabled]);
  
  // Stop speaking
  const stopSpeech = useCallback(() => {
    stopSpeaking();
    speakQueueRef.current = [];
    setCurrentlySpeaking(false);
    isSpeakingRef.current = false;
  }, []);
  
  return {
    isEnabled,
    toggleSpeech,
    speak,
    stopSpeech,
    currentlySpeaking,
    supported
  };
};
