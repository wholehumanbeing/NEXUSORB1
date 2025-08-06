'use client';

import { useState, useEffect } from 'react';
import { Archetype } from '@/lib/data/archetypes';

interface PhilosophicalJourneyProps {
  archetype: Archetype;
  onComplete: (shape: number[]) => void;
  onBack: () => void;
}

interface PhilosophicalQuestion {
  id: string;
  question: string;
  axis: string;
  choices: {
    text: string;
    value: number;
    implication?: string;
  }[];
}

// Generate philosophical questions based on archetype
const generateQuestions = (archetype: Archetype): PhilosophicalQuestion[] => {
  // These would be dynamically generated based on the archetype's domain
  // For now, using a set of template questions
  const domainQuestions: Record<string, PhilosophicalQuestion[]> = {
    metaphysics: [
      {
        id: 'meta1',
        question: 'What is the fundamental nature of reality?',
        axis: 'materialism-idealism',
        choices: [
          { text: 'Pure physical matter', value: -1, implication: 'All mental phenomena emerge from material interactions' },
          { text: 'Dual substance (mind and matter)', value: 0, implication: 'Mind and matter are distinct but interacting substances' },
          { text: 'Pure consciousness', value: 1, implication: 'Physical reality is a projection of consciousness' }
        ]
      },
      {
        id: 'meta2',
        question: 'How do universals exist?',
        axis: 'nominalism-realism',
        choices: [
          { text: 'Only in our minds', value: -1, implication: 'Categories are human constructs with no independent existence' },
          { text: 'In objects themselves', value: 0, implication: 'Universal properties are embedded in particular things' },
          { text: 'In a separate realm', value: 1, implication: 'Abstract forms exist independently of physical objects' }
        ]
      }
    ],
    consciousness: [
      {
        id: 'con1',
        question: 'What is the relationship between mind and brain?',
        axis: 'reductionism-emergence',
        choices: [
          { text: 'Mind is brain activity', value: -1, implication: 'Consciousness is fully explained by neural processes' },
          { text: 'Mind emerges from brain', value: 0, implication: 'Consciousness arises from but transcends neural activity' },
          { text: 'Mind uses brain as tool', value: 1, implication: 'Consciousness exists independently and interfaces with the brain' }
        ]
      }
    ],
    ethics: [
      {
        id: 'eth1',
        question: 'What determines right action?',
        axis: 'consequentialism-deontology',
        choices: [
          { text: 'Outcomes and consequences', value: -1, implication: 'The ends can justify the means' },
          { text: 'Balance of outcomes and duties', value: 0, implication: 'Both consequences and principles matter' },
          { text: 'Universal moral laws', value: 1, implication: 'Some acts are wrong regardless of consequences' }
        ]
      }
    ],
    epistemology: [
      {
        id: 'epi1',
        question: 'How do we acquire knowledge?',
        axis: 'empiricism-rationalism',
        choices: [
          { text: 'Through sensory experience', value: -1, implication: 'All knowledge originates from perception' },
          { text: 'Through experience and reason', value: 0, implication: 'Knowledge requires both observation and logical analysis' },
          { text: 'Through pure reason', value: 1, implication: 'Fundamental truths are discovered through thought alone' }
        ]
      }
    ],
    logic: [
      {
        id: 'log1',
        question: 'Can contradictions be true?',
        axis: 'classical-paraconsistent',
        choices: [
          { text: 'Never - logic is absolute', value: -1, implication: 'Reality follows strict logical laws' },
          { text: 'In specific contexts', value: 0, implication: 'Some domains allow limited contradictions' },
          { text: 'Yes - reality transcends logic', value: 1, implication: 'The universe contains true paradoxes' }
        ]
      }
    ],
    society: [
      {
        id: 'soc1',
        question: 'What is the ideal social organization?',
        axis: 'individualism-collectivism',
        choices: [
          { text: 'Maximum individual freedom', value: -1, implication: 'Society exists to serve individual needs' },
          { text: 'Balance of individual and collective', value: 0, implication: 'Both individual and social needs are equally important' },
          { text: 'Collective harmony', value: 1, implication: 'Individual interests should align with social good' }
        ]
      }
    ]
  };

  // Start with the archetype's initial question
  const initialQuestion: PhilosophicalQuestion = {
    id: 'initial',
    question: archetype.question,
    axis: 'core-position',
    choices: [
      { text: 'Strongly disagree', value: -1 },
      { text: 'Uncertain', value: 0 },
      { text: 'Strongly agree', value: 1 }
    ]
  };

  const domainSpecific = domainQuestions[archetype.domain] || [];
  
  return [initialQuestion, ...domainSpecific];
};

