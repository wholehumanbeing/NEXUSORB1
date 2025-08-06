'use client';

import { useState } from 'react';
import { ALCHEMICAL_SYMBOLS, ARCHETYPES, getArchetypeBySymbols } from '@/lib/data/archetypes';
import type { AlchemicalSymbol, Archetype } from '@/lib/data/archetypes';

interface ArchetypeSelectorProps {
  onComplete: (symbols: AlchemicalSymbol[], archetype: Archetype) => void;
}

export function ArchetypeSelector({ onComplete }: ArchetypeSelectorProps) {
  const [selectedSymbols, setSelectedSymbols] = useState<AlchemicalSymbol[]>([]);
  const [hoveredSymbol, setHoveredSymbol] = useState<AlchemicalSymbol | null>(null);

  const handleSymbolClick = (symbol: AlchemicalSymbol) => {
    if (selectedSymbols.includes(symbol)) {
      setSelectedSymbols(selectedSymbols.filter(s => s !== symbol));
    } else if (selectedSymbols.length < 3) {
      const newSymbols = [...selectedSymbols, symbol];
      setSelectedSymbols(newSymbols);
      
      // Check if we have 3 symbols and can form an archetype
      if (newSymbols.length === 3) {
        const archetype = getArchetypeBySymbols(newSymbols);
        if (archetype) {
          setTimeout(() => onComplete(newSymbols, archetype), 500);
        }
      }
    }
  };

  const symbols = Object.keys(ALCHEMICAL_SYMBOLS) as AlchemicalSymbol[];
  const matchedArchetype = selectedSymbols.length === 3 ? getArchetypeBySymbols(selectedSymbols) : null;

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-phosphor-green">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-pixel mb-4 glow-text">ARCHETYPE GENESIS</h1>
        <p className="text-neon-cyan text-sm max-w-2xl mx-auto">
          Select three alchemical symbols to forge your philosophical archetype.
          Each combination unlocks a unique path through the questions of existence.
        </p>
      </div>

      {/* Symbol Grid */}
      <div className="grid grid-cols-3 gap-8 mb-12">
        {symbols.map(symbol => {
          const symbolData = ALCHEMICAL_SYMBOLS[symbol];
          const isSelected = selectedSymbols.includes(symbol);
          
          return (
            <button
              key={symbol}
              onClick={() => handleSymbolClick(symbol)}
              onMouseEnter={() => setHoveredSymbol(symbol)}
              onMouseLeave={() => setHoveredSymbol(null)}
              disabled={!isSelected && selectedSymbols.length === 3}
              className={`
                relative w-32 h-32 border-2 transition-all duration-300
                ${isSelected 
                  ? 'border-phosphor-green bg-phosphor-green bg-opacity-10 scale-110 glow-border' 
                  : selectedSymbols.length === 3
                    ? 'border-gray-700 opacity-30 cursor-not-allowed'
                    : 'border-gray-600 hover:border-neon-cyan hover:bg-neon-cyan hover:bg-opacity-5'
                }
              `}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span 
                  className="text-5xl mb-2"
                  style={{ 
                    color: isSelected ? symbolData.color : '#666',
                    filter: isSelected ? 'drop-shadow(0 0 10px currentColor)' : 'none'
                  }}
                >
                  {symbolData.unicode}
                </span>
                <span className="text-xs font-pixel uppercase">
                  {symbol}
                </span>
              </div>
              
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-phosphor-green rounded-full flex items-center justify-center">
                  <span className="text-black text-xs font-bold">{selectedSymbols.indexOf(symbol) + 1}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Symbol Description */}
      {hoveredSymbol && (
        <div className="absolute bottom-32 bg-black border border-neon-cyan p-4 max-w-md glow-border">
          <h3 className="text-neon-cyan font-pixel text-sm mb-2">
            {ALCHEMICAL_SYMBOLS[hoveredSymbol].name}
          </h3>
          <p className="text-gray-300 text-xs">
            {ALCHEMICAL_SYMBOLS[hoveredSymbol].description}
          </p>
        </div>
      )}

      {/* Selection Status */}
      <div className="text-center">
        <div className="flex gap-2 justify-center mb-4">
          {[0, 1, 2].map(index => (
            <div
              key={index}
              className={`
                w-16 h-16 border-2 flex items-center justify-center
                ${selectedSymbols[index] 
                  ? 'border-phosphor-green bg-phosphor-green bg-opacity-20' 
                  : 'border-gray-600 border-dashed'
                }
              `}
            >
              {selectedSymbols[index] && (
                <span 
                  className="text-2xl"
                  style={{ color: ALCHEMICAL_SYMBOLS[selectedSymbols[index]].color }}
                >
                  {ALCHEMICAL_SYMBOLS[selectedSymbols[index]].unicode}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Archetype Preview */}
        {matchedArchetype && (
          <div className="mt-6 p-4 border border-phosphor-green bg-black bg-opacity-50 glow-border animate-pulse">
            <h2 className="text-xl font-pixel text-phosphor-green mb-2">
              {matchedArchetype.name}
            </h2>
            <p className="text-sm text-gray-300 italic">
              "{matchedArchetype.question}"
            </p>
            <p className="text-xs text-neon-cyan mt-2">
              Domain: {matchedArchetype.domain.toUpperCase()}
            </p>
          </div>
        )}

        {!matchedArchetype && selectedSymbols.length > 0 && (
          <p className="text-gray-400 text-sm">
            Select {3 - selectedSymbols.length} more symbol{3 - selectedSymbols.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}