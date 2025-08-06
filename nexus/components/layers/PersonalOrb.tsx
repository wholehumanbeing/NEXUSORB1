'use client';

import { useState } from 'react';
import { ArchetypeSelector } from '../archetype/ArchetypeSelector';
import { PhilosophicalJourney } from '../archetype/PhilosophicalJourney';
import { PersonalCrystal } from '../archetype/PersonalCrystal';
import { Archetype, AlchemicalSymbol } from '@/lib/data/archetypes';

type JourneyStage = 'selection' | 'questions' | 'visualization';

export function PersonalOrb() {
  const [stage, setStage] = useState<JourneyStage>('selection');
  const [selectedSymbols, setSelectedSymbols] = useState<AlchemicalSymbol[]>([]);
  const [archetype, setArchetype] = useState<Archetype | null>(null);
  const [philosophicalShape, setPhilosophicalShape] = useState<number[]>([]);

  const handleSymbolSelection = (symbols: AlchemicalSymbol[], archetype: Archetype) => {
    setSelectedSymbols(symbols);
    setArchetype(archetype);
    setStage('questions');
  };

  const handleJourneyComplete = (shape: number[]) => {
    setPhilosophicalShape(shape);
    setStage('visualization');
  };

  const resetJourney = () => {
    setStage('selection');
    setSelectedSymbols([]);
    setArchetype(null);
    setPhilosophicalShape([]);
  };

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      {/* Retro CRT effect overlay */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <div className="scanlines opacity-20" />
        <div className="noise opacity-5" />
      </div>

      {/* Stage-based content */}
      {stage === 'selection' && (
        <ArchetypeSelector onComplete={handleSymbolSelection} />
      )}

      {stage === 'questions' && archetype && (
        <PhilosophicalJourney 
          archetype={archetype}
          onComplete={handleJourneyComplete}
          onBack={resetJourney}
        />
      )}

      {stage === 'visualization' && archetype && (
        <PersonalCrystal 
          archetype={archetype}
          shape={philosophicalShape}
          onReset={resetJourney}
        />
      )}

      {/* Glowing grid background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, .05) 25%, rgba(0, 255, 0, .05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .05) 75%, rgba(0, 255, 0, .05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, .05) 25%, rgba(0, 255, 0, .05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .05) 75%, rgba(0, 255, 0, .05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
    </div>
  );
}