export function PhilosophicalJourney({ archetype, onComplete, onBack }: PhilosophicalJourneyProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showImplication, setShowImplication] = useState(false);
  
  const questions = generateQuestions(archetype);
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleChoice = (value: number, implication?: string) => {
    setSelectedChoice(value);
    if (implication) {
      setShowImplication(true);
      setTimeout(() => {
        proceedToNext(value);
      }, 3000);
    } else {
      proceedToNext(value);
    }
  };

  const proceedToNext = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedChoice(null);
      setShowImplication(false);
    } else {
      // Generate philosophical shape from answers
      const shape = generatePhilosophicalShape(newAnswers);
      onComplete(shape);
    }
  };

  const generatePhilosophicalShape = (answers: number[]): number[] => {
    // Generate a 10-dimensional shape based on answers
    // This would be more sophisticated in production
    const shape = new Array(10).fill(0).map((_, i) => {
      const relevantAnswer = answers[i % answers.length];
      const baseValue = 0.5 + (relevantAnswer * 0.3);
      const variation = Math.sin(i * Math.PI / 5) * 0.2;
      return Math.max(0, Math.min(1, baseValue + variation));
    });
    return shape;
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-phosphor-green">
      {/* Header */}
      <div className="w-full max-w-4xl mb-8">
        <button
          onClick={onBack}
          className="text-neon-cyan hover:text-phosphor-green transition-colors text-sm mb-4"
        >
          ← Back to Symbol Selection
        </button>
        
        <div className="border border-phosphor-green p-4 glow-border">
          <h2 className="text-2xl font-pixel mb-2">{archetype.name}</h2>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>Domain: {archetype.domain.toUpperCase()}</span>
            <span>•</span>
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4 h-2 bg-gray-800 border border-gray-600">
            <div 
              className="h-full bg-phosphor-green transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h3 className="text-3xl mb-4 text-neon-cyan glow-text">
            {currentQuestion.question}
          </h3>
          <p className="text-gray-400 text-sm">
            Axis: {currentQuestion.axis}
          </p>
        </div>

        {/* Choices */}
        <div className="space-y-4">
          {currentQuestion.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice.value, choice.implication)}
              disabled={selectedChoice !== null}
              className={`
                w-full p-6 border-2 text-left transition-all duration-300
                ${selectedChoice === choice.value
                  ? 'border-phosphor-green bg-phosphor-green bg-opacity-20 scale-105 glow-border'
                  : selectedChoice !== null
                    ? 'border-gray-700 opacity-30'
                    : 'border-gray-600 hover:border-neon-cyan hover:bg-neon-cyan hover:bg-opacity-5'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{choice.text}</span>
                <span className="text-2xl text-gray-600">
                  {choice.value === -1 ? '←' : choice.value === 0 ? '↔' : '→'}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Implication display */}
        {showImplication && selectedChoice !== null && (
          <div className="mt-8 p-6 border border-neon-cyan bg-black bg-opacity-50 glow-border animate-pulse">
            <h4 className="text-neon-cyan font-pixel text-sm mb-2">PHILOSOPHICAL IMPLICATION:</h4>
            <p className="text-gray-300 text-sm italic">
              {currentQuestion.choices.find(c => c.value === selectedChoice)?.implication}
            </p>
          </div>
        )}
      </div>

      {/* Philosophical breadcrumbs */}
      <div className="w-full max-w-4xl mt-8">
        <div className="flex gap-2 justify-center">
          {answers.map((answer, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full bg-phosphor-green opacity-50"
              title={`Question ${index + 1}: ${answer}`}
            />
          ))}
          <div className="w-3 h-3 rounded-full border border-phosphor-green animate-pulse" />
          {Array(questions.length - answers.length - 1).fill(0).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="w-3 h-3 rounded-full border border-gray-600"
            />
          ))}
        </div>
      </div>
    </div>
  );
}