'use client';

import { useState } from 'react';
import { useHistoricalOrbStore } from '@/lib/stores/historical-orb-store';
import { Domain } from '@/lib/types';

export function FilterPanel() {
  const { filters, updateFilters, viewMode, setViewMode } = useHistoricalOrbStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const eras = ['Ancient', 'Medieval', 'Modern', 'Contemporary'];
  const domains: Domain[] = [
    'Logic', 'Ethics', 'Metaphysics', 'Epistemology', 
    'Politics', 'Aesthetics', 'Philosophy of Religion', 'Philosophy of Science'
  ];
  const spiralStages = ['Purple', 'Red', 'Blue', 'Orange', 'Green', 'Yellow', 'Turquoise', 'Coral'];

  const toggleEra = (era: string) => {
    const newEras = filters.era.includes(era)
      ? filters.era.filter(e => e !== era)
      : [...filters.era, era];
    
    // When adding an era, also select all domains if none are selected
    if (!filters.era.includes(era) && filters.domain.length === 0) {
      updateFilters({ 
        era: newEras,
        domain: domains 
      });
    } else {
      updateFilters({ era: newEras });
    }
  };

  const toggleDomain = (domain: Domain) => {
    const newDomains = filters.domain.includes(domain)
      ? filters.domain.filter(d => d !== domain)
      : [...filters.domain, domain];
    updateFilters({ domain: newDomains });
  };

  const toggleSpiralStage = (stage: string) => {
    const newStages = filters.spiralStage.includes(stage)
      ? filters.spiralStage.filter(s => s !== stage)
      : [...filters.spiralStage, stage];
    updateFilters({ spiralStage: newStages });
  };

  return (
    <div className="bg-black border border-phosphor-green p-4 font-mono text-sm glow-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-phosphor-green font-pixel text-xs">NEXUS FILTERS</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-neon-cyan hover:text-phosphor-green transition-colors"
        >
          [{isExpanded ? '-' : '+'}]
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* View Mode */}
          <div>
            <h4 className="text-neon-cyan text-xs mb-2">VIEW MODE</h4>
            <div className="flex gap-2">
              {(['orb', 'helix', 'network'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-2 py-1 text-xs border transition-colors ${
                    viewMode === mode
                      ? 'border-phosphor-green text-phosphor-green bg-phosphor-green bg-opacity-20'
                      : 'border-gray-600 text-gray-400 hover:border-neon-cyan hover:text-neon-cyan'
                  }`}
                >
                  {mode.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Era Filters */}
          <div>
            <h4 className="text-neon-cyan text-xs mb-2">HISTORICAL ERAS</h4>
            <div className="grid grid-cols-2 gap-1">
              {eras.map(era => (
                <button
                  key={era}
                  onClick={() => toggleEra(era)}
                  className={`px-2 py-1 text-xs border transition-colors ${
                    filters.era.includes(era)
                      ? 'border-phosphor-green text-phosphor-green bg-phosphor-green bg-opacity-20'
                      : 'border-gray-600 text-gray-400 hover:border-neon-cyan hover:text-neon-cyan'
                  }`}
                >
                  {era}
                </button>
              ))}
            </div>
          </div>

          {/* Domain Filters */}
          <div>
            <h4 className="text-neon-cyan text-xs mb-2">DOMAINS</h4>
            <div className="grid grid-cols-1 gap-1">
              {domains.map(domain => (
                <button
                  key={domain}
                  onClick={() => toggleDomain(domain)}
                  className={`px-2 py-1 text-xs border transition-colors text-left ${
                    filters.domain.includes(domain)
                      ? 'border-phosphor-green text-phosphor-green bg-phosphor-green bg-opacity-20'
                      : 'border-gray-600 text-gray-400 hover:border-neon-cyan hover:text-neon-cyan'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          {/* Spiral Dynamics */}
          <div>
            <h4 className="text-neon-cyan text-xs mb-2">SPIRAL DYNAMICS</h4>
            <div className="grid grid-cols-2 gap-1">
              {spiralStages.map(stage => (
                <button
                  key={stage}
                  onClick={() => toggleSpiralStage(stage)}
                  className={`px-2 py-1 text-xs border transition-colors ${
                    filters.spiralStage.includes(stage)
                      ? 'border-phosphor-green text-phosphor-green bg-phosphor-green bg-opacity-20'
                      : 'border-gray-600 text-gray-400 hover:border-neon-cyan hover:text-neon-cyan'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => updateFilters({ era: [], domain: [], spiralStage: [] })}
            className="w-full px-2 py-1 text-xs border border-critique-crimson text-critique-crimson hover:bg-critique-crimson hover:text-black transition-colors"
          >
            CLEAR ALL FILTERS
          </button>
        </div>
      )}
    </div>
  );
}