'use client';

import { PhilosopherNode } from '@/lib/types';
import { useHistoricalOrbStore } from '@/lib/stores/historical-orb-store';
import { useEffect } from 'react';

interface PhilosopherModalProps {
  philosopher: PhilosopherNode;
}

export function PhilosopherModal({ philosopher }: PhilosopherModalProps) {
  const { selectPhilosopher } = useHistoricalOrbStore();

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        selectPhilosopher(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectPhilosopher]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-80"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-black border-2 border-phosphor-green p-8 font-mono text-sm glow-border max-w-4xl w-full max-h-[90vh] overflow-y-auto scanline-effect">
        {/* Retro grid background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid-pattern" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-phosphor-green font-pixel text-2xl mb-2 glow-text chromatic-aberration">
                {philosopher.name.toUpperCase()}
              </h2>
              <div className="text-neon-cyan text-sm">
                {getLifespan()} • {philosopher.era} ERA
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-critique-crimson hover:text-phosphor-green transition-colors text-xl font-pixel"
            >
              [X]
            </button>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Spiral Dynamics */}
              <div className="border border-phosphor-green p-4 glow-border">
                <h3 className="text-neon-cyan text-sm mb-3 font-pixel">SPIRAL DYNAMICS STAGE</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-6 h-6 border-2 border-phosphor-green animate-pulse"
                    style={{ backgroundColor: getSpiralColor(philosopher.spiralDynamicsStage) }}
                  />
                  <span className="text-phosphor-green text-lg">{philosopher.spiralDynamicsStage}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {philosopher.spiralJustification}
                </p>
              </div>

              {/* Primary Domain */}
              <div className="border border-phosphor-green p-4 glow-border">
                <h3 className="text-neon-cyan text-sm mb-3 font-pixel">PRIMARY DOMAIN</h3>
                <div className="text-phosphor-green text-lg mb-2">{philosopher.primaryDomain}</div>
                <div className="text-gray-400 text-xs">
                  EXPERTISE LEVEL: {Math.round(philosopher.domainStrengths[philosopher.primaryDomain] || 0)}%
                </div>
              </div>

              {/* Philosophical Genome */}
              <div className="border border-phosphor-green p-4 glow-border">
                <h3 className="text-neon-cyan text-sm mb-3 font-pixel">PHILOSOPHICAL GENOME</h3>
                <div className="space-y-3">
                  {Object.entries(philosopher.philosophicalGenome).map(([trait, value]) => (
                    <div key={trait} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs uppercase">{trait}:</span>
                        <span className="text-neon-cyan text-xs">{value}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 relative">
                        <div 
                          className="absolute top-0 left-0 h-full bg-neon-cyan glow-bar"
                          style={{ width: `${typeof value === 'number' ? value * 10 : 50}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Domain Expertise */}
              <div className="border border-phosphor-green p-4 glow-border">
                <h3 className="text-neon-cyan text-sm mb-3 font-pixel">DOMAIN EXPERTISE MATRIX</h3>
                <div className="space-y-2">
                  {Object.entries(philosopher.domainStrengths)
                    .sort(([,a], [,b]) => b - a)
                    .map(([domain, strength]) => (
                      <div key={domain} className="flex items-center gap-2">
                        <div className="text-gray-400 text-xs w-32 truncate">{domain}</div>
                        <div className="flex-1 h-3 bg-gray-700 relative">
                          <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-phosphor-green to-neon-cyan glow-bar"
                            style={{ width: `${strength}%` }}
                          />
                        </div>
                        <div className="text-phosphor-green text-xs w-10 text-right">{strength}%</div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Core Domains */}
              <div className="border border-phosphor-green p-4 glow-border">
                <h3 className="text-neon-cyan text-sm mb-3 font-pixel">CORE DOMAINS</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(philosopher.domainStrengths)
                    .filter(([_, strength]) => strength > 50)
                    .sort(([,a], [,b]) => b - a)
                    .map(([domain]) => (
                      <span 
                        key={domain}
                        className="px-2 py-1 text-xs border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-colors cursor-pointer"
                      >
                        {domain}
                      </span>
                    ))}
                </div>
              </div>

              {/* Influences & Critiques */}
              <div className="border border-phosphor-green p-4 glow-border">
                <h3 className="text-neon-cyan text-sm mb-3 font-pixel">INTELLECTUAL NETWORK</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-phosphor-green text-xs mb-2">INFLUENCES</h4>
                    <div className="space-y-1">
                      {philosopher.influences.slice(0, 5).map((name, index) => (
                        <div key={index} className="text-gray-400 text-xs hover:text-phosphor-green cursor-pointer">
                          → {name}
                        </div>
                      ))}
                      {philosopher.influences.length === 0 && (
                        <div className="text-gray-600 text-xs italic">None recorded</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-phosphor-green text-xs mb-2">CRITIQUES</h4>
                    <div className="space-y-1">
                      {philosopher.critiques.slice(0, 5).map((name, index) => (
                        <div key={index} className="text-gray-400 text-xs hover:text-phosphor-green cursor-pointer">
                          → {name}
                        </div>
                      ))}
                      {philosopher.critiques.length === 0 && (
                        <div className="text-gray-600 text-xs italic">None recorded</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex justify-around text-xs">
              <div className="text-center">
                <div className="text-phosphor-green text-lg font-pixel">
                  {Math.round(Object.values(philosopher.domainStrengths).reduce((sum, val) => sum + val, 0))}
                </div>
                <div className="text-gray-400">TOTAL STRENGTH</div>
              </div>
              <div className="text-center">
                <div className="text-neon-cyan text-lg font-pixel">{philosopher.influences.length}</div>
                <div className="text-gray-400">INFLUENCES</div>
              </div>
              <div className="text-center">
                <div className="text-neon-cyan text-lg font-pixel">{philosopher.critiques.length}</div>
                <div className="text-gray-400">CRITIQUES</div>
              </div>
              <div className="text-center">
                <div className="text-phosphor-green text-lg font-pixel">
                  {Object.entries(philosopher.domainStrengths).filter(([_, s]) => s > 50).length}
                </div>
                <div className="text-gray-400">CORE DOMAINS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}