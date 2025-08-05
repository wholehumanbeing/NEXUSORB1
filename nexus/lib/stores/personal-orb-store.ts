import { create } from 'zustand';
import { PhilosophicalProfile, QuizResponse } from '../types';

interface PersonalOrbStore {
  quizResponses: QuizResponse[];
  currentQuestionIndex: number;
  quizComplete: boolean;
  userProfile: PhilosophicalProfile | null;
  
  // Actions
  addQuizResponse: (response: QuizResponse) => void;
  setCurrentQuestion: (index: number) => void;
  completeQuiz: () => void;
  generateProfile: (responses: QuizResponse[]) => void;
  resetQuiz: () => void;
}

export const usePersonalOrbStore = create<PersonalOrbStore>((set, get) => ({
  quizResponses: [],
  currentQuestionIndex: 0,
  quizComplete: false,
  userProfile: null,
  
  addQuizResponse: (response) => set((state) => ({
    quizResponses: [...state.quizResponses, response]
  })),
  
  setCurrentQuestion: (index) => set({ currentQuestionIndex: index }),
  
  completeQuiz: () => {
    const { quizResponses } = get();
    get().generateProfile(quizResponses);
    set({ quizComplete: true });
  },
  
  generateProfile: (responses) => {
    // Calculate belief weights from quiz responses
    const beliefWeights: Record<string, number> = {};
    const historicalAlignments: Record<string, number> = {};
    
    responses.forEach(response => {
      // Aggregate weights
      Object.entries(response.choice.weights).forEach(([belief, weight]) => {
        beliefWeights[belief] = (beliefWeights[belief] || 0) + weight;
      });
      
      // Aggregate historical alignments
      response.choice.historicalAlignment.forEach(alignment => {
        historicalAlignments[alignment.philosopherId] = 
          (historicalAlignments[alignment.philosopherId] || 0) + alignment.agreementLevel;
      });
    });
    
    // Calculate harmony and tension scores
    const values = Object.values(beliefWeights);
    const maxWeight = Math.max(...values);
    const minWeight = Math.min(...values);
    const harmonyScore = 1 - ((maxWeight - minWeight) / maxWeight);
    const tensionScore = 1 - harmonyScore;
    
    // Create belief vector (simplified to 3D for visualization)
    const beliefVector: [number, number, number] = [
      (beliefWeights.empiricism || 0) - (beliefWeights.idealism || 0),
      (beliefWeights.materialism || 0) - (beliefWeights.spiritualism || 0),
      (beliefWeights.individualism || 0) - (beliefWeights.collectivism || 0)
    ];
    
    const profile: PhilosophicalProfile = {
      beliefWeights,
      historicalAlignments,
      beliefVector,
      harmonyScore,
      tensionScore,
      internalTensions: [], // Would be calculated based on conflicting beliefs
      beliefHarmonies: []   // Would be calculated based on compatible beliefs
    };
    
    set({ userProfile: profile });
  },
  
  resetQuiz: () => set({
    quizResponses: [],
    currentQuestionIndex: 0,
    quizComplete: false,
    userProfile: null
  })
}));