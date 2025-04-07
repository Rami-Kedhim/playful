
import { useState, useCallback } from 'react';
import { Assessment, AssessmentQuestion } from '@/types/assessment';
import { 
  PsychographicProfile, 
  BehavioralLoop, 
  ConsumerDecisionStage, 
  ValueOrientation,
  BrandResonanceStage 
} from '@/types/enhancedBehavioral';

/**
 * Custom hook for managing user assessments
 * Collects psychological and behavioral data for enhancing personalization
 */
export function useAssessment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  
  /**
   * Get the current assessment state or fetch a new one
   */
  const getAssessment = useCallback(async (userId: string): Promise<Assessment | null> => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would fetch from an API
      // For now, using mock data
      const mockAssessment: Assessment = {
        id: 'mock-assessment',
        userId,
        completed: false,
        completedSections: [],
        startedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        personalityTraits: [],
        interests: [],
        questions: getMockQuestions(),
        psychographicProfile: {
          personalityTraits: ['analytical', 'detail-oriented'],
          interests: ['technology', 'finance'],
          values: ['privacy', 'efficiency'],
          motivations: ['achievement', 'growth'],
          // Adding all required properties to fix TypeScript errors
          decisionMakingStyle: 'analytical',
          trustLevel: 50,
          priceSensitivity: 50,
          behavioralLoop: BehavioralLoop.Discovery,
          decisionStage: ConsumerDecisionStage.InformationSearch,
          valueOrientation: ValueOrientation.Practical,
          brandResonance: BrandResonanceStage.Awareness,
          identifiedSignals: []
        }
      };
      
      setCurrentAssessment(mockAssessment);
      return mockAssessment;
    } catch (err) {
      console.error('Error fetching assessment:', err);
      setError('Failed to fetch assessment');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * Submit answers for an assessment section
   */
  const submitAnswers = useCallback(async (
    userId: string, 
    sectionId: string, 
    answers: Record<string, string | string[]>
  ): Promise<Assessment | null> => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would submit to an API
      // For now, just update the local state
      
      const updatedAssessment = currentAssessment ? {
        ...currentAssessment,
        completedSections: [
          ...currentAssessment.completedSections,
          sectionId
        ],
        updatedAt: new Date().toISOString(),
        // For demo purposes, add mock traits based on answers
        personalityTraits: [
          ...(currentAssessment.personalityTraits || []),
          'adaptable',
          'curious'
        ],
        interests: [
          ...(currentAssessment.interests || []),
          'technology',
          'travel'
        ],
        psychographicProfile: {
          // Ensure we have the existing psychographic profile if it exists
          ...(currentAssessment.psychographicProfile || {
            personalityTraits: [],
            interests: [],
            values: [],
            motivations: [],
            decisionMakingStyle: 'analytical',
            trustLevel: 50,
            priceSensitivity: 50,
            behavioralLoop: BehavioralLoop.Discovery,
            decisionStage: ConsumerDecisionStage.InformationSearch,
            valueOrientation: ValueOrientation.Practical,
            brandResonance: BrandResonanceStage.Awareness,
            identifiedSignals: []
          }),
          // Add some new data based on answers
          personalityTraits: ['analytical', 'curious'],
          interests: ['technology', 'innovation'],
          values: ['privacy', 'efficiency'],
          motivations: ['growth', 'achievement'],
          // Include all required properties to fix TypeScript errors
          decisionMakingStyle: 'analytical',
          trustLevel: 50,
          priceSensitivity: 50,
          behavioralLoop: BehavioralLoop.Discovery,
          decisionStage: ConsumerDecisionStage.InformationSearch,
          valueOrientation: ValueOrientation.Practical,
          brandResonance: BrandResonanceStage.Awareness,
          identifiedSignals: []
        }
      } : null;
      
      if (updatedAssessment) {
        setCurrentAssessment(updatedAssessment);
      }
      
      return updatedAssessment;
    } catch (err) {
      console.error('Error submitting answers:', err);
      setError('Failed to submit answers');
      return null;
    } finally {
      setLoading(false);
    }
  }, [currentAssessment]);
  
  /**
   * Get mock questions for assessment
   */
  const getMockQuestions = (): AssessmentQuestion[] => {
    return [
      {
        id: 'q1',
        question: 'How do you prefer to make decisions?',
        type: 'multiple_choice',
        options: [
          { value: 'analytical', label: 'Based on data and analysis' },
          { value: 'intuitive', label: 'Based on intuition and feeling' },
          { value: 'collaborative', label: 'Through consultation with others' },
          { value: 'procedural', label: 'Following established processes' }
        ]
      },
      {
        id: 'q2',
        question: 'What factors are most important when choosing a service?',
        type: 'ranking',
        options: [
          { value: 'price', label: 'Price' },
          { value: 'quality', label: 'Quality' },
          { value: 'reputation', label: 'Reputation' },
          { value: 'convenience', label: 'Convenience' },
          { value: 'customer_service', label: 'Customer Service' }
        ]
      },
      {
        id: 'q3',
        question: 'Which topics interest you the most?',
        type: 'multiple_select',
        options: [
          { value: 'technology', label: 'Technology' },
          { value: 'travel', label: 'Travel' },
          { value: 'finance', label: 'Finance' },
          { value: 'health', label: 'Health & Wellness' },
          { value: 'entertainment', label: 'Entertainment' },
          { value: 'sports', label: 'Sports' },
          { value: 'art', label: 'Art & Culture' }
        ]
      }
    ];
  };
  
  return {
    loading,
    error,
    currentAssessment,
    getAssessment,
    submitAnswers
  };
}

export default useAssessment;
