'use client';

import { useState } from 'react';
import { HistoricalOrb } from '@/components/layers/HistoricalOrb';
import { LayerNavigation } from '@/components/ui/LayerNavigation';
import { Layer } from '@/lib/types';

export default function PhilosophicalNexus() {
  const [currentLayer, setCurrentLayer] = useState<Layer>('historical');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const renderLayer = () => {
    switch (currentLayer) {
      case 'historical':
        return <HistoricalOrb />;
      case 'personal':
        return (
          <div className="h-screen bg-black text-phosphor-green flex items-center justify-center font-mono">
            <div className="text-center">
              <h2 className="text-2xl mb-4 glow-text">PERSONAL ORB</h2>
              <p className="text-neon-cyan">Coming Soon - Quiz & Personal Philosophy Visualization</p>
            </div>
          </div>
        );
      case 'resonance':
        return (
          <div className="h-screen bg-black text-phosphor-green flex items-center justify-center font-mono">
            <div className="text-center">
              <h2 className="text-2xl mb-4 glow-text">RESONANCE CHAMBER</h2>
              <p className="text-neon-cyan">Coming Soon - Meditative Particle Visualization</p>
            </div>
          </div>
        );
      default:
        return <HistoricalOrb />;
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-phosphor-green font-mono overflow-hidden">
      {/* CRT Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10">
        <div className="w-full h-full bg-scanlines" />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">
        {renderLayer()}
      </div>
      
      {/* Layer Navigation */}
      <div className="fixed top-4 right-4 z-20">
        <LayerNavigation 
          currentLayer={currentLayer} 
          onLayerChange={setCurrentLayer}
          isAuthenticated={isAuthenticated}
        />
      </div>
      
      {/* Title Banner */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-black border border-phosphor-green px-4 py-2 glow-border">
          <h1 className="font-pixel text-sm text-phosphor-green glow-text chromatic-aberration">
            THE PHILOSOPHICAL NEXUS
          </h1>
          <div className="text-xs text-neon-cyan text-center mt-1">
            v0.1.0 // 2,500+ YEARS OF THOUGHT
          </div>
        </div>
      </div>
      
      {/* Authentication Notice */}
      {!isAuthenticated && (
        <div className="fixed bottom-4 left-4 z-20">
          <div className="bg-black border border-neon-cyan px-3 py-2 text-xs font-mono">
            <div className="text-neon-cyan">GUEST ACCESS MODE</div>
            <div className="text-gray-400 mt-1">Limited to Historical Orb</div>
          </div>
        </div>
      )}
    </div>
  );
}