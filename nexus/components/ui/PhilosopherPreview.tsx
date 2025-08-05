'use client';

import { PhilosopherNode } from '@/lib/types';
import { useHistoricalOrbStore } from '@/lib/stores/historical-orb-store';

interface PhilosopherPreviewProps {
  philosopher: PhilosopherNode;
}

export function PhilosopherPreview({ philosopher }: PhilosopherPreviewProps) {
  const { selectPhilosopher } = useHistoricalOrbStore();

  const handleOpenFullBio = () => {
    selectPhilosopher(philosopher);
  };

  const handleClose = () => {
    const { setPreviewPhilosopher } = useHistoricalOrbStore.getState();
    setPreviewPhilosopher(null);
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
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60"
        onClick={handleClose}
      />
      
      {/* Preview Card */}
      <div className="relative bg-black border-2 border-phosphor-green p-6 font-mono text-sm glow-border max-w-md w-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-phosphor-green font-pixel text-lg mb-1 glow-text">
              {philosopher.name}
            </h3>
            <div className="text-neon-cyan text-xs">
              {getLifespan()} • {philosopher.era} Era
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="space-y-3 mb-6">
          {/* Spiral Stage */}
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-4 border border-phosphor-green"
              style={{ backgroundColor: getSpiralColor(philosopher.spiralDynamicsStage) }}
            />
            <div>
              <span className="text-phosphor-green text-xs">{philosopher.spiralDynamicsStage}</span>
              <span className="text-gray-400 text-xs ml-2">Spiral Stage</span>
            </div>
          </div>

          {/* Primary Domain */}
          <div>
            <span className="text-neon-cyan text-xs">Primary Domain: </span>
            <span className="text-phosphor-green text-xs">{philosopher.primaryDomain}</span>
          </div>

          {/* Top Domains */}
          <div>
            <div className="text-neon-cyan text-xs mb-1">Core Expertise:</div>
            <div className="flex flex-wrap gap-1">
              {Object.entries(philosopher.domainStrengths)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
                .map(([domain, strength]) => (
                  <span 
                    key={domain}
                    className="px-2 py-1 text-xs border border-gray-600 text-gray-300"
                  >
                    {domain} ({strength}%)
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleOpenFullBio}
            className="flex-1 px-4 py-2 bg-phosphor-green bg-opacity-20 border border-phosphor-green text-phosphor-green hover:bg-opacity-30 transition-colors text-xs font-pixel"
          >
            OPEN FULL BIO
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-600 text-gray-400 hover:border-neon-cyan hover:text-neon-cyan transition-colors text-xs"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}