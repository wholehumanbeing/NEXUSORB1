'use client';

import { PhilosopherNode } from '@/lib/types';
import { useHistoricalOrbStore } from '@/lib/stores/historical-orb-store';

interface PhilosopherInfoPanelProps {
  philosopher: PhilosopherNode;
}

export function PhilosopherInfoPanel({ philosopher }: PhilosopherInfoPanelProps) {
  const { selectPhilosopher } = useHistoricalOrbStore();

  const handleClose = () => {
    selectPhilosopher(null);
  };

  const getLifespan = () => {
    const birth = philosopher.birthYear < 0 ? `${Math.abs(philosopher.birthYear)} BCE` : philosopher.birthYear.toString();
    const death = philosopher.deathYear < 0 ? `${Math.abs(philosopher.deathYear)} BCE` : philosopher.deathYear.toString();
    return `${birth} - ${death}`;
  };

  const getSpiralColor = (stage: string) => {
    const colorMap: Record<string, string> = {
      'Purple': '#8B00FF',
      'Red': '#FF0000',
      'Blue': '#0000FF',
      'Orange': '#FF8C00',
      'Green': '#00FF00',
      'Yellow': '#FFFF00',
      'Turquoise': '#40E0D0',
      'Coral': '#FF7F50',
      'Blue-Orange': '#4169E1',
      'Orange-Green': '#32CD32'
    };
    return colorMap[stage] || '#00FF00';
  };

  return (
    <div className="bg-black border border-phosphor-green p-4 font-mono text-sm glow-border max-w-md max-h-96 overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-phosphor-green font-pixel text-xs mb-1 glow-text">
            {philosopher.name.toUpperCase()}
          </h3>
          <div className="text-neon-cyan text-xs">
            {getLifespan()} • {philosopher.era}
          </div>
        </div>
        <button
          onClick={handleClose}
          className="text-critique-crimson hover:text-phosphor-green transition-colors text-xs"
        >
          [X]
        </button>
      </div>

      {/* Spiral Dynamics Stage */}
      <div className="mb-4">
        <h4 className="text-neon-cyan text-xs mb-1">SPIRAL DYNAMICS STAGE</h4>
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 border border-phosphor-green"
            style={{ backgroundColor: getSpiralColor(philosopher.spiralDynamicsStage) }}
          />
          <span className="text-phosphor-green text-xs">{philosopher.spiralDynamicsStage}</span>
        </div>
        <p className="text-gray-300 text-xs mt-1 leading-relaxed">
          {philosopher.spiralJustification}
        </p>
      </div>

      {/* Primary Domain */}
      <div className="mb-4">
        <h4 className="text-neon-cyan text-xs mb-1">PRIMARY DOMAIN</h4>
        <div className="text-phosphor-green text-xs">{philosopher.primaryDomain}</div>
      </div>

      {/* Domain Strengths */}
      <div className="mb-4">
        <h4 className="text-neon-cyan text-xs mb-2">DOMAIN EXPERTISE</h4>
        <div className="space-y-1">
          {Object.entries(philosopher.domainStrengths)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([domain, strength]) => (
              <div key={domain} className="flex items-center gap-2">
                <div className="text-gray-400 text-xs w-20 truncate">{domain}</div>
                <div className="flex-1 h-1 bg-gray-700 relative">
                  <div 
                    className="h-full bg-phosphor-green"
                    style={{ width: `${strength}%` }}
                  />
                </div>
                <div className="text-phosphor-green text-xs w-8 text-right">{strength}</div>
              </div>
            ))}
        </div>
      </div>

      {/* Philosophical Genome Preview */}
      <div className="mb-4">
        <h4 className="text-neon-cyan text-xs mb-2">PHILOSOPHICAL GENOME</h4>
        <div className="grid grid-cols-2 gap-1 text-xs">
          <div className="text-gray-400">Being/Becoming:</div>
          <div className="text-phosphor-green">{philosopher.philosophicalGenome.beingVsBecoming}</div>
          
          <div className="text-gray-400">Mind/Matter:</div>
          <div className="text-phosphor-green">{philosopher.philosophicalGenome.mindVsMatter}</div>
          
          <div className="text-gray-400">Reason/Experience:</div>
          <div className="text-phosphor-green">{philosopher.philosophicalGenome.reasonVsExperience}</div>
          
          <div className="text-gray-400">Absolute/Relative:</div>
          <div className="text-phosphor-green">{philosopher.philosophicalGenome.absoluteVsRelative}</div>
        </div>
      </div>

      {/* Biography Preview */}
      <div className="mb-4">
        <h4 className="text-neon-cyan text-xs mb-2">BIOGRAPHY</h4>
        <p className="text-gray-300 text-xs leading-relaxed">
          {philosopher.comprehensiveBiography.slice(0, 200)}...
        </p>
      </div>

      {/* Connections */}
      <div className="mb-4">
        <h4 className="text-neon-cyan text-xs mb-2">CONNECTIONS</h4>
        <div className="text-xs">
          <div className="text-gray-400">Influences: {philosopher.influences.length}</div>
          <div className="text-gray-400">Critiques: {philosopher.critiques.length}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 text-xs">
        <button className="px-2 py-1 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-colors">
          TRACE INFLUENCES
        </button>
        <button className="px-2 py-1 border border-phosphor-green text-phosphor-green hover:bg-phosphor-green hover:text-black transition-colors">
          VIEW SWITCHES
        </button>
      </div>
    </div>
  );
}