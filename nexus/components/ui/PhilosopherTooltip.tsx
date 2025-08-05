'use client';

import { PhilosopherNode } from '@/lib/types';

interface PhilosopherTooltipProps {
  philosopher: PhilosopherNode;
  position: { x: number; y: number };
}

export function PhilosopherTooltip({ philosopher, position }: PhilosopherTooltipProps) {
  const getLifespan = () => {
    const birth = philosopher.birthYear < 0 ? `${Math.abs(philosopher.birthYear)} BCE` : philosopher.birthYear.toString();
    const death = philosopher.deathYear < 0 ? `${Math.abs(philosopher.deathYear)} BCE` : philosopher.deathYear.toString();
    return `${birth} - ${death}`;
  };

  return (
    <div 
      className="fixed pointer-events-none z-50 bg-black border border-phosphor-green p-2 font-mono text-xs glow-border"
      style={{
        left: position.x + 10,
        top: position.y - 10,
        transform: 'translate(0, -100%)'
      }}
    >
      <div className="text-phosphor-green font-pixel text-sm glow-text">
        {philosopher.name}
      </div>
      <div className="text-neon-cyan text-xs mt-1">
        {getLifespan()}
      </div>
    </div>
  );
}